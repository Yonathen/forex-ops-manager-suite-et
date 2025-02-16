import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BankAccount,
  BranchDto,
  CustomerControllerService,
  CustomerDto,
  PaginatedResponseDTOUserPublicDto,
  UserPublicDto
} from '../../../../api';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private customerControllerService: CustomerControllerService
  ) { }

  getCustomer(id: string): Observable<CustomerDto>{
    return this.customerControllerService.fetchCustomerById(id);
  }

  createCustomer(createdCustomer: CustomerDto): Observable<CustomerDto>{
    console.log({ createdCustomer })
    return this.customerControllerService.createCustomer(createdCustomer);
  }

  removeCustomer(removedCustomer: CustomerDto): Observable<CustomerDto>{
    return this.customerControllerService.deleteCustomer(removedCustomer);
  }

  updateCustomer(updatedCustomer: CustomerDto): Observable<CustomerDto>{
    return this.customerControllerService.updateCustomer(updatedCustomer);
  }

  fetchAllCustomers(page: number, size: number): Observable<PaginatedResponseDTOUserPublicDto>{
    return this.customerControllerService.fetchAllCustomers(page, size);
  }

  addAccountToCustomer(customerId: string, account: BankAccount): Observable<CustomerDto> {
    return this.customerControllerService.addAccountToCustomer(customerId, account)
  }

  removeAccountFromCustomer(accountId: string, customerId: string): Observable<BranchDto> {
    return this.customerControllerService.removeAccountFromCustomer(accountId, customerId);
  }

}
