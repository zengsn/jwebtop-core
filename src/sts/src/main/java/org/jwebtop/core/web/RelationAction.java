/**
 * 
 */
package org.jwebtop.core.web;

import java.util.List;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import org.jwebtop.core.model.Relation;
import org.jwebtop.core.service.RelationService;

import org.zengsource.mvc.MvcException;
import org.zengsource.mvc.action.MultipleAction;
import org.zengsource.mvc.view.AbstractView;
import org.zengsource.mvc.view.XmlView;

/**
 * 网件管理请求处理类。
 * 
 * @author Zeng Shao-Ning
 * @since 6.0
 */
public class RelationAction extends MultipleAction {

	private static final long serialVersionUID = 1L;

	private RelationService relationService;


	public RelationAction() {

	}
	protected AbstractView doService() throws MvcException {
		return super.doService();
	}
	public AbstractView doSearch() throws MvcException {
		
		int totalCount = this.relationService.searchCount(getQ());
		System.out.println(getQ() + "");
		Document doc = DocumentHelper.createDocument();
		Element root = doc.addElement("response").addAttribute("success", "true");
		if (totalCount == 0) {
			root.addElement("totalCount").addText("0");
		} else {
			root.addElement("totalCount").addText(totalCount + "");
			System.out.println(totalCount + "");
			List<?> allRelation = this.relationService.search(getQ(), getStartInt(), getLimitInt());//需要
			for (Object obj : allRelation) {
				Relation relation = (Relation) obj;
				Element ele = root.addElement("relation");
				buildXmlRelation(ele, relation);
			}
		}
		return new XmlView(doc);
	}

	private void buildXmlRelation(Element ele, Relation relation) {
		
		ele.addElement("id").addText(relation.getId() + "");
		ele.addElement("name").addText(relation.getName() + "");
		ele.addElement("email").addText(relation.getEmail() + "");
		ele.addElement("mark").addText(relation.getMark() + "");
		
	}




	public RelationService getRelationService() {
		return relationService;
	}

	public void setRelationService(RelationService relationService) {
		this.relationService = relationService;
	}

}
