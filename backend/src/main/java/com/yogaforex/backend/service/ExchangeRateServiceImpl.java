package com.yogaforex.backend.service;

import com.yogaforex.backend.dto.ExchangeRateDto;
import com.yogaforex.backend.models.Address;
import com.yogaforex.backend.models.ExchangeRate;
import com.yogaforex.backend.repository.ExchangeRateRepository;
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
public class ExchangeRateServiceImpl implements ExchangeRateService {

    private final ExchangeRateRepository exchangeRateRepository;
    private final ModelMapper modelMapper;
    public static final Logger logger = LoggerFactory.getLogger(ExchangeRateServiceImpl.class);

    public ExchangeRateServiceImpl(ExchangeRateRepository exchangeRateRepository, ModelMapper modelMapper) {
        this.exchangeRateRepository = exchangeRateRepository;
        this.modelMapper = modelMapper;
        configureMappings();
    }

    @Override
    public Optional<ExchangeRate> getExchangeRateById(UUID id) {
        return exchangeRateRepository.findById(id);
    }

    @Override
    public Page<ExchangeRate> getAllExchangeRates(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize); // Create Pageable instance
        return exchangeRateRepository.findAll(pageable);
    }

    @Override
    @Transactional
    public ExchangeRate createExchangeRate(ExchangeRate exchangeRate) {
        return exchangeRateRepository.save(exchangeRate);
    }

    @Override
    @Transactional
    public ExchangeRate updateExchangeRate(UUID id, ExchangeRate exchangeRate) {
        return exchangeRateRepository.findById(id).map(existingExchangeRate -> {
            existingExchangeRate.setRate(exchangeRate.getRate());
            existingExchangeRate.setBaseCurrency(exchangeRate.getBaseCurrency());
            existingExchangeRate.setTargetCurrency(exchangeRate.getTargetCurrency());
            existingExchangeRate.setTransactionType(exchangeRate.getTransactionType());

            return exchangeRateRepository.save(existingExchangeRate);
        }).orElseThrow(() -> new RuntimeException("ExchangeRate not found"));
    }

    @Override
    @Transactional
    public void deleteExchangeRate(UUID id) {
        exchangeRateRepository.deleteById(id);
    }

    private void configureMappings() {}

    @Override
    public ExchangeRateDto convertExchangeRateToExchangeRateDto(ExchangeRate exchangeRate) {
        return modelMapper.map(exchangeRate, ExchangeRateDto.class);
    }

    @Override
    public ExchangeRate convertExchangeRateDtoToExchangeRate(ExchangeRateDto exchangeRateDto) {
        return modelMapper.map(exchangeRateDto, ExchangeRate.class);
    }
}
