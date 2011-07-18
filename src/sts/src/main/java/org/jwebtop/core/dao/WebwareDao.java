/**
 * 
 */
package org.jwebtop.core.dao;

import java.util.List;

import org.jwebtop.core.model.Profile;
import org.jwebtop.core.model.Webware;

/**
 * 网件 DAO 接口。
 * 
 * @author Zeng Shao-Ning
 * @since 6.0
 */
public interface WebwareDao {

	public List<?> queryByProfile(Profile profile);//需要

	/** @Deprecated replaced with queryById(Object id) */
	public Webware queryById(String id);//需要
	
	public Webware queryById(Object id);

	public Webware queryByName(String name);

	public void save(Webware webware);//需要

	public int queryCount(String q);//需要

	public List<?> query(String q, int start, int limit);//需要

}
