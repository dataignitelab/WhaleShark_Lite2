package com.dc.lite.controller;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.RandomAccessFile;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.CopyUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.mozilla.universalchardet.UniversalDetector;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.dc.lite.service.CommonService;
import com.jcraft.jsch.Channel;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;

@Controller
public class CommonController {

	@Autowired
	private CommonService commonservice;

	private static final Logger logger = LoggerFactory.getLogger(CommonController.class);

	@Value("${file.upload-dir}")
	private String uploadPath;

	@Value("${query-info}")
	private String queryinfo;

	@Value("${appbase-dir}")
	private String app_basedir;
	
	
	@CrossOrigin("*")
	@RequestMapping(value = "/login")
	@ResponseBody
	public Map sewer_login(HttpServletRequest request, @RequestParam Map<String, String> map) throws Exception {
		
		HttpSession session = request.getSession();
		Map ret = new HashMap();
		ret.put("success", true);
		
		String action = map.get("action");
		String uid = map.get("userid");
		String pwd = map.get("password");
		
		if("logout".equalsIgnoreCase(action))
		{
			session.invalidate();
			ret.put("success", true);
			return ret;
		}
		
		if(uid==null || pwd=="")
		{
			ret.put("success", false);
			return ret;
		}
		
		uid = uid.replaceAll("'", "");
		pwd = pwd.replaceAll("'", "");
		
		HashMap<String, String> sql = new HashMap<String, String>();
		sql.put("sql", "select id,userid,name,password,company,role,lang from tb_user where userid='"+uid+"' AND (password='' OR password='"+pwd+"')");
		List<Object> lst = commonservice.selectsql(sql);
		for (Object i :lst) {
			Map item =	(Map)i;
			if(uid.equals(item.get("userid")) && (pwd.equals(item.get("password")) || "".equals(item.get("password"))))
			{
//				sql.put("sql", "update user set appendinfo='"+key+"' where role='sewer' and userid='"+uid+"' AND userpwd='"+pwd+"'");
//				commonservice.updatesql(sql);
//				ret.put("accesskey", key);
				session.putValue("loginid", item.get("id"));
				session.putValue("userid", item.get("userid"));
				session.putValue("name", item.get("name"));
				session.putValue("company", item.get("company"));
				session.putValue("role", item.get("role"));
				session.putValue("lang", item.get("lang"));
				return ret;
			}
		}
		session.invalidate();
		ret.put("success", false);
		return ret;
	}	

	@CrossOrigin("*")
	@RequestMapping(value = "/login_info")
	@ResponseBody
	public Map sewer_loginvalid(HttpServletRequest request) throws Exception {
		
		Map ret = new HashMap();
		ret.put("success", true);

		HttpSession session = request.getSession();
		
		String name = (String) session.getValue("name");
		String loginid = (String) session.getValue("loginid");
		String userid = (String) session.getValue("userid");
		String company = (String) session.getValue("company");
		String role = (String) session.getValue("role");
		String lang = (String) session.getValue("lang");
		if(name==null || name=="")
		{
			ret.put("success", false);
			return ret;
		}
		ret.put("loginname", name);
		ret.put("loginid", loginid);
		ret.put("loginuserid", userid);
		ret.put("company", company);
		ret.put("role", role);
		ret.put("lang", lang);
		return ret;
	}

	@CrossOrigin("*")
	@RequestMapping(value = "/update_myinfo")
	@ResponseBody
	public Map update_myinfo(HttpServletRequest request, HttpSession session, @RequestParam Map<String, String> map) throws Exception {
		
		Map ret = new HashMap();
		ret.put("success", true);
		
		String oldpwd = (String)map.get("oldpassword");
		String newpwd = (String)map.get("password");
		String name = (String)map.get("name");
		String lang = (String)map.get("lang");
		
		String id = (String) session.getValue("loginid");
		
		HashMap<String, String> sql = new HashMap<String, String>();
		
		String qry = "";
		
		if(lang!=null && lang!="") qry = String.format("update tb_user set lang='%s' where id='%s'", lang, id);
		else
		{
			oldpwd = oldpwd.replaceAll("'", "");
			qry = String.format("update tb_user set password='%s', name='%s' where id='%s' and password='%s'", newpwd, name, id, oldpwd);
			if(newpwd==null || newpwd=="") qry = String.format("update tb_user set name='%s' where id='%s' and password='%s'", name, id, oldpwd);
		}
		
		sql.put("sql", qry);
		int res = commonservice.updatesql(sql);

		if(res<1)
		{
			ret.put("success", false);
		}
		else {
			if(lang!=null && lang!="") session.putValue("lang", lang);
			else session.putValue("name", name);
		}
		
		return ret;
	}

	// 파일 목록 서브디렉토리 포함
	public ArrayList<File> getfileList(String path, ArrayList<File> filelist)
	{
		if(filelist==null) filelist = new ArrayList<File>();
		File cpath = new File(path);
		if(!cpath.exists()) return filelist;
		if(!cpath.isDirectory()) {
			filelist.add(cpath);
			return filelist;
		}
		for(File f:cpath.listFiles())
		{
			if(f.isDirectory()) getfileList(path+"/"+f.getName()+"/", filelist);
			else filelist.add(f);
		}
		return filelist;
	}
	
	/*
	 * 단말 업데이트 정보 api
	 */
	
