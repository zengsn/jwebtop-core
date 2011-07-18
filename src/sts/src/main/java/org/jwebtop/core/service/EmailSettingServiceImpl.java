package org.jwebtop.core.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;

import javax.mail.Authenticator;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.NoSuchProviderException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Store;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import net.sf.json.JSONObject;

import org.jwebtop.core.dao.EmailUserSettingDao;
import org.jwebtop.core.model.EmailUserSetting;
import org.jwebtop.core.model.User;

public class EmailSettingServiceImpl implements EmailSettingService {
	private EmailUserSettingDao emailUserSettingDao;

	public EmailUserSettingDao getEmailUserSettingDao() {
		return emailUserSettingDao;
	}

	public void setEmailUserSettingDao(EmailUserSettingDao emailUserSettingDao) {
		this.emailUserSettingDao = emailUserSettingDao;
	}

	public String verifySetting(String JsonString) {

		final JSONObject jo = JSONObject.fromObject(JsonString);
		/*
		 * Iterator iter = jo.keySet().iterator(); while(iter.hasNext()) {
		 * String key = iter.next().toString(); System.out.println("[key=" + key
		 * + ", val=" + jo.get(key) + "]"); }
		 */
		String result = null;
		Transport transport = null;
		Properties propertie = System.getProperties();
		// propertie.put( "mail.smtp.port ",25);
		propertie.put("mail.smtp.auth ", "true");
		Session sendMailSession = Session.getDefaultInstance(propertie, null);
		Message newMessage = new MimeMessage(sendMailSession);
		try {
			newMessage.setFrom(new InternetAddress(jo.getString("emailAddress")));
			newMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(
					"441940241@qq.com"));
			newMessage.setSubject("hello ");
			newMessage.setSentDate(new Date());
			newMessage.setText("hello, email setting test ");
			transport = sendMailSession.getTransport("smtp");
			transport.connect(jo.getString("smtpService"), jo.getString("emailAddress"),
					jo.getString("password"));
			transport.sendMessage(newMessage, newMessage.getAllRecipients());
		} catch (MessagingException e) {
			e.printStackTrace();
			result = "{success:false, msg:'stmp服务器设置失败，请检查...'}";
		} finally {
			if (transport != null) {
				try {
					transport.close();
					transport = null;
				} catch (MessagingException e) {
					e.printStackTrace();
				}

			}
		}

