package com.flower

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
    fun postCartIn(@RequestBody postCartInBody: OrderInfoEntity) {
        service.postCartIn(postCartInBody)
    }
}
