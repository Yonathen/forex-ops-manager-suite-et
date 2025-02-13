package com.yogaforex.backend.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yogaforex.backend.dto.JwtDto;
import com.yogaforex.backend.dto.MessageDto;
import com.yogaforex.backend.dto.RoleDto;
import com.yogaforex.backend.dto.UserDto;
import com.yogaforex.backend.jwt.JwtUtils;
import com.yogaforex.backend.models.Role;
import com.yogaforex.backend.models.User;
import com.yogaforex.backend.repository.RoleRepository;
import com.yogaforex.backend.repository.UserRepository;
import com.yogaforex.backend.service.UserDetailsImpl;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    public static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody UserDto userDto) {
        logger.info("AuthController : {} : {}", userDto.getUsername(), userDto.getPassword());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDto.getUsername(), userDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtDto(
                jwt,
                userDetails.getUser().getId(),
                userDetails.getUsername(),
                userDetails.getUser().getEmail(),
                roles,
                "Bearer"
        ));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserDto userDto) {
        if (userRepository.existsByUsername(userDto.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageDto("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(userDto.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageDto("Error: Email is already in use!"));
        }

        User user = new User();
        user.setPassword(encoder.encode(userDto.getPassword()));
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());

        Set<RoleDto> roleDtos = userDto.getRoles();
        Set<Role> roles = new HashSet<>();

        if (roleDtos == null) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageDto("Error: Roles are not defined!"));
        }

        roleDtos.forEach(roleDto -> {
            Role role = roleRepository.findByName(roleDto.getName())
                    .orElseThrow(() -> new RuntimeException("Error: Role not found!"));
            roles.add(role);
        });

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(
                userRepository.findByUsername(user.getUsername())
                        .map(User::getId)
                        .orElseThrow(() -> new RuntimeException("Error: User is not created!"))
        );
    }
}
