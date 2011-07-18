/**
 * 
 */
package org.jwebtop.core.service;


import java.util.List;

import org.jwebtop.core.model.Relation;


/**
 * 网件-服务接口。
 * 
 * @author Zeng Shao-Ning
 * @since 6.0
 */
public interface RelationService {
	 public int searchCount(String q);
	 public List<?> search(String q, int start, int limit);
	 public void add(Relation relation);


}
