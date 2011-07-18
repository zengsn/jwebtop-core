package org.jwebtop.core.mailService;

import java.text.*;
import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;

/**
 * @author Administrator
 * 
 */
public class PraseMimeMessage {
	private MimeMessage mimeMessage = null;
	private StringBuffer bodytext = new StringBuffer();
	// 存放邮件内容的StringBuffer对象
	private String dateformat = "yy-MM-dd　HH:mm:ss";// 默认的日前显示格式
	private List<String> filenames = new ArrayList<String>(0);

	/**
	 * 　*　构造函数,初始化一个MimeMessage对象 　
	 */
	public PraseMimeMessage() {
	}

	public PraseMimeMessage(MimeMessage mimeMessage) {
		this.mimeMessage = mimeMessage;
//System.out.println("create　a　PraseMimeMessage　object........");
	}

	public void setMimeMessage(MimeMessage mimeMessage) {
		this.mimeMessage = mimeMessage;
	}

	/**
	 * 
	 * 获取发件人的姓名和密码
	 * 
	 * @return
	 */
	public String getFrom() throws Exception {
		InternetAddress address[] = (InternetAddress[]) mimeMessage.getFrom();
		String from = address[0].getAddress();
		if (from == null)
			from = "";
		String personal = address[0].getPersonal();
		if (personal == null)
			personal = "";
		String fromaddr = personal + "<" + from + ">";
		return fromaddr;
	}

	/**
	 * 　获得邮件的收件人，抄送，和密送的地址和姓名，根据所传递的参数的不同
	 * 　"to"----收件人　"cc"---抄送人地址　"bcc"---密送人地址 　
	*/

	public String getMailAddress(String type) throws Exception {
		String mailaddr = "";
		String addtype = type.toUpperCase();
		InternetAddress[] address = null;
		if (addtype.equals("TO") || addtype.equals("CC")
				|| addtype.equals("BCC"))

		{
			if (addtype.equals("TO")) {
				address = (InternetAddress[]) mimeMessage
						.getRecipients(Message.RecipientType.TO);
			} else if (addtype.equals("CC")) {
				address = (InternetAddress[]) mimeMessage
						.getRecipients(Message.RecipientType.CC);
			} else {
				address = (InternetAddress[]) mimeMessage
						.getRecipients(Message.RecipientType.BCC);
			}
			if (address != null) {
				for (int i = 0; i < address.length; i++) {
					String email = address[i].getAddress();
					if (email == null)
						email = "";
					else {
						email = MimeUtility.decodeText(email);
					}
					String personal = address[i].getPersonal();
					if (personal == null)
						personal = "";
					else {
						personal = MimeUtility.decodeText(personal);
					}
					String compositeto = personal + "<" + email + ">";
					mailaddr += "," + compositeto;
				}
				if (mailaddr.length() > 1)
					mailaddr = mailaddr.substring(1);
			}
		} else {
			throw new Exception("Error　emailaddr　type!");
		}
		return mailaddr;
	}

	/**
	 * 
	 * 获取邮件主题
	 */
	public String getSubject() throws MessagingException {
		String subject = "";
		try {
			subject = MimeUtility.decodeText(mimeMessage.getSubject());
			if (subject == null)
				subject = "";
		} catch (Exception exce) {
		}
		return subject;
	}

	/**
	 * 获取邮件发送日期
	 */
	public String getSentDate() throws Exception {
		Date sentdate = mimeMessage.getSentDate();
		SimpleDateFormat format = new SimpleDateFormat(dateformat);
		return (sentdate == null) ? null : format.format(sentdate);
	}

	/**
	 * 获取邮件正文
	 * 
	 * @return
	 * 
	 */
	public String getBodyText() {
		return bodytext.toString();
	}

	public List<String> getFilenames() {
		return filenames;
	}

