package org.jwebtop.core.model;
/**
 * @author Zeng Shao-Ning
 * @since 6.0
 */
public class Relation {
	private String id;
	private String name;
	private String email;
	private String mark;
	
    public Relation(){
	   
    }
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMark() {
		return mark;
	}
	public void setMark(String mark) {
		this.mark = mark;
	}
   
}
