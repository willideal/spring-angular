package com.lib.library.category;

import com.lib.library.book.Book;
import com.lib.library.book.BookDTO;
import com.lib.library.book.BookRestController;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by wilfrid on 17/01/2020.
 */
@RestController
@RequestMapping("/rest/category/api")
@Api(value = "Book Category Rest Controller")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoryRestController {
    public static final Logger LOGGER = LoggerFactory.getLogger(BookRestController.class);

    @Autowired
    private CategoryServiceImpl categoryService;

    @GetMapping("/allCategories")
    @ApiOperation(value="List all book categories of the Library", response = List.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Ok: successfully listed"),
            @ApiResponse(code = 204, message = "No Content: no result founded"),
    })
    public ResponseEntity<List<CategoryDTO>> getAllBookCategories(){
        List<Category> categories = categoryService.getAllCategories();
        if(!CollectionUtils.isEmpty(categories)) {
            //on retire tous les élts null que peut contenir cette liste
            categories.removeAll(Collections.singleton(null));
            List<CategoryDTO> categoryDTOs = categories.stream().map(category -> {
                return mapCategoryToCategoryDTO(category);
            }).collect(Collectors.toList());
            return new ResponseEntity<List<CategoryDTO>>(categoryDTOs, HttpStatus.OK);
        }
        return new ResponseEntity<List<CategoryDTO>>(HttpStatus.NO_CONTENT);
    }
    @PostMapping("/addCategory")
    @ApiOperation(value = "Add a new Category in the Library", response = CategoryDTO.class)
    @ApiResponses(value = { @ApiResponse(code = 409, message = "Conflict: the category already exist"),
            @ApiResponse(code = 201, message = "Created: the book is successfully inserted"),
            @ApiResponse(code = 304, message = "Not Modified: the book is unsuccessfully inserted") })
    public ResponseEntity<CategoryDTO> createNewCategory(@RequestBody CategoryDTO categoryDTORequest) {
        //, UriComponentsBuilder uriComponentBuilder
        Category existingCategory = categoryService.findCategoryByCode(categoryDTORequest.getCode());
        if (existingCategory != null) {
            return new ResponseEntity<CategoryDTO>(HttpStatus.CONFLICT);
        }
        Category categoryRequest = mapCategoryDTOToCategory(categoryDTORequest);
        Category category = categoryService.saveCategory(categoryRequest);
        if (category != null && category.getCode() != null) {
            CategoryDTO categoryDTO = mapCategoryToCategoryDTO(category);
            return new ResponseEntity<CategoryDTO>(categoryDTO, HttpStatus.CREATED);
        }
        return new ResponseEntity<CategoryDTO>(HttpStatus.NOT_MODIFIED);

    }

    @PutMapping("/updateCategory")
    @ApiOperation(value = "Update/Modify an existing Category in the Library", response = CategoryDTO.class)
    @ApiResponses(value = { @ApiResponse(code = 404, message = "Not Found : the book does not exist"),
            @ApiResponse(code = 200, message = "Ok: the book is successfully updated"),
            @ApiResponse(code = 304, message = "Not Modified: the book is unsuccessfully updated") })
    public ResponseEntity<CategoryDTO> updateCategory(@RequestBody CategoryDTO categoryDTORequest) {
        //, UriComponentsBuilder uriComponentBuilder
        Category existingCategory = categoryService.findCategoryByCode(categoryDTORequest.getCode());
        if (existingCategory==null) {
            return new ResponseEntity<CategoryDTO>(HttpStatus.NOT_FOUND);
        }
        Category categoryRequest = mapCategoryDTOToCategory(categoryDTORequest);
        Category category = categoryService.updateCategory(categoryRequest);
        if (category != null) {
            CategoryDTO categoryDTO = mapCategoryToCategoryDTO(category);
            return new ResponseEntity<CategoryDTO>(categoryDTO, HttpStatus.OK);
        }
        return new ResponseEntity<CategoryDTO>(HttpStatus.NOT_MODIFIED);
    }

    @DeleteMapping("/deleteCategory/{code}")
    @ApiOperation(value = "Delete a category in the Library, if the category does not exist, nothing is done", response = String.class)
    @ApiResponse(code = 204, message = "No Content: Book sucessfully deleted")
    public ResponseEntity<String> deleteCategory(@PathVariable String code) {
        categoryService.deleteCategory(code);
        return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
    }
    /**
     * Transforme un Category en CategoryDTO
     *
     * @param category
     * @return
     */
    private CategoryDTO mapCategoryToCategoryDTO(Category category) {
        ModelMapper mapper = new ModelMapper();
        CategoryDTO categoryDTO = mapper.map(category, CategoryDTO.class);
        return categoryDTO;
    }

    /**
     * Transforme un CategoryDTO en Category
     *
     * @param categoryDTO
     * @return
     */
    private Category mapCategoryDTOToCategory(CategoryDTO categoryDTO) {
        ModelMapper mapper = new ModelMapper();
        Category category = mapper.map(categoryDTO, Category.class);
        return category;
    }


}
