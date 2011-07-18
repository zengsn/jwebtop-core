package org.jwebtop.core.service;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Properties;

import javax.mail.BodyPart;
import javax.mail.Folder;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.NoSuchProviderException;
import javax.mail.Part;
import javax.mail.Session;
import javax.mail.Store;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jwebtop.core.dao.EmailDraftDao;
import org.jwebtop.core.dao.EmailUserSettingDao;
import org.jwebtop.core.model.EmailDraft;
import org.jwebtop.core.model.EmailUserSetting;
import org.jwebtop.core.model.User;

import org.jwebtop.core.mailService.PraseMimeMessage;
import org.jwebtop.core.mailService.SmtpMailSender;

public class EmailManagerServiceImpl implements EmailManagerService {
	private EmailDraftDao emailDraftDao;
	private EmailUserSettingDao emailUserSettingDao;

	public EmailDraftDao getEmailDraftDao() {
		return emailDraftDao;
	}

	public void setEmailDraftDao(EmailDraftDao emailDraftDao) {
		this.emailDraftDao = emailDraftDao;
	}

	public EmailUserSettingDao getEmailUserSettingDao() {
		return emailUserSettingDao;
	}

	public void setEmailUserSettingDao(EmailUserSettingDao emailUserSettingDao) {
		this.emailUserSettingDao = emailUserSettingDao;
	}

	public String getEmailAddresses(String string) {
		String hql = "from EmailUserSetting emailset where emailset.user = '" + string + "'";
		List<EmailUserSetting> emailSettings = this.emailUserSettingDao.findEmailUserSettings(hql);
		String jsonString = "{emailSelect:[";
		for (int i = 0; i < emailSettings.size(); i++) {
			EmailUserSetting emailSetting = emailSettings.get(i);
			String settingString = "{";
			settingString += "\"emailId\":\"" + emailSetting.getId() + "\",";
			settingString += "\"emailAddress\":\"" + emailSetting.getEmailAddress() + "\"";
			settingString += "},";
			jsonString += settingString;
		}
		jsonString = jsonString.substring(0, jsonString.length() - 1);
		jsonString += "]}";
		System.out.println(jsonString);
		return jsonString;
	}