		Properties props = System.getProperties();
		props.put("mail.pop3.host", jo.get("popService"));
		Session session = Session.getInstance(props, new Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(jo.getString("emailAddress"), jo
						.getString("password"));
			}
		});

		Store store = null;
		try {
			store = session.getStore("pop3");
		} catch (NoSuchProviderException e) {
			e.printStackTrace();
		}
		try {
			store.connect();
			if (result == null)
				result = "{success:true,msg:'邮箱测试连接成功'}";
		} catch (MessagingException e) {
			e.printStackTrace();
			if (result == null)
				result = "{success:false,msg:'输入信息错误，请检查...'}";
		} finally {
			if (store != null) {
				try {
					store.close();
				} catch (MessagingException e) {
					e.printStackTrace();
				}
				store = null;
			}
		}

		return result;
	}

	public String saveSetting(String JsonString) {
		JSONObject jo = JSONObject.fromObject(JsonString);
		String hql = "from org.jwebtop.core.model.EmailUserSetting emailSet where emailSet.emailAddress = '"
				+ jo.getString("emailAddress") + "' and emailSet.user = 'guest'";
		System.out.println(hql);
		List<EmailUserSetting> emailUserSettings = emailUserSettingDao.findEmailUserSettings(hql);
		if (emailUserSettings.size() > 0) {
			System.out.println(emailUserSettings.size());
			return "{success:false,msg:'该邮箱已经设置过'}";
		}
		EmailUserSetting emailSetting = new EmailUserSetting();
		emailSetting.setName(jo.getString("name"));
		emailSetting.setEmailAddress(jo.getString("emailAddress"));
		emailSetting.setPassword(jo.getString("password"));
		emailSetting.setDecription(jo.getString("decription"));
		emailSetting.setPopService(jo.getString("popService"));
		emailSetting.setStmpService(jo.getString("smtpService"));
		User user = new User();
		user.setId("guest");
		emailSetting.setUser(user);
		boolean active = false;
		if (jo.getString("active").equals("true")) {
			active = true;
		}
		emailSetting.setActive(active);
		emailUserSettingDao.saveEmailUserSetting(emailSetting);
		return "{success:true,msg:'保存成功'}";
	}

	public String loadEmailSetting() {
		String hql = "from EmailUserSetting emailSet where emailSet.user = 'guest'";
		List<EmailUserSetting> emailSettings = emailUserSettingDao.findEmailUserSettings(hql);
		String jsonString = "{\"emailSetting\":[";
		for (int i = 0; i < emailSettings.size(); i++) {
			EmailUserSetting emailsetting = emailSettings.get(i);
			String settingString = "{";
			settingString += "\"id\":\"" + emailsetting.getId() + "\",";
			settingString += "\"name\":\"" + emailsetting.getName() + "\",";
			settingString += "\"popService\":\"" + emailsetting.getPopService() + "\",";
			settingString += "\"smtpService\":\"" + emailsetting.getStmpService() + "\",";
			settingString += "\"emailAddress\":\"" + emailsetting.getEmailAddress() + "\",";
			settingString += "\"active\":\"" + emailsetting.isActive() + "\",";
			settingString += "\"password\":\"" + emailsetting.getPassword() + "\",";
			settingString += "\"decription\":\"" + emailsetting.getDecription() + "\"";
			settingString += "},";
			jsonString += settingString;
		}
		jsonString = jsonString.substring(0, jsonString.length() - 1);
		jsonString += "]}";
		return jsonString;
	}

	/*
	 * {name:
	 * 'id',type:'integer'},{name:'name',type:'string'},{name:'emailAddress',type:'string'},
	 * {name:'decription',type:'string'},{name:'active',type:'string'}
	 */

	public String updateSetting(String JsonString) {
		JSONObject jo = JSONObject.fromObject(JsonString);
		EmailUserSetting emailSetting = new EmailUserSetting();
		emailSetting.setId(Integer.valueOf(jo.getString("id")));
		emailSetting.setName(jo.getString("name"));
		emailSetting.setEmailAddress(jo.getString("emailAddress"));
		emailSetting.setPassword(jo.getString("password"));
		emailSetting.setDecription(jo.getString("decription"));
		emailSetting.setPopService(jo.getString("popService"));
		emailSetting.setStmpService(jo.getString("smtpService"));
		User user = new User();
		user.setId("guest");
		emailSetting.setUser(user);
		boolean active = false;
		if (jo.getString("active").equals("true")) {
			active = true;
		}
		emailSetting.setActive(active);
		emailUserSettingDao.updateEmailSetting(emailSetting);
		return "{success:true,msg:'修改成功'}";
	}

	public String deleteSettings(String emailsettingIds) {
		if (emailsettingIds != null) {
			String[] idArray = emailsettingIds.split(",");
			List<EmailUserSetting> ids = new ArrayList<EmailUserSetting>();
			System.out.println(idArray.length);
			for (int i = 0; i < idArray.length; i++) {
				EmailUserSetting emailsetting = new EmailUserSetting();
				emailsetting.setId(Integer.valueOf(idArray[i]));
				User user = new User();
				user.setId("guest");
				emailsetting.setUser(user);
				ids.add(emailsetting);
			}
			emailUserSettingDao.deleteEmailSettings(ids);
			return "{success:true, info:'ok'}";
		} else {
			return "{success:true, info:'lost'}";
		}

	}
}
