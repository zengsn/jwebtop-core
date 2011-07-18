/**
 * 
 */
package org.jwebtop.core.dao.orm;


import java.util.List;

import org.zengsource.util.StringUtil;
import org.zengsource.util.spring.dao.orm.HibernateDaoTemplate;

import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.jwebtop.core.dao.RelationDao;
import org.jwebtop.core.model.Relation;

/**
 * Hibernate 实现网件 DAO。
 * @author Zeng Shao-Ning
 * @since 6.0
 */
public class HibernateRelationDao extends HibernateDaoTemplate implements RelationDao {

	public HibernateRelationDao() {
	}

	public Class<?> getPrototypeClass() {
		return Relation.class;
	}

	public void save(Relation relation) {
		super.save(relation);
	}
	
	
	public List<?> query(String q, int start, int limit) {
		Criterion[] criterions;
		if(StringUtil.notBlank(q)) {
			criterions = buildSearchCriterions(q);
		} else {
			criterions = new Criterion[0];
		}
		return super.query(criterions, start, limit);
	}
	private Criterion[] buildSearchCriterions(String q) {
		 return new Criterion[] { //
			 Restrictions.like("name", q, MatchMode.ANYWHERE), //
			 Restrictions.like("author", q, MatchMode.ANYWHERE) //
		 };		
	}
	public int queryCount(String q) {
		Criterion[] criterions;
		if(StringUtil.notBlank(q)) {
			criterions = buildSearchCriterions(q);
		} else {
			criterions = new Criterion[0];
		}
		return super.queryCount(criterions);
		
	}
}
