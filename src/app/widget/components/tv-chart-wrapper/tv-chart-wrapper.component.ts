import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ElementRef,
  ViewChild,
  Renderer2,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import {
  widget,
  IChartingLibraryWidget,
} from '@assets/charting_library/charting_library.min';

const LINESTYLE_SOLID = 0;
const LINESTYLE_DOTTED = 1;
const LINESTYLE_DASHED = 2;
const LINESTYLE_LARGE_DASHED = 3;

import datafeedConfig from './datafeed';
import { applyTheme } from './theme';

@Component({
  selector: 'tv-chart-wrapper',
  templateUrl: './tv-chart-wrapper.component.html',
  styleUrls: ['./tv-chart-wrapper.component.scss'],
})
export class TradingViewChartWrapperComponent
  implements OnInit, OnDestroy, AfterViewInit {
  tvWidget: IChartingLibraryWidget;
  datafeedConfig: any;

  @ViewChild('loadingSpinner', { static: false }) loadingSpinner: ElementRef;

  constructor(private renderer: Renderer2, private cdRef: ChangeDetectorRef) {
    this.datafeedConfig = datafeedConfig;
  }

  ngOnInit() {
    const widgetOptions: any = {
      symbol: 'Coinbase:BTC/USD',
      datafeed: this.datafeedConfig,
      interval: '1',
      container_id: 'tv_chart_container',
      library_path: 'assets/charting_library/',
      locale: 'en',
      disabled_features: [
        'use_localstorage_for_settings',
        'compare_symbol',
        'border_around_the_chart',
      ],
      enabled_features: ['study_templates'],
      charts_storage_url: 'https://saveload.tradingview.com',
      charts_storage_api_version: '1.1',
      client_id: 'test',
      user_id: 'public_user_id',
      fullscreen: false,
      autosize: true,
      debug: false,
      overrides: {
        'paneProperties.background': '#000e24',

        'paneProperties.vertGridProperties.color': 'rgba(0, 0, 0, 0)',
        'paneProperties.vertGridProperties.style': LINESTYLE_SOLID,
        'paneProperties.horzGridProperties.color': 'rgba(0, 0, 0, 0)',
        'paneProperties.horzGridProperties.style': LINESTYLE_SOLID,

        'paneProperties.crossHairProperties.color': 'rgba(255, 255, 255, 0.7)',
        'paneProperties.crossHairProperties.width': 1,
        'paneProperties.crossHairProperties.style': LINESTYLE_DASHED,

        'paneProperties.topMargin': 5,
        'paneProperties.bottomMargin': 5,

        'paneProperties.legendProperties.showStudyArguments': true,
        'paneProperties.legendProperties.showStudyTitles': true,
        'paneProperties.legendProperties.showStudyValues': true,
        'paneProperties.legendProperties.showSeriesTitle': true,
        'paneProperties.legendProperties.showSeriesOHLC': true,

        'scalesProperties.showLeftScale': false,
        'scalesProperties.showRightScale': true,
        'scalesProperties.backgroundColor': 'rgba(0, 0, 0, 0)',
        'scalesProperties.fontSize': 10,
        'scalesProperties.lineColor': 'rgba(255, 255, 255, 0.5)',
        'scalesProperties.textColor': 'rgba(255, 255, 255, 0.5)',
        'scalesProperties.scaleSeriesOnly': false,
        'scalesProperties.showSeriesLastValue': true,
        'scalesProperties.showSeriesPrevCloseValue': false,
        'scalesProperties.showStudyLastValue': false,
        'scalesProperties.showStudyPlotLabels': false,
        'scalesProperties.showSymbolLabels': false,

        'symbolWatermarkProperties.transparency': 0,
        // 'mainSeriesProperties.candleStyle.borderUpColor': '#8ed23f',
        // 'mainSeriesProperties.candleStyle.wickUpColor': '#8ed23f',
        // 'mainSeriesProperties.candleStyle.upColor': '#8ed23f',
        // 'mainSeriesProperties.candleStyle.borderDownColor': '#ff2d2d',
        // 'mainSeriesProperties.candleStyle.wickDownColor': '#ff2d2d',
        // 'mainSeriesProperties.candleStyle.downColor': '#ff2d2d',
      },
    };

    this.tvWidget = new widget(widgetOptions);
  }

  ngAfterViewInit() {
    const renderer = this.renderer;
    const spinner = this.loadingSpinner.nativeElement;
    const cdRef = this.cdRef;
    this.tvWidget.onChartReady(() => {
      applyTheme();

      setTimeout(() => {
        renderer.addClass(spinner, 'hidden');
        cdRef.detectChanges();
      }, 100);
    });
  }

  ngOnDestroy() {
    if (this.tvWidget !== null) {
      this.tvWidget = null;
    }
  }
}
