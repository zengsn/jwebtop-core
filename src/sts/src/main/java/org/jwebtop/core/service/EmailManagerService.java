package org.jwebtop.core.service;

import javax.mail.Part;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jwebtop.core.mailService.SmtpMailSender;

public interface EmailManagerService {

	String getEmailAddresses(String string);

	String getMessages(String userId, String emailSetId);

	SmtpMailSender getSmtpMailSender(String senderId);

	String saveEmailDraft(String subject, String receiver, String content, String userId);

	String findDrafts(String userId);

	MimeMessage getMessage(String mailSetId, String mailId);

	void saveEmailFiles(HttpServletRequest request, HttpServletResponse response, Part pmm)
			throws Exception;
}
