package com.flower

import org.springframework.stereotype.Service

@Service
class Service(
    val flowerInfoRepo: FlowerInfoRepo,
    val orderInfoRepo: OrderInfoRepo,
) {
    fun getFlowerList(): List<FlowerInfoEntity> {
        return flowerInfoRepo.findAll() as MutableList<FlowerInfoEntity>
    }
    
    fun getCartList(): List<OrderInfoEntity> {
        val allOrder: List<OrderInfoEntity> = orderInfoRepo.findAll() as MutableList<OrderInfoEntity>
        return allOrder.filter { orderInfoEntity -> orderInfoEntity.cart }
    }
    
    fun postCartIn(postCartInObj: OrderInfoEntity) {
        orderInfoRepo.save(postCartInObj)
    }
}
