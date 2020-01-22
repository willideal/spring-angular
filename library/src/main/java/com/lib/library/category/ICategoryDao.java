package com.lib.library.category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.sql.rowset.CachedRowSet;

/**
 * Created by wilfrid on 17/01/2020.
 */
@Repository
public interface ICategoryDao extends JpaRepository<Category, String> {
    public Category findByCode(String code);
}
