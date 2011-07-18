package org.jwebtop.webwares.file;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;
import java.util.StringTokenizer;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.jwebtop.core.dao.orm.HibernateSaveFileDao;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;


/**
 * Servlet implementation class UploadFile
 * 实现文件上传功能
 */
public class FileUpload extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public FileUpload() {
        super();
        // TODO Auto-generated constructor stub
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	@SuppressWarnings("rawtypes")
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		FileItemFactory factory = new DiskFileItemFactory(); //建立文件列表硬盘存放工厂
		ServletFileUpload upload = new ServletFileUpload(factory);//将工厂传递给servlet文件上传类
		List items = null;//定义文件名存放列表
		try {
			items = (List) upload.parseRequest(request);//将Ext传过来的有name的序列存放到items中
		} catch (FileUploadException e1) {
			e1.printStackTrace();
		}
		String rootPath = request.getSession().getServletContext().getRealPath("/");//项目在tomcat中的位置
//System.out.println(rootPath);//输出位置 对比
		
        ApplicationContext ctx =new FileSystemXmlApplicationContext(rootPath+"WEB-INF\\applicationContext.xml");
	    HibernateSaveFileDao sfile =(HibernateSaveFileDao)ctx.getBean("saveFileDao");
		
	    
	    String saveReportPath = rootPath + sfile.readPath("guest");//要存放上传的文件的文件夹
		File savedir=new File(saveReportPath);//在该文件夹上新建文件路径
		if(!savedir.exists()){//如果文件路径不存在
System.out.println(savedir);
			savedir.mkdir();//新建一个
		}
//System.out.println(rootPath);//输出位置 对比
//System.out.println(sfile.readPath("guest"));
		boolean flag = false;//判断上传是否成功的变量
		Iterator iter = items.iterator();//为items添加迭代器

		/*   ʼ  JSONOjbect*/
		while (iter.hasNext()) {//从第一个开始进行迭代
			FileItem item = (FileItem)iter.next();//将items中存放的内容 一个个取出来放入一个文件项类
			if (item.isFormField()) {	//判读是否为文件类型
				if(!item.getString().equals("")){//否，判断那么值是否为空
				if(item.getFieldName().equals("choosefile")){//
						
//System.out.println(item.getString());
				}else{
				
				//System.out.println(item.getString());//
				}
				}
			} else {//属于文件
				
				if (item.getContentType() != null && item.getFieldName() != null) {//如果文件内容不等于空

					String filename=item.getName();//读取文件名(这个方法火狐返回文件名，ie返回路径加文件名)
					StringTokenizer tokenizer=new StringTokenizer(filename,"\\");//分离filename中有.的上传文件，有多少个点就有多少个文件 就分离多少个
					String fileext=null;//用一个字符串存放文件名
					while(tokenizer.hasMoreElements()){//读取每一个文件的文件名
						fileext=tokenizer.nextToken();//将读到的文件名赋值给这个变量
					}
//System.out.println(fileext);
					if(fileext != null){
							String photourl = saveReportPath.trim() +"\\"+ fileext;//创建文件路径 文件夹路径+文件名 
System.out.println(photourl);
							File file = new File(photourl);//新建一个该文件
							try {
								item.write(file); // 开始写文件
								flag = true;//写完把变量置true
							} catch (Exception e) {
								flag = false;
								e.printStackTrace();
							} finally {
								file = null;
								item = null;
							}
					}
				}
			}
		}
		((ServletRequest) response).setCharacterEncoding("UTF-8");
		
		if(flag){//判断是否传送成功
			try {//是
					
			} catch (Exception e) {
				e.printStackTrace();
			}
			PrintWriter out = response.getWriter();
			out.println("{success:true}\n");
			out.flush();
		}
		else{//否
			PrintWriter out = response.getWriter();
			out.println("{success:false}\n");
			out.flush();
		}
		// TODO Auto-generated method stub

	}

}
