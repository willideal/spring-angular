package com.lib.library.loan;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.time.LocalDate;

/**
 * Created by wilfrid on 17/01/2020.
 */
@ApiModel(value = "Simple Loan Model")

public class SimpleLoanDTO {
    @ApiModelProperty(value = "Book id concerned by the loan")
    private Integer bookId;

    @ApiModelProperty(value = "Customer id concerned by the loan")
    private Integer customerId;

    @ApiModelProperty(value = "Loan begining date")
    private LocalDate beginDate;

    @ApiModelProperty(value = "Loan ending date")
    private LocalDate endDate;

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public LocalDate getBeginDate() {
        return beginDate;
    }

    public void setBeginDate(LocalDate beginDate) {
        this.beginDate = beginDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }


}