	/**
	 * 解析邮件，把得到的邮件内容保存到一个StringBuffer对象中，解析邮件 主要是根据MimeType类型的不同执行不同的操作，一步一步的解析
	 * 
	 * 
	 */
	public void getMailContent(Part part) throws Exception {
		String contenttype = part.getContentType();
		int nameindex = contenttype.indexOf("name");
		boolean conname = false;
		if (nameindex != -1)
			conname = true;
		// System.out.println("CONTENTTYPE:　" + contenttype);
		if (part.isMimeType("text/plain") && !conname) {
			bodytext.append((String) part.getContent());
		} else if (part.isMimeType("text/html") && !conname) {
			bodytext.append((String) part.getContent());
		} else if (part.isMimeType("multipart/*")) {
			Multipart multipart = (Multipart) part.getContent();
			int counts = multipart.getCount();
			for (int i = 0; i < counts; i++) {
				getMailContent(multipart.getBodyPart(i));
//System.out.println("test");
			}
		} else if (part.isMimeType("message/rfc822")) {
			getMailContent((Part) part.getContent());
		} else {
		}
	}

	/**
	 * 
	 * 判断此邮件是否需要回执，如果需要回执返回"true",否则返回"false"
	 * 
	 */

	public boolean getReplySign() throws MessagingException {
		boolean replysign = false;
		String needreply[] = mimeMessage
				.getHeader("Disposition-Notification-To");
		if (needreply != null) {
			replysign = true;
		}
		return replysign;
	}

	/**
	 * 获得此邮件的Message-ID
	 */

	public String getMessageId() throws MessagingException {
		return mimeMessage.getMessageID();
	}

	/**
	 * 【判断此邮件是否已读，如果未读返回返回false,反之返回true】
	 */

	public boolean isNew() throws MessagingException {
		boolean isnew = false;
		Flags flags = ((Message) mimeMessage).getFlags();
		Flags.Flag[] flag = flags.getSystemFlags();
		System.out.println("flags's　length:　" + flag.length);
		for (int i = 0; i < flag.length; i++) {
			if (flag[i] == Flags.Flag.SEEN) {
				isnew = true;
				System.out.println("seen　Message.......");
				break;
			}
		}
		return isnew;
	}

	/**
	 * 
	 * 判断此邮件是否包含附件
	 * 
	 */

	public boolean isContainAttach(Part part) throws Exception {
		boolean attachflag = false;
		String fileName = "";
		if (part.isMimeType("multipart/*")) {
			Multipart mp = (Multipart) part.getContent();
			for (int i = 0; i < mp.getCount(); i++) {

				BodyPart mpart = mp.getBodyPart(i);
				String disposition = mpart.getDisposition();
				if ((disposition != null)
						&& ((disposition.equals(Part.ATTACHMENT)) || (disposition
								.equals(Part.INLINE)))) {
					fileName = mpart.getFileName();
					if (fileName != null){
						if(fileName.toUpperCase().indexOf("GB2312") != -1 || fileName
									.toUpperCase().indexOf("GBK") != -1){
						     fileName = MimeUtility.decodeText(fileName);
						     attachflag = true;
					    }
System.out.println("addfileName1");
						filenames.add(fileName);
					}
                        
				} else if (mpart.isMimeType("multipart/*")) {
					isContainAttach(mpart);
				} else {
					fileName = mpart.getFileName();
					if (fileName != null){
							if(fileName.toUpperCase().indexOf("GB2312") != -1 || fileName
									.toUpperCase().indexOf("GBK") != -1) {
						          fileName = MimeUtility.decodeText(fileName);
						          attachflag = true;
							}
System.out.println("addfileName2");
						filenames.add(fileName);
					}
				}
			}
		} else if (part.isMimeType("message/rfc822")) {
			isContainAttach((Part) part.getContent());
		}
		return attachflag;
	}

	/**
	 * 
	 * 设置日期显示本格式
	 */
	public void setDateFormat(String format) throws Exception {
		this.dateformat = format;
	}
	
}
