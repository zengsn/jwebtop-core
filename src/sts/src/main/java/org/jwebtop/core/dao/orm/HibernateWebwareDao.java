/**
 * 
 */
package org.jwebtop.core.dao.orm;

import java.util.Date;
import java.util.List;

import org.zengsource.util.StringUtil;
import org.zengsource.util.spring.dao.orm.HibernateDaoTemplate;

import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.jwebtop.core.dao.WebwareDao;
import org.jwebtop.core.model.Profile;
import org.jwebtop.core.model.Webware;

/**
 * Hibernate 实现网件 DAO。
 * 
 * @author Zeng Shao-Ning
 * @since 6.0
 */
public class HibernateWebwareDao extends HibernateDaoTemplate implements WebwareDao {

	// ~~~ STATIC ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	// ~~~ PROPERTIES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	// ~~~ CONSTRUCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public HibernateWebwareDao() {
		// TODO Auto-generated constructor stub
	}

	// ~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	@Override
	public Class<?> getPrototypeClass() {
		return Webware.class;
	}

	public Webware queryById(String id) {
		return (Webware) super.queryById(id);
	}
	
	public Webware queryById(Object id) {
		return (Webware) super.queryById(id);
	}
	
	public Webware queryByName(String name) {
		return (Webware) super.queryUnique("name", name);
	}

	public void save(Webware webware) {
		if (webware.getCreatedTime() == null) {
			webware.setCreatedTime(new Date());
		}
		super.save(webware);
	}

	public List<?> queryByProfile(Profile profile) {
		return query(new Criterion[] { Restrictions.eq("status", Webware.ENABLED) }, null, null);
	}

	public int queryCount(String q) {
		Criterion[] criterions;
		if (StringUtil.notBlank(q)) {
			criterions = buildSearchCriterions(q);
		} else {
			criterions = new Criterion[0];
		}
		return super.queryCount(criterions);
	}

	private Criterion[] buildSearchCriterions(String q) {
		return new Criterion[] { //
		Restrictions.like("name", q, MatchMode.ANYWHERE), //
				Restrictions.like("author", q, MatchMode.ANYWHERE) //
		};
	}

	public List<?> query(String q, int start, int limit) {
		Criterion[] criterions;
		if (StringUtil.notBlank(q)) {
			criterions = buildSearchCriterions(q);
		} else {
			criterions = new Criterion[0];
		}
		return super.query(criterions, start, limit);
	}

	// ~~~ G^SETTERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

}
