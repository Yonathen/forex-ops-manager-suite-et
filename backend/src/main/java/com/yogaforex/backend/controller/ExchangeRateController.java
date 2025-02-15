package com.yogaforex.backend.controller;

import com.yogaforex.backend.dto.ExchangeRateDto;
import com.yogaforex.backend.dto.PaginatedResponseDTO;
import com.yogaforex.backend.models.ExchangeRate;
import com.yogaforex.backend.models.Transaction;
import com.yogaforex.backend.service.ExchangeRateService;
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
@RequestMapping("/api/exchange-rates")
public class ExchangeRateController {

    private final ExchangeRateService exchangeRateService;
    public static final Logger logger = LoggerFactory.getLogger(ExchangeRateController.class);

    public ExchangeRateController(ExchangeRateService exchangeRateService) {
        this.exchangeRateService = exchangeRateService;
    }

    @GetMapping
    public ResponseEntity<PaginatedResponseDTO<ExchangeRateDto>> fetchAllExchangeRates(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<ExchangeRate> paginatedResult = exchangeRateService.getAllExchangeRates(page, size);
        logger.info("Fetched paginatedResult : {}", paginatedResult);
        List<ExchangeRateDto> allExchangeRateDto = paginatedResult
                .stream()
                .map(exchangeRateService::convertExchangeRateToExchangeRateDto)
                .toList();

        return ResponseEntity.ok(
                new PaginatedResponseDTO<ExchangeRateDto>(
                        allExchangeRateDto,
                        paginatedResult.getNumber(),
                        paginatedResult.getSize(),
                        paginatedResult.getTotalElements()
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExchangeRateDto> fetchExchangeRateById(@PathVariable UUID id) {
        Optional<ExchangeRate> exchangeRate = exchangeRateService.getExchangeRateById(id);
        if (exchangeRate.isEmpty()) {
            logger.info("ExchangeRate with id {} not found", id);
            return ResponseEntity.notFound().build();
        }

        logger.info("Fetched exchangeRate by id before transform to public DTO : {}", exchangeRate.get());
        return ResponseEntity.ok(exchangeRateService.convertExchangeRateToExchangeRateDto(exchangeRate.get()));
    }

    @PostMapping
    public ResponseEntity<ExchangeRateDto> createExchangeRate(@RequestBody ExchangeRateDto exchangeRateDto) {
        ExchangeRate exchangeRate = exchangeRateService.convertExchangeRateDtoToExchangeRate(exchangeRateDto);
        ExchangeRate createdExchangeRate = exchangeRateService.createExchangeRate(exchangeRate);
        return ResponseEntity.ok(exchangeRateService.convertExchangeRateToExchangeRateDto(createdExchangeRate));
    }

    @PutMapping
    public ResponseEntity<ExchangeRateDto> updateExchangeRate(@RequestBody ExchangeRateDto exchangeRateDto) {
        Optional<ExchangeRate> exchangeRate = exchangeRateService.getExchangeRateById(exchangeRateDto.getId());
        if (exchangeRate.isEmpty()) {
            logger.info("ExchangeRate id {} for update not found", exchangeRateDto.getId());
            return ResponseEntity.notFound().build();
        }

        logger.info("Updated exchangeRate id before transform to public DTO : {}", exchangeRateDto.getId());
        ExchangeRate exchangeRateForUpdate = exchangeRateService.convertExchangeRateDtoToExchangeRate(exchangeRateDto);
        logger.info("Transformed exchangeRate for update : {}", exchangeRateForUpdate.toString());

        ExchangeRate updatedExchangeRate = exchangeRateService.updateExchangeRate(exchangeRateDto.getId(), exchangeRateForUpdate);
        logger.info("Updated exchangeRate id after transform to public DTO : {}", updatedExchangeRate.getId());

        return ResponseEntity.ok(exchangeRateService.convertExchangeRateToExchangeRateDto(updatedExchangeRate));
    }

    @DeleteMapping
    public ResponseEntity<ExchangeRateDto> deleteExchangeRate(@RequestBody ExchangeRateDto exchangeRateDto) {
        Optional<ExchangeRate> exchangeRate = exchangeRateService.getExchangeRateById(exchangeRateDto.getId());
        if (exchangeRate.isEmpty()) {
            logger.info("ExchangeRate id {} for delete is not found", exchangeRateDto.getId());
            return ResponseEntity.notFound().build();
        }

        exchangeRateService.deleteExchangeRate(exchangeRateDto.getId());
        logger.info("Deleted exchangeRate id : {}", exchangeRateDto.getId());

        return ResponseEntity.ok(exchangeRateService.convertExchangeRateToExchangeRateDto(exchangeRate.get()));
    }

}

