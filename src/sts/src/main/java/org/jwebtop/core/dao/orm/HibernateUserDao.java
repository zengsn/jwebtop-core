/**
 * 
 */
package org.jwebtop.core.dao.orm;

import java.util.Date;

import org.zengsource.util.spring.dao.orm.HibernateDaoTemplate;

import org.jwebtop.core.dao.UserDao;
import org.jwebtop.core.model.User;

/**
 * @author Zeng Shao-Ning
 * @since 6.0
 */
public class HibernateUserDao extends HibernateDaoTemplate implements UserDao {

	// ~~~ STATIC ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	// ~~~ PROPERTIES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	// ~~~ CONSTRUCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public HibernateUserDao() {
		// TODO Auto-generated constructor stub
	}

	// ~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	@Override
	public Class<?> getPrototypeClass() {
		return User.class;
	}
	
	public User queryById(String id) {
		return (User) super.queryById(id);
	}
	
	public void save(User user) {
		Date now = new Date();
		if (user.getCreatedTime() == null) {
			user.setCreatedTime(now);
		}
		user.setUpdatedTime(now);
		super.save(user);
	}

	// ~~~ G^SETTERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

}
