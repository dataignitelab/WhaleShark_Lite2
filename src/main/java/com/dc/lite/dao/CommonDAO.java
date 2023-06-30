package com.dc.lite.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


@Repository
public class CommonDAO {
	
	@Autowired
	private SqlSession sqlsession;
	
	private static final String namespace = "commonMapper";
	
	public List<Object> selectsql(Map sql) throws Exception{
		return sqlsession.selectList(namespace+".selectsql", sql);
	}

	public int  insertsql(Map sql) throws Exception{
		 return sqlsession.insert(namespace+".insertsql", sql);
	} 
	
	public int  updatesql(Map sql) throws Exception{
		 return sqlsession.update(namespace+".updatesql", sql);
	} 

}
