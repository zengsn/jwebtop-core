package org.jwebtop.webwares.file;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jwebtop.core.dao.orm.HibernateSaveFileDao;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

/**
 * Servlet implementation class FileList
 */
public class FileList extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public FileList() {
		super();
		// TODO Auto-generated constructor stub
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String rootPath = request.getSession().getServletContext().getRealPath("\\");
		ApplicationContext ctx = new FileSystemXmlApplicationContext(rootPath
				+ "WEB-INF\\applicationContext.xml");
		HibernateSaveFileDao sfile = (HibernateSaveFileDao) ctx.getBean("saveFileDao");
		String filePath = sfile.readPath("guest").trim();
		String clientPath = rootPath + filePath;
		System.out.println(clientPath);
		String files = sfile.fileList(clientPath, filePath);
		((ServletRequest) response).setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		System.out.println(files);
		out.write(files);
		out.flush();
		out.close();
	}
}
