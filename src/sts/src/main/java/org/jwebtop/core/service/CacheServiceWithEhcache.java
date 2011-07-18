/**
 * 
 */
package org.jwebtop.core.service;

import net.sf.ehcache.Cache;
import net.sf.ehcache.Element;


/**
 * Cache Service implemented by EhCache.
 * 
 * @author Zeng Shaoning (http://zsn.cc)
 * @version 1.0.0
 * @since 6.0
 */
public class CacheServiceWithEhcache implements CacheService {

	// ~ STATIC FIELDS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	// ~ STATIC METHODS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	// ~ OBJECT FIELDS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	private Cache ehcache;

	// ~ CONSTRUCTORS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public CacheServiceWithEhcache() {
		// TODO Auto-generated constructor stub
	}

	// ~ OBJECT METHODS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public void cache(String key, Object item) {
		this.ehcache.put(new Element(key, item));
	};
	
	public Object get(String key) {
		Element item = this.ehcache.get(key);
		return item == null ? null : this.ehcache.get(key).getObjectValue();
	}

	// ~ g^setXXX ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public Cache getEhcache() {
		return ehcache;
	}

	public void setEhcache(Cache ehcache) {
		this.ehcache = ehcache;
	}


}
