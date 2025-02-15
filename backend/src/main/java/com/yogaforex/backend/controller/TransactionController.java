package com.yogaforex.backend.controller;

import com.yogaforex.backend.dto.TransactionDto;
import com.yogaforex.backend.dto.PaginatedResponseDTO;
import com.yogaforex.backend.models.Transaction;
import com.yogaforex.backend.service.TransactionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;
    public static final Logger logger = LoggerFactory.getLogger(TransactionController.class);

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public ResponseEntity<PaginatedResponseDTO<TransactionDto>> fetchAllTransactions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<Transaction> paginatedResult = transactionService.getAllTransactions(page, size);
        logger.info("Fetched paginatedResult : {}", paginatedResult);
        List<TransactionDto> allTransactionDto = paginatedResult
                .stream()
                .map(transactionService::convertTransactionToTransactionDto)
                .toList();

        return ResponseEntity.ok(
                new PaginatedResponseDTO<TransactionDto>(
                        allTransactionDto,
                        paginatedResult.getNumber(),
                        paginatedResult.getSize(),
                        paginatedResult.getTotalElements()
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionDto> fetchTransactionById(@PathVariable Long id) {
        Optional<Transaction> transaction = transactionService.getTransactionById(id);
        if (transaction.isEmpty()) {
            logger.info("Transaction with id {} not found", id);
            return ResponseEntity.notFound().build();
        }

        logger.info("Fetched transaction by id before transform to public DTO : {}", transaction.get());
        return ResponseEntity.ok(transactionService.convertTransactionToTransactionDto(transaction.get()));
    }

    @PostMapping
    public ResponseEntity<TransactionDto> createTransaction(@RequestBody TransactionDto transactionDto) {
        Transaction transaction = transactionService.convertTransactionDtoToTransaction(transactionDto);
        Transaction createdTransaction = transactionService.createTransaction(transaction);
        return ResponseEntity.ok(transactionService.convertTransactionToTransactionDto(createdTransaction));
    }

    @PutMapping
    public ResponseEntity<TransactionDto> updateTransaction(@RequestBody TransactionDto transactionDto) {
        Optional<Transaction> transaction = transactionService.getTransactionById(transactionDto.getTicketNumber());
        if (transaction.isEmpty()) {
            logger.info("Transaction id {} for update not found", transactionDto.getTicketNumber());
            return ResponseEntity.notFound().build();
        }

        logger.info("Updated transaction id before transform to public DTO : {}", transactionDto.getTicketNumber());
        Transaction transactionForUpdate = transactionService.convertTransactionDtoToTransaction(transactionDto);
        logger.info("Transformed transaction for update : {}", transactionForUpdate.toString());

        Transaction updatedTransaction = transactionService.updateTransaction(transactionDto.getTicketNumber(), transactionForUpdate);
        logger.info("Updated transaction id after transform to public DTO : {}", updatedTransaction.getTicketNumber());

        return ResponseEntity.ok(transactionService.convertTransactionToTransactionDto(updatedTransaction));
    }

    @DeleteMapping
    public ResponseEntity<TransactionDto> deleteTransaction(@RequestBody TransactionDto transactionDto) {
        Optional<Transaction> transaction = transactionService.getTransactionById(transactionDto.getTicketNumber());
        if (transaction.isEmpty()) {
            logger.info("Transaction id {} for delete is not found", transactionDto.getTicketNumber());
            return ResponseEntity.notFound().build();
        }

        transactionService.deleteTransaction(transactionDto.getTicketNumber());
        logger.info("Deleted transaction id : {}", transactionDto.getTicketNumber());

        return ResponseEntity.ok(transactionService.convertTransactionToTransactionDto(transaction.get()));
    }

}

