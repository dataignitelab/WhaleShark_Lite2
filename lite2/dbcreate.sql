CREATE TABLE tb_user (
	rid VARCHAR(128) NULL DEFAULT NULL COMMENT '레코드id(usr_~~)',
	userid VARCHAR(128) NULL DEFAULT NULL COMMENT '로그인id',
	name VARCHAR(128) NULL DEFAULT NULL COMMENT '이름',
	password VARCHAR(128) NULL DEFAULT NULL COMMENT '비밀번호',
	email VARCHAR(128) NULL DEFAULT NULL COMMENT '이메일',
	bigo VARCHAR(128) NULL DEFAULT NULL COMMENT '비고',
	active VARCHAR(2) NULL DEFAULT 'Y' COMMENT ' 사용여부 Y/N',
	wdate DATETIME NULL DEFAULT curdate() COMMENT '생성일시',
	udate DATETIME NULL DEFAULT curdate() COMMENT '업데이트일시'
)
COMMENT='사용자';

CREATE TABLE tb_group (
	rid VARCHAR(128) NULL DEFAULT NULL COMMENT '레코드id(grp_~~)',
	groupid VARCHAR(128) NULL DEFAULT NULL COMMENT '그룹id',
	name VARCHAR(128) NULL DEFAULT NULL COMMENT '그룹명',
	bigo VARCHAR(128) NULL DEFAULT NULL COMMENT '비고',
	active VARCHAR(2) NULL DEFAULT 'Y' COMMENT '사용여부 Y/N',
	wdate DATETIME NULL DEFAULT curdate() COMMENT '생성일시',
	udate DATETIME NULL DEFAULT curdate() COMMENT '업데이트일시'
)
COMMENT='그룹관리';

CREATE TABLE tb_usergroup (
	rid VARCHAR(128) NULL DEFAULT NULL COMMENT '레코드id(ug_~~)',
	userid VARCHAR(128) NULL DEFAULT NULL COMMENT '사용자id',
	groupid VARCHAR(128) NULL DEFAULT NULL COMMENT '그룹id',
	active VARCHAR(2) NULL DEFAULT 'Y' COMMENT '사용여부 Y/N',
	wdate DATETIME NULL DEFAULT curdate() COMMENT '생성일시',
	udate DATETIME NULL DEFAULT curdate() COMMENT '업데이트일시'
)
COMMENT='사용자소속 그룹';

CREATE TABLE tb_device (
	rid VARCHAR(128) NULL DEFAULT NULL COMMENT '레코드id(dev_~~)',
	deviceid VARCHAR(128) NULL DEFAULT NULL COMMENT '장치id',
	name VARCHAR(128) NULL DEFAULT NULL COMMENT '장치명',
	type VARCHAR(128) NULL DEFAULT NULL COMMENT '장치종류',
	bigo VARCHAR(128) NULL DEFAULT NULL COMMENT '비고',
	active VARCHAR(2) NULL DEFAULT 'Y' COMMENT '사용여부 Y/N',
	wdate DATETIME NULL DEFAULT curdate() COMMENT '생성일시',
	udate DATETIME NULL DEFAULT curdate() COMMENT '업데이트일시',
	PRIMARY KEY(rid)
)
COMMENT='센서장치';

CREATE TABLE tb_facility (
	rid VARCHAR(128) NULL DEFAULT NULL COMMENT '레코드id(fac_~~)',
	facilityid VARCHAR(128) NULL DEFAULT NULL COMMENT '설비id',
	name VARCHAR(128) NULL DEFAULT NULL COMMENT '설비명',
	type VARCHAR(128) NULL DEFAULT NULL COMMENT '설비종류',
	bigo VARCHAR(128) NULL DEFAULT NULL COMMENT '비고',
	active VARCHAR(2) NULL DEFAULT 'Y' COMMENT '사용여부 Y/N',
	wdate DATETIME NULL DEFAULT curdate() COMMENT '생성일시',
	udate DATETIME NULL DEFAULT curdate() COMMENT '업데이트일시',
	PRIMARY KEY(rid)
)
COMMENT='설비관리';

CREATE TABLE tb_menu (
	rid VARCHAR(128) NULL DEFAULT NULL COMMENT '레코드id(mnu_~~)',
	menuid VARCHAR(128) NULL DEFAULT NULL COMMENT '메뉴id',
	name VARCHAR(128) NULL DEFAULT NULL COMMENT '메뉴명',
	type VARCHAR(128) NULL DEFAULT NULL COMMENT '메뉴종류(Main/Sub)',
	parent VARCHAR(128) NULL DEFAULT NULL COMMENT 'Sub메뉴일시 parent메뉴 id',
	seq int NULL DEFAULT NULL COMMENT '메뉴순서',
	link VARCHAR(128) NULL DEFAULT NULL COMMENT '메뉴링크',
	bigo VARCHAR(128) NULL DEFAULT NULL COMMENT '비고',
	active VARCHAR(2) NULL DEFAULT 'Y' COMMENT '사용여부 Y/N',
	wdate DATETIME NULL DEFAULT curdate() COMMENT '생성일시',
	udate DATETIME NULL DEFAULT curdate() COMMENT '업데이트일시',
	PRIMARY KEY(rid)
)
COMMENT='메뉴관리';

