package org.jwebtop.core.dao;

import java.util.Collection;
import java.util.List;

import org.jwebtop.core.model.EmailUserSetting;

public interface EmailUserSettingDao {
	public List<EmailUserSetting> findEmailUserSettings(String hql);

	public EmailUserSetting findEmailUserSetting(String hql);

	public void saveEmailUserSetting(EmailUserSetting emailUserSetting);

	public void updateEmailSetting(EmailUserSetting emailSetting);

	public void deleteEmailSettings(@SuppressWarnings("rawtypes") Collection ids);
}
