/**
 * 
 */
package org.jwebtop.core.dao.orm;

import java.util.Date;

import org.jwebtop.core.dao.ProfileDao;
import org.jwebtop.core.model.Profile;

import org.zengsource.util.spring.dao.orm.HibernateDaoTemplate;

/**
 * @author Zeng Shao-Ning
 * @since 6.0
 */
public class HibernateProfileDao extends HibernateDaoTemplate implements ProfileDao {

	// ~~~ STATIC ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	// ~~~ PROPERTIES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	// ~~~ CONSTRUCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public HibernateProfileDao() {
		// TODO Auto-generated constructor stub
	}

	// ~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	@Override
	public Class<?> getPrototypeClass() {
		return Profile.class;
	}

	public void save(Profile profile) {
		profile.setUpdatedTime(new Date());
		Profile dbProfile = this.queryById(profile.getId());
		if (dbProfile == null) {
			this.hibernateTemplate.save(profile);
		} else {
			super.save(profile);
		}
	}

	public Profile queryById(String id) {
		return (Profile) super.queryById(id);
	}

	// ~~~ G^SETTERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

}
