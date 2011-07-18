package org.jwebtop.core.dao;

import java.util.List;

import org.jwebtop.core.model.Relation;


/**
 * @author Zeng Shao-Ning
 * @since 6.0
 */
public interface RelationDao {

	public int queryCount(String q);
	public List<?> query(String q, int start, int limit);
	public void save(Relation relation);

}
