/**
 * 
 */
package org.jwebtop.core.dao;

import org.jwebtop.core.model.User;

/**
 * @author Zeng Shao-Ning
 * @since 6.0
 */
public interface UserDao {

	public User queryById(String id);

	public void save(User user);

}