	@CrossOrigin("*")
	@RequestMapping(value = "/edgeupdate-info")
	@ResponseBody
	public Map edgeupdate_info(HttpServletResponse response, HttpServletRequest request, @RequestParam Map<String, String> map) throws Exception {
		Map ret = new HashMap();
		ret.put("success", true);
		
		String deviceid = (String)map.get("deviceid");
		String devicetype = (String)map.get("devicetype");
		String version = (String)map.get("version");
		String running_time = (String)map.get("running_time");
		String remoteip = getRemoteAddr(request);
		
		long rt = -1;
		if(running_time!=null && !running_time.isEmpty()) rt = (long)Float.parseFloat(running_time); 
		
		String basepath = app_basedir+"update/"+devicetype+"/";

//    	System.out.printf("/edgeupdate-info (%s)...\n", map.toString());
		
		HashMap<String, String> sql = new HashMap<String, String>();
//		sql.put("sql", "select * from tb_device where name='"+deviceid+"' AND state='ACTIVE'");
		sql.put("sql", "SELECT d.*,m.model_file,m.exec_file,m.apply_time FROM tb_device d LEFT JOIN tb_model_devices md ON d.id = md.did LEFT JOIN tb_model m ON m.id=md.mid AND m.state='ACTIVE' AND m.apply_time<NOW() WHERE d.name='"+deviceid+"' AND d.state='ACTIVE'");
		
		List<Object> lst = commonservice.selectsql(sql);

		if(lst.size()<1)
		{
			ret.put("success", false);
			ret.put("error", "device info not found");
			return ret;
		}
		Map row = (Map)lst.get(0);
		String model_file = (String)row.get("model_file");
		String exec_file = (String)row.get("exec_file");
		
		// SELECT d.*,m.model_file,m.exec_file, m.apply_time FROM tb_device d  LEFT JOIN tb_model_devices md ON d.id = md.did  LEFT JOIN tb_model m ON m.id=md.mid AND m.state='ACTIVE' AND m.apply_time<NOW() WHERE d.name='TS0001' AND d.state='ACTIVE'
		
		String qry = String.format("update tb_device set edge_version='%s',edge_type='%s',remote_ip='%s',last_updatetime=now() where name='%s'", version, devicetype, remoteip, deviceid);
		if(rt>=0 && rt<10) qry = String.format("update tb_device set edge_version='%s',edge_type='%s',remote_ip='%s',first_updatetime=now(),last_updatetime=now() where name='%s'", version, devicetype, remoteip, deviceid);
		
		sql.put("sql", qry);
		int res = commonservice.updatesql(sql);
		
		ArrayList<File> filelist = new ArrayList<File>();
		
		ArrayList<HashMap> flist = new ArrayList<HashMap>();
		
		// model file info
		if(model_file!=null && !model_file.isEmpty())
		{
			String path = this.uploadPath+model_file;
			File f = new File(path);
			HashMap item = new HashMap();
			item.put("path", path); //절대경로
			item.put("destpath", "data/");
			item.put("filesize", f.length());
			flist.add(item);
		}
		// model exec file info
		if(exec_file!=null && !exec_file.isEmpty())
		{
			String path = this.uploadPath+exec_file;
			File f = new File(path);
			HashMap item = new HashMap();
			item.put("path", path); //절대경로
			item.put("destpath", "dpm/");
			item.put("filesize", f.length());
			flist.add(item);
		}
		
		for(File f:getfileList(basepath,filelist))
		{
			HashMap item = new HashMap();
			item.put("path", f.getPath().replaceFirst(basepath,"")); //상대경로
//			item.put("dest", basepath);
			item.put("filesize", f.length());
			flist.add(item);
		}
		
		ret.put("filelist", flist); // [{path:"fullpath filename", destpath:'저장경로', filesize:0}]
		
		return ret;
	}
	
	/*
	 * 단말 업데이트 파일 download api
	 */
	@CrossOrigin("*")
	@RequestMapping(value = "/edgeupdate-download")
	@ResponseBody
	public void edgeupdate_download(HttpServletResponse response, @RequestParam Map<String, String> map) throws Exception {
		
		String deviceid = (String)map.get("deviceid");
		String devicetype = (String)map.get("devicetype");
		String downloadfile = (String)map.get("downloadfile");
		
//    	System.out.printf("/edgeupdate-download (%s)...\n", map.toString());

		String basepath = this.app_basedir+"update/"+devicetype+"/";
		
		HashMap<String, String> sql = new HashMap<String, String>();
		sql.put("sql", "select * from tb_device where name='"+deviceid+"' AND state='ACTIVE'");
		List<Object> lst = commonservice.selectsql(sql);

		if(lst.size()<1)
		{
			if(downloadfile!=null && downloadfile.isEmpty()) response.setStatus(404);
			System.out.printf("[%s] device not exist", deviceid);
			
			return;
		}
		
		if(downloadfile!=null && !downloadfile.isEmpty())
		{
			try {
				String fname = basepath+downloadfile;
				if(downloadfile.startsWith("/")) fname = downloadfile;
				
				File f = new File(fname);
				if(!f.exists()) // file not exist...
				{
					System.out.printf("[%s] file not exist", fname);
			    	response.setStatus(404);
					return;
				}
				java.io.FileInputStream fis = new java.io.FileInputStream(fname);
				response.setContentType("application/octect-stream");      
				response.setHeader("Content-Disposition", "attachment; filename=\""+f.getName()+"\""); 
		    	response.setStatus(200);
				org.apache.commons.io.IOUtils.copy(fis, response.getOutputStream());
				response.flushBuffer();
		    } catch (IOException e) {
		    	e.printStackTrace();
		    	response.setStatus(500);
			}
			return;
		}
	}	
	
	Map<String,Object> g_querys = null;
	long last_loadtime = -1;

	public String getQuery(HttpSession session, Map<String, String> param)
	{
		if(g_querys==null || System.currentTimeMillis()- last_loadtime>60*1000)
		{
        	System.out.printf("query info reloading\n");
        	
        	try {
        	    // create object mapper instance
        	    ObjectMapper mapper = new ObjectMapper();

        	    // convert JSON file to map
        	    g_querys = mapper.readValue(new File(queryinfo), Map.class);

        	} catch (Exception e) {
        	    e.printStackTrace();
        	}
        	
			last_loadtime = System.currentTimeMillis();
		}
		
		if(g_querys==null) return "";
		
		String qid = (String)param.get("qid");
		
		if(qid.startsWith("__direct_")) return qid.substring(9);
		
		String query = (String)g_querys.get(qid);
		
		String page = (String)param.get("start");
		String length = (String)param.get("length");
		
		if(page!=null && length!=null)
		{
			int pagesize = Integer.parseInt(length);
			int startindex = Integer.parseInt(page);
			query += String.format(" LIMIT %d,%d", startindex, pagesize);
		}
		
		// {}, (()) 치환 
		// (()) 변수는 공백 특수문자,()를 포함할수 없음
		// {} 변수는 싱글 '를 포함할수없음
		
		int sp = query.indexOf('{');
    	int ep = query.indexOf('}');
    	
    	
    	String sql = "";
    	
    	while(sp>=0 && ep>sp)
    	{
    		String id = query.substring(sp+1,ep);
    		String val =  (String)param.get(id);
    		
    		// 세션 변수 사용
    		if(id.startsWith("session_") && val==null)
    		{
    			String sid = id.substring(8);
    			val = (String) session.getValue(sid);
    		}
    		
    		if(val==null) val="";
    		// validation 체크...
    		val = val.replaceAll("'", "''");
    		
//    		query = query.substring(0, sp)+val+query.substring(ep+1);
    		sql += query.substring(0, sp)+val;
    		query = query.substring(ep+1);
    		
        	sp = query.indexOf('{');
        	ep = query.indexOf('}');
    	}
    	
    	sql += query;
    	query = sql;

    	sql = "";
		sp = query.indexOf("((");
    	ep = query.indexOf("))");
    	while(sp>=0 && ep>sp)
    	{
    		String id = query.substring(sp+2,ep);
    		String val =  (String)param.get(id);
    		if(val==null) val="";
    		
    		// validation 체크...
    		if(val.indexOf(" ")>=0 || val.indexOf("(")>=0 || val.indexOf(")")>=0 || val.indexOf(";")>=0 || val.indexOf("+")>=0 || val.indexOf(",")>=0 || val.indexOf(".")>=0) {
    			System.out.printf("parameter value error ... [%s=%s]\n", id, val);
    			return "";
    		}
    		
//    		query = query.substring(0, sp)+val+query.substring(ep+2);
    		sql += query.substring(0, sp)+val;
    		query = query.substring(ep+2);
        	sp = query.indexOf("((");
        	ep = query.indexOf("))");
    	}
    	
    	sql += query;
    	query = sql;
    	
    	System.out.printf("query [%s]\n", query);
    	
    	return query;
	}
	
