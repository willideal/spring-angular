package com.lib.library.customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by wilfrid on 17/01/2020.
 */
@Repository
public interface ICustomerDao extends JpaRepository<Customer, Integer> {
    public List<Customer> findAll();
    public  Customer findByEmail(String email);

    public Customer findCustomerByEmailIgnoreCase(String email);

    public List<Customer> findCustomerByLastNameIgnoreCase(String lastName);

}
