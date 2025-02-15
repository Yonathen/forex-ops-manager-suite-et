package com.yogaforex.backend.service;

import com.yogaforex.backend.dto.TransactionItemDto;
import com.yogaforex.backend.models.Address;
import com.yogaforex.backend.models.TransactionItem;
import com.yogaforex.backend.repository.TransactionItemRepository;
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
public class TransactionItemServiceImpl implements TransactionItemService {

    private final TransactionItemRepository transactionItemRepository;
    private final ModelMapper modelMapper;
    public static final Logger logger = LoggerFactory.getLogger(TransactionItemServiceImpl.class);

    public TransactionItemServiceImpl(TransactionItemRepository transactionItemRepository, ModelMapper modelMapper, UserService userService) {
        this.transactionItemRepository = transactionItemRepository;
        this.modelMapper = modelMapper;
        configureMappings();
    }

    @Override
    public Optional<TransactionItem> getTransactionItemById(UUID id) {
        return transactionItemRepository.findById(id);
    }

    @Override
    public Page<TransactionItem> getAllTransactionItems(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize); // Create Pageable instance
        return transactionItemRepository.findAll(pageable);
    }

    @Override
    @Transactional
    public TransactionItem createTransactionItem(TransactionItem transactionItem) {
        return transactionItemRepository.save(transactionItem);
    }

    @Override
    @Transactional
    public TransactionItem updateTransactionItem(UUID id, TransactionItem transactionItem) {
        return transactionItemRepository.findById(id).map(existingTransactionItem -> {
            existingTransactionItem.setTransaction(transactionItem.getTransaction());
            existingTransactionItem.setAmount(transactionItem.getAmount());
            existingTransactionItem.setExchangeRate(transactionItem.getExchangeRate());

            return transactionItemRepository.save(existingTransactionItem);
        }).orElseThrow(() -> new RuntimeException("TransactionItem not found"));
    }

    @Override
    @Transactional
    public void deleteTransactionItem(UUID id) {
        transactionItemRepository.deleteById(id);
    }

    private void configureMappings() {

    }

    @Override
    public TransactionItemDto convertTransactionItemToTransactionItemDto(TransactionItem transactionItem) {
        return modelMapper.map(transactionItem, TransactionItemDto.class);
    }

    @Override
    public TransactionItem convertTransactionItemDtoToTransactionItem(TransactionItemDto transactionItemDto) {
        return modelMapper.map(transactionItemDto, TransactionItem.class);
    }
}
