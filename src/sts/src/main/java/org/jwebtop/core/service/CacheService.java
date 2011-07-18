/**
 * 
 */
package org.jwebtop.core.service;

/**
 * Cache Service.
 * @author Zeng Shaoning (http://zsn.cc)
 * @version 1.0.0
 * @since 6.0
 */
public interface CacheService {

	public void cache(String key, Object item);

	public Object get(String key);

}
