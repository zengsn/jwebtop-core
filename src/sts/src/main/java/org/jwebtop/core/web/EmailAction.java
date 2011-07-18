package org.jwebtop.core.web;

import java.io.IOException;
import java.io.PrintWriter;

import javax.mail.Part;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jwebtop.core.mailService.SmtpMailSender;
import org.jwebtop.core.service.EmailManagerService;
import org.jwebtop.core.service.EmailSettingService;

import org.zengsource.mvc.MvcException;
import org.zengsource.mvc.action.MultipleAction;

public class EmailAction extends MultipleAction {
	private static final long serialVersionUID = 1L;

	private EmailSettingService emailSettingService;
	private EmailManagerService emailManagerService;

	public EmailSettingService getEmailSettingService() {
		return emailSettingService;
	}

	public void setEmailSettingService(EmailSettingService emailSettingService) {
		this.emailSettingService = emailSettingService;
	}

	public EmailManagerService getEmailManagerService() {
		return emailManagerService;
	}

	public void setEmailManagerService(EmailManagerService emailManagerService) {
		this.emailManagerService = emailManagerService;
	}

	public void doLoad() throws MvcException {
		System.out.println("load");
		String result = emailSettingService.loadEmailSetting();
		PrintWriter out = null;
		try {
			out = this.getResponse().getWriter();
			System.out.println(result);
			out.println(result);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (out != null) {
				out.close();
				out = null;
			}
		}
	}

	public void doSet() throws MvcException {
		String emailsettingJSON = this.getRequest().getParameter("emailsettingJSON");
		// System.out.println(emailsettingJSON);
		String result = emailSettingService.verifySetting(emailsettingJSON);
		//this.getResponse().setCharacterEncoding("utf8");
		PrintWriter out = null;
		try {
			out = this.getResponse().getWriter();
			out.println(result);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (out != null) {
				out.close();
				out = null;
			}
		}
	}

	public void doSettingSave() throws MvcException {
		// System.out.println("settingSave");
		String emailsettingJSON = this.getRequest().getParameter("emailsettingJSON");
		System.out.println(emailsettingJSON);
		String result = emailSettingService.saveSetting(emailsettingJSON);
		//this.getResponse().setCharacterEncoding("utf8");
		PrintWriter out = null;
		try {
			out = this.getResponse().getWriter();
			out.println(result);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (out != null) {
				out.close();
				out = null;
			}
		}
	}

	public void doSettingUpdate() throws MvcException {
		System.out.println("settingUpdate");
		String emailsettingJSON = this.getRequest().getParameter("emailsettingJSON");
		System.out.println(emailsettingJSON);
		String result = emailSettingService.updateSetting(emailsettingJSON);
		//this.getResponse().setCharacterEncoding("utf8");
		PrintWriter out = null;
		try {
			out = this.getResponse().getWriter();
			out.println(result);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (out != null) {
				out.close();
				out = null;
			}
		}
	}

	public void doEmailSettingDelete() throws MvcException {
		String emailsettingIds = this.getRequest().getParameter("emailSettingIds");
		String result = emailSettingService.deleteSettings(emailsettingIds);
		// System.out.println(emailsettingIds);
		PrintWriter out = null;
		try {
			out = this.getResponse().getWriter();
			out.println(result);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (out != null) {
				out.close();
				out = null;
			}
		}
	}

	public void doInbox() throws MvcException {
		String userId = "guest";
		String emailSetId = this.getRequest().getParameter("emailId");
		String result = emailManagerService.getMessages(userId, emailSetId);
		PrintWriter out = null;
		try {
			out = this.getResponse().getWriter();
			out.println(result);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (out != null) {
				out.close();
				out = null;
			}
		}
	}

	public void doEmailSelect() throws MvcException {
		// System.out.println("emailSelect");
		// System.out.println(this.getRequest().getParameter("foo"));
		String jsonString = emailManagerService.getEmailAddresses("guest");
		System.out.println(jsonString);
		PrintWriter out = null;
		try {
			out = this.getResponse().getWriter();
			out.println(jsonString);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (out != null) {
				out.close();
				out = null;
			}
		}
	}

	public void doDraft() throws MvcException {
		System.out.println("draft");
		String userId = "guest";
		String jsonString = emailManagerService.findDrafts(userId);
		PrintWriter out = null;
		try {
			out = this.getResponse().getWriter();
			out.println(jsonString);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (out != null) {
				out.close();
				out = null;
			}
		}
	}

	public void doSavedraft() throws MvcException {
		System.out.println("savedraft");
		String subject = this.getRequest().getParameter("subject");
		String receiver = this.getRequest().getParameter("receiver");
		String content = this.getRequest().getParameter("content");
		String userId = "guest";
		// System.out.println(subject+"  "+receiver+"   "+content+"   "+sender);
		String result = emailManagerService.saveEmailDraft(subject, receiver, content, userId);
		PrintWriter out = null;
		try {
			out = this.getResponse().getWriter();
			out.println(result);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (out != null) {
				out.close();
				out = null;
			}
		}
	}

	public void doSendEmail() throws MvcException {
		System.out.println("sendEmail");
		String subject = this.getRequest().getParameter("subject");
		String receiver = this.getRequest().getParameter("receiver");
		String content = this.getRequest().getParameter("content");
		String sender = this.getRequest().getParameter("sender");
		System.out.println(subject + "  " + receiver + "   " + content + "   " + sender);
		SmtpMailSender sms = emailManagerService.getSmtpMailSender(sender);
		String jsonString = null;
		if (sms.sendHtmlMail("\"Sol\"<" + receiver + ">", subject, content) == SmtpMailSender.SUCCESSFUL) {
			jsonString = "{success:true}";
		} else {
			jsonString = "{success:false}";
		}
		PrintWriter out = null;
		try {
			out = this.getResponse().getWriter();
			out.println(jsonString);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (out != null) {
				out.close();
				out = null;
			}
		}
	}

	public void doDownloadfile() throws MvcException, Exception {
		System.out.println("downloadfile");
		HttpServletResponse response = this.getResponse();
		HttpServletRequest request = this.getRequest();
		String mailId = this.getRequest().getParameter("emailId");
		String mailSetId = this.getRequest().getParameter("mailSetId");
		System.out.println(mailId + "   " + mailSetId);
		MimeMessage pmm = emailManagerService.getMessage(mailSetId, mailId);
		emailManagerService.saveEmailFiles(request, response, (Part) pmm);
		response.setContentType("application/x-msdownload;charset=UTF-8");
	}

}
