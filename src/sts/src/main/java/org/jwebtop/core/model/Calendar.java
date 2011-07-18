package org.jwebtop.core.model;

import java.io.Serializable;

public class Calendar implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer id;
	private String title;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

}
