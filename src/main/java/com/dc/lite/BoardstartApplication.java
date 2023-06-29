package com.dc.lite;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.web.filter.HiddenHttpMethodFilter;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@MapperScan(value="com.dc.lite.dao")
@SpringBootApplication
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class BoardstartApplication {

	public static void main(String[] args) {
		SpringApplication.run(BoardstartApplication.class, args);
	}

	@Bean	//스프링에 필요한 객체를 생성
	public SqlSessionFactory sqlSessionFactory(DataSource dataSource)throws Exception{
        SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
        
        sessionFactory.setDataSource(dataSource);
        
        Resource[] res = new PathMatchingResourcePatternResolver().getResources("classpath:mappers/*Mapper.xml");
        sessionFactory.setMapperLocations(res);
        sessionFactory.setConfigLocation(new PathMatchingResourcePatternResolver().getResource("classpath:mybatis-config.xml")); // 카멜케이스 적용 위함

        

    	//결과를 스프링 내 빈으로 사용
       return sessionFactory.getObject();
    }
	
	@Bean
	public HiddenHttpMethodFilter hiddenHttpMethodFilter(){
		HiddenHttpMethodFilter filter = new HiddenHttpMethodFilter();
		return filter;
	}
}
