package com.shopsphere.dto;

import com.shopsphere.model.OrderStatus;
import lombok.Data;

@Data
public class UpdateOrderStatusRequest {
    private OrderStatus status;
}
