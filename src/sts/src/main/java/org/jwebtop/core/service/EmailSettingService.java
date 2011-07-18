package org.jwebtop.core.service;

public interface EmailSettingService {
    public String verifySetting(String JsonString);
    public String saveSetting(String JsonString);
    public String loadEmailSetting();
	public String updateSetting(String JsonString);
	public String deleteSettings(String emailsettingIds);
}
