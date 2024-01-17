package com.flower

import jakarta.persistence.Id
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface OrderInfoRepo : CrudRepository<OrderInfoEntity, Id> {
    fun findByFlowerIdAndCustomerNameAndCartTrue(flowerId: Int, customerName: String): OrderInfoEntity?
}
