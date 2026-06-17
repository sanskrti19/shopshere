package com.shopsphere.service;

import com.shopsphere.model.Cart;
import com.shopsphere.model.Product;
import com.shopsphere.repository.CartRepository;
import com.shopsphere.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    public Cart addProductToCart(String userId, String productId, int quantity) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));

        Cart cart = cartRepository.findByUserId(userId).orElseGet(() -> {
            Cart c = new Cart();
            c.setUserId(userId);
            return c;
        });

        Optional<Cart.CartProduct> existing = cart.getProducts().stream().filter(p -> p.getProductId().equals(productId)).findFirst();
        if (existing.isPresent()) {
            existing.get().setQuantity(existing.get().getQuantity() + quantity);
        } else {
            cart.getProducts().add(new Cart.CartProduct(productId, quantity));
        }

        double total = cart.getProducts().stream().mapToDouble(p -> {
            Product prod = productRepository.findById(p.getProductId()).orElse(null);
            if (prod == null) return 0.0;
            return prod.getPrice() * p.getQuantity();
        }).sum();
        cart.setTotalPrice(total);

        return cartRepository.save(cart);
    }

    public Optional<Cart> getCartByUserId(String userId) {
        return cartRepository.findByUserId(userId);
    }

    public void removeProductFromCart(String userId, String productId) {
        cartRepository.findByUserId(userId).ifPresent(cart -> {
            cart.getProducts().removeIf(p -> p.getProductId().equals(productId));
            double total = cart.getProducts().stream().mapToDouble(p -> {
                Product prod = productRepository.findById(p.getProductId()).orElse(null);
                if (prod == null) return 0.0;
                return prod.getPrice() * p.getQuantity();
            }).sum();
            cart.setTotalPrice(total);
            cartRepository.save(cart);
        });
    }
}
