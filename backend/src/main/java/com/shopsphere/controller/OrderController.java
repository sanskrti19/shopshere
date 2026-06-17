package com.shopsphere.controller;

import com.shopsphere.dto.CreateOrderRequest;
import com.shopsphere.dto.UpdateOrderStatusRequest;
import com.shopsphere.model.Order;
import com.shopsphere.model.OrderStatus;
import com.shopsphere.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<Order> createOrder(@RequestBody CreateOrderRequest req) {
        Order order = orderService.createOrderFromCart(req.getUserId(), req.getShippingAddress());
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getUserOrders(@PathVariable String userId) {
        return ResponseEntity.ok(orderService.getOrdersByUser(userId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<Order> updateStatus(@PathVariable String id, @RequestBody UpdateOrderStatusRequest req) {
        Order updated = orderService.updateOrderStatus(id, req.getStatus());
        return ResponseEntity.ok(updated);
    }
}
