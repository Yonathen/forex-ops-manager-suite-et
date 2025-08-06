package com.yogaforex.backend.service;

import com.yogaforex.backend.dto.CustomerDto;
import com.yogaforex.backend.models.BankAccount;
import com.yogaforex.backend.models.Customer;
import com.yogaforex.backend.models.User;
import org.springframework.data.domain.Page;

import java.util.Optional;
import java.util.UUID;

public interface CustomerService {
    Optional<Customer> getCustomerById(UUID customerId);
    Page<Customer> getAllCustomers(int pageNumber, int pageSize);

    Customer updateCustomer(UUID customerId, Customer customer);
    Customer createCustomer(Customer customer);
    void deleteCustomer(UUID customerId);

    BankAccount addBankAccount(UUID customerId, BankAccount bankAccount);
    void removeBankAccount(UUID customerId, UUID bankAccountId);

    CustomerDto convertCustomerToCustomerDto(Customer customer);
    Customer convertCustomerDtoToCustomer(CustomerDto customerDto);

}
