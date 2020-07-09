// api/stream.js
import { default as historyProvider } from './historyProvider';
// we use Socket.io client to connect to cryptocompare's socket.io stream
const io = require('socket.io-client');
// tslint:disable-next-line: variable-name
const socket_url = 'https://streamer.cryptocompare.com';
const socket = io(socket_url);
// keep track of subscriptions
let _subs = [];

export default {
  subscribeBars(symbolInfo, resolution, updateCb, uid, resetCache) {
    const channelString = createChannelString(symbolInfo);

    socket.emit('SubAdd', { subs: [channelString] });
    const newSub = {
      channelString,
      uid,
      resolution,
      symbolInfo,
      lastBar: historyProvider.history[symbolInfo.name]?.lastBar,
      listener: updateCb,
    };
    _subs.push(newSub);
  },
  unsubscribeBars(uid) {
    const subIndex = _subs.findIndex((e) => e.uid === uid);
    if (subIndex === -1) {
      return;
    }
    const sub = _subs[subIndex];
    socket.emit('SubRemove', { subs: [sub.channelString] });
    _subs.splice(subIndex, 1);
  },
};

socket.on('connect', () => {
  console.log('===Socket connected');
});
socket.on('disconnect', (e) => {
  console.log('===Socket disconnected:', e);
});
socket.on('error', (err) => {
  console.log('===Socket error', err);
});
socket.on('m', (e) => {
  // here we get all events the CryptoCompare connection has subscribed to
  // we need to send this new data to our subscribed charts
  // tslint:disable-next-line: variable-name
  const _data = e.split('~');
  if (_data[0] === '3') {
    console.log('===Socket Snapshot load event complete');
    return;
  }
  const data = {
    sub_type: parseInt(_data[0], 10),
    exchange: _data[1],
    to_sym: _data[2],
    from_sym: _data[3],
    trade_id: _data[5],
    ts: parseInt(_data[6], 10),
    volume: parseFloat(_data[7]),
    price: parseFloat(_data[8]),
  };

  const channelString = `${data.sub_type}~${data.exchange}~${data.to_sym}~${data.from_sym}`;

  const sub = _subs.find((e) => e.channelString === channelString);

  if (sub) {
    // getting last bar from history provider
    if (!sub.lastBar) {
      sub.lastBar = historyProvider.history[sub.symbolInfo.name]?.lastBar;
    }
    // disregard the initial catchup snapshot of trades for already closed candles
    if (!sub.lastBar || data.ts < sub.lastBar.time / 1000) {
      return;
    }

    let _lastBar = updateBar(data, sub);

    // send the most recent bar back to TV's realtimeUpdate callback
    sub.listener(_lastBar);
    console.log('###', 'Updated to:', _lastBar);
    // update our own record of lastBar
    sub.lastBar = _lastBar;
  }
});

// Take a single trade, and subscription record, return updated bar
function updateBar(data, sub) {
  const lastBar = sub.lastBar;
  let resolution = sub.resolution;
  if (resolution.includes('D')) {
    // 1 day in minutes === 1440
    resolution = 1440;
  } else if (resolution.includes('W')) {
    // 1 week in minutes === 10080
    resolution = 10080;
  }
  const coeff = resolution * 60;
  // console.log({coeff})
  const rounded = Math.floor(data.ts / coeff) * coeff;
  const lastBarSec = lastBar.time / 1000;
  let _lastBar;

  if (rounded > lastBarSec) {
    // create a new candle, use last close as open **PERSONAL CHOICE**
    _lastBar = {
      time: rounded * 1000,
      open: lastBar.close,
      high: lastBar.close,
      low: lastBar.close,
      close: data.price,
      volume: data.volume,
    };
  } else {
    // update lastBar candle!
    if (data.price < lastBar.low) {
      lastBar.low = data.price;
    } else if (data.price > lastBar.high) {
      lastBar.high = data.price;
    }

    lastBar.volume += data.volume;
    lastBar.close = data.price;
    _lastBar = lastBar;
  }
  return _lastBar;
}

// takes symbolInfo object as input and creates the subscription string to send to CryptoCompare
function createChannelString(symbolInfo) {
  const channel = symbolInfo.name.split(/[:/]/);
  const exchange = capitalize(channel[0] === 'GDAX' ? 'Coinbase' : channel[0]);
  const to = channel[2];
  const from = channel[1];
  // subscribe to the CryptoCompare trade channel for the pair and exchange
  return `0~${exchange}~${from}~${to}`;
}

function capitalize(str: string) {
  return str.charAt(0).concat(str.slice(1).toLowerCase());
}
