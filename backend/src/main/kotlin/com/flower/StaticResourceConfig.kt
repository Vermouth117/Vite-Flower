package com.flower

import org.springframework.context.annotation.Configuration
import org.springframework.core.io.Resource
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.servlet.resource.PathResourceResolver

@Configuration
class StaticResourceConfig : WebMvcConfigurer {
    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        registry.addResourceHandler("/index.html")
            .addResourceLocations("classpath:/public/index.html")
            .setCachePeriod(0)

        registry.addResourceHandler("/about", "/contact", "/order", "/online-shop", "/cart", "/user")
            .addResourceLocations("classpath:/public/")
            .setCachePeriod(0)
            .resourceChain(false)
            .addResolver(IndexHtmlResourceResolver())
    }

    class IndexHtmlResourceResolver : PathResourceResolver() {
        override fun getResource(resourcePath: String, location: Resource): Resource? {
            return super.getResource("index.html", location)
        }
    }
}
