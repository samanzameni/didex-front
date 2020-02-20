import { AbstractDATAService } from '@core/templates';
import { AuthService } from '@core/services';
import { PublicRESTService } from '@core/services/REST';
import { TradeSymbol } from '@core/models';

// TODO
export class SymbolDATAService extends AbstractDATAService<TradeSymbol> {
  constructor(
    protected authService: AuthService,
    protected restService: PublicRESTService
  ) {
    super(authService);
    this.queryEngine = restService.requestSymbol.bind(restService);
  }
}
