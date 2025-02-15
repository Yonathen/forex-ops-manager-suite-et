package com.yogaforex.backend.service;

import com.yogaforex.backend.dto.TransactionDto;
import com.yogaforex.backend.models.Transaction;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface TransactionService {
    Optional<Transaction> getTransactionById(Long transactionId);
    Page<Transaction> getAllTransactions(int pageNumber, int pageSize);

    Transaction updateTransaction(Long transactionId, Transaction transaction);
    Transaction createTransaction(Transaction transaction);
    void deleteTransaction(Long transactionId);

    TransactionDto convertTransactionToTransactionDto(Transaction transaction);
    Transaction convertTransactionDtoToTransaction(TransactionDto transactionDto);

}
