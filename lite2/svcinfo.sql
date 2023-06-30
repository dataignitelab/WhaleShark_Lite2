CREATE TABLE tb_svcinfo (
	id VARCHAR(128) not null PRIMARY KEY COMMENT '서비스 id',
	name VARCHAR(128) COMMENT '서비스명',
	svccomment TEXT COMMENT '서비스 설명',
	state VARCHAR(128) COMMENT '상태',
	spath VARCHAR(128) COMMENT '서비스경로',
	wtime datetime COMMENT '기록일시',
	utime datetime COMMENT '업데이트일시',
	company varchar(128) COMMENT '회사'
) COMMENT '서비스정보';

CREATE TABLE tb_svc_history (
	id VARCHAR(128) not null COMMENT '서비스 id',
	userid VARCHAR(128) COMMENT '사용자 id',
	remoteip VARCHAR(128) COMMENT 'remote ip',
	state VARCHAR(128) COMMENT '상태',
	run_result LONGTEXT COMMENT '실행결과',
	run_log LONGTEXT COMMENT '실행로그',
	run_stime datetime COMMENT '실행시간',
	run_etime datetime COMMENT '종료시간'		
) COMMENT '서비스실행로그';