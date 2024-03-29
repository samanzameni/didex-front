import {
  Component,
  Input,
  OnDestroy,
  ElementRef,
  ViewChild,
  Renderer2,
  AfterViewInit,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
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
import { TradeSymbol, SymbolExternalSource } from '@core/models';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LocaleService } from '@core/services/ddx-locale.service';

@Component({
  selector: 'tv-chart-wrapper',
  templateUrl: './tv-chart-wrapper.component.html',
  styleUrls: ['./tv-chart-wrapper.component.scss'],
})
export class TradingViewChartWrapperComponent
  implements OnChanges, OnDestroy, AfterViewInit {
  private symbol$: BehaviorSubject<TradeSymbol>;

  tvWidget: any;
  datafeedConfig: any;

  @Input() activeSymbol: TradeSymbol;
  @Input() symbolExternalSources: SymbolExternalSource[];

  @ViewChild('loadingSpinner') loadingSpinner: ElementRef;

  private symbolSubscription: Subscription;

  constructor(
    private renderer: Renderer2,
    private cdRef: ChangeDetectorRef,
    private localeService: LocaleService
  ) {
    this.symbol$ = new BehaviorSubject(null);
    this.datafeedConfig = datafeedConfig;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.activeSymbol && this.symbolExternalSources) {
      this.symbol$.next(this.activeSymbol);
    }
  }

  ngAfterViewInit() {
    this.cdRef.detach();

    this.symbolSubscription = this.symbol$.subscribe((activeSymbol) => {
      if (activeSymbol && this.symbolExternalSources) {
        this.initTradingView(activeSymbol);
      }
    });
  }

  ngOnDestroy() {
    if (this.tvWidget !== null) {
      this.tvWidget = null;
    }

    if (this.symbolSubscription) {
      this.symbolSubscription.unsubscribe();
    }
  }

  private initTradingView(activeSymbol: TradeSymbol): void {
    let externalSource: SymbolExternalSource = null;
    for (const source of this.symbolExternalSources) {
      if (source.symbol === activeSymbol.symbol) {
        externalSource = source;
        break;
      }
    }

    if (externalSource) {
      const symbol = `${externalSource.source}:${externalSource.first}/${externalSource.second}`;
      setTimeout(() => {
        this.renderChart(symbol);
      }, 100);
    }
  }

  private renderChart(symbol: string): void {
    const renderer = this.renderer;
    const spinner = this.loadingSpinner.nativeElement;
    const cdRef = this.cdRef;

    renderer.removeClass(spinner, 'hidden');
    cdRef.detectChanges();

    const widgetOptions: any = {
      autosize: true,
      charts_storage_url: 'https://saveload.tradingview.com',
      charts_storage_api_version: '1.1',
      client_id: 'didex.com',
      container_id: 'tv_chart_container',
      datafeed: this.datafeedConfig,
      debug: false,
      disabled_features: ['use_localstorage_for_settings'],
      enabled_features: [],
      enable_publishing: false,
      fullscreen: false,
      hide_legend: true,
      interval: '60',
      library_path: 'assets/charting_library/',
      locale: this.localeService.currentLocale,
      save_image: false,
      symbol,
      theme: 'dark',
      timezone: 'Etc/UTC',
      toolbar_bg: '#000a33',
      user_id: 'public_user_id',
      overrides: {
        'paneProperties.background': '#000a33',

        'paneProperties.vertGridProperties.color': 'rgba(0, 0, 0, 0)',
        'paneProperties.vertGridProperties.style': LINESTYLE_SOLID,
        'paneProperties.horzGridProperties.color': 'rgba(0, 0, 0, 0)',
        'paneProperties.horzGridProperties.style': LINESTYLE_SOLID,

        'paneProperties.crossHairProperties.color': 'rgba(255, 255, 255, 0.7)',
        'paneProperties.crossHairProperties.width': 1,
        'paneProperties.crossHairProperties.style': LINESTYLE_DASHED,

        'paneProperties.topMargin': 5,
        'paneProperties.bottomMargin': 5,

        'paneProperties.legendProperties.showStudyArguments': false,
        'paneProperties.legendProperties.showStudyTitles': false,
        'paneProperties.legendProperties.showStudyValues': false,
        'paneProperties.legendProperties.showSeriesTitle': false,
        'paneProperties.legendProperties.showSeriesOHLC': false,

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

        'symbolWatermarkProperties.transparency': 100,
        // 'mainSeriesProperties.candleStyle.borderUpColor': '#8ed23f',
        // 'mainSeriesProperties.candleStyle.wickUpColor': '#8ed23f',
        // 'mainSeriesProperties.candleStyle.upColor': '#8ed23f',
        // 'mainSeriesProperties.candleStyle.borderDownColor': '#ff2d2d',
        // 'mainSeriesProperties.candleStyle.wickDownColor': '#ff2d2d',
        // 'mainSeriesProperties.candleStyle.downColor': '#ff2d2d',

        volumePaneSize: 'tiny',
      },
    };

    this.tvWidget = new widget(widgetOptions);

    setTimeout(() => {
      applyTheme();
      renderer.addClass(spinner, 'hidden');
      cdRef.detectChanges();
    }, 1000);
    //           this.tvWidget.onChartReady(() => {
    // });
  }
}
