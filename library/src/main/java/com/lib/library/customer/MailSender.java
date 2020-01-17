package com.lib.library.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;

/**
 * Created by wilfrid on 17/01/2020.
 */
public class MailSender {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendMail() throws MailException {
        //... créer ici l'objet message (de type SimpleMailMessage ou MimeMessage) à envoyer
       // javaMailSender.send(message);
    }
}
