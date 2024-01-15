package com.flower

import jakarta.persistence.Id
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface FlowerInfoRepo : CrudRepository<FlowerInfoEntity, Id>
