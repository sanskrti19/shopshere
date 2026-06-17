package com.shopsphere.dto;

import lombok.Data;

@Data
public class AddToCartRequest {
    private String userId;
    private String productId;
    private int quantity;
}
