/**
 * 
 */
package org.jwebtop.core.service;

import org.jwebtop.core.model.User;

/**
 * @author Zeng Shao-Ning
 * @since 6.0
 */
public interface UserService {

	public User findById(String id);

	public User getGuest();

}
