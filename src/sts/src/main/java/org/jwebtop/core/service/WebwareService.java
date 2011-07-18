/**
 * 
 */
package org.jwebtop.core.service;

import java.io.File;
import java.util.List;

import org.jwebtop.core.model.User;
import org.jwebtop.core.model.Webware;

/**
 * 网件-服务接口。
 * 
 * @author Zeng Shao-Ning
 * @since 6.0
 */
public interface WebwareService {
	public Webware getById(String id);

	/**
	 * 模板见：webwares/preferences/webware.xml。
	 * 
	 * @param xmlPath
	 * @return
	 */
	public Webware loadFromXml(File xmlFile);

	public List<?> loadInstalled(User user);

	public List<Webware> loadAll(User user);

	public void initialize();

	public boolean isInitialized();

	public int searchCount(String q);//需要

	public List<?> search(String q, int start, int limit);//需要

	public boolean reload(String id);//需要

}
