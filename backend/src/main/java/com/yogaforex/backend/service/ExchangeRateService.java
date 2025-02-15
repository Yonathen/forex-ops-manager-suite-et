package com.yogaforex.backend.service;

import com.yogaforex.backend.dto.ExchangeRateDto;
import com.yogaforex.backend.models.ExchangeRate;
import org.springframework.data.domain.Page;

import java.util.Optional;
import java.util.UUID;

public interface ExchangeRateService {
    Optional<ExchangeRate> getExchangeRateById(UUID exchangeRateId);
    Page<ExchangeRate> getAllExchangeRates(int pageNumber, int pageSize);

    ExchangeRate updateExchangeRate(UUID exchangeRateId, ExchangeRate exchangeRate);
    ExchangeRate createExchangeRate(ExchangeRate exchangeRate);
    void deleteExchangeRate(UUID exchangeRateId);

    ExchangeRateDto convertExchangeRateToExchangeRateDto(ExchangeRate exchangeRate);
    ExchangeRate convertExchangeRateDtoToExchangeRate(ExchangeRateDto exchangeRateDto);

}
