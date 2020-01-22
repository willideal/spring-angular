package com.lib.library.category;

import java.util.List;

/**
 * Created by wilfrid on 17/01/2020.
 */
public interface ICategoryService {
    public List<Category> getAllCategories();
    public Category saveCategory(Category category);

    public Category updateCategory(Category category);

    public void deleteCategory(String code);

    public Category findCategoryByCode(String code);

}
