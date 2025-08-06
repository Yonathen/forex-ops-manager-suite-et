package com.yogaforex.backend.repository;

import com.yogaforex.backend.models.TransactionItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TransactionItemRepository extends JpaRepository<TransactionItem, UUID> {
}
