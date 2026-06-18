package com.shopsphere.controller;

import com.shopsphere.model.Cart;
import com.shopsphere.service.CartService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")

public class CartController {

    private final CartService cartService;

    // ADD TO CART
    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(

            Authentication authentication,

            @RequestParam String productId,

            @RequestParam int quantity
    ) {

        String userId = authentication.getName();

        return ResponseEntity.ok(
                cartService.addToCart(
                        userId,
                        productId,
                        quantity
                )
        );
    }

    // GET CART
    @GetMapping("/{userId}")
    public ResponseEntity<Cart> getCart(
            @PathVariable String userId
    ) {

        return ResponseEntity.ok(
                cartService.getCart(userId)
        );
    }

    // REMOVE FROM CART
    @DeleteMapping("/remove")
    public ResponseEntity<Cart> removeFromCart(

            Authentication authentication,

            @RequestParam String productId
    ) {

        String userId = authentication.getName();

        return ResponseEntity.ok(
                cartService.removeFromCart(
                        userId,
                        productId
                )
        );
    }
}