	@CrossOrigin("*")
	@RequestMapping(value = "/list")
	@ResponseBody
	public Object sql(HttpSession session, @RequestParam Map<String, String> form) {
		Map ret = new HashMap();
		ret.put("success", true);
		
		System.out.printf("param %s\n", form);
		
		try {
			HashMap<String, String> sql = new HashMap<String, String>();
			
			String q = getQuery(session, form);
			if(q.isEmpty())
			{
				ret.put("error", "query error");
				ret.put("success", false);
				return ret;
			}
			
			String cntq = q.replaceAll("select .* from ","select count(*) cnt from ");
			int sp = cntq.indexOf("LIMIT");
			if(sp>=0) cntq = cntq.substring(0, sp-1);
			
			sql.put("sql", cntq);
			List<Object> cnt = commonservice.selectsql(sql);

			sql.put("sql", q);
			List<Object> lst = commonservice.selectsql(sql);

			if(cnt.size()>0)
			{
				HashMap<String, String> c = (HashMap<String, String>)cnt.get(0);
				ret.put("total", c.get("cnt"));
			}
			else ret.put("total", lst.size());
			
	    	System.out.printf("query [%s]\n", q);
	    	System.out.printf("cnt_query [%s]\n", cntq);
			
			ret.put("list", lst);
//			return lst;
		} catch(Exception e) {
//			e.printStackTrace();
			ret.put("error", e.getMessage());
			ret.put("success", false);
		}

		return ret;
	}

	@CrossOrigin("*")
	@RequestMapping(value = {"/update","/delete"})
	@ResponseBody
	public Map update(HttpSession session, @RequestParam Map<String, String> form) {
		Map ret = new HashMap();
		ret.put("success", true);
		
		String session_userid = (String) session.getValue("userid");
		
		try {
			HashMap<String, String> sql = new HashMap<String, String>();
			
			String q = getQuery(session, form);
			String qid = form.get("qid");
			if((q.isEmpty()|| session_userid==null) && !qid.startsWith("__direct_"))
			{
				ret.put("error", session_userid==null?"not logined":"query error");
				ret.put("success", false);
				return ret;
			}
			
			sql.put("sql", q);
			int result = commonservice.updatesql(sql);
			ret.put("result", result);
		} catch(Exception e) {
			ret.put("error", e.getMessage());
			ret.put("success", false);
		}

		return ret;
	}
	
	@CrossOrigin("*")
	@RequestMapping(value = {"/insert"})
	@ResponseBody
	public Map insert(HttpSession session, @RequestParam Map<String, String> form) {
		Map ret = new HashMap();
		ret.put("success", true);
		
		try {
			HashMap<String, Object> sql = new HashMap<String, Object>();
			
			String q = getQuery(session, form);
			if(q.isEmpty())
			{
				ret.put("error", "query error");
				ret.put("success", false);
				return ret;
			}
	    	System.out.printf("query [%s]\n", q);
			sql.put("sql", q);
			int result = commonservice.insertsql(sql);
			Integer id = (Integer)sql.get("id");
			ret.put("result", id==null?result:id);
			sql.remove("sql");
			ret.put("data", sql);
		} catch(Exception e) {
			ret.put("error", e.getMessage());
			ret.put("success", false);
			e.printStackTrace();
		}

		return ret;
	}
	
	public static String[] exec_shell(String[] cmds)
	{
		String[] ret = new String[2];
		
		ret[0] = "";
		ret[1] = "";
		
		try {
			
//			FileWriter fw = new FileWriter("/tmp/shell.log", false) ;
            
//            fw.write((new Date())+":"+cmd+"\n");
//            fw.flush();
			
			final StringBuffer buff = new StringBuffer();
			final StringBuffer errbuff = new StringBuffer();
			Process p = Runtime.getRuntime().exec(cmds);
			final InputStream is = p.getInputStream();
			OutputStream os = p.getOutputStream();
			InputStream es = p.getErrorStream();
			
			Thread ith = new Thread() {

				@Override
				public void run() {
					byte[] tmp = new byte[8192];
					int rcnt = 0;
					try{
						while((rcnt=is.read(tmp))>0){
							byte[] b = new byte[rcnt];
							System.arraycopy(tmp, 0,  b,  0, rcnt);
							buff.append(new String(b, "UTF-8"));
						}
					}
					catch(IOException e) { System.out.printf("is error...:%s\n", "IOError");}
					catch(Exception e) { System.out.printf("is error...:%s\n", "Error");}
					
					super.run();
				}
				
			};
			ith.start();

			p.waitFor();
			
			ith.stop();

			String line;
			BufferedReader reader = new BufferedReader(new InputStreamReader(is));
			while ((line = reader.readLine())!= null) buff.append(line+"\n");

			reader = new BufferedReader(new InputStreamReader(es));
			while ((line = reader.readLine())!= null) errbuff.append(line+"\n");
			
//            fw.write((new Date())+":"+buff.toString());
//            fw.flush();
//            fw.close(); 
			
			ret[0] = buff.toString();
			ret[1] = errbuff.toString();
			
			return ret;
			
		} catch (IOException e) {
			System.out.printf("error:%s\n", "IO Error");
		} catch (InterruptedException e) {
			System.out.printf("error:%s\n", "Interrupt Error");
		} catch (Exception e) {
			System.out.printf("error:%s\n", "Error");
		}
		return ret;
	} 
	
