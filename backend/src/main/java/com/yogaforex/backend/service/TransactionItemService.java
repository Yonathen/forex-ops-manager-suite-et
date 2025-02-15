package com.yogaforex.backend.service;

import com.yogaforex.backend.dto.TransactionItemDto;
import com.yogaforex.backend.models.TransactionItem;
import org.springframework.data.domain.Page;

import java.util.Optional;
import java.util.UUID;

public interface TransactionItemService {
    Optional<TransactionItem> getTransactionItemById(UUID transactionItemId);
    Page<TransactionItem> getAllTransactionItems(int pageNumber, int pageSize);

    TransactionItem updateTransactionItem(UUID transactionItemId, TransactionItem transactionItem);
    TransactionItem createTransactionItem(TransactionItem transactionItem);
    void deleteTransactionItem(UUID transactionItemId);

    TransactionItemDto convertTransactionItemToTransactionItemDto(TransactionItem transactionItem);
    TransactionItem convertTransactionItemDtoToTransactionItem(TransactionItemDto transactionItemDto);

}
