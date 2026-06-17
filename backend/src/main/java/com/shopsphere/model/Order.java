package com.shopsphere.model;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document(collection = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    private String id;

    private String userId;

    @Builder.Default
    private List<OrderProduct> products = new ArrayList<>();

    private double totalAmount;

    private OrderStatus orderStatus;

    private String paymentStatus;

    private String shippingAddress;

    @CreatedDate
    private Date createdAt;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderProduct {
        private String productId;
        private int quantity;
        private double price;
    }
}