	public static String[] exec_shell(String[] cmds, File work_dir)
	{
		String[] ret = new String[2];
		
		ret[0] = "";
		ret[1] = "";
		
		try {
			
//			FileWriter fw = new FileWriter("/tmp/shell.log", false) ;
            
//            fw.write((new Date())+":"+cmd+"\n");
//            fw.flush();
			
			final StringBuffer buff = new StringBuffer();
			final StringBuffer errbuff = new StringBuffer();
			Process p = Runtime.getRuntime().exec(cmds, null, work_dir);
			final InputStream is = p.getInputStream();
			OutputStream os = p.getOutputStream();
			InputStream es = p.getErrorStream();
			
			Thread ith = new Thread() {

				@Override
				public void run() {
					byte[] tmp = new byte[8192];
					int rcnt = 0;
					try{
						while((rcnt=is.read(tmp))>0){
							byte[] b = new byte[rcnt];
							System.arraycopy(tmp, 0,  b,  0, rcnt);
							buff.append(new String(b, "UTF-8"));
						}
					}
					catch(IOException e) { System.out.printf("is error...:%s\n", "IOError");}
					catch(Exception e) { System.out.printf("is error...:%s\n", "Error");}
					
					super.run();
				}
				
			};
			ith.start();

			p.waitFor();
			
			ith.stop();

			String line;
			BufferedReader reader = new BufferedReader(new InputStreamReader(is));
			while ((line = reader.readLine())!= null) buff.append(line+"\n");

			reader = new BufferedReader(new InputStreamReader(es));
			while ((line = reader.readLine())!= null) errbuff.append(line+"\n");
			
//            fw.write((new Date())+":"+buff.toString());
//            fw.flush();
//            fw.close(); 
			
			ret[0] = buff.toString();
			ret[1] = errbuff.toString();
			
			return ret;
			
		} catch (IOException e) {
			System.out.printf("error:%s\n", "IO Error");
		} catch (InterruptedException e) {
			System.out.printf("error:%s\n", "Interrupt Error");
		} catch (Exception e) {
			System.out.printf("error:%s\n", "Error");
		}
		return ret;
	}
	
	@CrossOrigin("*")
	@RequestMapping(value = "/uploadfile")
	@ResponseBody
	public Map uploadfile(MultipartHttpServletRequest request, @RequestParam Map<String, String> form) throws Exception {
		
		Map ret = new HashMap();
		String path = (String)form.get("path");
		ret.put("success", true);
		MultipartFile uploadFile = (MultipartFile) request.getFile("filename");
//		logger.info("uploadFile ==>" + uploadFile);
		
		String log = ""; 
		if (uploadFile != null) {
			String filename = uploadFile.getOriginalFilename();
			String savename = filename;
			String savefile = uploadPath+savename;
			if(path!=null && path.length()>0) {
				savefile = uploadPath+path+"/"+savename;
				ret.put("path", path+"/"+savename);
			}
			else ret.put("path", savename);
			File f = new File(savefile);
			if (f.exists()) f.delete();
			uploadFile.transferTo(f);
		}
		return ret;
	}	

	@CrossOrigin("*")
	@RequestMapping(value = "/uploadfiles")
	@ResponseBody
	public Map uploadfiles(MultipartHttpServletRequest request, @RequestParam Map<String, String> form) throws Exception {
		
		Map ret = new HashMap();
		ret.put("success", true);
		
		String path = (String)form.get("path");
		String overwrite = (String)form.get("overwrite");
		if(overwrite==null) overwrite = "Y";
		List<MultipartFile> fileList = request.getFiles("filename");
		ArrayList<String> files = new ArrayList<String>();
		
		File chkpath = new File(uploadPath+path);
		if(!chkpath.exists()) chkpath.mkdirs();
		
		for (MultipartFile uploadFile : fileList) {
			if (uploadFile != null) {
				String filename = uploadFile.getOriginalFilename();
				String savename = filename;
				String savefile = uploadPath+savename;
				if(path!=null && path.length()>0) savefile = uploadPath+path+"/"+savename;
				System.out.printf("uploadpath===>[%s]\n", savefile);
				File f = new File(savefile);
				if(overwrite.equalsIgnoreCase("n") && f.exists())
				{
					continue;
				}
				if(path!=null && path.length()>0) files.add(path+"/"+savename);
				else files.add(savename);
					
				if (f.exists()) f.delete();
				
				
				FileOutputStream fo = new FileOutputStream(f);
				
				CopyUtils.copy(uploadFile.getInputStream(), fo);
				fo.close();
//				uploadFile.transferTo(f);
			}
		}
		ret.put("filecnt", files.size());
		ret.put("path", files);
		return ret;
	}	
	
	/*
	@CrossOrigin("*")
	@RequestMapping(value = "/url")
	@ResponseBody
	public Map url(@RequestParam Map<String, String> param) {
		final String USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:65.0) Gecko/20100101 Firefox/65.0";
		Map ret = new HashMap();
		
		System.out.printf("["+param.toString()+"]");
		
		String pageurl = param.get("url");
		String method = param.get("method");
		
		System.out.printf("method=[%s],url=[%s]\n", method, pageurl);
		
		param.remove("url");
		param.remove("method");
//			System.out.printf("url=%s\n", pageurl);
		try {
			Document doc = null;
			if(method.equalsIgnoreCase("POST"))
				doc = Jsoup.connect(pageurl).followRedirects(true).ignoreContentType(true).userAgent(USER_AGENT).data(param).post();
			else
				doc = Jsoup.connect(pageurl).followRedirects(true).ignoreContentType(true).userAgent(USER_AGENT).data(param).get();
			String data = doc.text();
			ret.put("success", true);
			ret.put("result", data);
		} catch (IOException e) {
			// TODO Auto-generated catch block
//				e1.printStackTrace();
			ret.put("success", false);
			ret.put("errormsg", e.getMessage());
		}
       	return ret; 
	}	
	*/	
	
