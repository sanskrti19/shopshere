package com.shopsphere.controller;

import com.shopsphere.dto.RegisterRequest;
import com.shopsphere.model.User;
import com.shopsphere.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public java.util.Map<String, Object> login(@RequestBody com.shopsphere.dto.LoginRequest request) {
        return authService.login(request);
    }
}
