package com.yogaforex.backend.service;

import com.yogaforex.backend.dto.CustomerDto;
import com.yogaforex.backend.models.*;
import com.yogaforex.backend.repository.BankAccountRepository;
import com.yogaforex.backend.repository.CustomerRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final BankAccountRepository bankAccountRepository;
    private final ModelMapper modelMapper;
    public static final Logger logger = LoggerFactory.getLogger(CustomerServiceImpl.class);

    public CustomerServiceImpl(CustomerRepository customerRepository, ModelMapper modelMapper, BankAccountRepository bankAccountRepository) {
        this.customerRepository = customerRepository;
        this.modelMapper = modelMapper;
        this.bankAccountRepository = bankAccountRepository;
        configureMappings();
    }

    @Override
    public Optional<Customer> getCustomerById(UUID id) {
        return customerRepository.findById(id);
    }

    @Override
    public Page<Customer> getAllCustomers(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize); // Create Pageable instance
        return customerRepository.findAll(pageable);
    }

    @Override
    @Transactional
    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    @Transactional
    public Customer updateCustomer(UUID id, Customer customer) {
        return customerRepository.findById(id).map(existingCustomer -> {
            existingCustomer.setFirstName(customer.getFirstName());
            existingCustomer.setLastName(customer.getLastName());
            existingCustomer.setDateOfBirth(customer.getDateOfBirth());
            existingCustomer.setIdentificationNumber(customer.getIdentificationNumber());
            existingCustomer.setIdentificationType(customer.getIdentificationType());
            existingCustomer.setMiddleName(customer.getMiddleName());

            Address updatedAddress = customer.getAddress();
            if (updatedAddress != null) {
                logger.info("New Address : Email = {}", updatedAddress.getEmail());
                Address address = getUpdatedAddress(existingCustomer.getAddress(), updatedAddress);
                existingCustomer.setAddress(address);
            }

            return customerRepository.save(existingCustomer);
        }).orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    public Address getUpdatedAddress(Address address, Address updatedAddress) {
        logger.info("Customer Address : Email = {}", updatedAddress.getEmail());

        if (address == null) address = new Address();

        address.setEmail(updatedAddress.getEmail());
        address.setPhone(updatedAddress.getPhone());
        address.setKebele(updatedAddress.getKebele());
        address.setStreet(updatedAddress.getStreet());
        address.setKebele(updatedAddress.getKebele());
        address.setWoreda(updatedAddress.getWoreda());
        address.setSubCity(updatedAddress.getSubCity());
        address.setPostalCode(updatedAddress.getPostalCode());

        return address;
    }

    @Override
    @Transactional
    public void deleteCustomer(UUID id) {
        customerRepository.deleteById(id);
    }

    @Override
    public BankAccount addBankAccount(UUID id, BankAccount bankAccount) {
        Customer customer = customerRepository.findById(id).orElseThrow(() -> new RuntimeException("Customer not found"));
        bankAccount.setCustomer(customer);
        return bankAccountRepository.save(bankAccount);
    }

    @Override
    public void removeBankAccount(UUID accountId, UUID customerId) {
        BankAccount bankAccount = bankAccountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Bank Account not found"));

        if (!bankAccount.getCustomer().getId().equals(customerId)) {
            throw new RuntimeException("Bank Account does not belong to this customer");
        }

        bankAccountRepository.delete(bankAccount);
    }

    private void configureMappings() {

    }

    @Override
    public CustomerDto convertCustomerToCustomerDto(Customer customer) {
        return modelMapper.map(customer, CustomerDto.class);
    }

    @Override
    public Customer convertCustomerDtoToCustomer(CustomerDto customerDto) {
        return modelMapper.map(customerDto, Customer.class);
    }
}
