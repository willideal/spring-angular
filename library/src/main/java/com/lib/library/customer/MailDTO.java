package com.lib.library.customer;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * Created by wilfrid on 17/01/2020.
 */
@ApiModel(value = "Mail Model")
public class MailDTO  {
    @ApiModelProperty(value = "Mail sender address")
    public final String MAIL_FROM = "noreply.library.test@gmail.com";

    @ApiModelProperty(value = "Customer receiver id")
    private Integer customerId;

    @ApiModelProperty(value = "Email subject")
    private String emailSubject;

    @ApiModelProperty(value = "Email content")
    private String emailContent;

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public String getEmailContent() {
        return emailContent;
    }

    public void setEmailContent(String emailContent) {
        this.emailContent = emailContent;
    }

    public String getEmailSubject() {
        return emailSubject;
    }

    public void setEmailSubject(String emailSubject) {
        this.emailSubject = emailSubject;
    }

}