	@CrossOrigin("*")
	@RequestMapping(value = "/shell")
	@ResponseBody
	public Map shell(@RequestParam Map<String, String> form) {
		
		Map ret = new HashMap();
		ret.put("success", true);
		String cmd = form.get("cmd");
		String deli = form.get("deli");
		if(deli==null) deli = ",";
        String[] cmdp = cmd.split(deli);
		
		if(!cmd.startsWith(app_basedir) && !cmd.startsWith("/python/") && !cmd.startsWith("/CNN/") && !cmd.startsWith("/devonly/"))
		{
			ret.put("success", false);
        	ret.put("errormsg", "not allowed");
        	return ret;
		}
		if(cmd.indexOf("|")>=0 || cmd.indexOf(";")>=0 || /*cmd.indexOf(":")>=0 ||*/ cmd.indexOf("&")>=0)
    	{
			ret.put("success", false);
        	ret.put("errormsg", "not allowed");
        	return ret;
    	}
		
		try {
	           String[] log = exec_shell(cmdp);
	           ret.put("result", log[0]);
	           ret.put("errorlog", log[1]);
	           ret.put("cmd", cmd);
	           ret.put("deli", deli);
	           ret.put("cmdp", cmdp);
	           
	    } catch (Exception e) {
	           ret.put("success", false);
	           ret.put("errormsg", e.getMessage());
	        	
//	           e.printStackTrace();
		}
		return ret;
	}
	
	
	@CrossOrigin("*")
	@RequestMapping(value = "/rshell")
	@ResponseBody
	public Map rhell(HttpServletRequest request, @RequestParam Map<String, String> form) throws Exception {
		
		Map ret = new HashMap();
		ret.put("success", true);
		
		HttpSession login_session = request.getSession();
		
		String name = (String) login_session.getValue("name");
		String loginid = (String) login_session.getValue("loginid");
		String userid = (String) login_session.getValue("userid");
		if(name==null || name=="")
		{
			ret.put("success", false);
    		ret.put("error", "not logined...");
			return ret;
		}

		String host = form.get("host");
		String port = form.get("port");
		String id = form.get("id");
		String password = form.get("password");
		String cmd = form.get("cmd");
		
        System.out.println("==> Connecting to" + host);
        Session session = null;
        Channel channel = null;

        try {
            // 1. JSch 객체를 생성한다.
            JSch jsch = new JSch();
            session = jsch.getSession(id, host, Integer.parseInt(port));
         
            // 3. 패스워드를 설정한다.
            session.setPassword(password);
         
            // 4. 세션과 관련된 정보를 설정한다.
            java.util.Properties config = new java.util.Properties();
            // 4-1. 호스트 정보를 검사하지 않는다.
            config.put("StrictHostKeyChecking", "no");
            session.setConfig(config);
            session.connect(30000);
         
            // 5. 접속한다.
//            session.connect();

            System.out.println("==> Connected to" + host);
            
            // 6. shell 채널을 연다.
            channel = session.openChannel("shell");
            
            DataInputStream dataIn = new DataInputStream(channel.getInputStream());  
            DataOutputStream dataOut = new DataOutputStream(channel.getOutputStream());
            
            channel.connect();

            // send ls command to the server  
            dataOut.writeBytes(cmd+"\r\nexit\r\n");  
            dataOut.flush();  

            // and print the response   
            String line = dataIn.readLine();
            String result = line + "\n";

            while ((line = dataIn.readLine()) != null) {
                result += line + "\n";
            }
            /*
            // 8. 채널을 SSH용 채널 객체로 캐스팅한다
            ChannelExec channelExec = (ChannelExec) channel;
         
            System.out.println("==> Connected to" + host);
            
            channelExec.setCommand(cmd);
            channelExec.connect();
            
            */
    		ret.put("result", result);
        } catch (JSchException e) {
            e.printStackTrace();
    		ret.put("success", false);
    		ret.put("error", e.getMessage());
        } finally {
            if (channel != null) {
                channel.disconnect();
            }
            if (session != null) {
                session.disconnect();
            }
        }		
		
		return ret;
	}	
	
	@CrossOrigin("*")
	@RequestMapping(value = "/deletefile")
	@ResponseBody
	public Map deletefile(HttpServletRequest request, @RequestParam Map<String, String> form) throws Exception {
		Map ret = new HashMap();
		ret.put("success", true);
		
		HttpSession session = request.getSession();
		String userid = (String) session.getValue("userid");
		
		if(userid==null || userid.isEmpty())
		{
			ret.put("success", false);
			ret.put("error", "not logined");
			return ret;
		}

		String filename = form.get("filename");

		File file = new File(uploadPath+filename);
		if(file.exists()) file.delete();
		else ret.put("success", false);
		
		return ret;
	}
	
	@CrossOrigin("*")
	@RequestMapping(value = "/getfile")
	@ResponseBody
	public void getfile(HttpServletResponse response, @RequestParam Map<String, String> map) {
		
		String path = (String)map.get("path");
		
		try {
			File f = new File(path);
			if(!f.exists()) // file not exist...
			{
		    	response.setStatus(404);
		    	return;
			}
			java.io.FileInputStream fis = new java.io.FileInputStream(path);
			response.setContentType("application/octect-stream");      
			response.setHeader("Content-Disposition", "attachment; filename=\""+f.getName()+"\""); 
	    	response.setStatus(200);
			org.apache.commons.io.IOUtils.copy(fis, response.getOutputStream());
			response.flushBuffer();
	    } catch (IOException e) {
	    	response.setStatus(500);
		}
	}	

	@CrossOrigin("*")
	@RequestMapping(value = "/filelist")
	@ResponseBody
	public Map filelist(HttpServletRequest request, @RequestParam Map<String, String> map) {
   		Map ret = new HashMap();
		
		HttpSession session = request.getSession();
		String userid = (String) session.getValue("userid");

   		String path = (String)map.get("path");
		
		String realpath = uploadPath+userid+"/"+path;
		
		File file = new File(realpath);

		if(userid==null || userid.isEmpty())
		{
			ret.put("success", false);
			ret.put("error", "not logined");
			return ret;
		}
		
		if(!file.exists())
		{
			ret.put("success", false);
			ret.put("error", "path not found");
			System.out.printf("[%s] path not found...\n", realpath);
			return ret;
		}
		
		// param : path
		// result : {success:true, total:0, list:[]}
		try {
			File[] files = file.listFiles();
			
			List<Object> lst = new ArrayList<Object>();
			for(File f : files) {
				if(f.getName().startsWith(".")) continue;
				Map item = new HashMap();
				item.put("filename", f.getName());
				item.put("isdirectory", f.isDirectory());
				item.put("size", f.length());
				item.put("time", new Date(f.lastModified()));
				lst.add(item);
			}
			ret.put("list", lst);
			ret.put("total", lst.size());
			ret.put("success", true);
		} catch(Exception e) {
			ret.put("error", e.getMessage());
			ret.put("success", false);
		}

		return ret;
	}
	
	Object getMap(Map map, String key, Object defaultvalue)
	{
		Object v = map.get(key);
		if(v==null) return defaultvalue;
		else return v;
	}
	
	// 주소 읽어들이는 블럭 크기
	final int readblocksize = 5000;
	
