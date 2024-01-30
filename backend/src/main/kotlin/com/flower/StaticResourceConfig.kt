package com.flower

import org.springframework.context.annotation.Configuration
import org.springframework.core.io.Resource
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.servlet.resource.PathResourceResolver

@Configuration
class StaticResourceConfig : WebMvcConfigurer {
    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        registry.addResourceHandler("/index.html")               // "/index.html"パスに対する静的リソースのハンドリング
            .addResourceLocations("classpath:/public/index.html")   // パスに対応するリソースの場所
            .setCachePeriod(0)                                                // キャッシュ期間は無効化している

        registry.addResourceHandler("/about", "/contact", "/order", "/online-shop", "/cart", "/user")
            .addResourceLocations("classpath:/public/index.html")
            .setCachePeriod(0)
            .resourceChain(true)          // ブラウザのキャッシュを効果的に活用して、リソースの変更が検知された際に最新のリソースを提供する
            .addResolver(IndexHtmlResourceResolver())   // 上記パスに対するリソースがリクエストされた場合に、代わりに "index.html" を提供する
    }

    class IndexHtmlResourceResolver : PathResourceResolver() {
        override fun getResource(resourcePath: String, location: Resource): Resource? {
            return super.getResource("index.html", location)
        }
    }
}
