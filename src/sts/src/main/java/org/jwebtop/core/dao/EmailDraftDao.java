package org.jwebtop.core.dao;

import java.util.List;

import org.jwebtop.core.model.EmailDraft;

public interface EmailDraftDao {
     public boolean saveEmailDraft(EmailDraft draft);

	public List<EmailDraft> findEmailDrafts(String userId);
}
