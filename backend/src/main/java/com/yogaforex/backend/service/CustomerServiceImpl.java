package com.yogaforex.backend.service;

import com.yogaforex.backend.dto.CustomerDto;
import com.yogaforex.backend.models.Address;
import com.yogaforex.backend.models.Customer;
import com.yogaforex.backend.repository.CustomerRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final ModelMapper modelMapper;
    public static final Logger logger = LoggerFactory.getLogger(CustomerServiceImpl.class);

    public CustomerServiceImpl(CustomerRepository customerRepository, ModelMapper modelMapper, UserService userService) {
        this.customerRepository = customerRepository;
        this.modelMapper = modelMapper;
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
            existingCustomer.setBankAccounts(customer.getBankAccounts());

            Address updatedAddress = customer.getAddress();
            logger.info("Updated Address : email = {}", updatedAddress.getEmail());
            if (updatedAddress != null) {
                Address address = getUpdatedAddress(existingCustomer.getAddress(), updatedAddress);
                existingCustomer.setAddress(address);
            }

            return customerRepository.save(existingCustomer);
        }).orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    public Address getUpdatedAddress(Address address, Address updatedAddress) {
        logger.info("Customer Address : email = {}", updatedAddress.getEmail());

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
