package org.jwebtop.core.dao.orm;

import java.util.List;

import org.zengsource.util.spring.dao.orm.HibernateDaoTemplate;

import org.jwebtop.core.dao.EmailDraftDao;
import org.jwebtop.core.model.EmailDraft;

public class HibernateEmailDraftDao extends HibernateDaoTemplate implements
		EmailDraftDao {

	@Override
	public Class<?> getPrototypeClass() {
		return null;
	}

	public boolean saveEmailDraft(EmailDraft draft) {
		this.save(draft);
		return true;
	}

	public List<EmailDraft> findEmailDrafts(String userId) {
        String hql = "from EmailDraft ed where ed.user = '"+userId+"'";
        @SuppressWarnings("unchecked")
		List<EmailDraft> drafts = this.hibernateTemplate.find(hql);
    	return  drafts;
	}

}
