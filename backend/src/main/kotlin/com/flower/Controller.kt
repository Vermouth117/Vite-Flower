package com.flower

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class Controller(val service: Service) {

    @GetMapping("/flowerList")
    fun getFlowerList(): List<FlowerInfo> {
        return service.getFlowerList()
    }
}
