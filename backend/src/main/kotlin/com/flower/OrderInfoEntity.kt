package com.flower

import com.fasterxml.jackson.annotation.JsonFormat
import jakarta.persistence.*
import java.math.BigDecimal
import java.util.*

@Entity
data class OrderInfoEntity (
    @Id
    @SequenceGenerator(name = "order_info_entity_id_gen", sequenceName = "order_info_entity_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_info_entity_id_gen")
    val id: Long,
    val flowerId: Int,
    val flowerName: String,
    val customerName: String,
    val price: BigDecimal,
    var quantity: Int,
    @JsonFormat(pattern = "yyyy-MM-dd")
    val date: Date,
    val pictureUrl: String,
    val cart: Boolean,
)
