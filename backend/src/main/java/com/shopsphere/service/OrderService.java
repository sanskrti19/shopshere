package com.shopsphere.service;

import com.shopsphere.model.*;
import com.shopsphere.repository.CartRepository;
import com.shopsphere.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;

    public Order createOrderFromCart(String userId, String shippingAddress) {
        Cart cart = cartRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("Cart not found"));

        Order order = new Order();
        order.setUserId(userId);
        order.setShippingAddress(shippingAddress);
        order.setOrderStatus(OrderStatus.PENDING);
        order.setPaymentStatus("PENDING");
        order.setTotalAmount(cart.getTotalPrice());
        order.setProducts(cart.getProducts().stream().map(cp -> new Order.OrderProduct(cp.getProductId(), cp.getQuantity(), 0.0)).toList());
        order.setCreatedAt(new Date());

        Order saved = orderRepository.save(order);

        // clear cart
        cart.setProducts(new java.util.ArrayList<>());
        cart.setTotalPrice(0.0);
        cartRepository.save(cart);

        return saved;
    }

    public java.util.List<Order> getOrdersByUser(String userId) {
        return orderRepository.findByUserId(userId);
    }

    public java.util.List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order updateOrderStatus(String orderId, OrderStatus status) {
        return orderRepository.findById(orderId).map(o -> {
            o.setOrderStatus(status);
            return orderRepository.save(o);
        }).orElseThrow(() -> new RuntimeException("Order not found"));
    }
}
