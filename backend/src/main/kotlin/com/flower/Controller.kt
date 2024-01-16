package com.flower

import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class Controller(val service: Service) {

    @GetMapping("/flowerList")
    fun getFlowerList(): List<FlowerInfoEntity> {
        return service.getFlowerList()
    }
    
    @GetMapping("/cartList")
    fun getCartList(): List<OrderInfoEntity> {
        return service.getCartList()
    }
    
    @PostMapping("/cartIn")
    fun postInCart(@RequestBody postInCartBody: OrderInfoEntity) {
        service.postInCart(postInCartBody)
    }
    
    @DeleteMapping("/deleteInCart")
    fun deleteInCart(@RequestBody deleteInCartBody: OrderInfoEntity) {
        service.deleteInCart(deleteInCartBody)
    }
    
    @GetMapping("/purchase")
    fun getPurchaseHistory(): List<OrderInfoEntity> {
        return service.getPurchaseHistory()
    }
}
