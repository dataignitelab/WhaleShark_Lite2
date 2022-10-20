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
		common_msg_delete_confirm:"[{1}] 정보를 삭제 할까요?",
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
		common_description:"설명",
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
