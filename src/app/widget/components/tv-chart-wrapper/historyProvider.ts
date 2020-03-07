// let rp = require('request-promise').defaults({ json: true });
const rp = reqConfig => {
  const request = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return;
      }

      // Process the response
      if (request.status >= 200 && request.status < 300) {
        // If successful
        resolve(request);
      } else {
        // If failed
        reject({
          status: request.status,
          statusText: request.statusText,
        });
      }
    };

    request.open('POST', reqConfig.url, true);
    request.responseType = 'json';
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.send(JSON.stringify(reqConfig.qs));
  });
};

// tslint:disable-next-line: variable-name
const api_root = 'https://min-api.cryptocompare.com';
const history = {};

export default {
  history,

  getBars(symbolInfo, resolution, from, to, first, limit?) {
    // tslint:disable-next-line: variable-name
    const split_symbol = symbolInfo.name.split(/[:/]/);
    const url =
      resolution === 'D'
        ? '/data/histoday'
        : resolution >= 60
        ? '/data/histohour'
        : '/data/histominute';
    const qs = {
      e: split_symbol[0],
      fsym: split_symbol[1],
      tsym: split_symbol[2],
      toTs: to ? to : '',
      limit: limit ? limit : 2000,
    };

    return rp({
      url: `${api_root}${url}`,
      qs,
    }).then(data => {
      data = data['response'];
      if (data['Response'] && data['Response'] === 'Error') {
        console.error('CryptoCompare API error:', data['Message']);
        return [];
      }
      if (data['Data'].length) {
        const bars = data['Data'].map(el => {
          return {
            time: el.time * 1000,
            low: el.low,
            high: el.high,
            open: el.open,
            close: el.close,
            volume: el.volumefrom,
          };
        });
        if (first) {
          const lastBar = bars[bars.length - 1];
          history[symbolInfo.name] = { lastBar };
        }
        return bars;
      } else {
        return [];
      }
    });
  },
};
