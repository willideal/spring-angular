package com.lib.library.loan;

import com.lib.library.book.BookDTO;
import com.lib.library.customer.CustomerDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.time.LocalDate;

/**
 * Created by wilfrid on 17/01/2020.
 */
@ApiModel(value = "Loan Model")
public class LoanDTO implements Comparable<LoanDTO> {

    @ApiModelProperty(value = "Book concerned by the loan")
    private BookDTO bookDTO = new BookDTO();

    @ApiModelProperty(value = "Customer concerned by the loan")
    private CustomerDTO customerDTO = new CustomerDTO();

    @ApiModelProperty(value = "Loan begining date")
    private LocalDate loanBeginDate;

    @ApiModelProperty(value = "Loan ending date")
    private LocalDate loanEndDate;

    public LocalDate getLoanBeginDate() {
        return loanBeginDate;
    }

    public void setLoanBeginDate(LocalDate loanBeginDate) {
        this.loanBeginDate = loanBeginDate;
    }

    public LocalDate getLoanEndDate() {
        return loanEndDate;
    }

    public void setLoanEndDate(LocalDate loanEndDate) {
        this.loanEndDate = loanEndDate;
    }

    public BookDTO getBookDTO() {
        return bookDTO;
    }

    public void setBookDTO(BookDTO bookDTO) {
        this.bookDTO = bookDTO;
    }

    public CustomerDTO getCustomerDTO() {
        return customerDTO;
    }

    public void setCustomerDTO(CustomerDTO customerDTO) {
        this.customerDTO = customerDTO;
    }

    @Override
    public int compareTo(LoanDTO o) {
        // ordre decroissant
        return o.getLoanBeginDate().compareTo(this.loanBeginDate);
    }



}