	Map metaload(String filename, long blocksize)
	{
		Map ret = new HashMap();
		
		File f = new File(filename);
		String meta_name = filename;
		
		meta_name = filename.replace(f.getName(), "."+f.getName()+".json");
		File mf = new File(meta_name);
		
		long st = System.currentTimeMillis();

		try {
			ArrayList<String> sp = new ArrayList<String>();
			
			ObjectMapper of = new ObjectMapper();
			if(mf.exists())
			{
				ret = of.readValue(mf, ret.getClass());
				
				Long fsize = Long.parseLong(ret.get("filesize").toString());
				
				if (fsize == f.length()) {
					System.out.printf("file=%s, filesize=%d, dur=%d, metaloaded\n", filename, f.length(), System.currentTimeMillis()-st);
					return ret; 
				}
			}
			
			java.io.FileInputStream fis = new java.io.FileInputStream(filename); 
			UniversalDetector detector = new UniversalDetector(null);
			byte[] buf = new byte[4096*2];
			int nread;
			while ((nread = fis.read(buf)) > 0 && !detector.isDone()) 
			{ 
				detector.handleData(buf, 0, nread); 
			}
			fis.close();
			detector.dataEnd();

			String encoding = detector.getDetectedCharset();
			
			if(encoding==null) encoding="UTF-8";			

			String head = new String(buf, nread);
			int winoffs = 0;
			int crlf = head.indexOf("\r\n");
			if(crlf >= 0)
			{
//				System.out.printf(">> 윈도 파일\n");
				winoffs = 1;
			}
			
			BufferedReader bufReader = new BufferedReader(new InputStreamReader(new FileInputStream(filename), encoding));
//			BufferedReader bufReader = new BufferedReader(filereader);
			
			long skipline = 1;
			long p = 0;
			String columns = "";
			String line;
			long lc = 0;
	
			
			while((line=bufReader.readLine())!=null)
			{
				if(skipline>0) {
					skipline--;
					columns = line;

					// 2022-08-22
					columns = columns.replaceAll(" ", "_");
					columns = columns.replaceAll("[.]", "_");
					
					String[] cols = (String[])columns.split(",");
					
					int ec = 0;
					columns = "";
					for(int i=0 ;i<cols.length; i++)
					{
						if(cols[i].startsWith("\"")) cols[i] = cols[i].substring(1, cols[i].length()-1);
						if(cols[i].isEmpty()) {cols[i] = "Unnamed:_"+ec; ec++;}
						
						columns += (columns.isEmpty()?"":",")+cols[i];
					}					
					p += (line.getBytes().length+1+winoffs); // 윈도 파일일경우
					continue;
				}
				if((lc%blocksize)==0) {
	//				System.out.printf("lc=%d, %d\n",lc, p);
					sp.add(String.format("%d", p));
				}
				lc++;
				p += (line.getBytes().length+1+winoffs); // 윈도 파일일경우
			}
//			filereader.close();
			
			String lps = String.join(",", sp);
			ret.put("encoding", encoding);
			ret.put("lineseparate", winoffs==1?"CRLF":"LF");
			ret.put("lp", lps);
			ret.put("linecount", lc);
			ret.put("blocksize", blocksize);
			ret.put("filesize", f.length());
			ret.put("columns", columns);
			
			if(mf.exists()) mf.delete();

			of.writeValue(mf, ret);
			
		} catch(Exception e) {
			e.printStackTrace();
			ret = null;
		}
		System.out.printf("file=%s, filesize=%d, dur=%d meta generated\n", filename, f.length(), System.currentTimeMillis()-st);
		
		return ret;
	}
	
	
	@CrossOrigin("*")
	@RequestMapping(value = "/readcsv")
	@ResponseBody
	public Map readcsv(HttpServletRequest request, @RequestParam Map<String, String> map) {
   		Map ret = new HashMap();
		
		HttpSession session = request.getSession();
		String userid = (String) session.getValue("userid");

   		String path = (String)map.get("filepath");
		long start = Long.parseLong((String)getMap(map, "start", "0"));
		long length = Long.parseLong((String)getMap(map, "length", "10"));
		long blocksize = Long.parseLong((String)getMap(map, "blocksize", ""+readblocksize));
		
		String realpath = uploadPath+userid+"/"+path;
		
		File file = new File(realpath);

		/*
		if(userid==null || userid.isEmpty())
		{
			ret.put("success", false);
			ret.put("error", "not logined");
			return ret;
		}
		*/
		
		if(!file.exists())
		{
			ret.put("success", false);
			ret.put("error", "file not found");
			return ret;
		}
		
		// param : filepath, start, length
		// result : {success:true, total:0, list:[], encoding:'', columns:[]}
		try {
			
			Map fileobj = (Map)session.getValue(realpath);
			if(fileobj==null)
			{
				fileobj = metaload(realpath, readblocksize);
				session.putValue(realpath, fileobj);
				/*
				this.shell(form)
				shell()
				
				cmd=/lite/shell/csvread,lc,/lite/upload/admin/csv/all_new.csv,1,10000
				
				result
				*/
				
				//
				// csvread lc filename skipline blocksize
				// csvread read filename startposition skipline readcnt

				/*
				long st = System.currentTimeMillis();
				fileobj = new HashMap();
	
				java.io.FileInputStream fis = new java.io.FileInputStream(realpath); 
				UniversalDetector detector = new UniversalDetector(null);
				byte[] buf = new byte[4096];
				int nread;
				while ((nread = fis.read(buf)) > 0 && !detector.isDone()) 
				{ 
					detector.handleData(buf, 0, nread); 
				}
				fis.close();
				detector.dataEnd();
	
				String encoding = detector.getDetectedCharset();
				
				if(encoding==null) encoding="UTF-8";
				
				fileobj.put("filesize", file.length());
				fileobj.put("encoding", encoding);
				
				FileReader filereader = new FileReader(file);
				
				BufferedReader bufReader = new BufferedReader(filereader);
				
				long fp = 0;
				long lc = 0;
				String line=bufReader.readLine();// header...
				fp = line.length()+1;
				fileobj.put("columns", line.split(","));
				while((line=bufReader.readLine())!=null)
				{
					if((lc%blocksize)==0) fileobj.put("lp"+lc, fp);//System.out.printf("lc=%d, %d\n",lc, fp);
					lc++;
					fp += line.length()+1;
				}
				filereader.close();
				fileobj.put("blocksize", blocksize);
				fileobj.put("linecount", lc);			
				// line count && line info load
				session.putValue(realpath, fileobj);
				long et = System.currentTimeMillis();
				System.out.printf("loadmetainfolc=%d, %d\n",lc, fp);
				*/
			}
			
			blocksize = Long.parseLong(fileobj.get("blocksize").toString());
//			long sp = (start / blocksize)*blocksize;
			long si = start / blocksize;
			long offs = start % blocksize;
			
			String columns = (String)fileobj.get("columns");
			columns = columns.replaceAll(" ", "_");
			columns = columns.replaceAll("[.]", "_");
			
			String[] cols = (String[])columns.split(",");
			
			int ec = 0;
			for(int i=0 ;i<cols.length; i++)
			{
				if(cols[i].startsWith("\"")) cols[i] = cols[i].substring(1, cols[i].length()-1);
				if(cols[i].isEmpty()) {cols[i] = "Unnamed:_"+ec; ec++;}
			}			
			
			String[] sps = (String[])((String)fileobj.get("lp")).split(",");
			
			long sp = Long.parseLong(sps[(int)si]);
			// pos move
//			sp = (long)fileobj.get("lp"+sp);
			
			RandomAccessFile raf = new RandomAccessFile(realpath, "r");
			raf.seek(sp);
			
			// 2022-08-18 encode 수정
			String encoding = (String)fileobj.get("encoding");
			if(encoding==null) encoding = "UTF-8";
			
			String line;
			while(offs>0 && (line=raf.readLine())!=null) offs--; //skip...
			
			// read
			List<Object> lst = new ArrayList<Object>();
			while(length>0 && (line=raf.readLine())!=null) {
				length--;

				// 2022-08-18 encode 수정
				line = new String(line.getBytes("ISO-8859-1"), encoding); // randomaccessfile은 iso-8859-1 로 읽어들임..
				String[] vals = line.split(",");
				Map item = new HashMap();
				for(int i=0; i<cols.length; i++) if(i<vals.length) item.put(cols[i], vals[i]);
				lst.add(item);
			}
			
			// position 검색
			ret.put("encoding", fileobj.get("encoding"));
			ret.put("list", lst);
			ret.put("columns",columns);
			ret.put("total", fileobj.get("linecount"));
			ret.put("success", true);
		} catch(Exception e) {
			ret.put("error", e.getMessage());
			e.printStackTrace();
			ret.put("success", false);
		}

		return ret;
	}
	
	
	@CrossOrigin("*")
	@RequestMapping(value = "/readrdb")
	@ResponseBody
	public Map readmeta(HttpServletRequest request, @RequestParam Map<String, String> map) {
   		Map ret = new HashMap();
		
		HttpSession session = request.getSession();
		String userid = (String) session.getValue("userid");

   		String table = (String)map.get("table");
   		String key = (String)map.get("key");
   		String total = (String)map.get("total");
   		
		long start = Long.parseLong((String)getMap(map, "start", "0"));
		long length = Long.parseLong((String)getMap(map, "length", "10"));
		
		/*
		if(userid==null || userid.isEmpty())
		{
			ret.put("success", false);
			ret.put("error", "not logined");
			return ret;
		}
		*/
		
		// param : table, key, start, length
		// result : {success:true, total:0, list:[], columns:[]}
		try {
			
			String sql = String.format("select * from `%s`", table);
			if(key!=null && !key.isEmpty()) sql += " order by "+key;

			sql += String.format(" LIMIT %d,%d", start, length);

			HashMap<String, String> qry = new HashMap<String, String>();
			
			if(total==null || total.isEmpty())
			{
				String tsql = String.format("select count(*) cnt from `%s`", table);
				qry.put("sql", tsql);
				
				System.out.printf("sql==[%s]\n", tsql);
				List<Object> cnt = commonservice.selectsql(qry);
				
				if(cnt.size()>0)
				{
					HashMap<String, Object> c = (HashMap<String,Object>)cnt.get(0);
					total = c.get("cnt").toString();
				}
			}

			qry.put("sql", "desc "+ table);
			List<Object> collst = commonservice.selectsql(qry);
			
			qry.put("sql", sql);
			List<Object> lst = commonservice.selectsql(qry);
			
			String columns = "";
			for(Object item : collst)
			{
				Map column = (Map)item;
				if(!columns.isEmpty()) columns +=",";
				columns += (String)column.get("Field");
			}
			
			ret.put("list", lst);
			ret.put("columns",columns);
			ret.put("total", total);
			ret.put("success", true);
		} catch(Exception e) {
			ret.put("error", e.getMessage());
			e.printStackTrace();
			ret.put("success", false);
		}

		return ret;
	}	
	
