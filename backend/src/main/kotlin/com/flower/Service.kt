package com.flower

import org.springframework.stereotype.Service

@Service
class Service(val repository: Repository) {
    fun getFlowerList(): List<FlowerInfo> {
        return repository.findAll() as MutableList<FlowerInfo>
    }
}
