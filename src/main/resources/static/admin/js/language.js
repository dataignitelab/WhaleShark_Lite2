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
		
		//analysis
		
		
		
		// visualize
		vis_title:"시각화 목록",
		vis_add:"시각화 화면 추가",
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

		// monitoring
		monitoring_title:"시스템모니터링",
		monitoring_cpu_usage:"cpu 사용율",
		monitoring_memory_usage:"메모리 사용",
		monitoring_disk_usage:"디스크 사용량",
		monitoring_used:"사용",
		monitoring_free:"여유",
		monitoring_network_in:"네트워크In",
		monitoring_network_out:"네트워크Out",
		
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
		
		
		// sensor mgmt
		sensor_add:" 센서등록",
		sensor_modify:"센서 정보수정",
		sensor_info:"센서정보",
		sensor_msg_name_empty:"센서명을 입력하지 않았습니다.",
		
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
	  sel_lang:"Language({1})",
	  ko:"Korean",
	  en:"English",
	  
	  login_title:"Data Management Tool",
	  login_id:"user id",
	  login_pwd:"password",
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
