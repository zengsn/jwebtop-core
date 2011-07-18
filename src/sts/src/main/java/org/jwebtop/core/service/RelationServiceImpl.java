/**
 * 
 */
package org.jwebtop.core.service;


import java.util.List;



import org.jwebtop.core.dao.RelationDao;
import org.jwebtop.core.model.Relation;



public class RelationServiceImpl implements RelationService {


	private RelationDao relationDao;

	public RelationServiceImpl() {
		
	}

	public void add(Relation relation) {
		this.relationDao.save(relation);
	}

	public List<?> search(String q, int start, int limit) {
		return this.relationDao.query(q, start, limit);
	}
	
	public int searchCount(String q) {
		return this.relationDao.queryCount(q);
	}


	public RelationDao getRelationDao() {
		return relationDao;
	}

	public void setRelationDao(RelationDao relationDao) {
		this.relationDao = relationDao;
	}

}
