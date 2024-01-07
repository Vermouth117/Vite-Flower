package com.flower

import jakarta.persistence.Entity
import jakarta.persistence.Id
import java.util.Date

@Entity
data class FlowerInfo (
    @Id
    val id: Int,
    val name: String,
    val pictureUrl: String,
    val price: String,
    val quantity: Int,
    val postedDate: Date,
)
