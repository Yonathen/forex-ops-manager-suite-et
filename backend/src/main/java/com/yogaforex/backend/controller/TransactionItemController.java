package com.yogaforex.backend.controller;

import com.yogaforex.backend.dto.TransactionItemDto;
import com.yogaforex.backend.dto.PaginatedResponseDTO;
import com.yogaforex.backend.models.TransactionItem;
import com.yogaforex.backend.models.Transaction;
import com.yogaforex.backend.service.TransactionItemService;
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
@RequestMapping("/api/transaction-items")
public class TransactionItemController {

    private final TransactionItemService transactionItemService;
    public static final Logger logger = LoggerFactory.getLogger(TransactionItemController.class);

    public TransactionItemController(TransactionItemService transactionItemService) {
        this.transactionItemService = transactionItemService;
    }

    @GetMapping
    public ResponseEntity<PaginatedResponseDTO<TransactionItemDto>> fetchAllTransactionItems(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<TransactionItem> paginatedResult = transactionItemService.getAllTransactionItems(page, size);
        logger.info("Fetched paginatedResult : {}", paginatedResult);
        List<TransactionItemDto> allTransactionItemDto = paginatedResult
                .stream()
                .map(transactionItemService::convertTransactionItemToTransactionItemDto)
                .toList();

        return ResponseEntity.ok(
                new PaginatedResponseDTO<TransactionItemDto>(
                        allTransactionItemDto,
                        paginatedResult.getNumber(),
                        paginatedResult.getSize(),
                        paginatedResult.getTotalElements()
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionItemDto> fetchTransactionItemById(@PathVariable UUID id) {
        Optional<TransactionItem> transactionItem = transactionItemService.getTransactionItemById(id);
        if (transactionItem.isEmpty()) {
            logger.info("TransactionItem with id {} not found", id);
            return ResponseEntity.notFound().build();
        }

        logger.info("Fetched transactionItem by id before transform to public DTO : {}", transactionItem.get());
        return ResponseEntity.ok(transactionItemService.convertTransactionItemToTransactionItemDto(transactionItem.get()));
    }

    @PostMapping
    public ResponseEntity<TransactionItemDto> createTransactionItem(@RequestBody TransactionItemDto transactionItemDto) {
        TransactionItem transactionItem = transactionItemService.convertTransactionItemDtoToTransactionItem(transactionItemDto);
        TransactionItem createdTransactionItem = transactionItemService.createTransactionItem(transactionItem);
        return ResponseEntity.ok(transactionItemService.convertTransactionItemToTransactionItemDto(createdTransactionItem));
    }

    @PutMapping
    public ResponseEntity<TransactionItemDto> updateTransactionItem(@RequestBody TransactionItemDto transactionItemDto) {
        Optional<TransactionItem> transactionItem = transactionItemService.getTransactionItemById(transactionItemDto.getId());
        if (transactionItem.isEmpty()) {
            logger.info("TransactionItem id {} for update not found", transactionItemDto.getId());
            return ResponseEntity.notFound().build();
        }

        logger.info("Updated transactionItem id before transform to public DTO : {}", transactionItemDto.getId());
        TransactionItem transactionItemForUpdate = transactionItemService.convertTransactionItemDtoToTransactionItem(transactionItemDto);
        logger.info("Transformed transactionItem for update : {}", transactionItemForUpdate.toString());

        TransactionItem updatedTransactionItem = transactionItemService.updateTransactionItem(transactionItemDto.getId(), transactionItemForUpdate);
        logger.info("Updated transactionItem id after transform to public DTO : {}", updatedTransactionItem.getId());

        return ResponseEntity.ok(transactionItemService.convertTransactionItemToTransactionItemDto(updatedTransactionItem));
    }

    @DeleteMapping
    public ResponseEntity<TransactionItemDto> deleteTransactionItem(@RequestBody TransactionItemDto transactionItemDto) {
        Optional<TransactionItem> transactionItem = transactionItemService.getTransactionItemById(transactionItemDto.getId());
        if (transactionItem.isEmpty()) {
            logger.info("TransactionItem id {} for delete is not found", transactionItemDto.getId());
            return ResponseEntity.notFound().build();
        }

        transactionItemService.deleteTransactionItem(transactionItemDto.getId());
        logger.info("Deleted transactionItem id : {}", transactionItemDto.getId());

        return ResponseEntity.ok(transactionItemService.convertTransactionItemToTransactionItemDto(transactionItem.get()));
    }

}