	public String getMessages(String userId, String emailSetId) {

		String hql = "from EmailUserSetting emailset where emailset.id = '"
				+ Integer.valueOf(emailSetId) + "'";
		EmailUserSetting emailUserSetting = emailUserSettingDao.findEmailUserSetting(hql);
		Properties props = new Properties();
		Session session = Session.getDefaultInstance(props, null);
		Store store = null;
		Message message[] = null;
		try {
			store = session.getStore("pop3");
			store.connect(emailUserSetting.getPopService(), emailUserSetting.getEmailAddress(),
					emailUserSetting.getPassword());
			Folder folder = store.getFolder("INBOX");
			folder.open(Folder.READ_ONLY);
			message = folder.getMessages();
		} catch (NoSuchProviderException e) {
			e.printStackTrace();
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		System.out.println("Messages's length: " + message.length);
		PraseMimeMessage pmm = null;
		String jsonString = "{'mails':[";
		for (int i = 0; i < message.length; i++) {
			pmm = new PraseMimeMessage((MimeMessage) message[i]);
			try {
				String mailString = "{";
				mailString += "'mailId' : '" + pmm.getMessageId() + "',";
				mailString += "'theme':'" + pmm.getSubject() + "',";
				mailString += "'sender':'" + pmm.getFrom() + "',";
				pmm.setDateFormat("yy年MM月dd日  HH:mm:ss");
				mailString += "'time':'" + pmm.getSentDate() + "',";
				mailString += "'files':'";
				if (pmm.isContainAttach((Part) message[i])) {
					List<String> files = pmm.getFilenames();
					for (int j = 0; j < files.size(); j++) {
						mailString += files.get(j) + ";";
					}
					mailString += "',";
				} else {
					mailString += "',";
				}
				pmm.getMailContent((Part) message[i]);
				String content = pmm.getBodyText();
				content = content.replaceAll("\r|\n", "");
				mailString += "'content':'" + content + "'";

				mailString += "},";

				jsonString += mailString;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		jsonString = jsonString.substring(0, jsonString.length() - 1);
		jsonString += "]}";
		System.out.println(jsonString);
		return jsonString;
	}

	public SmtpMailSender getSmtpMailSender(String senderId) {
		String hql = "from EmailUserSetting emailset where emailset.emailAddress = '" + senderId
				+ "'";
		EmailUserSetting emailUserSetting = emailUserSettingDao.findEmailUserSetting(hql);
		// System.out.println(emailUserSetting.getStmpService()+"   "+"\"Object\"<"+emailUserSetting.getEmailAddress()+">"+"  "+emailUserSetting.getEmailAddress()+"    "+emailUserSetting.getPassword());
		return SmtpMailSender.createESmtpMailSender(emailUserSetting.getStmpService(), "\""
				+ emailUserSetting.getName() + "\"<" + emailUserSetting.getEmailAddress() + ">",
				emailUserSetting.getEmailAddress(), emailUserSetting.getPassword());
	}

	public String saveEmailDraft(String subject, String receiver, String content, String userId) {
		EmailDraft draft = new EmailDraft();
		draft.setContent(content);
		draft.setSentEmail(receiver);
		draft.setTitle(subject);
		draft.setTime(new Date());
		User user = new User();
		user.setId(userId);
		draft.setUser(user);
		boolean flag = emailDraftDao.saveEmailDraft(draft);
		if (flag) {
			return "{success:true}";
		} else {
			return "{success:false}";
		}
	}

	public String findDrafts(String userId) {
		List<EmailDraft> drafts = emailDraftDao.findEmailDrafts(userId);
		String jsonString = "{'drafts':[";
		for (int i = 0; i < drafts.size(); i++) {
			EmailDraft draft = drafts.get(i);
			String settingString = "{";
			settingString += "'sender':'" + draft.getSentEmail() + "',";
			SimpleDateFormat format = new SimpleDateFormat("yy年MM月dd日　HH:mm:ss");
			String date = format.format(draft.getTime());
			settingString += "'time':'" + date + "',";
			settingString += "'content':'" + draft.getContent() + "',";
			settingString += "'theme':'" + draft.getTitle() + "'";
			settingString += "},";
			jsonString += settingString;
		}
		jsonString = jsonString.substring(0, jsonString.length() - 1);
		jsonString += "]}";
		System.out.println(jsonString);
		return jsonString;
	}

	public MimeMessage getMessage(String emailSetId, String mailId) {
		String hql = "from EmailUserSetting emailset where emailset.id = '"
				+ Integer.valueOf(emailSetId) + "'";
		EmailUserSetting emailUserSetting = emailUserSettingDao.findEmailUserSetting(hql);
		Properties props = new Properties();
		Session session = Session.getDefaultInstance(props, null);
		Store store = null;
		Message message[] = null;
		try {
			store = session.getStore("pop3");
			store.connect(emailUserSetting.getPopService(), emailUserSetting.getEmailAddress(),
					emailUserSetting.getPassword());
			Folder folder = store.getFolder("INBOX");
			folder.open(Folder.READ_ONLY);
			message = folder.getMessages();
		} catch (NoSuchProviderException e) {
			e.printStackTrace();
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		// System.out.println("Messages's length: "+message.length);
		MimeMessage pmm = null;
		for (int i = 0; i < message.length; i++) {
			pmm = (MimeMessage) message[i];
			String eId = null;
			try {
				eId = pmm.getMessageID();
			} catch (MessagingException e) {
				e.printStackTrace();
			}
			if (eId != null && eId.equals(mailId)) {
				return pmm;
			}
		}
		return null;
	}

	public void saveEmailFiles(HttpServletRequest request, HttpServletResponse response, Part part)
			throws Exception {
		String fileName = "";
		if (part.isMimeType("multipart/*")) {
			Multipart mp = (Multipart) part.getContent();
			for (int i = 0; i < mp.getCount(); i++) {
				BodyPart mpart = mp.getBodyPart(i);
				String disposition = mpart.getDisposition();
				if ((disposition != null)
						&& ((disposition.equals(Part.ATTACHMENT)) || (disposition
								.equals(Part.INLINE)))) {
					fileName = mpart.getFileName();
					if (fileName != null) {
						if (fileName.toLowerCase().indexOf("gb2312") != -1
								|| fileName.toLowerCase().indexOf("gbk") != -1) {
							fileName = MimeUtility.decodeText(fileName);
						}
						if (request.getHeader("User-Agent").contains("Firefox")) {
							response.addHeader("content-disposition", "attachment;filename="
									+ fileName);
						} else if (request.getHeader("User-Agent").contains("MSIE")) {
							response.addHeader("content-disposition", "attachment;filename="
									+ java.net.URLEncoder.encode(fileName, "UTF-8"));
						}
						System.out.println("saveFile1");
						saveFile(response, fileName, mpart.getInputStream());
					}
				} else if (mpart.isMimeType("multipart/*")) {
					saveEmailFiles(request, response, mpart);
				} else {
					fileName = mpart.getFileName();
					if (fileName != null) {
						if (fileName.toLowerCase().indexOf("gb2312") != -1
								|| fileName.toLowerCase().indexOf("gbk") != -1) {
							fileName = MimeUtility.decodeText(fileName);
						}
						if (request.getHeader("User-Agent").contains("Firefox")) {
							response.addHeader("content-disposition", "attachment;filename="
									+ fileName);
						} else if (request.getHeader("User-Agent").contains("MSIE")) {
							response.addHeader("content-disposition", "attachment;filename="
									+ java.net.URLEncoder.encode(fileName, "UTF-8"));
						}
						System.out.println("saveFile2");
						saveFile(response, fileName, mpart.getInputStream());
					}
				}
			}
		} else if (part.isMimeType("message/rfc822")) {
			saveEmailFiles(request, response, (Part) part.getContent());
		}
	}

	private void saveFile(HttpServletResponse response, String fileName, InputStream inputStream)
			throws Exception {
		System.out.println("file");
		BufferedOutputStream bos = null;
		BufferedInputStream bis = null;
		try {
			bos = new BufferedOutputStream(response.getOutputStream());
			bis = new BufferedInputStream(inputStream);
			int bytesRead = 0;
			byte[] buffer = new byte[8192];
			while ((bytesRead = bis.read(buffer, 0, 8192)) != -1) {
				bos.write(buffer, 0, bytesRead);
			}
		} catch (IOException exception) {
			exception.printStackTrace();
			// throw new Exception("文件保存失败!");
		} finally {
			bos.close();
			bis.close();
		}

	}

}
