package com.lib.library.loan;

import java.time.LocalDate;
import java.util.List;

/**
 * Created by wilfrid on 17/01/2020.
 */
public interface ILoanService {
    public List<Loan> findAllLoansByEndDateBefore(LocalDate maxEndDate);

    public List<Loan> getAllOpenLoansOfThisCustomer(String email, LoanStatus status);

    public Loan getOpenedLoan(SimpleLoanDTO simpleLoanDTO);

    public boolean checkIfLoanExists(SimpleLoanDTO simpleLoanDTO);

    public Loan saveLoan(Loan loan);

    public void closeLoan(Loan loan);
}
