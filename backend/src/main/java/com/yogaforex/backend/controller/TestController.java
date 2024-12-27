package com.yogaforex.backend.controller;


import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {

    // Only users with 'USER_MANAGEMENT_READ' permission can access this endpoint
    @PreAuthorize("hasAuthority('USER_MANAGEMENT_READ')")
    @GetMapping("/users")
    public String getAllUsers() {
        return "Fetching all users...";
    }

    // Only users with 'USER_MANAGEMENT_WRITE' permission can access this endpoint
    @PreAuthorize("hasAuthority('USER_MANAGEMENT_WRITE')")
    @PostMapping
    public String createUser(@RequestBody String user) {
        return "Creating user: " + user;
    }

    // Allow access to users with either 'USER_MANAGEMENT_READ' or 'USER_MANAGEMENT_WRITE'
    @PreAuthorize("hasAnyAuthority('USER_MANAGEMENT_READ', 'USER_MANAGEMENT_WRITE')")
    @GetMapping("/users/{id}")
    public String getUserById(@PathVariable String id) {
        return "Fetching user with ID: " + id;
    }

    // A method restricted to 'TRANSACTION_MANAGEMENT_WRITE' permission
    @PreAuthorize("hasAuthority('TRANSACTION_MANAGEMENT_WRITE')")
    @PostMapping("/transactions")
    public String createTransaction(@RequestBody String transaction) {
        return "Creating transaction: " + transaction;
    }
}
