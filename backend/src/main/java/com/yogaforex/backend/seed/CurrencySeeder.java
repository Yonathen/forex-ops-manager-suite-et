package com.yogaforex.backend.seed;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yogaforex.backend.enums.EAccess;
import com.yogaforex.backend.enums.EModule;
import com.yogaforex.backend.models.Currency;
import com.yogaforex.backend.repository.CurrencyRepository;
import jakarta.annotation.PostConstruct;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

@Component
public class CurrencySeeder {

    public static final Logger logger = LoggerFactory.getLogger(CurrencySeeder.class);

    private final ObjectMapper objectMapper;
    private final CurrencyRepository currencyRepository;

    @Autowired
    public CurrencySeeder(
            CurrencyRepository currencyRepository,
            ObjectMapper objectMapper,
            ModelMapper modelMapper
    ) {
        this.objectMapper = objectMapper;
        this.currencyRepository = currencyRepository;
    }

    @PostConstruct
    public void seedCurrency() {
        if (currencyRepository.count() == 0) {
            try(InputStream inputStream = getClass().getResourceAsStream("/data/currency.json")) {
                List<Currency> currencies = objectMapper.readValue(inputStream, new TypeReference<List<Currency>>() {});
                logger.info("Mapped categories: {}", currencies);

                currencyRepository.saveAll(currencies);
                logger.info("Saved all categories");
            } catch (IOException e) {
                logger.error("Failed to fetch seed data : {}", e.getMessage());
                throw new RuntimeException(e);
            }
        }
    }
}
