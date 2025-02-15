package com.yogaforex.backend.service;

import com.yogaforex.backend.dto.TransactionDto;
import com.yogaforex.backend.models.Transaction;
import com.yogaforex.backend.repository.TransactionRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final ModelMapper modelMapper;
    public static final Logger logger = LoggerFactory.getLogger(TransactionServiceImpl.class);

    public TransactionServiceImpl(TransactionRepository transactionRepository, ModelMapper modelMapper) {
        this.transactionRepository = transactionRepository;
        this.modelMapper = modelMapper;
        configureMappings();
    }

    @Override
    public Optional<Transaction> getTransactionById(Long id) {
        return transactionRepository.findById(id);
    }

    @Override
    public Page<Transaction> getAllTransactions(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize); // Create Pageable instance
        return transactionRepository.findAll(pageable);
    }

    @Override
    @Transactional
    public Transaction createTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Override
    @Transactional
    public Transaction updateTransaction(Long id, Transaction transaction) {
        return transactionRepository.findById(id).map(existingTransaction -> {
            existingTransaction.setTransactionStatus(transaction.getTransactionStatus());
            existingTransaction.setTransactionType(transaction.getTransactionType());
            existingTransaction.setTransactionItems(transaction.getTransactionItems());
            existingTransaction.setCustomer(transaction.getCustomer());
            existingTransaction.setUser(transaction.getUser());
            existingTransaction.setPermitNumber(transaction.getPermitNumber());
            existingTransaction.setTicketNumber(transaction.getTicketNumber());
            existingTransaction.setTotalAmount(transaction.getTotalAmount());
            existingTransaction.setTravelDocument(transaction.getTravelDocument());
            existingTransaction.setTravelDocument(transaction.getTravelDocument());
            existingTransaction.setPaymentMethodType(transaction.getPaymentMethodType());

            return transactionRepository.save(existingTransaction);
        }).orElseThrow(() -> new RuntimeException("Transaction not found"));
    }

    @Override
    @Transactional
    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }

    private void configureMappings() {}

    @Override
    public TransactionDto convertTransactionToTransactionDto(Transaction transaction) {
        return modelMapper.map(transaction, TransactionDto.class);
    }

    @Override
    public Transaction convertTransactionDtoToTransaction(TransactionDto transactionDto) {
        return modelMapper.map(transactionDto, Transaction.class);
    }
}
