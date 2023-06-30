package com.dc.lite.service;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import org.springframework.stereotype.Service;

import com.dc.lite.dao.CommonDAO;

@Service
public class CommonService {

	@Inject
	private CommonDAO commonDao;

	// common
	public List<Object> selectsql(Map sql)throws Exception {
		return commonDao.selectsql(sql);
	}

	public int insertsql(Map sql)throws Exception{
		return commonDao.insertsql(sql);
	}
	
	public int updatesql(Map sql)throws Exception{
		return commonDao.updatesql(sql);
	}
	
}
