package com.lib.library.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by wilfrid on 17/01/2020.
 */
@Service("categoryService")
public class CategoryServiceImpl implements  ICategoryService{
    @Autowired
    private ICategoryDao categoryDao;

    @Override
    public List<Category> getAllCategories(){
        return categoryDao.findAll();
    }

    @Override
    public Category saveCategory(Category category) {
        return categoryDao.save(category);
    }

    @Override
    public Category updateCategory(Category category) {
        return categoryDao.save(category);
    }

    @Override
    public void deleteCategory(String code) {
        categoryDao.deleteById(code);
    }

    @Override
    public Category findCategoryByCode(String code) {
        return categoryDao.findByCode(code);
    }

}
