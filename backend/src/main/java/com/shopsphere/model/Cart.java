package com.shopsphere.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "carts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cart {

    @Id
    private String id;

    private String userId;

    @Builder.Default
    private List<CartProduct> products = new ArrayList<>();

    private double totalPrice;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CartProduct {
        private String productId;
        private int quantity;
    }
}
