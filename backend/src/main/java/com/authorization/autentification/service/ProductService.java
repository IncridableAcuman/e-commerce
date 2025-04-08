package com.authorization.autentification.service;

import com.authorization.autentification.model.Product;
import com.authorization.autentification.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {
    private  final ProductRepository productRepository;
    @Transactional
    public Product createProduct(Product product){
        try {
            return productRepository.save(product);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    @Transactional
    public List<Product> getAllProducts(){
        try {
            return productRepository.findAll();
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
    @Transactional
    public Optional<Product> getProductById(Long id){
        try {
            return productRepository.findById(id);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
    @Transactional
    public Optional<Product> findByName(String name){
        try {
            return productRepository.findByName(name);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
    @Transactional
    public Product updateProduct(Long id,Product product){
        try {
            Optional<Product> optionalProduct=productRepository.findById(id);
            if(optionalProduct.isEmpty()){
                throw new RuntimeException("Product not found");
            }
            Product product1=optionalProduct.get();
            product1.setName(product.getName());
            product1.setDescription(product.getDescription());
            product1.setImage(product.getImage());
            product1.setPrice(product.getPrice());
            product1.setSize(product.getSize());
            product1.setCategoryRole(product.getCategoryRole());
            product1.setSubCategoryRole(product.getSubCategoryRole());
            return productRepository.save(product1);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
    @Transactional
    public String deleteProduct(Long id){
        try {
            productRepository.deleteById(id);
            return "Product deleted successfully";
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
    @Transactional
    public List<Product>  searchProducts(String keyword){
        if(keyword==null || keyword.trim().isEmpty()){
            return Collections.emptyList();
        }
        return productRepository.searchByKeyword(keyword);
    }
}
