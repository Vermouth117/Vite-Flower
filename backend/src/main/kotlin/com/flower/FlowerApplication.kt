package com.flower

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class FlowerApplication

fun main(args: Array<String>) {
	runApplication<FlowerApplication>(*args)
}
