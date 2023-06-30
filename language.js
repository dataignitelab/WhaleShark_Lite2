// 언어적용 관련...

/*
적용방법

적용할 항목의 data-lang 속성을 작성하고 data-lang 속성 값에 해당하는 메세지를 langs 에 언어별로 정의한다. 
<div data-lang='id'>test</div>

	[<span data-lang='hello'>mjghj</span>]

	<select>

		<option data-lang='all'>all</option>
    </select>
    
	
	<input placeholder="언어적용1" title="언어적용2" data-lang="mid1:placeholder,mid2:title"> mid1은 placeholder에 mid2 는 title 에 적용됨
	<button title="txt" data-lang="mid1:title,mid2">txt2</button>  mid1은 title에 mid2는 버튼 txt에 
	
	
	lang()
	{1}~{5}

*/


var langs = {
    ko: {
		// common 
		sel_lang:"언어({1})",
		ko:"한국어",
		en:"영어",
		mn:"몽골어",
		common_company_name:"회사명",
		common_bigo:"비고",
		common_operator:"운영자",
		common_user:"사용자",
		common_pwd:"비밀번호",
		common_new_pwd:"새 비밀번호",
		common_username:"사용자명",
		common_search_btn:"검색",
		common_cancel_btn:"취소",
		common_ok_btn:"확인",
		common_close_btn:"닫기",
		common_yes_btn:"예",
		common_no_btn:"아니오",
		common_ceo:"대표자",
		common_tel:"전화번호",
		common_fax:"팩스",
		common_mobile:"핸드폰",
		common_address:"주소",
		common_email:"이메일",
		common_find_pwd:"비밀번호찾기",
		common_input_error:"입력오류",
		common_msg_saving:"정보저장중",
		common_msg_error:"에러가 발생했습니다.",
		common_delete_btn:"삭제",
		common_modify_btn:"수정",
		common_save_btn:"저장",
		common_new_btn:"신규",
		common_msg_delete_confirm:"[{1}] 정보를 삭제 할까요?",
		common_msg_deleting:"정보 삭제중",
		common_msg_delete_failed:"정보 삭제에 실패하였습니다.",
		common_dataname:" 데이터명",
		common_description:" 설명",
		common_datatype:" 데이터유형",
		common_state:" 상태",
		common_schedule:" 스케쥴",
		common_wdate:" 등록일시",
		common_udate:" 수정일시",
		common_action:" Actions",
		common_manual:"수동",
		common_state:"상태",
		common_state_active:"활성",
		common_state_inactive:"비활성",
		common_saving:"정보저장중",
		common_msg_saved:"저장되었습니다.",
		common_msg_inputvalue:"{1}값을 입력해주세요!",
		common_msg_save_failed:"저장에 실패 하였습니다.",
		common_day:"일",
		common_hour:"시간",
		common_minute:"분",
		common_second:"초",
		common_info_none:"정보없음",
		common_metadata_select:"통합데이터선택",
		common_msg_select_metadata:"통합데이터를 선택해주세요.",
		common_msg_select_file:"파일을 선택해주세요.",
		common_file_upload:"파일 업로드",
		common_directory:"디렉토리",
		common_filename:"파일명",
		common_filesize:"파일크기",
		common_overwrite:"덮어쓰기",
		common_skip:"건너뛰기",
		common_upload_btn:"업로드",
		common_refresh_btn:"Refresh",
		common_metadata_name:"통합데이터명",
		common_status:"status",
		common_start_time:"시작시간",
		common_dur_end_time:"경과시간(종료시간)",
		common_description:"설명",
		common_file_select:"파일선택",
		common_input_manual:"직접입력",
		common_from_day:"시작일",
		common_to_day:"종료일",
		common_userid:"사용자id",
		common_name:"이름",
		common_company:"회사",
		common_id:"아이디",
		common_not_selected:"선택없음",
		common_edit_btn:"편집",
		common_column_select:"컬럼선택",
		common_msg_searching:"검색중...",
		common_time:"시간",
		common_hh:"시",
		common_mm:"분",
		common_ss:"초",
		common_setting_btn:"설정",
		common_metadata:"통합데이터",
		common_use_role:"소속그룹 ",
		common_group_name:"그룹명",
		common_add_btn:"추가",
		common_sensor:"센서",
		common_state_registering:"가입중",
		common_state_reject:"거절",
		common_state_question:"질문",
		common_state_answer:"답변",
		common_state_error:"고장",
		common_state_fixing:"수리중",
		common_state_fixed:"수리완료",
		common_state_main:"메인메뉴",
		common_state_sub:"서브메뉴",
		common_state_div:"구분자",
		common_role_admin:"어드민",
		common_role_team:"팀",
		common_role_user:"개인",
		common_grid_emptytable:"데이터가 없습니다.",
		common_grid_lengthmenu:"페이지당 _MENU_ 개씩 보기",
		common_grid_info:"현재 _START_ - _END_ / _TOTAL_건",
		common_grid_infoempty:"데이터 없음",
		common_grid_infofiltered:"( _MAX_건의 데이터에서 필터링됨 )",
		common_grid_search: " 검색: ",
		common_grid_zerorecords:"일치하는 데이터가 없어요.",
		common_grid_loadingrecords: "로딩중...",
		common_grid_processing:"잠시만 기다려 주세요...",
		common_session_session_end:"세션종료",
		common_session_msg_relogin:"로그인 세션이 종료되었습니다. 다시 로그인해주세요!",
		common_period:"기간",
		common_all:"전체",
		common_column:"컬럼",

		// login 
		login_title:"데이터 관리 도구",
		login_id:"사용자id",
		login_pwd:"패스워드",
		login_login:"로그인",
		login_findpassword:" 비밀번호 찾기",
		login_regist:"회원가입",
		login_copyright:"© Copyright (주)데이터센터릭 All rights reserved.",
		login_msg_ing:"로그인중",
		login_msg_login_error:"로그인에 실패 하였습니다.",
		login_msg_login_error_unknown:"로그인에 실패 하였습니다.(예기치 않은 오류)",
		login_msg_id_using:"{1} 는 이미 사용중입니다.",
		regist_info:"가입자정보",
		regist_account_info:"계정정보(*필수)",
		regist_company_info:"회사정보",
		regist_name:"이름 *",
		regist_id:"아이디 *",
		regist_email:"이메일 *",
		regist_pwd:"비밀번호 *",
		regist_pwd_chk:"비밀번호(확인) *",
		regist_permission:"권한 *",
		regist_btn:"가입신청",
		regist_return_email:"회신 이메일주소 *",
		regist_find_company:"회사검색",
		regist_select_company:"회사선택",
		regist_find_company_notfound:"검색데이터없음(직접등록)",
		regist_msg_name_empty:"이름을 입력하지 않았습니다.",
		regist_msg_id_empty:"아이디를 입력하지 않았습니다.",
		regist_msg_pwd_empty:"비밀번호를 입력하지 않았습니다.",
		regist_msg_email_empty:"이메일을 입력하지 않았습니다.",
		regist_msg_pwd_not_match:"비밀번호가 일치하지 않습니다.",
		regist_msg_company_empty:"회사명을 입력하지 않았습니다.",
		regist_msg_return_email_empty:"전송용 이메일을 입력하지 않았습니다.",
		regist_msg_regist_fail:"회원가입에 실패 하였습니다.",
		regist_msg_regist_ok:"회원가입이 처리되었습니다.",
		regist_msg_init_pwd:"비밀번호 초기화중입니다.",
		findpwd_email_subject:"WhaleShark 비밀번호 찾기 안내",
		findpwd_email_body:"회원님 안녕하세요 .<br>회원님의 비밀번호는 [<b>{1}</b>] 로  초기화 되었습니다.<br> 로그인후 비밀번호를 변경하여 주시기 바랍니다.",
		findpwd_sendmail:"메일발송",
		findpwd_notfound:"정보없음",
		findpwd_msg_notfound:"회원정보가 없습니다.",
		findpwd_msg_sendmail:"{1}로 메일을 발송하였습니다.",
		findpwd_msg_sendmail_fail:"{1}로 메일 발송에 실패하였습니다.",

		// main 
		main_myinfo_setting:"개인 정보 설정",
		main_logout:"로그아웃",
		main_myinfo_account_info:"계정 정보",
		main_myinfo_update:"변경내용저장",
		main_myinfo_msg_inp_pwd1:"정보변경시 현재 비밀번호를 입력해주세요!",
		main_myinfo_msg_inp_pwd2:"비밀번호 변경시에만 입력해주세요.",
		main_msg_logout:"로그아웃할까요?",
		main_msg_myinfo_change:"개인정보 변경",
		main_msg_myinfo_change_fail:"개인정보 변경실패",
		main_msg_save_relogin:"저장되었습니다. 다시로그인해주세요",
		main_msg_info_not_correct:"정보가 올바르지 않습니다.",
		
		// intro page title
		main_intro_title:"핵심 서비스",
		main_intro_sub_title:"데이터센트릭이 제공하는 퀄리티 높은 서비스를 경험하세요, 최고의 최적화된 서비스를 제공합니다.",
		main_intro_datamgr:"데이터 통합을 통해 정형, 비정형 데이터를 전환하고 확장하여 모든 시스템에 전달할 수 있습니다.",
		main_intro_data_analysis:"사용자의 비즈니스에 특화된 데이터 분석 및 모델링을 위한 최적의 분석 환경을 제공합니다.",
		
		main_intro_data_visualize:" 등록된 데이터를 라인차트, 바차트, 파이차트 등으로 시각화 하는 기능", //시각화 
		
		main_intro_databrowse:"등록된 데이터를 조회하는 기능",
		
		main_intro_monitoring:"시스템의 CPU, 메모리, 디스크 사용량을 모니터링하는 기능",
		
		main_intro_devicemgr:"IOT 센서와 단말의 연결 관리와 상태를 모니터링하는 기능",
		
		main_intro_modelnsvcmgr:"AI모델과 IOT서비스를 등록하고 배포하는 기능",
		main_intro_usernrolemgr:"사용자와 그룹 정보를 관리라고 메뉴 접근 권한을 설정하는 기능",
		
		
		
		
		
		
		// mainmenu
		main_menu_datamgr:"데이터 통합",
		main_menu_data_mgmt:"통합데이터 관리",
		main_menu_file_upload:"파일 업로드",
		main_menu_ftp_sync:"ftp 동기화",
		main_menu_rdb_sync:"rdb 동기화",
		main_menu_databrowse:"데이터 브라우즈",
		main_menu_data_grid:"데이터 그리드",
		main_menu_data_analysis:"분석",
		main_menu_auto_analysis1:"자동분석1",
		main_menu_auto_analysis:"자동분석",
		main_menu_analysis_tool:"분석도구",
		main_menu_analysis_env:"개인분석환경",
		main_menu_data_visualize:"시각화",
		main_menu_visualize_tool:"시각화 도구",
		main_menu_monitoring:"시스템 모니터링",
		main_menu_system_monitoring:"시스템 모니터링",
		main_menu_usagenhelp:"사용법 및 도움말",
		main_menu_usernrolemgr:"사용자및권한관리",
		main_menu_user_mgmt:"사용자관리",
		main_menu_group_mgmt:"사용자그룹관리",
		main_menu_menu_mgmt:"메뉴관리",
		main_menu_devicemgr:"수집장치관리",
		main_menu_sensor_mgmt:"센서관리",
		main_menu_device_mgmt:"단말관리",
		main_menu_modelnsvcmgr:"모델 및 서비스관리",
		main_menu_model_mgmt:"모델관리",
		main_menu_svc_mgmt:"서비스관리",
		
		// meta_mgr
		metamgr_add_btn:"통합데이터 등록",
		metamgr_generated:"자동생성",
		metamgr_add:"통합데이터정보 등록",
		metamgr_dataname:"* 통합데이터명",
		metamgr_datatype:"* 데이터종류",
		metamgr_savepath:"* 저장경로",
		metamgr_savetable:"* 저장테이블",
		metamgr_orgpath:"* 원본경로",
		metamgr_orgurl:"* 원본url",
		metamgr_orgdb:"* 원본database",
		metamgr_orgtable:"* 원본table",
		metamgr_collect_key:"수집key",
		metamgr_collect_type:"수집방식",
		metamgr_collect_schedule:"수집스케쥴",
		metamgr_generated:"자동생성",
		metamgr_modify:"통합데이터 정보수정",
		metamgr_datainfo:"통합데이터정보",
		
		// FileUpload
		fileupload_select:"* 파일선택",
		fileupload_dup_process:"중복처리",
		fileupload_msg_metadata_empty:"통합데이터를 선택후 업로드 해주세요.",
		fileupload_file_empty:"파일을 선택하지 않았습니다.",
		fileupload_msg_uploading:"파일 업로드중입니다.",
		fileupload_msg_upload_confirm:"파일을 업로드 할까요 ?",
		fileupload_msg_success:"파일업로드가 완료되었습니다.",
		fileupload_msg_failed:"데이터 업로드가 실패 하였습니다.",
		fileupload_msg_delete_confirm:"{1} 파일을  삭제 할까요?",
		fileupload_msg_deleting:"파일 삭제중",
		fileupload_delete:"파일삭제",
		fileupload_msg_delete_failed:"파일 삭제에 실패하였습니다.",
		
		//ftp synchronized
		ftpsync_msg_intro:"file 통합데이터정보를 이용하여 원본 ftp와 수동 동기화를 실행하거나 상태를 모니터링 합니다.",
		ftpsync_title:"ftp 동기화",
		ftpsync_msg_run_confirm:"[{1}] 동기화를 실행 할까요?",
		ftpsync_msg_sync_running:"ftp동기화 실행중",
		ftpsync_msg_kill_confirm:"[{1}] 강제동료 할까요?",
		ftpsync_msg_sync_kill:"ftp동기화 강제종료중",
		ftpsync_exec:"프로세스실행",
		ftpsync_kill:"강제종료",
		
		//rdb synchronized
		rdbsync_title:"rdb 동기화",
		rdbsync_msg_intro:"rdb 통합데이터 정보를 이용하여 원본 rdb와 수동 동기화를 실행하거나 상태를 모니터링 합니다.",
		rdbsync_msg_run_confirm:"[{1}] 동기화를 실행 할까요?",
		rdbsync_msg_sync_running:"rdb동기화 실행중",
		rdbsync_msg_kill_confirm:"[{1}] 강제동료 할까요?",
		rdbsync_msg_sync_kill:"rdb동기화 강제종료중",
		rdbsync_exec:"프로세스실행",
		rdbsync_kill:"강제종료",
		
		//analysis1
		ana1_title:"자동분석1",
		ana1_refresh:" Refresh",
		ana1_param:"파라미터",
		ana1_manual_analysis:"수동 분석",
		ana1_auto_analysis:"자동 분석",
		ana1_msg_analysis_confirm:"분석을 실행할까요?",
		ana1_msg_analyzing:"데이터 분석실행중...",
		ana1_analysis_ok:"분석실행완료",
		ana1_msg_analysis_executed:"분석이 실행되었습니다.",
		ana1_msg_analysis_failed:"데이터 분석에 오류가 발생했습니다.",
		ana1_error:"에러",
		ana1_analysis_unable:"분석불가",
		ana1_analysis_success:"분석완료",
		ana1_msg_analysis_success:"데이터 분석이 완료되었습니다.",
		ana1_msg_analysis_confirm2:"{1} 분석을 실행할까요?",
		
		// analysis
		ana_title:"자동분석",
		ana_refresh:" Refresh",
		ana_cond_recent_1day:"최근1일",
		ana_cond_recent_3day:"최근3일",
		ana_cond_recent_7day:"최근7일",
		ana_exec_auto:"자동분석실행",
		ana_intro:"※ 자동분석에서는 선택한 데이터를 이용하여 모든알고리즘을 배치분석하여 분석결과를 제공합니다.<br>\
                        ※ 데이터에따라 실행 되지 않는 알고리즘도 있을수 있습니다.</br>\
                        ※ 분석을위한 알고리즘 파라미터는 초기값을 사용하고 종속변수/기준레이블 은 마지막컬럼을 사용합니다.",
		ana_algorithm_name:"알고리즘명",
		ana_exec_stime:"실행일시",
		ana_exec_etime:"종료일시",
		ana_msg_analyzing:"데이터 분석중...",
		ana_msg_analysis_failed:"데이터 분석에 오류가 발생했습니다.",
		ana_error:"에러",
		ana_msg_metadata_empty:"통합데이터를 선택하지 않았습니다.",
		ana_msg_start_empty:"시작일을 선택하지 않았습니다.",
		ana_msg_end_empty:"종료일을 선택하지 않았습니다.",
		ana_auto_analysis:"자동 분석",
		ana_msg_analysis_confirm:"분석을 실행할까요?",		
		ana_result_view:"결과보기",
		
		// analysis_tool
		anatool_title:"분석도구",
		anatool_data_dur:"데이터 기간",
		anatool_manual_select:"직접선택",
		anatool_cond_recent_1day:"최근1일",
		anatool_cond_recent_3day:"최근3일",
		anatool_cond_recent_7day:"최근7일",
		
		// visualize
		vis_title:"시각화 목록",
		vis_add:"시각화 화면 추가",
		vis_name:"시각화명",
		vis_msg_delete_confirm:"[{1}] 화면을  삭제 할까요?'",
		vis_msg_deleting:"시각화 화면 삭제중",
		vis_msg_delete_failed:"시각화 화면 삭제에 실패하였습니다.",
		vis_preview:"미리보기",
		vis_screen:"시각화 화면",
		vis_recent_1min:"최근1분",
		vis_recent_3min:"최근3분",
		vis_recent_5min:"최근5분",
		vis_recent_10min:"최근10분",
		vis_no_refresh:"갱신안함",
		vis_every_3sec_refresh:"3초주기갱신",
		vis_every_5sec_refresh:"5초주기갱신",
		vis_every_10sec_refresh:"10초주기갱신",
		
		vis_add_linechart:"라인차트 추가",
		vis_add_barchart:"바차트 추가",
		vis_add_piechart:"파이차트 추가",
		vis_add_text:"Text추가",
		vis_back_image:"배경이미지",
		vis_clear_back:"배경지우기",
		vis_layout_edit:"레이이아웃편집",
		vis_export:"Export",
		vis_view_export:"시각화 Export",
		vis_export_comment:"export 코드 <br><font color=red>오른쪽 코드를 외부 웹 콘텐츠에 붙여 넣으세요.</font>",
		vis_save_dashboard:"대시보드저장",
		vis_setting:"설정 선택",
		vis_txt_label:"텍스트:",
		vis_txtcolor_label:"글자색:",
		vis_backcolor_label:"배경색:",
		vis_fontsize_label:"폰트크기: ",
		vis_fontweight_label:"폰트굵기: ",
		vis_fontname_label:"폰트종류: ",
		vis_error:"오류",
		vis_msg_metadata_empty:"통합데이터를 선택하지 않았습니다.",
		vis_msg_column_empty:"컬럼을 선택하지 않았습니다.",
		vis_msg_start_empty:"검색 시작일을 입력하지 않았습니다.",
		vis_msg_end_empty:"검색 종료일을 입력하지 않았습니다.",
		vis_modify:"시각화 수정 - {1}",
		vis_fix_layout:"레이아웃고정",
		vis_dashboard:"대시보드",
		vis_msg_dashboard_new_confirm:"대시보드를 새로 만드시겠습니까?",
		vis_save_error:"저장오류",
		vis_msg_save_error:"저장에 오류가 발생했습니다.",
		vis_msg_chg_text_input:"변경할문자열?",
		vis_msg_chg_text_sensorinput:"변경할문자열({} 에는 센서값이 치환됩니다.)?",
		
		// data grid
		datagrid_title:"데이터그리드",
		datagrid_data_detail_view:"데이터 상세 정보조회",
		datagrid_detail_view:"상세정보조회",
		datagrid_msg_detail_view_confirm:"상세 정보조회를 실행할까요? (데이터의 크기에따라 수분이 소요될수도 있습니다.)",
		datagrid_msg_detail_analyzing:"데이터 상세 정보분석중...",
		datagrid_msg_analyzed:"분석이 완료되었습니다.",
		datagrid_msg_analyze_error:"데이터 분석에 오류가 발생했습니다.",
		datagrid_analyzed:"분석완료",
		datagrid_col_name:"컬럼명",
		datagrid_max_val:"최댓값",
		datagrid_min_val:"최솟값",
		datagrid_data_cnt:"데이터수",
		datagrid_missing_data_cnt:"결측데이터수(비율%)",
		datagrid_avg:"평균",
		datagrid_dist:"분산",
		datagrid_sum:"합",
		datagrid_max_length:"최대길이",
		datagrid_freq_cnt:"데이터빈도수",
		datagrid_cnt:"{1}개",
		datagrid_top_n:"Uniq 데이터, 상위{1}개만 출력",
		datagrid_cnts:"개수",
		datagrid_error:"에러",
		datagrid_cond_recent_1day:"최근1일",
		datagrid_cond_recent_3day:"최근3일",
		datagrid_cond_recent_7day:"최근7일",

		// monitoring
		monitoring_title:"시스템모니터링",
		monitoring_cpu_usage:"cpu 사용율",
		monitoring_memory_usage:"메모리 사용",
		monitoring_disk_usage:"디스크 사용량",
		monitoring_used:"사용",
		monitoring_free:"여유",
		monitoring_network_in:"네트워크In",
		monitoring_network_out:"네트워크Out",
		monitoring_network_usage:"network트래픽",
		
		// help
		usage_title:"사용안내",
		usage_content:"                    사용순서:\n\
                    \n\
                    초기 접속 계정 : admin/admin\n\
                    \n\
                    <b>1. 사용자및권한관리> 사용자그룹관리 :</b> 사용자에게 지정할 그룹을 관리한다.\n\
                    \n\
                    <b>2. 사용자및권한관리> 사용자관리 :</b> 사용자 계정을 관리한다.\n\
                    \n\
                    <b>3. 데이터 통합 :</b> 메타 관리 및 데이터 수집.\n\
                    \n\
                    <b>4. 데이터 브라우즈 :</b> 통합 데이터 조회 및 기본 처리.\n\
                    \n\
                    <b>5. 분석 :</b> 데이터분석\n\
                    \n\
                    <b>6. 시각화 :</b> 데이터 분석 결과 또는 수집 데이터의 visualization.\n\
                    \n\
                    <b>7. 시스템 모니터링 :</b> 자원의 상태를 모니터링 및 사용법.\n\
                    \n",

		// user mgmt
		usermgmt_title:"사용자관리",
		usermgmt_msg_change_pwd:"비밀번호를 변경시에만 입력하세요..",
		usermgmt_name_empty:"이름을 입력하지 않았습니다.",
		usermgmt_pwd_empty:"비밀번호를 입력하지 않았습니다.",
		usermgmt_email_empty:"이메일을 입력하지 않았습니다.",
		usermgmt_add:"사용자 등록",
		usermgmt_modify:"사용자 정보수정",
		usermgmt_user_info:"사용자정보",
		usermgmt_user_company:" 소속회사",
		usermgmt_user_permission:" 사용권한",
		usermgmt_user_group:" 소속그룹",
		usermgmt_user_permission:"사용권한",
		
		//group mgmt
		groupmgmt_title:"사용자그룹관리",
		groupmgmt_add:"그룹등록",
		groupmgmt_modify:"그룹 정보수정",
		groupmgmt_group_name_empty:"그룹명을 입력하지 않았습니다.",
		groupmgmt_group_info:"그룹정보",
		
		//menu mgmt
		menumgmt_title:"메뉴관리",
		menumgmt_add:"메뉴등록",
		menumgmt_modify:"메뉴 정보수정",
		menumgmt_msg_menu_name_empty:'메뉴명을 입력하지 않았습니다.',
		menumgmt_msg_parent_menu_empty:"상위메뉴를 선택하지않았습니다.",
		menumgmt_msg_menu_seq_empty:"메뉴순서를 입력하지 않았습니다.",
		menumgmt_msg_menu_link_empty:"메뉴링크를 입력하지 않았습니다.",
		menumgmt_menu_info:"메뉴정보",
		menumgmt_found:"{1} 개 검색됨",
		menumgmt_parent_menu:" 상위메뉴",
		menumgmt_menu_name:" 메뉴명",
		menumgmt_menu_type:" 메뉴종류",
		menumgmt_menu_seq:"메뉴순서",
		menumgmt_menu_link:" 메뉴링크",
		menumgmt_menu_read_perm:" 조회권한",
		menumgmt_menu_write_perm:" 수정권한",
		menumgmt_menu_type_main:"메인메뉴",
		menumgmt_menu_type_sub:"서브메뉴",
		menumgmt_menu_type_div:"구분자",
		menumgmt_group_or_user:"그룹또는사용자",
		
		// sensor mgmt
		sensor_add:" 센서등록",
		sensor_modify:"센서 정보수정",
		sensor_info:"센서정보",
		sensor_msg_name_empty:"센서명을 입력하지 않았습니다.",
		sensor_name:" 센서명",
		sensor_value_type:" 센서값형식",
		sensor_value_range:" 센서값범위",
		sensor_value_unit:" 센서값단위",
		sensor_var_name:" 변수명",
		
		//device mgmt
		device_add:"단말 등록",
		device_modify:"단말 정보수정",
		device_info:"단말정보",
		device_state_running:"수집중",
		device_running_time:", 운영시간:{1}",
		device_state_notrunning:"동작안함",
		device_state_running:"수집중",
		device_state_stopped:"수집멈춤",
		device_msg_devicename_not_inputed:"단말명을 입력하지 않았습니다.",
		device_name:" 단말명",
		device_sensor_list:" 센서목록",
		device_collect_state:" 수집상태",
		device_collect_state_title:"동작안함-수신데이터가전혀없을시/수집중/수집멈춤-10분간데이터수신없을시",
		
		// model mgmt
		modelmgmt_title:"모델관리",
		modelmgmt_add:"모델등록",
		modelmgmt_modify:"모델 정보수정",
		modelmgmt_info:"모델정보",
		modelmgmt_name:"모델명",
		modelmgmt_file_code:"모델파일/실행코드",
		modelmgmt_version:"버젼",
		modelmgmt_apply_device:"적용단말",
		modelmgmt_apply_time:"적용일시",
		modelmgmt_msg_model_name_empty:"모델명을 입력하지 않았습니다.",
		modelmgmt_msg_apply_time_empty:"모델 적용시간을 입력하지 않았습니다.",
		
		// svc mgmt
		svcmgmt_title:"서비스관리",
		svcmgmt_add:"서비스등록",
		svcmgmt_modify:"서비스 정보수정",
		svcmgmt_info:"서비스정보",
		svcmgmt_name:"서비스명",
		svcmgmt_msg_id_empty:"서비스id를 입력하지 않았습니다.",
		svcmgmt_msg_name_empty:"서비스명을 입력하지 않았습니다.",
		svcmgmt_msg_file_empty:"서비스배포 파일을 선택하지 않았습니다.",
		svcmgmt_deploy_ok:"서비스 배포완료",
		svcmgmt_msg_deployed:"서비스가 배포되었습니다.",
		svcmgmt_msg_upload_failed:"데이터 업로드가 실패 하였습니다.",
		svcmgmt_msg_alphanumeric_only:"영숫자만 입력",
		svcmgmt_id:"서비스id",
		svcmgmt_url:"서비스 url",
		svcmgmt_deploy_file:"서비스 배포파일",
	  
    },
    en: {
		// common 
		sel_lang:"Language({1})",
		ko:"Korean",
		en:"English",
		mn:"Mongolian",
		common_company_name:"Company Name",
		common_bigo:"Remarks",
		common_operator:"Operator",
		common_user:"User",
		common_pwd:"Password",
		common_new_pwd:"New Password",
		common_username:"User Name",
		common_search_btn:"Search",
		common_cancel_btn:"Cancel",
		common_ok_btn:"OK",
		common_close_btn:"Close",
		common_yes_btn:"Yes",
		common_no_btn:"No",
		common_ceo:"CEO",
		common_tel:"Telephone",
		common_fax:"Fax",
		common_mobile:"Mobile Phone",
		common_address:"Address",
		common_email:"Email Address",
		common_find_pwd:"Find Password",
		common_input_error:"Input Error",
		common_msg_saving:"Saving",
		common_msg_error:"An error has occurred.",
		common_delete_btn:"Delete",
		common_modify_btn:"Modify",
		common_save_btn:"Save",
		common_new_btn:"New",
		common_msg_delete_confirm:"Do you want to delete [{1}]?",
		common_msg_deleting:"Deleting",
		common_msg_delete_failed:"Failed to delete",
		common_dataname:"Data Name",
		common_description:"Description",
		common_datatype:"Data Type",
		common_state:"State",
		common_schedule:"Schedule",
		common_wdate:"Date of registration",
		common_udate:"Date of modification",
		common_action:"Actions",
		common_manual:"Manual",
		common_state:"State",
		common_state_active:"Active",
		common_state_inactive:"Inactive",
		common_saving:"Saving",
		common_msg_saved:"Message Saved",
		common_msg_inputvalue:"Input {1}.",
		common_msg_save_failed:"Failed to save.",
		common_day:"Day",
		common_hour:"Hour",
		common_minute:"Minute",
		common_second:"Second",
		common_info_none:"No information",
		common_metadata_select:"Integrated data selection",
		common_msg_select_metadata:"Select integrated data.",
		common_msg_select_file:"Select a file.",
		common_file_upload:"File Upload",
		common_directory:"Directory",
		common_filename:"File name",
		common_filesize:"File size",
		common_overwrite:"Overwrite",
		common_skip:"Skip",
		common_upload_btn:"Upload",
		common_refresh_btn:"Refresh",
		common_metadata_name:"Integrated Data Name",
		common_status:"Status",
		common_start_time:"Starting Time",
		common_dur_end_time:"Duration(Ending time)",
		common_description:"Description",
		common_file_select:"File selection",
		common_input_manual:"Manual input",
		common_from_day:"Starting date",
		common_to_day:"Ending date",
		common_userid:"User ID",
		common_name:"Name",
		common_company:"Company",
		common_id:"ID",
		common_not_selected:"None selected",
		common_edit_btn:"Edit",
		common_column_select:"Select column",
		common_msg_searching:"Searching...",
		common_time:"Time",
		common_hh:"Hour",
		common_mm:"Minute",
		common_ss:"Second",
		common_setting_btn:"Setting",
		common_metadata:"Integrated data",
		common_use_role:"Group",
		common_group_name:"Group Name",
		common_add_btn:"Add",
		common_sensor:"Sensor",
		common_state_registering:"Registering",
		common_state_reject:"Reject",
		common_state_question:"Question",
		common_state_answer:"Answer",
		common_state_error:"Error",
		common_state_fixing:"Fixing",
		common_state_fixed:"Fixed",
		common_state_main:"Main menu",
		common_state_sub:"Sub menu",
		common_state_div:"Separator",
		common_role_admin:"Admin",
		common_role_team:"Team",
		common_role_user:"Personal",
		common_grid_emptytable:"No data.",
		common_grid_lengthmenu:"View _MENU_ per page",
		common_grid_info:"Current _START_ - _END_ / _TOTAL_",
		common_grid_infoempty:"no data",
		common_grid_infofiltered:"( Filtered from _MAX_ cases of data )",
		common_grid_search: " Search: ",
		common_grid_zerorecords:"No matching data.",
		common_grid_loadingrecords: "Loading...",
		common_grid_processing:"Please wait for a moment...",
		common_session_session_end:"Session End",
		common_session_msg_relogin:"Your login session has ended. Please log in again!",
		common_period:"Period",
		common_all:"All",
		common_column:"Column",

		// login 
	    login_title:"Data Management Tool",
	    login_id:"user id",
	    login_pwd:"password",
		login_login:"Sign in",
		login_findpassword:"Find password",
		login_regist:"Registration",
		login_copyright:"© Copyright DataCentric inc. All rights reserved.",
		login_msg_ing:"Logging in",
		login_msg_login_error:"Failed to log in",
		login_msg_login_error_unknown:"Failed to log in. (Unexpected error)",
		login_msg_id_using:"{1} is already in use.",
		regist_info:"Member information",
		regist_account_info:"Account information (*Mandatory)",
		regist_company_info:"Company information",
		regist_name:"name *",
		regist_id:"id *",
		regist_email:"email address *",
		regist_pwd:"password *",
		regist_pwd_chk:"password(check) *",
		regist_permission:"permission *",
		regist_btn:"register",
		regist_return_email:"return email address *",
		regist_find_company:"find company",
		regist_select_company:"select company",
		regist_find_company_notfound:"Not found(Register)",
		regist_msg_name_empty:"Name is missing.",
		regist_msg_id_empty:"ID is missing.",
		regist_msg_pwd_empty:"Password is missing.",
		regist_msg_email_empty:"Email address is missing.",
		regist_msg_pwd_not_match:"The passwords do not match.",
		regist_msg_company_empty:"Company name is missing.",
		regist_msg_return_email_empty:"Return email address is missing.",
		regist_msg_regist_fail:"Registration has failed.",
		regist_msg_regist_ok:"Registration success",
		regist_msg_init_pwd:"Resetting password.",
		findpwd_email_subject:"WhaleShark Password Search Information",
		findpwd_email_body:"Hello? <br>Your password has been reset to [<b>{1}</b>].<br> Please change the password after signing in.",
		findpwd_sendmail:"Email has been sent.",
		findpwd_notfound:"Not found",
		findpwd_msg_notfound:"User information has not been found.",
		findpwd_msg_sendmail:"Mail was sent to {1}.",
		findpwd_msg_sendmail_fail:"Failed to send the mail to {1}.",

		// main 
		main_myinfo_setting:"User information setting",
		main_logout:"Log out",
		main_myinfo_account_info:"User information",
		main_myinfo_update:"Information update",
		main_myinfo_msg_inp_pwd1:"Please input this password when updating information.",
		main_myinfo_msg_inp_pwd2:"Please input this password only when updating information.",
		main_msg_logout:"Logging out?",
		main_msg_myinfo_change:"User information update",
		main_msg_myinfo_change_fail:"Failed to update user information",
		main_msg_save_relogin:"Successfully saved. Please sign in again.",
		main_msg_info_not_correct:"Incorrect information",
		
		//Main Intro 
		main_intro_title:"Core Services",
		main_intro_sub_title:"Experience high-quality services provided by DataCentric, delivering the best optimized services.",
		main_intro_datamgr:"Data integration allows you to transform, scale, and deliver structured, unstructured data to any system.",
		main_intro_data_analysis:"Provides the best analytics experience for analyzing and modeling data specifically for your business.",
		
		main_intro_data_visualize:"Ability to visualize registered data into line charts, bar charts, pie charts, etc", //시각화 
		
		main_intro_databrowse:"Ability to query registered data",
		
		main_intro_monitoring:"Ability to monitor system CPU, memory, and disk usage",
		
		main_intro_devicemgr:"Ability to monitor connection management and status of IOT sensors and terminals",
		
		main_intro_modelnsvcmgr:"Ability to register and distribute AI models and IOT services",
		main_intro_usernrolemgr:"Ability to set menu access to Manage user and group information",
		
		// mainmenu
		main_menu_datamgr:"Data integration",
		main_menu_data_mgmt:"Integrated data management",
		main_menu_file_upload:"File upload",
		main_menu_ftp_sync:"ftp synchronization",
		main_menu_rdb_sync:"rdb synchronization",
		main_menu_databrowse:"Data browse",
		main_menu_data_grid:"Data grid",
		main_menu_data_analysis:"Data analysis",
		main_menu_auto_analysis1:"Auto analysis 1",
		main_menu_auto_analysis:"Auto analysis",
		main_menu_analysis_tool:"Analysis tool",
		main_menu_analysis_env:"Personal Analysis Tools",
		main_menu_data_visualize:"Visualization",
		main_menu_visualize_tool:"Visualization tool",
		main_menu_monitoring:"System monitoring",
		main_menu_system_monitoring:"System monitoring",
		main_menu_usagenhelp:"Usage help",
		main_menu_usernrolemgr:"Management of users and rights",
		main_menu_user_mgmt:"User management",
		main_menu_group_mgmt:"User group management",
		main_menu_menu_mgmt:"Menu management",
		main_menu_devicemgr:"Collection device management",
		main_menu_sensor_mgmt:"Sensor management",
		main_menu_device_mgmt:"Device management",
		main_menu_modelnsvcmgr:"Model and service management",
		main_menu_model_mgmt:"Model management",
		main_menu_svc_mgmt:"Service management",
		
		// meta_mgr
		metamgr_add_btn:"Integrated data registration",
		metamgr_generated:"Auto generation",
		metamgr_add:"Integrated data information registration",
		metamgr_dataname:"* Integrated data name",
		metamgr_datatype:"* Data type",
		metamgr_savepath:"* Saving path",
		metamgr_savetable:"* Saving table",
		metamgr_orgpath:"* Original path",
		metamgr_orgurl:"* Original url",
		metamgr_orgdb:"* Original database",
		metamgr_orgtable:"* Original table",
		metamgr_collect_key:"Collection key",
		metamgr_collect_type:"Collection type",
		metamgr_collect_schedule:"Collection schedule",
		metamgr_generated:"Auto generation",
		metamgr_modify:"Integrated data information modification",
		metamgr_datainfo:"Integrated data information",
		
		// FileUpload
		fileupload_select:"* File selection",
		fileupload_dup_process:"When duplicate",
		fileupload_msg_metadata_empty:"Please upload after selecting integrated data.",
		fileupload_file_empty:"No file was selected.",
		fileupload_msg_uploading:"Uploading",
		fileupload_msg_upload_confirm:"Do you want to upload the file?",
		fileupload_msg_success:"File upload completed",
		fileupload_msg_failed:"Data uploading has failed.",
		fileupload_msg_delete_confirm:"Do you want to delete {1}?",
		fileupload_msg_deleting:"Deleting",
		fileupload_delete:"Deletion success",
		fileupload_msg_delete_failed:"No file has been deleted.",
		
		//ftp synchronized
		ftpsync_msg_intro:"We execute manual synchronization with the original ftp or monitor the status using the file integrated data information",		
		ftpsync_title:"ftp synchronization",
		ftpsync_msg_run_confirm:"Do you want to run synchronization of [{1}]?",
		ftpsync_msg_sync_running:"ftp synchronization in progress",
		ftpsync_msg_kill_confirm:"Do you want to force quit[{1}]?",
		ftpsync_msg_sync_kill:"ftp synchronization force quit in progress",
		ftpsync_exec:"execution in progress",
		ftpsync_kill:"force quit",
		
		//rdb synchronized
		rdbsync_title:"rdb synchronization",
		rdbsync_msg_intro:"We execute manual synchronization of originzal rdb or monitor the status using rdb integrated data information.",
		rdbsync_msg_run_confirm:"Do you want to run synchronization of [{1}]?",
		rdbsync_msg_sync_running:"rdb synchronization in progress",
		rdbsync_msg_kill_confirm:"Do you want to force quit[{1}]?",
		rdbsync_msg_sync_kill:"rdb synchronization force quit in progress",
		rdbsync_exec:"execution in progress",
		rdbsync_kill:"force quit",
		
		//analysis1
		ana1_title:"Auto analysis 1",
		ana1_refresh:" Refresh",
		ana1_param:"parameter",
		ana1_manual_analysis:"manual analysis",
		ana1_auto_analysis:"auto analysis",
		ana1_msg_analysis_confirm:"Do you want to start the analysis?",
		ana1_msg_analyzing:"Data analysis in progress",
		ana1_analysis_ok:"Analysis completed",
		ana1_msg_analysis_executed:"Analysis has completed.",
		ana1_msg_analysis_failed:"An error occurred during data analysis.",
		ana1_error:"error",
		ana1_analysis_unable:"analysis impossible",
		ana1_analysis_success:"analysis complete",
		ana1_msg_analysis_success:"Data analysis has completed.",
		ana1_msg_analysis_confirm2:"Do you want to start analyzing {1}?",
		
		// analysis
		ana_title:"auto analysis",
		ana_refresh:" Refresh",
		ana_cond_recent_1day:"Recent 1 day",
		ana_cond_recent_3day:"Recent 3 days",
		ana_cond_recent_7day:"Recent 7 days",
		ana_exec_auto:"Automatic analysis execution",
		ana_intro:"※ Automatic analysis provides analysis results by batch analysis of all algorithms using the selected data.<br>\
                        ※ Depending on the data, some algorithms may not be executed.</br>\
                        ※ The algorithm parameters for analysis use the initial values, and the dependent variable/reference label uses the last column.",
		ana_algorithm_name:"Algorithm name",
		ana_exec_stime:"Run time",
		ana_exec_etime:"End time",
		ana_msg_analyzing:"Data analysis in progress",
		ana_msg_analysis_failed:"An error occurred during data analysis.",
		ana_error:"에러",
		ana_msg_metadata_empty:"No integrated data has been selected.",
		ana_msg_start_empty:"No start date has been selected.",
		ana_msg_end_empty:"No end date has been selected.",
		ana_auto_analysis:"auto analysis",
		ana_msg_analysis_confirm:"Do you want to start analyzing?",		
		ana_result_view:"Result view",
		
		// analysis_tool
		anatool_title:"Analysis tool",
		anatool_data_dur:"data period",
		anatool_manual_select:"manual select",
		anatool_cond_recent_1day:"Recent 1 day",
		anatool_cond_recent_3day:"Recent 3 days",
		anatool_cond_recent_7day:"Recent 7 days",
		
		// visualize
		vis_title:"Visualization list",
		vis_name:"Visualization name",
		vis_add:"Add visualization screen",
		vis_msg_delete_confirm:"Do you want to delete [{1}]?'",
		vis_msg_deleting:"visualization screen deleting in progress",
		vis_msg_delete_failed:"Failed to delete visualization screen.",
		vis_preview:"Preview",
		vis_screen:"Visualization screen",
		vis_recent_1min:"Recent 1 min",
		vis_recent_3min:"Recent 3 min",
		vis_recent_5min:"Recent 5 min",
		vis_recent_10min:"Recent 10 min",
		vis_no_refresh:"Don't refresh",
		vis_every_3sec_refresh:"Refresh every 3 sec",
		vis_every_5sec_refresh:"Refresh every 5 sec",
		vis_every_10sec_refresh:"Refresh every 10 sec",
		
		vis_add_linechart:"Add a line chart",
		vis_add_barchart:"Add a bar chart",
		vis_add_piechart:"Add a pie chart",
		vis_add_text:"Add text",
		vis_back_image:"Background image",
		vis_clear_back:"Delete background",
		vis_layout_edit:"Edit layout",
		vis_export:"Export",
		vis_view_export:"Export vizualization",
		vis_export_comment:"export code <br><font color=red>Copy and paste the code on the right unto the web content.</font>",
		vis_save_dashboard:"Save dashboard",
		vis_setting:"Select setting",
		vis_txt_label:"Text:",
		vis_txtcolor_label:"Font color:",
		vis_backcolor_label:"Background color:",
		vis_fontsize_label:"Font size: ",
		vis_fontweight_label:"Font weight: ",
		vis_fontname_label:"Font type: ",
		vis_error:"Error",
		vis_msg_metadata_empty:"No integrated data has been selected.",
		vis_msg_column_empty:"No column has been selected.",
		vis_msg_start_empty:"Starting date is missing.",
		vis_msg_end_empty:"Ending date is missing.",
		vis_modify:"Visualization modification - {1}",
		vis_fix_layout:"Fix layout",
		vis_dashboard:"Dashboard",
		vis_msg_dashboard_new_confirm:"Do you want to make a new dashboard?",
		vis_save_error:"Saving error",
		vis_msg_save_error:"An error has occurred while saving.",
		vis_msg_chg_text_input:"String to change?",
		vis_msg_chg_text_sensorinput:"String to change({} replaces the sensor value.)?",
		
		// data grid
		datagrid_title:"Data grid",
		datagrid_data_detail_view:"View data in detail",
		datagrid_detail_view:"View data in detail",
		datagrid_msg_detail_view_confirm:"Do you want to view data in detail? (This could take minutes depending on the data size.)",
		datagrid_msg_detail_analyzing:"detail data analysis in progress...",
		datagrid_msg_analyzed:"Analysis completed.",
		datagrid_msg_analyze_error:"An error occurred during data analysis.",
		datagrid_analyzed:"Analysis completed",
		datagrid_col_name:"Column name",
		datagrid_max_val:"Maximum value",
		datagrid_min_val:"Minimum value",
		datagrid_data_cnt:"Number of data",
		datagrid_missing_data_cnt:"Number of missing data(Percent%)",
		datagrid_avg:"Average",
		datagrid_dist:"Distribution",
		datagrid_sum:"Sum",
		datagrid_max_length:"Maximum Length",
		datagrid_freq_cnt:"Data frequency",
		datagrid_cnt:"Number={1}",
		datagrid_top_n:"Uniq data, print top {1}",
		datagrid_cnts:"Number",
		datagrid_error:"Error",
		datagrid_cond_recent_1day:"Recent 1 day",
		datagrid_cond_recent_3day:"Recent 3 days",
		datagrid_cond_recent_7day:"Recent 7 days",

		// monitoring
		monitoring_title:"System monitoring",
		monitoring_cpu_usage:"cpu usage",
		monitoring_memory_usage:"memory usage",
		monitoring_disk_usage:"disk usage",
		monitoring_used:"used",
		monitoring_free:"free",
		monitoring_network_in:"Network In",
		monitoring_network_out:"Network Out",
		monitoring_network_usage:"Network Traffic",
		
		// help
		usage_title:"Help",
		usage_content:"                    How to use:\n\
                    \n\
                    Initial account : admin/admin\n\
                    \n\
                    <b>1. User and rights management> User group management :</b> Manage groups to assign users.\n\
                    \n\
                    <b>2. User and rights management> User management :</b> Manage user accounts.\n\
                    \n\
                    <b>3. Data integration :</b> Metadata management and data collection\n\
                    \n\
                    <b>4. Data browing :</b> View integrated data and basic processes\n\
                    \n\
                    <b>5. Analysis :</b> Data analysis\n\
                    \n\
                    <b>6. Visualization :</b> Data analysis results or visualization of collected data\n\
                    \n\
                    <b>7. System monitoring :</b> Monitoring of resource status and how to use it\n\
                    \n",

		// user mgmt
		usermgmt_title:"User management",
		usermgmt_msg_change_pwd:"Please enter the information only when you're changing the password.",
		usermgmt_name_empty:"Name is missing.",
		usermgmt_pwd_empty:"Password is missing.",
		usermgmt_email_empty:"Email address is missing.",
		usermgmt_add:"Add user",
		usermgmt_modify:"Modify user information",
		usermgmt_user_info:"User information",
		usermgmt_user_company:"Company",
		usermgmt_user_permission:"Authorization",
		usermgmt_user_group:"Group",
		usermgmt_user_permission:"Authorization",
		
		//group mgmt
		groupmgmt_title:"Management of user group",
		groupmgmt_add:"Add group",
		groupmgmt_modify:"Edit group",
		groupmgmt_group_name_empty:"Group name is missing.",
		groupmgmt_group_info:"Group information",
		
		//menu mgmt
		menumgmt_title:"Menu management",
		menumgmt_add:"Add menu",
		menumgmt_modify:"Modify menu information",
		menumgmt_msg_menu_name_empty:"Menu name is missing.",
		menumgmt_msg_parent_menu_empty:"Parent menu is missing.",
		menumgmt_msg_menu_seq_empty:"Menu order is missing.",
		menumgmt_msg_menu_link_empty:"Menu link is missing.",
		menumgmt_menu_info:"Menu information",
		menumgmt_found:"{1} was(were) found.",
		menumgmt_parent_menu:"Parent menu",
		menumgmt_menu_name:" Menu name",
		menumgmt_menu_type:" Menu type",
		menumgmt_menu_seq:"Menu order",
		menumgmt_menu_link:" Menu link",
		menumgmt_menu_read_perm:" Inquiry right",
		menumgmt_menu_write_perm:" Edit right",
		menumgmt_menu_type_main:"Main menu",
		menumgmt_menu_type_sub:"Sub menu",
		menumgmt_menu_type_div:"Separator",
		menumgmt_group_or_user:"Group or user",
		
		
		// sensor mgmt
		sensor_add:"Add sensor",
		sensor_modify:"Edit sensor information",
		sensor_info:"Sensor information",
		sensor_msg_name_empty:"Sensor name is missing.",
		sensor_name:"Sensor name",
		sensor_value_type:"Value type",
		sensor_value_range:" Value Range",
		sensor_value_unit:" Value Unit",
		sensor_var_name:" Variable",
		
		//device mgmt
		device_add:"Add device",
		device_modify:"Edit device information",
		device_info:"Device information",
		device_state_running:"Collection in progress",
		device_running_time:", Running time:{1}",
		device_state_notrunning:"Not running",
		device_state_running:"Collection in progress",
		device_state_stopped:"Collection stopped",
		device_msg_devicename_not_inputed:"Device name is missing.",
		device_name:"Device name",
		device_sensor_list:"Sensor list",
		device_collect_state:"Collect status",
		device_collect_state_title:"No operation - When there is no data to be received / Collection in progress / Stop collecting When there is no data reception for 10 minutes",
		
		// model mgmt
		modelmgmt_title:"Model management",
		modelmgmt_add:"Add model",
		modelmgmt_modify:"Edit model information",
		modelmgmt_info:"Model information",
		modelmgmt_name:"Model name",
		modelmgmt_file_code:"Model file/Execution code",
		modelmgmt_version:"Version",
		modelmgmt_apply_device:"Device to apply",
		modelmgmt_apply_time:"Time of application",
		modelmgmt_msg_model_name_empty:"Model name is missing.",
		modelmgmt_msg_apply_time_empty:"Model application time is missing.",
		
		// svc mgmt
		svcmgmt_title:"Service management",
		svcmgmt_add:"Add service",
		svcmgmt_modify:"Edit service information",
		svcmgmt_info:"Service information",
		svcmgmt_name:"Service name",
		svcmgmt_msg_id_empty:"Service id is missing.",
		svcmgmt_msg_name_empty:"Service name is missing.",
		svcmgmt_msg_file_empty:"Service distribution file has not been selected.",
		svcmgmt_deploy_ok:"Service distribution complete",
		svcmgmt_msg_deployed:"Service distribution has completed.",
		svcmgmt_msg_upload_failed:"Data upload has failed.",
		svcmgmt_msg_alphanumeric_only:"Enter alphanumeric characters only.",
		svcmgmt_id:"Service id",
		svcmgmt_url:"Service url",
		svcmgmt_deploy_file:"Service distribution file",

    },
    mn: {
		// common 
		sel_lang:"Хэл({1})",
		ko:"Солонгос",
		en:"Ангил",
		mn:"Монгол",
		common_company_name:"Компанийн нэр",
		common_bigo:"Тэмдэглэл",
		common_operator:"Удирдагч",
		common_user:"Хэрэглэгч",
		common_pwd:"Нууц дугаар",
		common_new_pwd:"Шинэ нууц дугаар",
		common_username:"Хэрэглэгчийн нэр",
		common_search_btn:"Хайлт",
		common_cancel_btn:"Цуцлах",
		common_ok_btn:"Батлах",
		common_close_btn:"Хаах",
		common_yes_btn:"Тийм",
		common_no_btn:"Үгүй",
		common_ceo:"Захирал",
		common_tel:"Утасны дугаар",
		common_fax:"Факс",
		common_mobile:"Гар утас",
		common_address:"Хаяг",
		common_email:"Цахим шуудан",
		common_find_pwd:"Нууц үг хайх",
		common_input_error:"Шивэлтийн алдаа",
		common_msg_saving:"Мэдээлэл хадгалаж байна",
		common_msg_error:"Алдаа гарлаа",
		common_delete_btn:"Устгах",
		common_modify_btn:"Засвар",
		common_save_btn:"Хадгалах",
		common_new_btn:"Шинэ",
		common_msg_delete_confirm:"[{1}] Мэдээлэл устгах уу?",
		common_msg_deleting:"Мэдээлэл устгаж байна",
		common_msg_delete_failed:"Мэдээлэл устгахад алдаа гарлаа",
		common_dataname:" Өгөгдлийн нэр",
		common_description:" Тайлбар",
		common_datatype:" Өгөгдлийн хэлбэр",
		common_state:" Төлөв",
		common_schedule:" Хөтөлбөр",
		common_wdate:" Бүртгэсэн өдөр",
		common_udate:" Засварласан өдөр",
		common_action:" Үйл ажиллагаа",
		common_manual:"Гар тохируулга",
		common_state:"Төлөв",
		common_state_active:"Идэвхтэй",
		common_state_inactive:"идэвхгүй",
		common_saving:"Мэдээлэл хадгалж байна",
		common_msg_saved:"Хадгалагдсан",
		common_msg_inputvalue:"{1} Мэдээлэл оруулна уу!",
		common_msg_save_failed:"Хадгалахад алдаа гарлаа",
		common_day:"Өдөр",
		common_hour:"Цаг",
		common_minute:"Минут",
		common_second:"Секунд",
		common_info_none:"Мэдээлэл байхгүй",
		common_metadata_select:"Нэгдсэн өгөгдөл сонгох",
		common_msg_select_metadata:"Нэгдсэн мэдээллийн устгана уу",
		common_msg_select_file:"Файлыг сонгоно уу",
		common_file_upload:"Файл байршуулах",
		common_directory:"Лавлах",
		common_filename:"Файлын нэр",
		common_filesize:"Файлын хэмжээ",
		common_overwrite:"Дарж бичих",
		common_skip:"Алхасах",
		common_upload_btn:"Байршуулах",
		common_refresh_btn:"Дахин сэргээх",
		common_metadata_name:"Нэгдсэн өгөгдлийн нэр",
		common_status:"Төлөв",
		common_start_time:"Эхлэх цаг",
		common_dur_end_time:"Хэтэрсэн цаг (Дуусах цаг)",
		common_description:"Тайлбар",
		common_file_select:"Файл сонгох",
		common_input_manual:"Шууд оруулах",
		common_from_day:"Эхлэх өдөр",
		common_to_day:"Дуусах өдөр",
		common_userid:"Хэрэглэгчийн id",
		common_name:"Нэр",
		common_company:"Компани",
		common_id:"Хэрэглэгчийн нэр",
		common_not_selected:"Сонгогдоогүй",
		common_edit_btn:"Эмхэтгэх",
		common_column_select:"Багана сонгох",
		common_msg_searching:"Хайж байна...",
		common_time:"Хугацаа",
		common_hh:"Цаг",
		common_mm:"Минун",
		common_ss:"Секунд",
		common_setting_btn:"Тохирго",
		common_metadata:"Нэгдсэн өгөгдөл",
		common_use_role:"Харьяа групп",
		common_group_name:"Группын нэр",
		common_add_btn:"Нэмэлт",
		common_sensor:"Сэнсор",
		common_state_registering:"Бүртгэж байна",
		common_state_reject:"Татгалзах",
		common_state_question:"Асуулт",
		common_state_answer:"Хариулт",
		common_state_error:"Гэмтэл",
		common_state_fixing:"Засварлаж байна",
		common_state_fixed:"Засварлаж дууссан",
		common_state_main:"Үндсэн цэс",
		common_state_sub:"Дэд цэс",
		common_state_div:"Ангилал",
		common_role_admin:"Админ",
		common_role_team:"Баг",
		common_role_user:"Хувь хүн",
		common_grid_emptytable:"Өгөгдөл байхгүй байна",
		common_grid_lengthmenu:"Хуудас бүрт _MENU_ ширхэгээр харах",
		common_grid_info:"Одоо _START_ - _END_ / _TOTAL_ ажиллагаа",
		common_grid_infoempty:"Өгөгдөл байхгүй",
		common_grid_infofiltered:"( _MAX_ажиллагаа өгөдлөөс шүүлтүүр хийгдсэн)",
		common_grid_search: " Хайлт: ",
		common_grid_zerorecords:"Ижил өгөгдөл байхгүй байна",
		common_grid_loadingrecords: "Ачааллаж байна...",
		common_grid_processing:"Түр хүлээнэ үү...",
		common_session_session_end:"Улирал дуусгах",
		common_session_msg_relogin:"Нэвтэрсэн улирал дууссан байна. Дахин нэвтэрнэ үү!",
		common_period:"хугацаа",
		common_all:"бүгд",
		common_column:"багана",

		// login 
		login_title:"Өгөгдөл удирдах багж",
		login_id:"Хэрэглэгчийн id",
		login_pwd:"Нууц үг",
		login_login:"Нэвтрэх",
		login_findpassword:"Нууц үг хайх",
		login_regist:"Гишүүнээр бүртгүүлэх",
		login_copyright:"© Copyright Data Centric Co. All rights reserved.",
		login_msg_ing:"Нэвтэрч байна",
		login_msg_login_error:"Нэвтэрхэд алдаа гарлаа",
		login_msg_login_error_unknown:"Нэвтэрхэд алдаа гарлаа (Үл мэдэгдэх алдаа)",
		login_msg_id_using:"{1} нь ашиглагдаж байна",
		regist_info:"Бүртгэлийн мэдээлэл",
		regist_account_info:"Дансны мэдээлэл (*Зайлшгүй)",
		regist_company_info:"Компанийн мэдээлэл",
		regist_name:"Нэр *",
		regist_id:"Хэрэглэгчийн нэр *",
		regist_email:"Цахим шуудан *",
		regist_pwd:"Нууц үг *",
		regist_pwd_chk:"Нууц үг (Батлах) *",
		regist_permission:"Эрх *",
		regist_btn:"Бүртгүүлэх хүсэлт",
		regist_return_email:"Хариу цахим хаяг *",
		regist_find_company:"Компани хайх",
		regist_select_company:"Компани сонгох",
		regist_find_company_notfound:"Хайсан өгөгдөл байхгүй байна (Шууд бүртгэх)",
		regist_msg_name_empty:"Нэр оруулаагүй байна.",
		regist_msg_id_empty:"Хэрэглэгчийн нэр оруулаагүй байна.",
		regist_msg_pwd_empty:"Нууц үг оруулаагүй байна.",
		regist_msg_email_empty:"Цахим хуудас оруулаагүй байна.",
		regist_msg_pwd_not_match:"Нууц үг тохирохгүй байна.",
		regist_msg_company_empty:"Компанийн нэр оруулаагүй байна.",
		regist_msg_return_email_empty:"Илгээх цахим хаяг оруулаагүй байна.",
		regist_msg_regist_fail:"Гишүүнчлэлийн бүртгэлд алдаа гарлаа.",
		regist_msg_regist_ok:"Гишүүнчлэлийн бүртгэл хийгдлээ.",
		regist_msg_init_pwd:"Нууц үг сэргээж байна.",
		findpwd_email_subject:"WhaleShark нууц үг хайх заавар",
		findpwd_email_body:"Сайн байна уу.<br> Гишүүний нууц үг [<b>{1}</b>] болж сэргээгдсэн.<br> нэвтэрч ороод нууц үгээ өөрчлөхийг хүсэж байна.",
		findpwd_sendmail:"Цахим шуудан илгээх",
		findpwd_notfound:"Мэдээлэл байхгүй байна.",
		findpwd_msg_notfound:"Гишүүний мэдээлэл байхгүй байна.",
		findpwd_msg_sendmail:"{1}-руу цахим шуудан илгээсэн.",
		findpwd_msg_sendmail_fail:"{1}-руу мэйл илгээхэд алдаа гарлаа.",

		// main 
		main_myinfo_setting:"Хувийн мэдээллийн тохиргоо",
		main_logout:"Гарах",
		main_myinfo_account_info:"Дансны мэдээлэл",
		main_myinfo_update:"Өөрчлөлтийг хадгалах",
		main_myinfo_msg_inp_pwd1:"Мэдээлэл өөрчлөхийн тулд одоогийн нууц үгийг оруулна уу!",
		main_myinfo_msg_inp_pwd2:"Нууц үгийг өөрчлөх тохиолдолд оруулна уу.",
		main_msg_logout:"Системээс гарах уу?",
		main_msg_myinfo_change:"Хувийн мэдээлэл өөрчлөх",
		main_msg_myinfo_change_fail:"Хувийн мэдээлэл өөрчлөхөд алдаа гарлаа",
		main_msg_save_relogin:"Хадгалсан. Дахин нэвтэрнэ үү",
		main_msg_info_not_correct:"Мэдээлэл буруу байна.",
		
		//Main Intro 
		main_intro_title:"Основные службы",
		main_intro_sub_title:"Опыт высококачественных услуг, предоставляемых центром обработки данных, обеспечивает максимально оптимизированные услуги.",
		main_intro_datamgr:"Интеграция данных позволяет преобразовать и масштабировать данные и передавать их всем системам.",
		main_intro_data_analysis:"Обеспечивает оптимальную аналитическую среду для анализа и моделирования данных, специализирующихся на бизнесе пользователей.",
		
		main_intro_data_visualize:"Возможность визуализации зарегистрированных данных в виде диаграмм строк, бачатов, пичатов и т.д.", //시각화 
		
		main_intro_databrowse:"Возможность поиска зарегистрированных данных",
		
		main_intro_monitoring:"Возможность отслеживания использования процессора, памяти и диска в системе",
		
		main_intro_devicemgr:"Функция мониторинга состояния и управления соединениями датчиков и терминалов IOT",
		
		main_intro_modelnsvcmgr:"Возможность регистрации и распространения моделей ИИ и услуг IOT",
		main_intro_usernrolemgr:"Возможность установки доступа к меню под названием Управление информацией о пользователях и группах",
		
		// mainmenu
		main_menu_datamgr:"Өгөгдөл нэгтгэх",
		main_menu_data_mgmt:"Нэгдсэн мэдээлэл удирдах",
		main_menu_file_upload:"Файр байршуулах",
		main_menu_ftp_sync:"ftp синхрончлол",
		main_menu_rdb_sync:"rdb синхрончлол",
		main_menu_databrowse:"Өгөгдлийг харах",
		main_menu_data_grid:"Өгөгдлийн сүлжээ",
		main_menu_data_analysis:"Анализ",
		main_menu_auto_analysis1:"Автомат анализ 1",
		main_menu_auto_analysis:"Автомат анализ",
		main_menu_analysis_tool:"Анализ багаж",
		main_menu_analysis_env:"Средства индивидуального анализа",
		main_menu_data_visualize:"Дүрслэх",
		main_menu_visualize_tool:"Дүрслэх багаж",
		main_menu_monitoring:"Системийн мониторинг",
		main_menu_system_monitoring:"Системийн мониторинг",
		main_menu_usagenhelp:"Ашиглах заавар ба тусламж",
		main_menu_usernrolemgr:"Хэрэглэгч ба эрх удирдах",
		main_menu_user_mgmt:"Хэрэглэгч удирдах",
		main_menu_group_mgmt:"Хэрэглэгчийн групп удирдах",
		main_menu_menu_mgmt:"Цэс удирдах",
		main_menu_devicemgr:"Цуглуулсан төхөөрөмж удирдах",
		main_menu_sensor_mgmt:"Мэдрэгч удирдах",
		main_menu_device_mgmt:"Холбогдсон төхөөрөмж удирдах",
		main_menu_modelnsvcmgr:"Загвар ба үйлчилгээ удирдах",
		main_menu_model_mgmt:"Загвар удирдах",
		main_menu_svc_mgmt:"Үйлчилгээ удирдах",
		
		// meta_mgr
		metamgr_add_btn:"Нэгдсэн өгөгдөл бүртгэх",
		metamgr_generated:"Автоматаар үүсгэх",
		metamgr_add:"Нэгдсэн өгөгдөлийн мэдээлэл бүртгэх",
		metamgr_dataname:"* Нэгдсэн өгөгдөлийн нэр",
		metamgr_datatype:"* Өгөгдөлийн төрөл",
		metamgr_savepath:"* Хадгалах үйл явц",
		metamgr_savetable:"* Хадгалсан хүснэгт",
		metamgr_orgpath:"* Үндсэн үйл явц",
		metamgr_orgurl:"* Үндсэн url",
		metamgr_orgdb:"* Үндсэн database",
		metamgr_orgtable:"* Үндсэн table",
		metamgr_collect_key:"Цуглуулсан key",
		metamgr_collect_type:"Цуглуулсан арга барил",
		metamgr_collect_schedule:"Цуглуулсан хөтөлбөр",
		metamgr_generated:"Автоматаар үүсгэх",
		metamgr_modify:"Нэгдсэн өгөгдлийн мэдээлэл засварлах",
		metamgr_datainfo:"Нэгдсэн өгөгдлийн мэдээлэл",
		
		// FileUpload
		fileupload_select:"* Файл сонгох",
		fileupload_dup_process:"Давхцал хянах",
		fileupload_msg_metadata_empty:"Нэгдсэн өгөгдлийн сонгоод байршуулна уу.",
		fileupload_file_empty:"Файл сонгогдоогүй байна.",
		fileupload_msg_uploading:"Файл байршуулж байна.",
		fileupload_msg_upload_confirm:"Файл байршуулах уу?",
		fileupload_msg_success:"Файл байршуулж дууслаа.",
		fileupload_msg_failed:"Өгөгдөл байршуулахад алдаа гарлаа.",
		fileupload_msg_delete_confirm:"{1} Файлыг устгах уу?",
		fileupload_msg_deleting:"Файл устгаж байна",
		fileupload_delete:"Файл устгах",
		fileupload_msg_delete_failed:"Файл устгахад алдаа гарлаа.",
		
		//ftp synchronized
		ftpsync_msg_intro:"file Нэгдсэн өгөгдлийн мэдээллийг ашиглан эх ftp ба гар тохиргооны горимыг ажиллуулах болон төлөв байдлын мониторинг хийнэ.",
		ftpsync_title:"ftp синхрончлол",
		ftpsync_msg_run_confirm:"[{1}] синхрончлох уу?",
		ftpsync_msg_sync_running:"ftp синхрончлож байна",
		ftpsync_msg_kill_confirm:"[{1}] хүчээр зогсоох уу?",
		ftpsync_msg_sync_kill:"ftp синхрончлолыг хүчээр згсоож байна.",
		ftpsync_exec:"Боловсруулалт хийх",
		ftpsync_kill:"Хүчээр зогсоох",
		
		//rdb synchronized
		rdbsync_title:"rdb синхрончлол",
		rdbsync_msg_intro:"rdb Нэгдсэн өгөгдлийн мэдээллийг ашиглан эх rdb-тай синхрончлох буюу төлөвийн мониторинг хийнэ.",
		rdbsync_msg_run_confirm:"[{1}] синхрончлох уу?",
		rdbsync_msg_sync_running:"rdb синхрончлол хийгдэж байна",
		rdbsync_msg_kill_confirm:"[{1}] албадан зогсоох уу?",
		rdbsync_msg_sync_kill:"rdb синхрончлолыг албадан зогсоож байна",
		rdbsync_exec:"Боловсруулалт хийх",
		rdbsync_kill:"Албадан зогсоох",
		
		//analysis1
		ana1_title:"Автомат анализ 1",
		ana1_refresh:" Данин сэргээх",
		ana1_param:"Параметр",
		ana1_manual_analysis:"Гар анализ",
		ana1_auto_analysis:"Автомат анализ",
		ana1_msg_analysis_confirm:"Анализ хийх үү?",
		ana1_msg_analyzing:"Өгөгдөлд анализ хийж байна...",
		ana1_analysis_ok:"Анализ хийж дууслаа",
		ana1_msg_analysis_executed:"Анализ хийгдсэн.",
		ana1_msg_analysis_failed:"Өгөгдөлд анализ хийхэд алдаа гарлаа.",
		ana1_error:"Алдаа",
		ana1_analysis_unable:"Анализ хийх боломжгүй",
		ana1_analysis_success:"Анализ дууссан",
		ana1_msg_analysis_success:"Өгөгдөлд анализ хийж дуусслаа.",
		ana1_msg_analysis_confirm2:"{1} Анализ хийх үү?",

		// analysis
		ana_title:"Автомат анализ",
		ana_refresh:" шинэчлэл",
		ana_cond_recent_1day:"Сүүлийн 1 өдөр",
		ana_cond_recent_3day:"Сүүлийн 3 өдөр",
		ana_cond_recent_7day:"Сүүлийн 7 өдөр",
		ana_exec_auto:"Автомат дүн шинжилгээ хийх",
		ana_intro:"※ Автомат шинжилгээнд сонгосон өгөгдлийг ашиглан бүх алгоритмыг багцлан шинжилж, шинжилгээний үр дүнг өгдөг.<br>\
                        ※ Өгөгдлөөс хамааран зарим алгоритм ажиллахгүй байж болно.</br>\
                        ※ Шинжилгээнд зориулсан алгоритмын параметрүүд нь анхны утгыг ашигладаг бөгөөд хамааралтай хувьсагч/стандарт шошго нь сүүлчийн баганыг ашигладаг.",
		ana_algorithm_name:"алгоритмын нэр",
		ana_exec_stime:"гүйцэтгэлийн огноо",
		ana_exec_etime:"дуусах огноо",
		ana_msg_analyzing:"Өгөгдөлд дүн шинжилгээ хийж байна...",
		ana_msg_analysis_failed:"Өгөгдлийн шинжилгээнд алдаа гарлаа.",
		ana_error:"Алдаа",
		ana_msg_metadata_empty:"Нэгдсэн өгөгдөл сонгогдоогүй байна.",
		ana_msg_start_empty:"Та эхлэх огноог сонгоогүй байна.",
		ana_msg_end_empty:"Та дуусах огноог сонгоогүй байна.",
		ana_auto_analysis:"автомат шинжилгээ",
		ana_msg_analysis_confirm:"Бид дүн шинжилгээ хийх үү?",		
		ana_result_view:"Үр дүнг харах",
		
		// analysis_tool
		anatool_title:"Анализ багаж",
		anatool_data_dur:"өгөгдлийн хугацаа",
		anatool_manual_select:"Шууд оруулах",
		anatool_cond_recent_1day:"Сүүлийн 1 өдөр",
		anatool_cond_recent_3day:"Сүүлийн 3 өдөр",
		anatool_cond_recent_7day:"Сүүлийн 7 өдөр",
		
		// visualize
		vis_title:"Дүрслэлийн жагсаалт",
		vis_add:"Дүрслэлийн дэлгэц нэмэх",
		vis_name:"Дүрслэлийн дэлгэц",
		vis_msg_delete_confirm:"[{1}] Дэлгэцийг устгах уу?'",
		vis_msg_deleting:"Дүрслэлийн дэлгэцийг устгаж байна",
		vis_msg_delete_failed:"Дүрслэлийн дэлгэцийг устгахад алдаа гарлаа.",
		vis_preview:"Урдчилан харах",
		vis_screen:"Дүрслэлийн дэлгэц",
		vis_recent_1min:"Сүүлийн 1 мин.",
		vis_recent_3min:"Сүүлийн 3 мин.",
		vis_recent_5min:"Сүүлийн 5 мин.",
		vis_recent_10min:"Сүүлийн 10 мин.",
		vis_no_refresh:"Шинэчлэхгүй",
		vis_every_3sec_refresh:"3 сек. тутам шинэчлэх",
		vis_every_5sec_refresh:"5 сек. тутам шинэчлэх",
		vis_every_10sec_refresh:"10 сек. тутам шинэчлэх",
		
		vis_add_linechart:"Шугман график нэмэх",
		vis_add_barchart:"Бар график нэмэх",
		vis_add_piechart:"Дугуй график нэмэх",
		vis_add_text:"Text нэмэх",
		vis_back_image:"Дэвсгэр зураг",
		vis_clear_back:"Дэвсгэр арилгах",
		vis_layout_edit:"Лейаут засварлах",
		vis_export:"Экспорт",
		vis_view_export:"Дүрслэл экспортлох",
		vis_export_comment:"Экспорт код <br><font color=red> баруун талын кодыг гадаад вэб контентод хуулж тавьна уу.</font>",
		vis_save_dashboard:"Хянах самбар хадгалах",
		vis_setting:"Тохиргоо сонгох",
		vis_txt_label:"Бичвэр:",
		vis_txtcolor_label:"Үсгийн өнгө:",
		vis_backcolor_label:"Дэвсгэр өнгө:",
		vis_fontsize_label:"Үсгийн хэмжээ: ",
		vis_fontweight_label:"Үсгий зузаан: ",
		vis_fontname_label:"Үсгийн төрөл: ",
		vis_error:"Алдаа",
		vis_msg_metadata_empty:"Нэгдсэн өгөгдлийг сонгоогүй байна.",
		vis_msg_column_empty:"Багана сонгоогүй байна.",
		vis_msg_start_empty:"Хайлтын эхлэлийг оруулаагүй байна.",
		vis_msg_end_empty:"Хайлтын төгсгөлийг оруулаагүй байна.",
		vis_modify:"Дүрслэл засах - {1}",
		vis_fix_layout:"Лейаут бэхлэх",
		vis_dashboard:"Хянах самбар",
		vis_msg_dashboard_new_confirm:"Хянах самбарыг шинээр үүсгэх үү?",
		vis_save_error:"Хадгалах алдаа",
		vis_msg_save_error:"Хадгалахад алдаа гарлаа.",
		vis_msg_chg_text_input:"Өөрчлөх үсгийн мөр?",
		vis_msg_chg_text_sensorinput:"Өөрчлөх үсгийн мөр({} -д мэдрэгчийн үзүүлэлт өөрчлөгдөнө.)?",
		
		// data grid
		datagrid_title:"Өгөгдлийн сүлжээ",
		datagrid_data_detail_view:"Өгөгдлийн дэлгэрэнгүй мэдээлэл харах",
		datagrid_detail_view:"Дэлгэрэнгүй мэдээлэл харах",
		datagrid_msg_detail_view_confirm:"Дэлгэрэнгүй мэдээлэл харах үйлдлийн хийх уу? (Өгөгдлийн хэмжээнээс хамаарч тодорхой хугацаа зарцуулагдах болно.)",
		datagrid_msg_detail_analyzing:"Өгөгдлийн дэлгэрэнгүй мэдээлэлд анализ хийж байна...",
		datagrid_msg_analyzed:"Анализ хийж дууслаа.",
		datagrid_msg_analyze_error:"Өгөгдлийн анализд алдаа гарлаа.",
		datagrid_analyzed:"Анализ дууслаа",
		datagrid_col_name:"Баганы нэр",
		datagrid_max_val:"Дээд үзүүлэлт",
		datagrid_min_val:"Доод үзүүлэлт",
		datagrid_data_cnt:"Өгөгдлийн тоо",
		datagrid_missing_data_cnt:"Гээгдсэн өгөгдлийн тоо (Хувь %)",
		datagrid_avg:"Дундаж",
		datagrid_dist:"Сарниах",
		datagrid_sum:"Нийлбэр",
		datagrid_max_length:"Дээд урт",
		datagrid_freq_cnt:"Өгөгдлийн давтамжийн хэмжээ",
		datagrid_cnt:"{1}ширхэг",
		datagrid_top_n:"Uniq Өгөгдөл, дээд талын{1} ширхэгийг хэвлэх",
		datagrid_cnts:"Тоо хэмжээ",
		datagrid_error:"Алдаа",
		datagrid_cond_recent_1day:"Сүүлийн 1 өдөр",
		datagrid_cond_recent_3day:"Сүүлийн 3 өдөр",
		datagrid_cond_recent_7day:"Сүүлийн 7 өдөр",

		// monitoring
		monitoring_title:"Системийн мониторинг",
		monitoring_cpu_usage:"cpu ашиглалтын хувь",
		monitoring_memory_usage:"Санах ойн хэрэглээ",
		monitoring_disk_usage:"Диск ашиглалтын хэмжээ",
		monitoring_used:"Ашигласан",
		monitoring_free:"Чөлөөтэй",
		monitoring_network_in:"Сүлжээний оролт",
		monitoring_network_out:"Сүлжээний гаралт",
		monitoring_network_usage:"Сүлжээний ачаалал",
		
		// help
		usage_title:"Ашиглах заавар",
		usage_content:"                    Ашиглах дараалал:\n\
                    \n\
                    Эхэлж нэвтэрсэн акаунт : admin/admin\n\
                    \n\
                    <b>1. Хэрэглэгч ба эрх удирдах> Хэрэглэгчийн групп удирдах :</b> хэрэглэгчид товлох групп удирдах.\n\
                    \n\
                    <b>2. Хэрэглэгч ба эрх удирдах> Хэрэглэгч удирдах :</b> Хэрэглэгчийн данс удирдах.\n\
                    \n\
                    <b>3. Өгөгдлийн нэгтгэл :</b> Мета удирдах ба Өгөгдөл цуглуулах.\n\
                    \n\
                    <b>4. Өгөгдөл харуулах :</b> Нэгдсэн өгөгдөл харах ба энгийн гүйцэтгэл.\n\
                    \n\
                    <b>5. Анализ :</b> Өгөгдлийн анализ\n\
                    \n\
                    <b>6. Дүрслэл :</b> Өгөгдлийн анализын үр дүн буюу цуглуулсан өгөгдлийн дүрслэл.\n\
                    \n\
                    <b>7. Системийн мониторинг :</b> нөөцийн төлөвийн мониторинг ба ашиглах арга.\n\
                    \n",

		// user mgmt
		usermgmt_title:"Хэрэглэгчийн удирдлага",
		usermgmt_msg_change_pwd:"Нууц дугаараа өөрчлөх тохиолдолд оруулна уу.",
		usermgmt_name_empty:"Нэрээ оруулаагүй байна.",
		usermgmt_pwd_empty:"Нууц үгээ оруулаагүй байна.",
		usermgmt_email_empty:"Цахим хаягаа оруулаагүй байна.",
		usermgmt_add:"Хэрэглэгчийн бүртгэл",
		usermgmt_modify:"Хэрэглэгчийн мэдээлэл засах",
		usermgmt_user_info:"Хэрэглэгчийн мэдээлэл",
		usermgmt_user_company:"Харья компани",
		usermgmt_user_permission:"Хэрэглэгчийн эрх",
		usermgmt_user_group:"Харьяа групп",
		usermgmt_user_permission:"Ашиглах эрх",
		
		//group mgmt
		groupmgmt_title:"Хэрэглэгчийн групп удирдах",
		groupmgmt_add:"Групп бүртгэх",
		groupmgmt_modify:"Группын мэдээлэл засварлах",
		groupmgmt_group_name_empty:"Группын нэр оруулаагүй байна.",
		groupmgmt_group_info:"Группын мэдээлэл",
		
		//menu mgmt
		menumgmt_title:"Цэс удирдах",
		menumgmt_add:"Цэс бүртгэх",
		menumgmt_modify:"Цэсийн мэдээлэл засварлах",
		menumgmt_msg_menu_name_empty:'Цэсийн нэрийг оруулаагүй байна.',
		menumgmt_msg_parent_menu_empty:"Дээд цэсийг сонгоогүй байна.",
		menumgmt_msg_menu_seq_empty:"Цэсийн дарааллыг сонгоогүй байна.",
		menumgmt_msg_menu_link_empty:"Цэсийн линкийг оруулаагүй байна.",
		menumgmt_menu_info:"Цэсийн мэдээлэл",
		menumgmt_found:"{1} ш. илэрсэн байна",
		menumgmt_parent_menu:"Дээд цэс",
		menumgmt_menu_name:"Цэсийн нэр",
		menumgmt_menu_type:"Цэсийн төрөл",
		menumgmt_menu_seq:"Цэсийн дараалал",
		menumgmt_menu_link:"Цэсийн линк",
		menumgmt_menu_read_perm:"Харах эрх",
		menumgmt_menu_write_perm:"Засварлах эрх",
		menumgmt_menu_type_main:"Үндсэн цэс",
		menumgmt_menu_type_sub:"Дэд цэс",
		menumgmt_menu_type_div:"Ангилал",
		menumgmt_group_or_user:"Групп ба хэрэглэгч",
		
		// sensor mgmt
		sensor_add:"Мэдрэгч бүртгэх",
		sensor_modify:"Мэдрэгчийн мэдээлэл засварлах",
		sensor_info:"Мэдрэгчийн мэдээлэл",
		sensor_msg_name_empty:"Мэдрэгчийн нэр оруулаагүй байна.",
		sensor_name:"Мэдрэгчийн нэр",
		sensor_value_type:"Мэдрэгчийн үзүүлэлтийн төрөл",
		sensor_value_range:"Мэдрэгчийн үзүүлэлтийн цар хүрээ",
		sensor_value_unit:"Мэдрэгчийн үзүүлэлтийн нэгж",
		sensor_var_name:"Хувьсагчийн нэр",
		
		//device mgmt
		device_add:"Терминал бүртгэх",
		device_modify:"Терминалын мэдээлэл засах",
		device_info:"Терминалын мэдээлэл",
		device_state_running:"Цуглуулж байна",
		device_running_time:", удирдах хугацаа:{1}",
		device_state_notrunning:"Ажилгаагүй байна",
		device_state_running:"Цуглуулж байна",
		device_state_stopped:"Цуглуулах зогсов",
		device_msg_devicename_not_inputed:"Терминалын нэрийг оруулаагүй байна.",
		device_name:" Терминалын нэр",
		device_sensor_list:" Мэдрэгчийн жагсаалт",
		device_collect_state:" цуглуулгын төлөв",
		device_collect_state_title:"Ажлахгүй байна - илгээх өгөгдөл огт байхгүй байх/цуглуулж байна/цуглуулга зогссон - 10 мин. турш өгөгдөл байгүй байх үед",
		
		// model mgmt
		modelmgmt_title:"Модель удирдах",
		modelmgmt_add:"Модель бүртгэх",
		modelmgmt_modify:"Моделийн мэдээлэл засварлах",
		modelmgmt_info:"Моделийн мэдээлэл",
		modelmgmt_name:"Моделийн нэр",
		modelmgmt_file_code:"Модеоийн файл/ажиллуулах код",
		modelmgmt_version:"Хувилбар",
		modelmgmt_apply_device:"Хэрэглэх терминал",
		modelmgmt_apply_time:"Хэрэглэх огноо",
		modelmgmt_msg_model_name_empty:"Моделийн нэрийг оруулаагүй байна.",
		modelmgmt_msg_apply_time_empty:"Моделийн хэрэглэх хугацааг оруулаагүй байна.",
		
		// svc mgmt
		svcmgmt_title:"Үйлчилгээ удирдах",
		svcmgmt_add:"Үйлчилгээ бүртгэх",
		svcmgmt_modify:"Үйлчилгээний мэдээлэл засах",
		svcmgmt_info:"Үйлчилгээний мэдээлэл",
		svcmgmt_name:"Үйлчилгээний нэр",
		svcmgmt_msg_id_empty:"Үйлчилгээний id-г оруулаагүй байна.",
		svcmgmt_msg_name_empty:"Үйлчилгээний нэрийг оруулаагүй байна.",
		svcmgmt_msg_file_empty:"Үйлчилгээг түгээх файлыг сонгоогүй байна.",
		svcmgmt_deploy_ok:"Үйлчилгээг түгээж дууссан",
		svcmgmt_msg_deployed:"Үйлчилгээ түгээгдсэн.",
		svcmgmt_msg_upload_failed:"Өгөгдөл байршуулахад алдаа гарлаа.",
		svcmgmt_msg_alphanumeric_only:"Латин цифр оруулна",
		svcmgmt_id:"Үйлчилгээний id",
		svcmgmt_url:"Үйлчилгээний url",
		svcmgmt_deploy_file:"Үйлчилгээг түгээх файл",
	  
    }
};

