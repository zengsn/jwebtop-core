package org.jwebtop.core.dao.orm;

import java.util.Collection;
import java.util.List;

import org.zengsource.util.spring.dao.orm.HibernateDaoTemplate;

import org.jwebtop.core.dao.EmailUserSettingDao;
import org.jwebtop.core.model.EmailUserSetting;

public class HibernateEmailUserSettingDao extends HibernateDaoTemplate implements
		EmailUserSettingDao {

	public List<EmailUserSetting> findEmailUserSettings(String hql) {
		@SuppressWarnings("unchecked")
		List<EmailUserSetting> emailUserSettings = this.hibernateTemplate.find(hql);
		return emailUserSettings;
	}

	public void saveEmailUserSetting(EmailUserSetting emailUserSetting) {

		this.save(emailUserSetting);
	}

	@Override
	public Class<?> getPrototypeClass() {
		// TODO Auto-generated method stub
		return null;
	}

	public EmailUserSetting findEmailUserSetting(String hql) {
		@SuppressWarnings("unchecked")
		List<EmailUserSetting> emailUserSettings = this.hibernateTemplate.find(hql);
		return emailUserSettings.get(0);
	}

	public void updateEmailSetting(EmailUserSetting emailSetting) {
		this.hibernateTemplate.update(emailSetting);
	}

	public void deleteEmailSettings(@SuppressWarnings("rawtypes") Collection ids) {
		this.hibernateTemplate.deleteAll(ids);
	}

}
