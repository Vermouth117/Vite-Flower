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
    
    fun postInCart(postInCartObj: OrderInfoEntity) {
        orderInfoRepo.findByFlowerIdAndCustomerNameAndCartTrue(postInCartObj.flowerId, postInCartObj.customerName)?.let {
            existingOrder ->
                existingOrder.quantity += postInCartObj.quantity
                orderInfoRepo.save(existingOrder)
        } ?: orderInfoRepo.save(postInCartObj)
    }
    
    fun deleteInCart(deleteInCartObj: OrderInfoEntity) {
        orderInfoRepo.delete(deleteInCartObj)
    }
    
    fun getPurchaseHistory(): List<OrderInfoEntity> {
        val allOrder: List<OrderInfoEntity> = orderInfoRepo.findAll() as MutableList<OrderInfoEntity>
        return allOrder.filter { orderInfoEntity -> !orderInfoEntity.cart }
    }
    
    fun patchPurchaseHistory(patchPurchaseHistoryBody: OrderInfoEntity) {
        orderInfoRepo.save(patchPurchaseHistoryBody)
    }
    
    fun deletePurchaseCancel(deletePurchaseCancelBody: OrderInfoEntity) {
        orderInfoRepo.delete(deletePurchaseCancelBody)
    }
}
