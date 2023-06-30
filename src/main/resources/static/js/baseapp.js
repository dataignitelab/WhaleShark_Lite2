window.App =  {
    name:'baseapp',
    baseurl: location.protocol+'//'+location.hostname+':'+location.port,
    loadParam : null, // 전달 파라미터..
    sessiontimer: null, // 세션체크타이머
    islogin:false,
    load : function(divselector, htmlfile, jsfile, paramobj) {
        paramobj.htmlfile = htmlfile;
        paramobj.jsfile = jsfile;

        $(divselector).load(htmlfile, function() {
            updatelang(); // 언어적용
            $.getScript(jsfile, function() { init(paramobj);} );
        });    
    },
    loadjs : function(divselector, jsfile, paramobj) {

        paramobj.jsfile = jsfile;
        $.getScript(jsfile, function() { 
            var _loadobj = loadobj(paramobj);
            if(_loadobj.htmlfile !== undefined)
            {
                $(divselector).empty().load(_loadobj.htmlfile, function() {
                    updatelang(); // 언어적용
                    if(_loadobj.classobj !== undefined && _loadobj.classobj.initContent !== undefined )
                    {
                        _loadobj.classobj.initContent();
                    }
                });
            }
            else if(_loadobj.template !== undefined)
            {
                $(divselector).empty().append(_loadobj.template);
                updatelang(); // 언어적용
                if(_loadobj.classobj !== undefined && _loadobj.classobj.initContent !== undefined )
                {
                    _loadobj.classobj.initContent();
                }
            }
        } );    
    },

    reloadmenu: function() // 메뉴 재로딩 함수...
    {

    },

    header: function(html) // header 영역에 htmlset...
    {
        $("#header").html(html);
    },


    notice : function(msg, template) {
        
        var notiobj = $('<div style="z-index:9999"><div>'+msg+'</div></div>').appendTo($('body'));

        notiobj.jqxNotification({
            width: 'auto', position: "bottom-left", opacity: 0.9,
            autoOpen: true, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: template
        });

        notiobj.on('close', function() {
            notiobj.jqxNotification('destroy');
        });

    },
    // 확인 메세지창 
    msg_alert : function(title, content, func) {
    			var alert_obj = $('<div class="modal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">'+title+'</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+content+'</div><div class="modal-footer"><button type="button" data-dismiss="modal" class="btn btn-primary btn-success">확인</button></div></div></div></div>').appendTo('body');
                alert_obj.on('hidden.bs.modal', function () { if(func != undefined ) func(); alert_obj.remove(); });
                alert_obj.modal({backdrop:'static'});
    },
    // 예/아니오 메세지창   
    msg_confirm : function(title, content, yesfunc, nofunc) {
        		var confirm_obj = $('<div class="modal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">'+title+'</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+content+'</div><div class="modal-footer"><button type="button" class="btn btn-default btn-no">아니오</button><button type="button" class="btn btn-primary btn-success">예</button></div></div></div></div>').appendTo('body');
                confirm_obj.find('.btn-success').click(function () { if(yesfunc != undefined ) yesfunc(); confirm_obj.modal('hide'); } );
                confirm_obj.find('.btn-no').click(function () { if(nofunc != undefined ) nofunc(); confirm_obj.modal('hide'); } );
                confirm_obj.on('hidden.bs.modal', function () { confirm_obj.remove(); });
                confirm_obj.modal({backdrop:'static'});
    },
    // 로딩 애니메이션 보기  
    start_loading : function(txt)
    {
        loading_obj = $('<div class="modal loading-modal" data-backdrop="static" data-keyboard="false" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><span class="fa fa-spinner fa-spin fa-3x"></span><font color="white" style="position:absolute;"><b>'+txt+'</b></font></div></div></div>').appendTo('body');
        loading_obj.on('hidden.bs.modal', function () { loading_obj.remove(); });
        loading_obj.modal();
    },
    // 로딩 애니메이션 정지  
    stop_loading : function()
    {
    	setTimer(function() {loading_obj.modal('hide');},300);
    },
    // 문서 뷰어...
    doc_viewer: function(doc)
    {
    	var doc_obj = $('<div class="modal"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h4>문서뷰어</h4></div><div class="modal-body"><iframe id="docfile" src="'+doc+'" style="width:850px; height:600px" frameborder="0"></iframe></div><div class="modal-footer remove-margin"><button class="btn btn-success" data-dismiss="modal"><i class="fa fa-times"></i>닫기</button></div></div></div></div>').appendTo('body');
    	doc_obj.on('hidden.bs.modal', function () { doc_obj.remove(); });
    	doc_obj.modal({backdrop:'static'});
    },
};

 function getsubstring(str, s, e, nth)
 {
		ret = "";
		var sp = (s.length==0)?0:str.indexOf(s);
		
		if(nth!==undefined && nth!==null && s.length>0)
			while(nth>0)
			{
				sp = str.indexOf(s, sp+s.length+1);
				nth--;
			}
		
		if(sp>=0)
		{
			ret = str.substring(sp+s.length);
			var ep = (e.length==0)?-1:ret.indexOf(e);
			if(ep>=0) ret = ret.substring(0,  ep);
		}
		return ret;
 }

 function insertstr(v, p, s)
 {
     return v.substring(0,p)+s+v.substring(p);
 }

 function hashcode(prefix){
    var s = ""+new Date();
  return (prefix+(s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0))).replace('-','_');
 }

 // 쿠키 생성
 function setCookie(cName, cValue, cDay, cHour){
    var expire = new Date();
//    expire.setDate(expire.getDate() + cDay);
    
    var dur = cDay*60*60*24*1000;
    if(cHour!==undefined) dur += cHour*60*60*1000;
    expire.setTime(expire.getTime()+dur);
    cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
    if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
    document.cookie = cookies;
//    alert(expire.toGMTString());
 }

 // 쿠키 가져오기
 function getCookie(cName) {
    cName = "; "+cName + '=';
    var cookieData = "; "+document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = '';
    if(start >=0 ){
        start += cName.length;
        var end = cookieData.indexOf(';', start);
        if(end < 0 ) end = cookieData.length;
        cValue = cookieData.substring(start, end);
    }
    return unescape(cValue);
 }

 // 세션값 가져오기
 function getSession(cName) {
	return sessionStorage.getItem(cName);
 }
 
 // 세션값 저장하기
 function getSession(key, value) {
	return sessionStorage.setItem(key, value);
 }
 
 function getdata(data)
 {
     if(App.logininfo != undefined) data.sessionid = App.logininfo.sessionid;
     return data;

 }
 
 function state_str(state)
 {
	 if(state=="REGISTERING") return "가입중";
	 else if(state=="INACTIVE") return "비활성";
	 else if(state=="ACTIVE") return "활성";
	 else if(state=="REJECT") return "거절";
	 else if(state=="QUESTION") return "질문";
	 else if(state=="ANSWER") return "답변";
	 return state;
 }
 
 function role_str(role)
 {
	 var rolestrs = "";
	 var roles = role.split(",");
	 for(var i in roles)
	 {
		 if(rolestrs!="") rolestrs += ",";
		 if(roles[i]=="ADMIN") rolestrs += "어드민";
		 else if(roles[i]=="USER") rolestrs += "포털사용자";
		 else if(roles[i]=="OPERATOR") rolestrs += "운영자";
		 else if(roles[i]=="MARKET_CHARGE") rolestrs += "담당자";
		 else if(roles[i]=="FIELD_CHARGE") rolestrs += "현업담당자";
		 else if(roles[i]=="FIELD_LEADER") rolestrs += "현업팀장";
		 else if(roles[i]=="EXPERT") rolestrs += "심의위원";
		 else rolestrs+=roles[i]; 
	 }
 
	 return rolestrs;
 }
 
 // 초기 init 실행...
 $(function init(){
	
	/* 
	// config load
	$.post(App.baseurl+'/api/4cc1ef4c05c6b4cf5f25e65b99ee1b38/list', {columns:'{447bbc},{206304}',conds:'{447bbc}',item:'docchk-cmd,cluster-cmd,word2vec-cmd,function-limit'}).done(function(data) {
        if(data.success && data.list.length>0)
        {
        	for(var i=0; i<data.list.length; i++) {
        		if(data.list[i].item=="docchk-cmd") App.chkdoc_cmd = data.list[i].value;
        		else if(data.list[i].item=="cluster-cmd") App.cluster_cmd = data.list[i].value;
        		else if(data.list[i].item=="word2vec-cmd") App.word2vec_cmd = data.list[i].value;
        		else if(data.list[i].item=="function-limit") App.function_limit = data.list[i].value;
        	}
        }
	});
	*/ 
	
	/*
	if(location.href.indexOf("/html/main.html")>0)
	{
		// popup load
		$.post(App.baseurl+'/api/7bf2cd3ee90f94054fe5aff455a28847/list', {columns:'{b80b8f},{d5d30a},{9a0355},{c4ef3d}',conds:'{ea0c14}',btype:'POPUP',usercond:"{9ed33e}='ACTIVE'"}).done(function(data) {
	        if(data.success && data.list.length>0)
	        {
	    		var popupids = getCookie("limit_popup");
	        	for(var i=0; i<data.list.length; i++) {
	        		var cat = data.list[i].category;
	        		var option = "";
	        		var url = "";
	        		if(cat!==undefined)
	        		{
	        			console.log(cat);
	        			cat = JSON.parse(cat);
	        			option = cat.option;
	        			url = cat.url;
	        		}
	        		if(popupids.indexOf(data.list[i].id)<0) popup(data.list[i].id, data.list[i].title, data.list[i].content, url, option);
	        	}
	        }
		}); 
	}
	*/

	/*
	// 로그 기록 
	var ldata = {};
	ldata.columns = "{572d12},{987148},{957b35}";
	ldata.column_url = window.location.href;
	ldata.column_uid = getCookie('id');
	ldata.column_ip = "원격지주소()";
	$.post(App.baseurl+'/api/49fb207aef5ccbd6758cb34938c151b6/add', ldata).done(function(data) {});
	*/
	
	// session check;
	if(App.sessiontimer!=null) clearInterval(App.sessiontimer);
	App.sessiontimer = setInterval(sessionchk, 5000);
 });
 
 function loadcombodata(selector, url, cond, option, selected, firstitem, okfunc)
 {
	$.post(url, cond).done(function (data) {
//			console.log("loadcombodata", data);
			if(data.success) {
				setcombolst(selector,data.list,option, selected, firstitem);
				if(okfunc!==undefined && okfunc!=null) okfunc();
			}
     }).fail( function () {
     });            
 }

 function setcombolst(selector, data, option, selected, firstitem)
 {
 	$(selector).empty();
	var optstr = ""; 
	if(firstitem!==undefined && firstitem!=null) optstr = "<option value='"+firstitem.value+"'>"+firstitem.text+"</option>";
 	for(var i=0; i<data.length; i++)
 	{
 		if(option===undefined || option==null) {
 			if(selected===data[i])
 	 			optstr += "<option selected>"+data[i]+"</option>";
 			else
 				optstr += "<option>"+data[i]+"</option>";
 		}
 		else {
 			if(selected===data[i][option.value])
 				optstr += "<option value='"+data[i][option.value]+"' selected>"+data[i][option.text]+"</option>";
 			else
 	 			optstr += "<option value='"+data[i][option.value]+"'>"+data[i][option.text]+"</option>";
 		}
 	}
	$(selector).append(optstr);
 }
 
 // datatables grid 초기화 
 function initgrid(selector, options)
 {
	 if(options.columns!==undefined)
	 {
		 for(var i = 0; i<options.columns.length; i++)
		 {
			 if(options.columns[i].defaultContent === undefined ) options.columns[i].defaultContent = "";
		 }
	 }
	 
	 if(options.language===undefined)
	 {
		 options.language =  {
	            "decimal": "",
	            "emptyTable": "데이터가 없습니다.",
	            "info": "_START_ - _END_ (총 _TOTAL_ 게시글)",
	            "infoEmpty": "0 페이지",
	            "infoFiltered": "(전체 _MAX_ 게시글 중 검색결과)",
	            "infoPostFix": "",
	            "thousands": ",",
	            "lengthMenu": "_MENU_ 개씩 보기",
	            "loadingRecords": "로딩중...",
	            "processing": "처리중...",
	            "search": "검색 : ",
	            "zeroRecords": "검색된 데이터가 없습니다.",
	            "paginate": {
	              "first": "첫 페이지",
	              "last": "마지막 페이지",
	              "next": "<i class='none_a_text page-link next w-100 h-100 text-dark' href='#'></i>",
	              "previous": "<i class='none_a_text page-link pre w-100 h-100 text-dark' href='#'></i>"
	            },
	            "aria": {
	              "sortAscending": " : 오름차순 정렬",
	              "sortDescending": " : 내림차순 정렬"
	            }
	          };
	 }
	 
	 return $(selector).dataTable(options);
}
 
// 페이지 이동...
function movepage(page, param)
{
	if(param !== undefined) App.loadParam = param;
	else App.loadParam = null;
	$("#page-content").empty().load(page, 'f' + (Math.random()*1000000));
}

// 자릿수만큼 0채웨서 리턴
function pad(n, width) {
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

function human_number(v, post)
{
	if(v>1000000) return ""+Math.floor((v/1000000)*10)/10+"m";
	if(v>1000) return ""+Math.floor((v/1000)*10)/10+"k";
	else return ""+v+post;
}

function human_byte(v, post)
{
	if(v>(1024*1024)) return ""+Math.floor((v/(1024*1024))*10)/10+" Mbyte";
	if(v>1024) return ""+Math.floor((v/1024)*10)/10+" Kbyte";
	else return ""+v+post+" byte";
}
 
document.oncontextmenu = function()
{
//	if(event.srcElement.type != "text" && event.srcElement.type != "textarea") return false;
}
 
function sessionchk()
{
	if(!App.islogin && getCookie("id")!="") App.islogin = true;
	
	// login timeout...
	if(App.islogin && getCookie("id")=="")
	{
		clearInterval(App.sessiontimer);
		App.sessiontimer = null;
		
		App.msg_alert('세션종료', '로그인 세션이 종료되었습니다. 다시 로그인해주세요!', function() {location.href = "/portal/page_login.html";});
	}
}

function nvl(obj, v)
{
	if(v===undefined) v = "";
	if(obj===undefined) return v;
	if(obj==null) return v;
	return obj;
}

function initpage(pageselector, pagestatusfunc, datafunc, pagesize, displaypagecnt)
{
  var d = datafunc(0,pagesize, function(obj) { paging(obj.startindex, obj.totalcount, obj.pagesize); });
//  paging(1, d.totalcount, pagesize);
  
  $(document).on('click', 'a.page-link', function() {
    var  curpage = $(this).data('dt-idx');
    datafunc((curpage-1)*pagesize, pagesize, function(obj) { paging(obj.startindex, obj.totalcount, obj.pagesize); });
  });

  function paging(startindex,totalcount,pagesize)
  {
    var curpage = Math.floor((startindex)/pagesize)+1;
    var pagecount = Math.floor(totalcount/pagesize)+((totalcount%pagesize)==0?0:1);
    
    var sp = Math.floor((curpage-1)/displaypagecnt)*displaypagecnt;
    if(pagestatusfunc!=null) pagestatusfunc(curpage, pagecount, totalcount);
    
//    console.log("paging", startindex, curpage, pagesize, totalcount, pagecount, sp);
        
    var html = '<ul class="pagination">';
    html += '<li class="paginate_button page-item previous ' + (curpage==1?"disabled":"") + '"><a href="#" aria-controls="data_board" data-dt-idx="'+(curpage-1)+'" tabindex="0" class="page-link"><i class="none_a_text page-link pre w-100 h-100 text-dark border-0" hef="#"></i></a></li>';
    for(var i=1; i<=pagecount; i++)
    {
      if(i>displaypagecnt || (sp+i)>pagecount) break;
      html += '<li class="paginate_button page-item ' + (curpage==(sp+i)?"active":"") + '"><a href="#" aria-controls="data_board" data-dt-idx="'+(sp+i)+'" class="page-link">'+(sp+i)+'</a></li>';
    }
    html += '<li class="paginate_button page-item next ' + (curpage>=pagecount?"disabled":"") + '"><a href="#" aria-controls="data_board" data-dt-idx="'+(curpage+1)+'" tabindex="0" class="page-link"><i class="none_a_text page-link next w-100 h-100 text-dark border-0" href="#"></i></a></li>';
    $(pageselector).empty().append(html);
  }
}

// 정상 세션인지 체크...
function islogin(uid, sid, okfunc, nokfunc)
{
	if(sid=="")
	{
		if(nokfunc!==undefined) nokfunc('cookie empty');
		return;
	}
	
	$.post(App.baseurl+'/api/islogin', {email:uid, sessionid:sid, role:'USER'}).done(
	function(res) {
		if(res.success) okfunc();
		else {
			if(nokfunc!==undefined) nokfunc('session not valid');
		}
	});
}

// 숫자, 특문 각 1회 이상, 영문은 2개 이상 사용하여 8자리 이상 입력 
function validpassword(p)
{
	// : 숫자, 특문 각 1회 이상, 영문은 2개 이상 사용하여 8자리 이상 입력
	var regExpPw = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;
	
	return regExpPw.test(p);
}

function valid_srchstr(v) {
	  v = v.split('%').join('');
	  v = v.split('>').join('');
	  v = v.split('<').join('');
	  v = v.split("'").join('');
	  v = v.split('"').join('');
	  return v;
}

function decobjstr(v)
{
	var ret = "";
	for(var i=v.length-1; i>=0; i--) ret += v.charAt(i);

	var sb = "";
	for(var i=0; i<ret.length; i++) sb += String.fromCharCode(ret.charCodeAt(i)-(i%20));
	return JSON.parse(sb);
}

function jsonval(jsonstr,key) {
    
	var content = {};
	try {
		content = JSON.parse(jsonstr);
	} catch(e)
	{
		content = {};
	}
	return content[key];
}

function jsonobj(jsonstr) {
    
	var content = {};
	try {
		content = JSON.parse(jsonstr);
	} catch(e)
	{
		content = {};
	}
	return content;
}
