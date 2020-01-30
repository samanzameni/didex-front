import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {
  widget,
  IChartingLibraryWidget,
  ChartingLibraryWidgetOptions,
  IBasicDataFeed,
} from '@assets/charting_library/charting_library.min';

import datafeedConfig from './datafeed';

@Component({
  selector: 'tv-chart-wrapper',
  templateUrl: './tv-chart-wrapper.component.html',
  styleUrls: ['./tv-chart-wrapper.component.scss'],
})
export class TradingViewChartWrapperComponent implements OnInit, OnDestroy {
  tvWidget: IChartingLibraryWidget;
  datafeedConfig: any;

  constructor() {
    this.datafeedConfig = datafeedConfig;
  }

  ngOnInit() {
    const widgetOptions: any = {
      debug: false,
      symbol: 'Coinbase:BTC/USD',
      datafeed: this.datafeedConfig,
      interval: '1',
      container_id: 'tv_chart_container',
      library_path: 'assets/charting_library/',
      chartsStorageUrl: 'https://saveload.tradingview.com',
      chartsStorageApiVersion: '1.1',
      clientId: 'tradingview.com',
      locale: 'en',
      disabled_features: ['use_localstorage_for_settings'],
      enabled_features: ['study_templates'],
      client_id: 'test',
      user_id: 'public_user_id',
      fullscreen: false,
      autosize: true,
      studiesOverrides: {},
    };

    const overrides = {
      'paneProperties.background': '#131722',
      'paneProperties.vertGridProperties.color': '#363c4e',
      'paneProperties.horzGridProperties.color': '#363c4e',
      'symbolWatermarkProperties.transparency': 90,
      'scalesProperties.textColor': '#AAA',
      'mainSeriesProperties.candleStyle.wickUpColor': '#336854',
      'mainSeriesProperties.candleStyle.wickDownColor': '#7f323f',
    };

    this.tvWidget = new widget(widgetOptions);
  }

  ngOnDestroy() {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  }
}