CREATE TABLE tb_permission (
	rid VARCHAR(128) NULL DEFAULT NULL COMMENT '레코드id(per_~~)',
	menuid VARCHAR(128) NULL DEFAULT NULL COMMENT '메뉴id',
	raccess VARCHAR(128) NULL DEFAULT NULL COMMENT '읽기권한 목록 userid,@groupid',
	waccess VARCHAR(128) NULL DEFAULT NULL COMMENT '쓰기/삭제권한 목록 userid,@groupid',
	active VARCHAR(2) NULL DEFAULT 'Y' COMMENT '사용여부 Y/N',
	wdate DATETIME NULL DEFAULT curdate() COMMENT '생성일시',
	udate DATETIME NULL DEFAULT curdate() COMMENT '업데이트일시',
	PRIMARY KEY(rid)
)
COMMENT='메뉴별 권한관리';

CREATE TABLE tb_errorhistory (
	id VARCHAR(128) NULL DEFAULT NULL COMMENT '레코드id(err_~~)',
	facilityid VARCHAR(128) NULL DEFAULT NULL COMMENT '설비id',
	error VARCHAR(256) NULL DEFAULT NULL COMMENT '에러',
	bigo VARCHAR(128) NULL DEFAULT NULL COMMENT '비고',
	state VARCHAR(10) NULL DEFAULT 'ERROR' COMMENT '상태(ERROR/FIXING/FIXED)',
	wdate DATETIME NULL DEFAULT curdate() COMMENT '생성일시',
	PRIMARY KEY(id)
)
COMMENT='장애 관리';

CREATE TABLE tb_manualdata (
	id BIGINT auto_increment COMMENT '레코드id',
	facilityid VARCHAR(128) NULL DEFAULT NULL COMMENT '설비id',
	deviceid VARCHAR(128) NULL DEFAULT NULL COMMENT '센서id',
	val VARCHAR(128) NULL DEFAULT NULL COMMENT '측정값',
	author VARCHAR(128) NULL DEFAULT NULL COMMENT '측정자',
	wdate DATETIME NULL DEFAULT curdate() COMMENT '생성일시',
	PRIMARY KEY(id)
)
COMMENT='센서데이터 수기입력';

# 2022-05-11 회사별 정보 관리
CREATE TABLE tb_company (
	id BIGINT auto_increment COMMENT '레코드id',
	cid VARCHAR(128) NULL DEFAULT NULL COMMENT '레코드id(cmp_~~)',
	name VARCHAR(128) NULL DEFAULT NULL COMMENT '회사명',
	tel VARCHAR(128) NULL DEFAULT NULL COMMENT '전화번호',
	fax VARCHAR(128) NULL DEFAULT NULL COMMENT 'FAX번호',
	daepyo VARCHAR(128) NULL DEFAULT NULL COMMENT '대표자',
	sano VARCHAR(128) NULL DEFAULT NULL COMMENT '사업자번호',
	addr VARCHAR(128) NULL DEFAULT NULL COMMENT '주소',
	udate DATETIME NULL DEFAULT curdate() COMMENT '업데이트일시',
	wdate DATETIME NULL DEFAULT curdate() COMMENT '생성일시',
	PRIMARY KEY(id)
)
COMMENT='회사 정보';


CREATE TABLE tb_device_status_log (
deviceid varchar(128) COMMENT '단말id',
last_datarecv_time DATETIME COMMENT '최종 데이터 수신시간',
datacnt INT COMMENT '데이터수',
duration INT COMMENT '경과시간'
) COMMENT '단말 상태체크로그';


CREATE VIEW vw_tsdb_meta as

SELECT NAME mname, name mdesc, 'tsdb' mtype, '-' mpath, '-' mtable, '' opath, d.ourl ourl, d.db odatabase, name otable,NULL mkey, 'MANUAL' mscheduletype, null mschedule, state mstate, wdate    
FROM tb_device d,

(SELECT 
CONCAT('http://',
(SELECT `value` FROM tb_config WHERE `key`='influxdb_id'),
':',
(SELECT `value` FROM tb_config WHERE `key`='influxdb_pwd'),
'@',
(SELECT `value` FROM tb_config WHERE `key`='influxdb_ip'),
':',
(SELECT `value` FROM tb_config WHERE `key`='influxdb_port'),
'/query?db=',
(SELECT `value` FROM tb_config WHERE `key`='influxdb_db'),
'&q={qry}') ourl, (SELECT `value` FROM tb_config WHERE `key`='influxdb_db') db
) d

tb_user
-company
-role(admin/operator/user)

tb_group
-company

tb_metainfo
-company

tb_sensor
-company

tb_device
-company

