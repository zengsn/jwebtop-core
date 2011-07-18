package org.jwebtop.webwares.file;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.StringTokenizer;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jwebtop.core.dao.orm.HibernateSaveFileDao;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

/**
 * Servlet implementation class FileDelete
 */
public class FileDelete extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FileDelete() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String list = request.getParameter("fileIds");
        if(list != null){
        	PrintWriter out = response.getWriter();
        	String rootPath = request.getSession().getServletContext().getRealPath("/");
        	ApplicationContext ctx =new FileSystemXmlApplicationContext(rootPath+"WEB-INF\\applicationContext.xml");
    	    HibernateSaveFileDao sfile =(HibernateSaveFileDao)ctx.getBean("saveFileDao");
    		String saveReportPath = rootPath + sfile.readPath("guest").trim();//要存放上传的文件的文件夹
    		StringTokenizer tokenizer=new StringTokenizer(list,",");//分离filename中有.的上传文件，有多少个点就有多少个文件 就分离多少个
			String fileext=null;//用一个字符串存放文件名
			while(tokenizer.hasMoreElements()){//读取每一个文件的文件名
				fileext=tokenizer.nextToken();//将读到的文件名赋值给这个变量
System.out.println(saveReportPath+"\\"+fileext);
                File file = new File(saveReportPath+"\\"+fileext);
                if(file.exists() && file.isFile()){
                	if(file.delete()){
                		out.println("{'success':true,info:'ok'}");
//System.out.println(0);
                	}else{
                		out.println("{'success':true,info:'lost'}");
                	}
                	out.flush();
                	out.close();
                }else{
                	out.println("{'success':true,info:'lost'}");
                	out.flush();
                	out.close();
                }
			}
        }
	}

}
