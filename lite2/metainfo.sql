CREATE TABLE tb_metainfo (
	id BIGINT not null AUTO_INCREMENT PRIMARY KEY,
	mname VARCHAR(128) COMMENT '데이터명칭',
	mdesc VARCHAR(128) COMMENT '데이터설명',
	mtype VARCHAR(128) COMMENT '데이터종류',
	mpath VARCHAR(128) COMMENT '저장경로',
	mtable VARCHAR(128) COMMENT '저장테이블',
	opath VARCHAR(128) COMMENT '원본경로',
	ourl VARCHAR(128) COMMENT '원본접속url',
	odatabase VARCHAR(128) COMMENT '원본데이터베이스',
	otable VARCHAR(128) COMMENT '원본테이블',
	mkey VARCHAR(128) COMMENT '수집키',
	mscheduletype VARCHAR(128) COMMENT '수집스케쥴종류',
	mschedule VARCHAR(128) COMMENT '수집스케쥴 crontab 형식',
	mstate VARCHAR(128) COMMENT '활성화',
	wdate datetime COMMENT '저장일시',
	udate datetime COMMENT '업데이트일시',
	mowner  VARCHAR(128) COMMENT '소유자',
	run_log LONGTEXT COMMENT '실행로그',
	run_stime datetime COMMENT '수동실행시간',
	run_etime datetime COMMENT '수동종료시간'		
) COMMENT '데이터메타정보';

CREATE TABLE tb_algoinfo (
	id BIGINT not null AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(128) COMMENT '알고리즘명',
	alias VARCHAR(128) COMMENT 'alias',
	adesc VARCHAR(128) COMMENT '알고리즘설명',
	state VARCHAR(128) COMMENT '상태',
	cmd VARCHAR(128) COMMENT '실행명령',
	params  VARCHAR(128) COMMENT '파리미터 정보',
	run_pid VARCHAR(128) COMMENT '실행 pid',
	run_result LONGTEXT COMMENT '실행결과',
	run_log LONGTEXT COMMENT '실행로그',
	run_stime datetime COMMENT '실행시간',
	run_etime datetime COMMENT '종료시간'		
) COMMENT '알고리즘정보';

CREATE TABLE tb_algoinfo_history (
	id BIGINT not null,
	userid VARCHAR(128) COMMENT '사용자 id',
	state VARCHAR(128) COMMENT '상태',
	run_pid VARCHAR(128) COMMENT '실행 pid',
	run_result LONGTEXT COMMENT '실행결과',
	run_log LONGTEXT COMMENT '실행로그',
	run_stime datetime COMMENT '실행시간',
	run_etime datetime COMMENT '종료시간'		
) COMMENT '알고리즘실행로그';

