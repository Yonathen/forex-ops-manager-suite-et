package com.yogaforex.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class PaginatedResponseDTO<T> {
    private List<T> content;
    private int currentPage;
    private int pageSize;
    private long total;
}