function lang(id, deftxt, p1, p2, p3, p4, p5)
{
    var lang = getLanguage();
    var txt = "";

    if(langs[lang] === undefined || langs[lang][id] === undefined ) {
		txt = deftxt;
		console.log(lang+'- script msg text not found...==> {'+id+':"'+txt+'"}');
	}
    else txt = langs[lang][id]; 

	if (p1!==undefined && p1!=null) txt = txt.replace("{1}", p1);
	if (p2!==undefined && p2!=null) txt = txt.replace("{2}", p2);
	if (p3!==undefined && p3!=null) txt = txt.replace("{3}", p3);
	if (p4!==undefined && p4!=null) txt = txt.replace("{4}", p4);
	if (p5!==undefined && p5!=null) txt = txt.replace("{5}", p5);
    return txt;
}

function updatelang()
{
    var lang = getLanguage();

    $('[data-lang]').each(function() {
		var mid = $(this).data('lang');
        var mids = mid.split(",");
		for(var id of mids ) {
			
			var ip = id.split(":");
			var prop = "";
			id = "";
			if(ip.length>1)
			{
				prop = ip[1];
				id = ip[0];
			} else {
				id = ip[0];
				if($(this).prop('tagName')=="INPUT") prop = "placeholder";
			}

			if(langs[lang] === undefined || langs[lang][id] === undefined ) {
				var txt = "";
				if(prop!="") txt = $(this).prop(prop);
				else txt = $(this).text();
				console.log(lang+'- html text not found...==> {'+id+':"'+txt+'"}');
				continue;
			}
			
	        var txt = langs[lang][id];
			
	        if(prop!="") $(this).prop(prop,txt);
	        else {
				var html = $(this).html();
								
				if(html.startsWith("<"))
				{
					var sp = html.indexOf(">");
					sp = html.indexOf(">", sp+1); // 두번째 닫기
					
					if(sp>0) {
						
						if(html.endsWith(">"))
						{
							var ep = html.indexOf("<", sp+1);
							
							if(ep<0) txt = html.substring(0,sp+1)+txt;
							else txt = html.substring(0,sp+1)+txt+html.substring(ep);
						}
						else txt = html.substring(0,sp+1)+txt;
					}
				}
				
				$(this).html(txt);
			}
        }
    });
}

$(document).ready(function () { updatelang();});

function getLanguage() {
    if(App.lang !== undefined ) return App.lang;
    var lang = (navigator.language || navigator.userLanguage);
    var p = lang.indexOf('-');
    if(p>=0) lang = lang.substring(0,p);
	else lang = 'en';
	if(Object.keys(langs).indexOf(lang)<0) lang = "en"; // 기본언어가 언어목록에 없으면 영어
    App.lang = lang;
    return App.lang;
}

function changelang(lang)
{
    App.lang = lang;
    updatelang();
}