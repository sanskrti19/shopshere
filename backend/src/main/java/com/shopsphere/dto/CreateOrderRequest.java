package com.shopsphere.dto;

import lombok.Data;

@Data
public class CreateOrderRequest {
    private String userId;
    private String shippingAddress;
}