	@CrossOrigin("*")
	@RequestMapping(value = "/sessiontest")
	@ResponseBody
	public Map sessiontest(HttpServletRequest request, @RequestParam("id") String id) { //throws Exception {
		
		Map ret = new HashMap();
		ret.put("success", true);
		ret.put("id", id);
		
		HttpSession session = request.getSession();
		
		ret.put("session", session==null);
		if(session!=null)
		{
			ret.put("sid", session.getId());
			ret.put("remoteip", getRemoteAddr(request));
			ret.put("sid_time", session.getLastAccessedTime());
		}
		
		return ret;
	}
	
	@CrossOrigin("*")
	@RequestMapping(value="/svc/{svcid}", method=RequestMethod.GET)
	@ResponseBody
	public Map svcinfo(HttpServletRequest request, @PathVariable("svcid") String svcid, @RequestParam Map<String,Object> param) {
		Map ret = new HashMap();
		ret.put("success", true);
		ret.put("svcid", svcid);
		
		String remoteip = getRemoteAddr(request);
		String userid = (String)param.get("userid");
		String params = (String)param.get("params");
		HashMap<String, String> qry = new HashMap<String, String>();
		try {
			String tsql = String.format("select * from tb_svcinfo where state='ACTIVE' and id='%s'", svcid);
			qry.put("sql", tsql);
			List<Object> svcinfo = commonservice.selectsql(qry);
			
			if(svcinfo.size()<=0)
			{
				ret.put("success", false);
				ret.put("error", "service id not found");
				return ret;
			}
			Map svcitem =	(Map)svcinfo.get(0);

			ArrayList<String> cmds = new ArrayList<String>();
			
			cmds.add(app_basedir+"svc/"+svcid+"/svc.sh");
		
			if(userid!=null && !userid.isEmpty())
			{
				cmds.add("-userid");
				cmds.add(userid);
			}
			cmds.add("-remoteip");
			cmds.add(remoteip);
			
			String[] cmdp = cmds.toArray(new String[1]);
			String[] log = exec_shell(cmdp, new File(app_basedir+"svc/"+svcid)); // 실행 경로 지정
			ret.put("result", log[0]);
			ret.put("errorlog", log[1]);
			
			String result = log[0].replaceAll("'", "`");
			
			String logsql = String.format("insert tb_svc_history (id,userid,remoteip,state,run_result,run_log,run_stime,run_etime) values ('%s','%s','%s','success','%s','',now(),now())", svcid, userid,remoteip,result);
			
			qry.put("sql", logsql);
			int res = commonservice.insertsql(qry);
			
		} catch( Exception e) {
			e.printStackTrace();
			ret.put("error", e.getMessage());
			ret.put("success", false);
		}
		return ret;
	}	
	
