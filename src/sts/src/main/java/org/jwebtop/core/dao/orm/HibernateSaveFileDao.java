package org.jwebtop.core.dao.orm;

import java.io.File;
import java.util.Calendar;
import java.util.StringTokenizer;

import org.jwebtop.core.dao.SaveFileDao;
import org.jwebtop.core.model.SaveUserFiles;

import org.zengsource.util.spring.dao.orm.HibernateDaoTemplate;

public class HibernateSaveFileDao extends HibernateDaoTemplate implements SaveFileDao {

	@Override
	public Class<?> getPrototypeClass() {
		return SaveUserFiles.class;
	}

	public String readPath(String id) {
		SaveUserFiles sfiles = (SaveUserFiles) super.queryById(id);
		if (sfiles == null)
			return null;
		return sfiles.getPath();
	}

	public void save(SaveUserFiles sfiles) {
		SaveUserFiles userfiles = (SaveUserFiles) super.queryById(sfiles.getUserId()); // 查找数据库，如果找不到有id的行
		if (userfiles == null) {// null为找不到，进行插入
			this.hibernateTemplate.save(sfiles);
		}
	}

	@SuppressWarnings("deprecation")
	public String fileList(String path, String filePath) {
		// get file list where the path has
		System.out.println(path);
		File file = new File(path);
		// get the folder list
		File[] array = file.listFiles();
		String files = "{\"files\":[";
		if (array != null) {
			for (int i = 0; i < array.length; i++) {
				if (array[i].isFile()) {
					// only take file name
					String fileInfo = "{\"fileName\":\"" + array[i].getName() + "\",";
					long length = array[i].length();
					if (array[i].length() > 1024) {
						fileInfo += "\"fileSize\":\"" + length / 1000 + "KB\",";
					} else {
						fileInfo += "\"fileSize\":\"" + length + "byte\",";
					}
					long time = array[i].lastModified();
					Calendar cal = Calendar.getInstance();
					cal.setTimeInMillis(time);
					StringTokenizer tokenizer = new StringTokenizer(array[i].getName(), ".");
					String type = "";
					while (tokenizer.hasMoreElements()) {
						type = tokenizer.nextToken();
					}
					fileInfo += "\"fileType\":\"" + type + "\",";
					fileInfo += "\"filePath\":\"" + filePath + "\",";
					fileInfo += "\"lastModifyDate\":\"" + cal.getTime().toLocaleString() + "\"}";
					files += fileInfo + ",";
				} else if (array[i].isDirectory()) {
					fileList(array[i].getPath(), filePath);
				}
			}
			files = files.substring(0, files.length() - 1);
		}
		files += "]}";
		return files;
	}
}
