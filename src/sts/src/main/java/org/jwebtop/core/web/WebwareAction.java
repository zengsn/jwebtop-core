/**
 * 
 */
package org.jwebtop.core.web;

import java.util.List;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.jwebtop.core.model.Webware;
import org.jwebtop.core.service.WebwareService;

import org.zengsource.mvc.MvcException;
import org.zengsource.mvc.action.MultipleAction;
import org.zengsource.mvc.view.AbstractView;
import org.zengsource.mvc.view.XmlErrorView;
import org.zengsource.mvc.view.XmlView;

/**
 * 网件管理请求处理类。
 * 
 * @author Zeng Shao-Ning
 * @since 6.0
 */
public class WebwareAction extends MultipleAction {
    
	private static final long serialVersionUID = 1L;

	// ~~~ STATIC ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	// ~~~ PROPERTIES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	private WebwareService webwareService;

	// ~~~ CONSTRUCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public WebwareAction() {
	
		// TODO Auto-generated constructor stub
	}

	// ~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	@Override
	protected AbstractView doService() throws MvcException {
		return super.doService();
	}

	/**
	 * 浏览网件：查看可以安装或升级的所有网件。
	 * 
	 * @return XML
	 * @throws MvcException
	 */
	public AbstractView doSearch() throws MvcException {//需要
		int totalCount = this.webwareService.searchCount(getQ());
		System.out.println(getQ() + "");
		Document doc = DocumentHelper.createDocument();
		Element root = doc.addElement("response").addAttribute("success", "true");
		if (totalCount == 0) {
			root.addElement("totalCount").addText("0");
		} else {
			root.addElement("totalCount").addText(totalCount + "");
			System.out.println(totalCount + "");
			List<?> allWebwares = this.webwareService.search(getQ(), getStartInt(), getLimitInt());//需要
			for (Object obj : allWebwares) {
				Webware webware = (Webware) obj;
				Element ele = root.addElement("webware");
				buildXmlWebware(ele, webware);
			}
		}
		return new XmlView(doc);
	}

	private void buildXmlWebware(Element ele, Webware webware) {
		ele.addElement("id").addText(webware.getId() + "");
		ele.addElement("name").addText(webware.getName() + "");
		ele.addElement("version").addText(webware.getVersion() + "");
		ele.addElement("versions").addText(webware.getVersions() + "");
		ele.addElement("currentVersion").addText(webware.getCurrentVersion() + "");
		ele.addElement("author").addText(webware.getAuthor() + "");
		ele.addElement("release").addText(webware.getRelease() + "");
		ele.addElement("status").addText(webware.getStatus() + "");
		ele.addElement("score").addText("89.9"); // TODO
		ele.addElement("screen").addText(webware.getScreen() + "");
		ele.addElement("logo").addText(webware.getLogo() + "");
		ele.addElement("description").addText(webware.getDescription() + "");
	}

	public AbstractView doReload() throws MvcException {//需要
		if (this.webwareService.reload(getId())) {
			return XmlView.SUCCESS;
		} else {
			return new XmlErrorView("msg", "加载失败！");
		}
	}

	// ~~~ G^SETTERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public WebwareService getWebwareService() {
		return webwareService;
	}

	public void setWebwareService(WebwareService webwareService) {
		this.webwareService = webwareService;
	}

}
