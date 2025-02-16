import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BankAccount,
  BranchDto, Currency,
  ExchangeRateControllerService,
  ExchangeRateDto,
  PaginatedResponseDTOUserPublicDto,
  UserPublicDto
} from '../../../../api';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  constructor(
    private exchangeRateControllerService: ExchangeRateControllerService
  ) { }

  getExchangeRate(id: string): Observable<ExchangeRateDto>{
    return this.exchangeRateControllerService.fetchExchangeRateById(id);
  }

  createExchangeRate(createdExchangeRate: ExchangeRateDto): Observable<ExchangeRateDto>{
    console.log({ createdExchangeRate })
    return this.exchangeRateControllerService.createExchangeRate(createdExchangeRate);
  }

  removeExchangeRate(removedExchangeRate: ExchangeRateDto): Observable<ExchangeRateDto>{
    return this.exchangeRateControllerService.deleteExchangeRate(removedExchangeRate);
  }

  updateExchangeRate(updatedExchangeRate: ExchangeRateDto): Observable<ExchangeRateDto>{
    return this.exchangeRateControllerService.updateExchangeRate(updatedExchangeRate);
  }

  fetchAllExchangeRates(page: number, size: number): Observable<PaginatedResponseDTOUserPublicDto>{
    return this.exchangeRateControllerService.fetchAllExchangeRates(page, size);
  }

  fetchAllCurrencies(): Observable<Array<Currency>>{
    return this.exchangeRateControllerService.fetchAllCurrencies();
  }

}
