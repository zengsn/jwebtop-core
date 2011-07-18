package org.jwebtop.core.dao;

import org.jwebtop.core.model.SaveUserFiles;

public interface SaveFileDao {
	
   public String readPath(String id);
   public void save(SaveUserFiles sfiles);
   public String fileList(String path,String filePath);
   
}
