package org.jwebtop.webwares.file;

import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class FileDownload
 */
public class FileDownload extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public FileDownload() {
		super();

	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// String path = request.getContextPath();
		// String basePath = request.getScheme() + "://" +
		// request.getServerName() + ":"
		// + request.getServerPort() + path + "/";
		String rootPath = request.getSession().getServletContext().getRealPath("\\");
		String filePath = request.getParameter("filePath");
		String name = request.getParameter("fileName");
		String realPath = rootPath + filePath + "\\" + name;
		// System.out.println(realPath);
		response.setContentType("application/x-msdownload;charset=UTF-8");
		if (request.getHeader("User-Agent").contains("Firefox")) {
			response.addHeader("content-disposition",
					"attachment;filename=" + request.getParameter("fileName"));
		} else if (request.getHeader("User-Agent").contains("MSIE")) {
			response.addHeader("content-disposition",
					"attachment;filename=" + java.net.URLEncoder.encode(name, "UTF-8"));
		}
		BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(
				response.getOutputStream());
		try {
			System.out.println(realPath);
			// 打开指定文件的流信息
			FileInputStream fileInputStream = new FileInputStream(realPath);

			int bytesRead = 0;
			byte[] buffer = new byte[8192];
			while ((bytesRead = fileInputStream.read(buffer, 0, 8192)) != -1) {
				bufferedOutputStream.write(buffer, 0, bytesRead);
			}
			fileInputStream.close();
			bufferedOutputStream.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

	}
}
