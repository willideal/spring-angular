package com.lib.library.loan;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Created by wilfrid on 17/01/2020.
 */
@Repository
public interface ILoanDao extends JpaRepository<Loan, Integer> {

    //Rechercher les prets dont la date de fin est avant la date maxEndDate specifié
    public List<Loan> findByEndDateBefore(LocalDate maxEndDate);

    //Rechercher les prets encore ouvert d'un client identifié par son adresse mail
    @Query("SELECT lo "
            + "FROM Loan lo "
            + "INNER JOIN lo.pk.customer c "
            + "WHERE UPPER(c.email) = UPPER(?1) "
            + "   AND lo.status = ?2 ")
    public List<Loan> getAllOpenLoansOfThisCustomer(String email, LoanStatus status);

    //Recuperer un pret en fonction du client, du livre et de l'etat du pret
    @Query("SELECT lo "
            + "FROM Loan lo "
            + "INNER JOIN lo.pk.book b "
            + "INNER JOIN lo.pk.customer c "
            + "WHERE b.id =    ?1 "
            + "   AND c.id = ?2 "
            + "   AND lo.status = ?3 ")
    public Loan getLoanByCriteria(Integer bookId, Integer customerId, LoanStatus status);
}
