package com.yogaforex.backend.controller;

import com.yogaforex.backend.dto.CustomerDto;
import com.yogaforex.backend.dto.CustomerDto;
import com.yogaforex.backend.dto.PaginatedResponseDTO;
import com.yogaforex.backend.models.BankAccount;
import com.yogaforex.backend.models.Customer;
import com.yogaforex.backend.models.Customer;
import com.yogaforex.backend.models.Transaction;
import com.yogaforex.backend.service.CustomerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;
    public static final Logger logger = LoggerFactory.getLogger(CustomerController.class);

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public ResponseEntity<PaginatedResponseDTO<CustomerDto>> fetchAllCustomers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<Customer> paginatedResult = customerService.getAllCustomers(page, size);
        logger.info("Fetched paginatedResult : {}", paginatedResult);
        List<CustomerDto> allCustomerDto = paginatedResult
                .stream()
                .map(customerService::convertCustomerToCustomerDto)
                .toList();

        return ResponseEntity.ok(
                new PaginatedResponseDTO<CustomerDto>(
                        allCustomerDto,
                        paginatedResult.getNumber(),
                        paginatedResult.getSize(),
                        paginatedResult.getTotalElements()
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerDto> fetchCustomerById(@PathVariable UUID id) {
        Optional<Customer> customer = customerService.getCustomerById(id);
        if (customer.isEmpty()) {
            logger.info("Customer with id {} not found", id);
            return ResponseEntity.notFound().build();
        }

        logger.info("Fetched customer by id before transform to public DTO : {}", customer.get());
        return ResponseEntity.ok(customerService.convertCustomerToCustomerDto(customer.get()));
    }

    @GetMapping("/transactions/{customerId}")
    public ResponseEntity<Set<Transaction>> fetchAllTransactionsByCustomerId(@PathVariable UUID customerId) {
        Optional<Customer> customer = customerService.getCustomerById(customerId);
        if (customer.isEmpty()) {
            logger.info("Customer with an id of {} for getting customers not found", customerId);
            return ResponseEntity.notFound().build();
        }

        logger.info("fetchAllAccountsByCustomerId: Fetched customer by id before transform to public DTO : {}", customer.get());
        CustomerDto customerDto = customerService.convertCustomerToCustomerDto(customer.get());
        return ResponseEntity.ok(customerDto.getTransactions());
    }

    @PostMapping
    public ResponseEntity<CustomerDto> createCustomer(@RequestBody CustomerDto customerDto) {
        Customer customer = customerService.convertCustomerDtoToCustomer(customerDto);
        Customer createdCustomer = customerService.createCustomer(customer);
        return ResponseEntity.ok(customerService.convertCustomerToCustomerDto(createdCustomer));
    }

    @PutMapping
    public ResponseEntity<CustomerDto> updateCustomer(@RequestBody CustomerDto customerDto) {
        Optional<Customer> customer = customerService.getCustomerById(customerDto.getId());
        if (customer.isEmpty()) {
            logger.info("Customer id {} for update not found", customerDto.getId());
            return ResponseEntity.notFound().build();
        }

        logger.info("Updated customer id before transform to public DTO : {}", customerDto.getId());
        Customer customerForUpdate = customerService.convertCustomerDtoToCustomer(customerDto);
        logger.info("Transformed customer for update : {}", customerForUpdate.toString());

        Customer updatedCustomer = customerService.updateCustomer(customerDto.getId(), customerForUpdate);
        logger.info("Updated customer id after transform to public DTO : {}", updatedCustomer.getId());

        return ResponseEntity.ok(customerService.convertCustomerToCustomerDto(updatedCustomer));
    }

    @DeleteMapping
    public ResponseEntity<CustomerDto> deleteCustomer(@RequestBody CustomerDto customerDto) {
        Optional<Customer> customer = customerService.getCustomerById(customerDto.getId());
        if (customer.isEmpty()) {
            logger.info("Customer id {} for delete is not found", customerDto.getId());
            return ResponseEntity.notFound().build();
        }

        customerService.deleteCustomer(customerDto.getId());
        logger.info("Deleted customer id : {}", customerDto.getId());

        return ResponseEntity.ok(customerService.convertCustomerToCustomerDto(customer.get()));
    }

    @PutMapping("/add-account/{customerId}")
    public ResponseEntity<CustomerDto> addAccountToCustomer(@PathVariable UUID customerId, @RequestBody BankAccount bankAccount) {
        logger.info("Add account with account number of {} to customer with customer id of {}", bankAccount.getAccountNumber(), customerId);
        BankAccount account = customerService.addBankAccount(customerId, bankAccount);
        Optional<Customer> customer = customerService.getCustomerById(account.getCustomer().getId());
        if (customer.isEmpty()) {
            logger.info("Add Account : customer with id {} not found", customerId);
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(customerService.convertCustomerToCustomerDto(customer.get()));
    }

    @PutMapping("/remove-account/{accountId}/{customerId}")
    public ResponseEntity<CustomerDto> removeAccountFromCustomer(@PathVariable UUID accountId, @PathVariable UUID customerId) {
        logger.info("Remove role with role id of {} from account with account id of {}", accountId, customerId);
        customerService.removeBankAccount(accountId, customerId);

        Optional<Customer> customer = customerService.getCustomerById(customerId);
        if (customer.isEmpty()) {
            logger.info("Remove Account : customer with id {} not found", customerId);
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(customerService.convertCustomerToCustomerDto(customer.get()));
    }
}