	@CrossOrigin("*")
	@RequestMapping(value="/svc/{svcid}", method=RequestMethod.POST)
	@ResponseBody
	public Map runsvc(HttpServletRequest request, @PathVariable("svcid") String svcid, @RequestParam Map<String,Object> param) {
		Map ret = new HashMap();
		ret.put("success", true);
		ret.put("svcid", svcid);
		
		String remoteip = getRemoteAddr(request);
		String userid = (String)param.get("userid");
		String params = (String)param.get("params");
		HashMap<String, String> qry = new HashMap<String, String>();
		try {
			String tsql = String.format("select * from tb_svcinfo where state='ACTIVE' and id='%s'", svcid);
			qry.put("sql", tsql);
			List<Object> svcinfo = commonservice.selectsql(qry);
			
			if(svcinfo.size()<=0)
			{
				ret.put("success", false);
				ret.put("error", "service id not found");
				return ret;
			}
			Map svcitem =	(Map)svcinfo.get(0);

			ArrayList<String> cmds = new ArrayList<String>();
			
			cmds.add(app_basedir+"svc/"+svcid+"/svc.sh");

			String[] pnames = params.split(",");
			
			System.out.printf("paramcnt=%d\n", pnames.length);
			
			for(String pname:pnames) {
				String value = (String) param.get(pname);
				if(value==null)
				{
					MultipartHttpServletRequest mrequest = (MultipartHttpServletRequest)request;
					MultipartFile file = mrequest.getFile(pname);
					if(file!=null) {
						String filename = file.getOriginalFilename();
						String ext = "";
						int pos = filename.lastIndexOf( "." );
						if(pos>=0) ext = filename.substring( pos );
						File tempfile = File.createTempFile("temp_", ext, new File(app_basedir+"tmp/"));
	//					File tempfile = new File(app_basedir+"tmp/"+filename);
						file.transferTo(tempfile);
						value = tempfile.getAbsolutePath();
						// Delete temp flie            
						tempfile.deleteOnExit();
					} else {
						value = request.getParameter(pname);
					}
				}
				System.out.printf("param=[%s],value=[%s]\n", pname, value);
				cmds.add("-"+pname);
				cmds.add(value);
			}
			if(userid!=null && !userid.isEmpty())
			{
				cmds.add("-userid");
				cmds.add(userid);
			}
			cmds.add("-remoteip");
			cmds.add(remoteip);
			
			String[] cmdp = cmds.toArray(new String[1]);
			String[] log = exec_shell(cmdp, new File(app_basedir+"svc/"+svcid)); // 실행 경로 지정
			ret.put("result", log[0]);
			ret.put("errorlog", log[1]);
			
			String result = log[0].replaceAll("'", "`");
			
			String logsql = String.format("insert tb_svc_history (id,userid,remoteip,state,run_result,run_log,run_stime,run_etime) values ('%s','%s','%s','success','%s','',now(),now())", svcid, userid,remoteip,result);
			
			qry.put("sql", logsql);
			int res = commonservice.insertsql(qry);
			
		} catch( Exception e) {
			e.printStackTrace();
			ret.put("error", e.getMessage());
			ret.put("success", false);
		}
		return ret;
	}
	
	@CrossOrigin("*")
	@RequestMapping(value="/svc/{svcid}/{path}/{filename}", method=RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<Resource> resourcesvc(/*HttpServletResponse response,*/ @PathVariable("svcid") String svcid, @PathVariable("path") String path, @PathVariable("filename") String filename) {
		
		HttpHeaders headers = new HttpHeaders();
		HashMap<String, String> qry = new HashMap<String, String>();
		try {
			
			Path fpath = Paths.get(app_basedir+"svc/"+svcid+"/"+path+"/"+filename);
			String contentType = Files.probeContentType(fpath);
//			headers.setContentDisposition(ContentDisposition.builder("attatchment").filename(filename, StandardCharsets.UTF_8).build());
			headers.setContentDisposition(ContentDisposition.builder("inline").filename(filename, StandardCharsets.UTF_8).build());
			headers.add(HttpHeaders.CONTENT_TYPE, contentType);
			
			String tsql = String.format("select * from tb_svcinfo where state='ACTIVE' and id='%s'", svcid);
			qry.put("sql", tsql);
			List<Object> svcinfo = commonservice.selectsql(qry);
			
			if(svcinfo.size()<=0)
			{
		    	return new ResponseEntity<>(headers, HttpStatus.BAD_REQUEST);
			}
			System.out.printf("resourcesvc2 ==> %s/%s/%s-%s(%s)\n", svcid, path, filename,contentType,app_basedir+"svc/"+svcid+"/"+path+"/"+filename);
			Resource resource  = new InputStreamResource(Files.newInputStream(fpath));
			return new ResponseEntity<>(resource, headers, HttpStatus.OK);
			
		} catch( Exception e) {
			e.printStackTrace();
	    	return new ResponseEntity<>(headers, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		/*
			java.io.FileInputStream fis = new java.io.FileInputStream(app_basedir+"svc/"+svcid+"/"+path+"/"+filename);
			response.setContentType("application/octect-stream");      
			response.setHeader("Content-Disposition", "attachment; filename=\""+filename+"\""); 
	    	response.setStatus(200);
	    	ServletOutputStream  out = response.getOutputStream();
			org.apache.commons.io.IOUtils.copy(fis, out);
			fis.close();
			out.flush();
			return;
		*/
	}
	
	String getRemoteAddr(HttpServletRequest request)
	{
		String ip = request.getHeader("X-Forwarded-For");

		if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) ip = request.getHeader("Proxy-Client-IP");
		if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) ip = request.getHeader("WL-Proxy-Client-IP");
		if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) ip = request.getHeader("HTTP_CLIENT_IP");
		if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) ip = request.getHeader("HTTP_X_FORWARDED_FOR");
		if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) ip = request.getRemoteAddr();

		return ip;
	}
	
}
