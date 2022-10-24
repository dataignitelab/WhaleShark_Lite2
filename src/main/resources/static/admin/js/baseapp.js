window.App =  {
    name:'baseapp',
    baseurl: location.port==""?(location.protocol+'//'+location.hostname):(location.protocol+'//'+location.hostname+':'+location.port),
    loadParam : null, // 전달 파라미터..
    sessiontimer: null, // 세션체크타이머
    islogin:false,
    states:[
        {id:'ACTIVE', name:'사용'},
        {id:'INACTIVE', name:'사용안함'},
    ],
    
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
    // 예/아니오 메세지창  
    msg_alert : function(title, content, func) {
        		var alert_obj = $('<div class="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">×</button><h4>'+title+'</h4></div><div class="modal-body">'+content+'</div><div class="modal-footer"><button class="btn btn-default" data-dismiss="modal">'+lang('common_ok_btn','확인')+'</button></div> </div> </div> </div>').appendTo(App.body===undefined?'body':App.body);
                alert_obj.on('hidden.bs.modal', function () { if(func != undefined ) func(); alert_obj.remove(); });
                alert_obj.modal({backdrop:'static'});
    },
    // 확인 메세지창  
    msg_confirm : function(title, content, func) {
    			var confirm_obj = $('<div class="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">×</button><h4>'+title+'</h4></div><div class="modal-body">'+content+'</div><div class="modal-footer"><button class="btn btn-danger" data-dismiss="modal">'+lang('common_no_btn','아니오')+'</button> <button class="btn btn-success">'+lang('common_yes_btn','예')+'</button></div> </div> </div> </div>').appendTo(App.body===undefined?'body':App.body);
                confirm_obj.find('.btn-success').click(function () { if(func != undefined ) func(confirm_obj); confirm_obj.modal('hide'); } );
                confirm_obj.on('hidden.bs.modal', function () { confirm_obj.remove(); });
                confirm_obj.modal({backdrop:'static'});
    },
    // 로딩 애니메이션 보기  
    start_loading : function(txt)
    {
        loading_obj = $('<div class="modal fade" tabindex="-1" role="dialog"><div class="modal-dialog modal-dialog-centered text-center" role="document"  style="top:50%;margin-top:-50px"><span class="fa fa-spinner fa-spin fa-3x  w-100"></span><font color="white" style="position:absolute;"><b>' + txt + '</b></font></div></div>').appendTo(App.body===undefined?'body':App.body);
        loading_obj.on('hidden.bs.modal', function () { loading_obj.remove(); });
        loading_obj.modal({backdrop:'static'});
    },
    // 로딩 애니메이션 정지  
    stop_loading : function()
    {
        loading_obj.modal('hide');
    },
    // 우편번호 검색  modal
    zipcode_search : function(address)
    {
    	/*
	<div class="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h4>주소입력</h4></div><div class="modal-body"><form class="form-horizontal">
 	<div class="form-group"><label class="control-label col-md-2">시도 *</label><div class="col-md-9"><select id="sido" class="form-control"></select></div></div>
 	<div class="form-group"><label class="control-label col-md-2">도로명 *</label><div class="col-md-9"><div class="input-group"><input type="text" id="zipcode-name" name="zipcode-name" class="form-control" value=""><span class="input-group-btn"><button type="button" class="btnzipfind btn btn-default"><i class="fa fa-search"></i></button></span></div></div></div>
 	<div class="form-group"><label class="control-label col-md-2" for="addrs">주소 *</label><div class="col-md-9"><select id="addrs" class="form-control"><option value="">주소선택</option></select></div></div>
 	<div class="form-group"><label class="control-label col-md-2" for="zipcode-name">전체주소 *</label><div class="col-md-9"><input type="text" class="zipaddr form-control" value=""></div></div>
 	</form></div><div class="modal-footer remove-margin"><button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-times"></i> 닫기</button><button type="button" class="zipOK btn btn-success"><i class="fa fa-check"></i> 확인</button></div></div></div></div>    	  
    	 */
    	
    	var zipcode_obj = $('<div class="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h4>주소입력</h4></div><div class="modal-body"><form class="form-horizontal"><div class="form-group"><label class="control-label col-md-2">시도 *</label><div class="col-md-9 row"><div class="col-md-6"><select id="zipcode-sido" class="form-control"></select></div><div class="col-md-6"><select id="zipcode-gugun" class="form-control"></select></div></div></div><div class="form-group"><label class="control-label col-md-2">도로명 *</label><div class="col-md-9"><div class="input-group"><input type="text" id="zipcode-name" name="zipcode-name" class="form-control" value=""><span class="input-group-btn"><button type="button" class="btnzipfind btn btn-default"><i class="fa fa-search"></i></button></span></div></div></div><div class="form-group"><label class="control-label col-md-2" for="addrs">주소 *</label><div class="col-md-9"><select id="addrs" class="form-control"><option value="">주소선택</option></select></div></div><div class="form-group"><label class="control-label col-md-2" for="zipcode-name">전체주소 *</label><div class="col-md-9"><input type="text" class="zipaddr form-control" value=""></div></div></form></div><div class="modal-footer remove-margin"><button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-times"></i> 닫기</button><button type="button" class="zipOK btn btn-success"><i class="fa fa-check"></i> 확인</button></div></div></div></div>').appendTo('body');
    	zipcode_obj.on('hidden.bs.modal', function () { zipcode_obj.remove(); });
    	zipcode_obj.modal({backdrop:'static'});
    	
    	$("#zipcode-sido").empty().append("<option value=''>로딩중...</option>");
    	loadcombodata("#zipcode-sido", App.baseurl+"/api/tb_sigungu/alist",{columns:"distinct sido value"}, {text:'value',value:'value'}, null, {text:'선택',value:'-'});
    	$("#zipcode-sido").change(function(){
    		$("#zipcode-gugun").empty().append("<option value=''>로딩중...</option>");
    		loadcombodata("#zipcode-gugun", App.baseurl+"/api/query",{sql:"select distinct sigungu value from tb_sigungu where sido='"+$("#zipcode-sido").val()+"'"}, {text:'value',value:'value'}, null, {text:'선택',value:'-'});
    	});
    	
    	$('.btnzipfind').click(function() {
        	var find = $('#zipcode-name').val();
        	var data = {};
        	if($('#zipcode-sido').val()=="-")
        	{
        		App.msg_alert('시도 선택', '시도를 선택해 주세요.');
        		return;
        	}
        	if($('#zipcode-gugun').val()=="-")
        	{
        		App.msg_alert('구군 선택', '구군을 선택해 주세요.');
        		return;
        	}
        	if(find=="")
        	{
        		App.msg_alert('검색어 없음', '검색어를 입력해 주세요.');
        		return;
        	}
        	data.conds = "sido,way";
        	data.sido = $('#zipcode-sido').val();
            data.way = find.split(' ').join('');
            data.orderby = "way asc";
            
            var sql = "select * from vw_zipcode where sido='"+$('#zipcode-sido').val()+"' AND sigungu='"+$('#zipcode-gugun').val()+"' AND way like '%" + find.split(' ').join('') +"%' order by way asc";
            var sql = {sql:sql};
            App.start_loading('주소검색중');
        	$.post(App.baseurl+'/api/query', sql).done(function(data) {
//        	$.post(App.baseurl+'/api/vw_zipcode/list', data).done(function(data) {
                if(data.success)
                {
                	App.stop_loading();
                	$('#addrs').empty().append('<option value="">'+data.list.length+' 건 검색됨</option>');
               		for(var i=0; i<data.list.length; i++)
               		{
               			var addr = data.list[i].zipcode+" "+data.list[i].sido+" "+data.list[i].sigungu+" "+data.list[i].upmyoun+" "+data.list[i].wayname
               			if(data.list[i].jibun_sub==0) addr += " "+data.list[i].jibun;
               			else addr += " "+data.list[i].jibun+"-"+data.list[i].jibun_sub;
               			addr += " "+data.list[i].bldname;
               			
                		$('#addrs').append('<option value="'+addr+'">'+addr+'</option>');
                	}
               		$('#addrs').change(function(){
               			$('.zipaddr').val($('#addrs').val());
               			$('.zipaddr').focus();
               		});
                }
        	});
        });
		$('.zipOK').click(function() {
            if($('.zipaddr').val()=="")
            {
                App.msg_alert('주소입력오류', '주소를  입력하지 않았습니다.');
                return;
            }
            $(address).val($('.zipaddr').val());
            zipcode_obj.modal('hide');
		});
    	
    },
    // 문서 뷰어...
    doc_viewer: function(doc)
    {
    	if(doc.indexOf(".hwp")>=0 || doc.indexOf(".HWP")>=0)
    	{
    		window.open(doc);
    		return;
    	}
    	
    	var doc_obj = $('<div class="modal"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h4>문서뷰어</h4></div><div class="modal-body"><iframe id="docfile" src="'+doc+'" style="width:850px; height:600px" frameborder="0"></iframe></div><div class="modal-footer remove-margin"><button class="btn btn-success" data-dismiss="modal"><i class="fa fa-times"></i>닫기</button></div></div></div></div>').appendTo('body');
    	doc_obj.on('hidden.bs.modal', function () { doc_obj.remove(); });
    	doc_obj.modal({backdrop:'static'});
    },
    
};


/*

controller 관련
검색 조건  입력: 
{
    conds:"컬럼명,...",
    컬럼명:"검색값1,검색값2,...", => 여러값 검색일경우 ,구분자로 전달하고 in 으로 검색, 1개만 줄경우 like 로 검색 
    orderby:"정렬순서,..."
}
data 결과 :
{
    success:true/false,
    message:"에러시 메세지",
    list:[],
    object:{},

}

*/

function makegrid(param) {
    return {
//      htmlfile:'menumgr.html', 
         template:'<table id="'+param.idprefix+'cond"></table><br><div id="'+param.idprefix+'grid"></div><div id="'+param.idprefix+'popup" style="display:none">',
         classobj:{initContent: function() {
 
         this.param = param;
         // search templete create...
         var condstr = '';
         for(var i=0; i<param.conds.length; i+=2)
         {
             if(condstr.length>0) condstr += '</tr>';
             param.conds[i]._id = 'cond'+i;
             condstr += '<tr><th>'+param.conds[i].label+'</th><td>';
 
             if(param.conds[i].type == 'combobox')
                 condstr += '<div id="'+param.conds[i]._id+'"</div></td>';
             else
                 condstr += '<input type=text id="'+param.conds[i]._id+'"/></td>';
 
             if((i+1)<param.conds.length)
             {
                 param.conds[i+1]._id = 'cond'+(i+1);
                 condstr += '<th>'+param.conds[i+1].label+'</th><td>';
 
                 if(param.conds[i+1].type == 'combobox')
                     condstr += '<div id="'+param.conds[i+1]._id+'"</div></td>';
                 else
                     condstr += '<input type=text id="'+param.conds[i+1]._id+'"/></td>';
             }
             else cond+= '<th colspan=2></th>';
         }
         if(condstr.length>0) condstr += '<td><button id="'+param.idprefix+'btnsrch"  style="margin-left:10px">검색</button></td></tr>';
         if(condstr.length>0) $(condstr).appendTo($("#"+param.idprefix+"cond"));
 
         // button templete create...
         var btnstr = '';
         for(var i=0; i<param.buttons.length; i++)
         {
             var btn = param.buttons[i];
             btn._id = 'btn_'+i;
             btnstr += '<button id="'+btn._id+'">'+btn.text+'</button> ';
         }
         if(btnstr.length>0) $('<tr><td colspan=5>'+btnstr+'</td></td></tr>').appendTo($("#"+param.idprefix+"cond"));
 
         // grid create...
         param.dataAdapter = new $.jqx.dataAdapter(param.source, {
             downloadComplete: function (data, status, xhr) { },
             loadComplete: function (data) { },
             loadError: function (xhr, status, error) { },
             loadServerData: function (serverdata, src, callback) {
//                console.log('serverdata',  param.source, serverdata);
                $.post({
                    url: param.source.url,
                    data: serverdata,
                    datatype: "json",
                    async: true,
                    global: false,
                    success: function (data, status, xhr)
                    {

                        param.source['total'] = data.total;
                        callback({records: data.list, totalrecords:data.total});
                    }
                });   

             }         });
         // initialize jqxGrid
         param.gridoptions.source = param.dataAdapter;

         param.gridoptions.virtualmode =  true;
         param.gridoptions.rendergridrows = function () {
              return param.gridoptions.source.records;
         };

         param._gridobj = $("#"+param.idprefix+"grid").jqxGrid(param.gridoptions);
 
         if(param.onrowdoubleclick !== undefined)
         $("#"+param.idprefix+"grid").on('rowdoubleclick', function() { param.onrowdoubleclick(param); });
         
         // condition widget 생성
         for(var i=0; i<param.conds.length; i++)
         {
             var cond = param.conds[i];
 //            console.log('cond===>', param.conds[i]);
             if(cond.type == "text")
             {
                 cond._obj = $("#"+cond._id).jqxInput(cond.options);
                 if(cond.value !== undefined ) cond._obj.jqxInput('val', cond.value);
             }
             else if(cond.type == "number")
             {
                 cond._obj = $("#"+cond._id).jqxNumberInput(cond.options);
                 if(cond.value !== undefined ) cond._obj.jqxNumberInput('val', cond.value);
             }
             else if(cond.type == "datetime")
             {
                 cond._obj = $("#"+cond._id).jqxDateTimeInput(cond.options);
                 if(cond.value !== undefined ) cond._obj.jqxDateTimeInput('val', cond.value);
             }
             else if(cond.type == "combobox")
             {
                 cond._obj = $("#"+cond._id).jqxDropDownList(cond.options);
 
                 if(cond.value !== undefined ) 
                 {
                     if(cond.options.checkboxes) cond._obj.jqxDropDownList('checkIndex', cond.value);
                     else cond._obj.jqxDropDownList('val', cond.value);
                 }
             }
 
             if(cond.onchange !== undefined)
             {
                 cond._obj.on('change', cond.onchange );
             }
 
         }
 
         // search button
         $("#"+param.idprefix+"btnsrch").jqxButton({ width: 120, height: 30 });
 
         // button widget 생성
         for( i in param.buttons)
         {
 //            var i = Number(i);
             var btn = param.buttons[i];
 
             param.buttons[i]._obj = $('#'+param.buttons[i]._id).jqxButton(param.buttons[i].options);
             if(param.buttons[i].onclick !== undefined)
             {
                 param.buttons[i]._obj.on('click', param.buttons[i].onclick);
             }
         }
 
         $("#"+param.idprefix+"btnsrch").on('click', function(){
 
//            console.log('srch===>', param);

            param.source.data['conds'] = '';
             for(var i=0; i<param.conds.length; i++)
             {
                 var cond = param.conds[i];
 
                 if(cond.type == "combobox")
                 {
                     var vals = [];
                     if(cond.options.checkboxes)
                     {
                         var items = cond._obj.jqxDropDownList('getCheckedItems');
                         for(var j=0; j<items.length; j++) vals.push(items[j].value);
                     }
                     else vals[0] = cond._obj.jqxDropDownList('val');
                     param.source.data[cond.field] = vals.toString();
                 }
                 else
                 param.source.data[cond.field] = cond._obj.jqxInput('val');
 
                 if(param.source.data['conds'].length>0) param.source.data['conds'] += ',';
                 param.source.data['conds'] += cond.field;
             }

             param.source['total'] = ''; // 검색 누르면 ...
 
             param._gridobj.jqxGrid('updatebounddata');
             param._gridobj.jqxGrid('clearselection');
         }.bind(this));			
 
 
     },
 
     }
     };
 };
 
 function makepopup(param) {
     param._id = ""+Math.round(Math.random()*10000);
     param._template = "<div id='popup"+param._id+"'><div><span id='title'>"+param.title+"</span></div><div style='margin: 10px'><center><table>";
 
     for(var i = 0; i<param.columns.length; i++)
     {
         if (param.columns[i].type == "combobox" )
             param._template += "<th>"+param.columns[i].label+"</th><td><div style='float: left;' id='"+param.columns[i].field+param._id+"'></div></td></tr>";
         else if (param.columns[i].type == "password" )
             param._template += "<tr><th>"+param.columns[i].label+"</th><td><input type=password id='"+param.columns[i].field+param._id+"'/></td></tr>";
         else if (param.columns[i].type != "hidden" )
             param._template += "<tr><th>"+param.columns[i].label+"</th><td><input type=text id='"+param.columns[i].field+param._id+"'/></td></tr>";
     }
     param._template += "</tr><tr><th colspan=2><br>";
     param._template += "<button id='btnsave"+param._id+"'>"+param.savebtn.text+"</button>&nbsp;<button id='btncancel"+param._id+"'>"+param.closebtn.text+"</button>";
     param._template += "</th></tr></table></center></div></div>";
 
     $(param._template).appendTo($('body'));
 
     param._popupobj = $('#popup'+param._id).jqxWindow({
         isModal:true,
         cancelButton:$('#btncancel'+param._id),
         showCollapseButton: true, /*maxHeight: 400, maxWidth: 700, minHeight: 200, minWidth: 200, */ height: param.height, width: param.width,
         initContent: initContent
 
     }).on('close', function() {
         $('#popup'+param._id).jqxWindow('destroy');
     });
 
     $('#btnsave'+param._id).on('click', save);
 
     function save() {
         var data = {};
 
         data.conds = '';
         data.columns = '';
 
         for(var i=0; i<param.columns.length; i++)
         {
             var col = param.columns[i];
             var val = '';
 
             if(col.type == "combobox")
             {
                 if(col.options.checkboxes) {
                     var vals = [];
                     var items = col._obj.jqxDropDownList('getCheckedItems');
                     for(var j in items ) vals.push(items[j].value);
                     
                     val = vals.toString();
                 }
                 else val = col._obj.jqxDropDownList('val');
             }
             else if(col.type == "hidden") val = col.value;
             else if(col.type == "number") val = col._obj.jqxNumberInput('val');
             else if(col.type == "password") val = col._obj.jqxPasswordInput('val');
             else if(col.type == "datetime") val = col._obj.jqxDateTimeInput('val');
             else val = col._obj.jqxInput('val');
 
             if(col.type == 'hidden') 
             {
                 if(data.conds.length > 0) data.conds += ',';
                 data.conds += col.field;
                 data['cond_'+col.field] = val;
             }

             // hidden은 cond와 save양쪽에 셋팅
             {
                 if(data.columns.length > 0) data.columns += ',';
                 data.columns += col.field;

                 data['column_'+col.field] = val;
             }
 
         }
         if(param.onsave !== undefined )
         {
             if(param.onsave(data)) {
//                 $('#popup'+param._id).jqxWindow('close');
//                 if(param.gridobj !==  undefined ) param.gridobj.jqxGrid('updatebounddata');
             }
 
             return;
         }
         if(param.url !== undefined )
         {
             $.post(param.url, data)
             .done(function() {
                 App.notice('저장 되었습니다.', 'info');
                 console.log('param', param);
                 if(param.gridobj !==  undefined ) param.gridobj.jqxGrid('updatebounddata');
                 $('#popup'+param._id).jqxWindow('close');
             })
             .fail(function() {
                 App.notice('저장에 실패 하였습니다.', 'error');
             });
 
         }
     }
 
     function initContent() {
         for(var i=0; i<param.columns.length; i++)
         {
             var col = param.columns[i];
             col._id = col.field+param._id;
             if(col.type == "text")
             {
                 col._obj = $("#"+col.field+param._id).jqxInput(col.options);
                 if(col.value !== undefined ) col._obj.jqxInput('val', col.value);
             }
             else if(col.type == "number")
             {
                 col._obj = $("#"+col.field+param._id).jqxNumberInput(col.options);
                 if(col.value !== undefined ) col._obj.jqxNumberInput('val', col.value);
             }
             else if(col.type == "password")
             {
                 col._obj = $("#"+col.field+param._id).jqxPasswordInput(col.options);
                 if(col.value !== undefined ) col._obj.jqxPasswordInput('val', col.value);
             }
             else if(col.type == "datetime")
             {
                 col._obj = $("#"+col.field+param._id).jqxDateTimeInput(col.options);
                 if(col.value !== undefined ) col._obj.jqxDateTimeInput('val', col.value);
             }
             else if(col.type == "combobox")
             {
                 col._obj = $("#"+col.field+param._id).jqxDropDownList(col.options);
 
                 if(col.value !== undefined ) 
                 {
                     if(col.options.checkboxes) col._obj.jqxDropDownList('checkIndex', col.value);
                     else col._obj.jqxDropDownList('val', col.value);
                 }
             }
 
             if(col.onchange !== undefined)
             {
                 col._obj.on('change', col.onchange );
             }
 
         }
 
         param.savebtn._obj =  $("#btnsave"+param._id).jqxButton(param.savebtn.options);
         param.closebtn._obj =  $("#btncancel"+param._id).jqxButton(param.closebtn.options);
 
     }
     return param;
 }
 
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
	 if(state=="REGISTERING") return lang('common_state_registering',"가입중");
	 else if(state=="INACTIVE") return lang('common_state_inactive',"비활성");
	 else if(state=="ACTIVE") return lang('common_state_active',"활성");
	 else if(state=="REJECT") return lang('common_state_reject',"거절");
	 else if(state=="QUESTION") return lang('common_state_question',"질문");
	 else if(state=="ANSWER") return lang('common_state_answer',"답변");
	 else if(state=="ERROR") return lang('common_state_error',"고장");
	 else if(state=="FIXING") return lang('common_state_fixing',"수리중");
	 else if(state=="FIXED") return lang('common_state_fixed',"수리완료");
	 else if(state=="MAIN") return lang('common_state_main',"메인메뉴");
	 else if(state=="SUB") return lang('common_state_sub',"서브메뉴");
	 else if(state=="DIV") return lang('common_state_div',"구분자");
	 return state;
 }
   
 function role_str(role)
 {
	 var rolestrs = "";
	 var roles = role.split(",");
	 for(var i=0; i<roles.length; i++)
	 {
		 if(rolestrs!="") rolestrs += ",";
		 if(roles[i]=="ADMIN") rolestrs += lang('common_role_admin',"어드민");
		 else if(roles[i]=="USER") rolestrs += lang('common_role_user',"개인");
		 else if(roles[i]=="TEAM") rolestrs += lang('common_role_team',"팀");
		 else rolestrs+=roles[i]; 
	 }
 
	 return rolestrs;
	 
//	 return role
 }
 
 // 초기 init 실행...
 $(function init(){
 	/*
	// config load
	$.post(App.baseurl+'/api/tb_config/alist', {conds:'item',item:'docchk-cmd,cluster-cmd,word2vec-cmd,function-limit'}).done(function(data) {
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
	// 로그 기록 
	var ldata = {};
	ldata.columns = "url,uid,ip";
	ldata.column_url = window.location.href;
	ldata.column_uid = getCookie('id');
	ldata.column_ip = "REMOTEADDR()";
	$.post(App.baseurl+'/api/tb_access_log/add', ldata).done(function(data) {});
	*/
	
	/*
	// session check;
	if(App.sessiontimer!=null) clearInterval(App.sessiontimer);
	App.sessiontimer = setInterval(sessionchk, 5000);
	*/
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
	 for(var i = 0; i<options.columns.length; i++)
	 {
		 if(options.columns[i].defaultContent === undefined ) options.columns[i].defaultContent = "";
	 }
	 if(options.language===undefined)
		 options.language = {
		        emptyTable: lang('common_grid_emptytable',"데이터가 없습니다."),
		        lengthMenu: lang('common_grid_lengthmenu',"페이지당 _MENU_ 개씩 보기"),
		        info: lang('common_grid_info',"현재 _START_ - _END_ / _TOTAL_건"),
		        infoEmpty: lang('common_grid_infoempty',"데이터 없음"),
		        infoFiltered: lang('common_grid_infofiltered', "( _MAX_건의 데이터에서 필터링됨 )"),
		        search: lang('common_grid_search', " 검색: "),
		        zeroRecords: lang('common_grid_zerorecords', "일치하는 데이터가 없어요."),
		        loadingRecords: lang('common_grid_loadingrecords', "로딩중..."),
		        processing:     lang('common_grid_processing', "잠시만 기다려 주세요..."),
		        /*
		        paginate: {
		            next: "다음",
		            previous: "이전"
		        }
		        */
		 };
	 
	 if(options.bSort===undefined) options.bSort = false;
	 if(options.bAutoWidth===undefined) options.bAutoWidth = false;
	 
	 return $(selector).dataTable(options);
}
 
// 페이지 이동...
function movepage(page, param)
{
	if(param !== undefined) App.loadParam = param;
	else App.loadParam = null;
	App.prevpage = App.curpage;
	App.curpage = page;
	$("#page-content").empty().load(page, 'f' + (Math.random()*1000000));
}

//자릿수만큼 0채웨서 리턴
function pad(n, width) {
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

function human_number(v, post)
{
	if(v === undefined || v == "undefined") return "0 "+post;
	if(v>1000000) return ""+Math.floor((v/1000000)*10)/10+"m";
	if(v>1000) return ""+Math.floor((v/1000)*10)/10+"k";
	else return ""+v+post;
}

function human_byte(v, post)
{
	if(v>(1024*1024*1024)) return ""+Math.floor((v/(1024*1024*1024))*10)/10+" Gbyte";
	if(v>(1024*1024)) return ""+Math.floor((v/(1024*1024))*10)/10+" Mbyte";
	if(v>1024) return ""+Math.floor((v/1024)*10)/10+" Kbyte";
	else return ""+v+post+" byte";
}

document.oncontextmenu = function()
{
//	 if(event.srcElement.type != "text" && event.srcElement.type != "textarea") return false;
}
 
function sessionchk()
{
	if(!App.islogin && getCookie("id")!="") App.islogin = true;
	user
	// login timeout...
	if(App.islogin && getCookie("id")=="")
	{
		clearInterval(App.sessiontimer);
		App.sessiontimer = null;
		
		App.msg_alert(lang('common_session_session_end','세션종료'), lang('common_session_msg_relogin','로그인 세션이 종료되었습니다. 다시 로그인해주세요!'), function() {location.href = "page_login.html";});
	}
}

Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
 
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

if($.datepicker!==undefined)
{
$.datepicker.setDefaults({
    dateFormat: 'yy-mm-dd',
    prevText: '이전 달',
    nextText: '다음 달',
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    showMonthAfterYear: true,
    yearSuffix: '년'
});
}

//엑셀 다운로드
function fnExcelDownload(selector, title) {
    var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
    tab_text += '<head><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
    tab_text += '<xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'
    tab_text += '<x:Name>Sheet</x:Name>';
    tab_text += '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
    tab_text += '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';
    tab_text += "<table border='1px'>";
    var exportTable = $(selector).clone();
    exportTable.find('input').each(function (index, elem) { $(elem).remove(); });
    tab_text += exportTable.html();
    tab_text += '</table></body></html>';
    var data_type = 'data:application/vnd.ms-excel';
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    var fileName = title + '.xls';

    // IE 환경에서 다운로드
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    if (window.navigator.msSaveBlob) {
    var blob = new Blob([tab_text], {
    type: "application/csv;charset=utf-8;"
    });
    navigator.msSaveBlob(blob, fileName);
    }
    } else {
    var blob2 = new Blob([tab_text], {
    type: "application/csv;charset=utf-8;"
    });
    var filename = fileName;
    var elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob2);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
    }

};

// 다중  post... item  {url:'url',data:{},callback:function() {} }, callback
function multi_post(postinfos, callback)
{
	if(postinfos.length==0) return;
	
	var postitem = postinfos[0];
	$.post(postitem.url, postitem.data).done(function() {
		if(postitem.callback !== undefined) postitem.callback(true, postitem);
		var infos = postinfos.slice(1);
		if(infos.length<1 && callback!==undefined) callback(true);
		multi_post(infos, callback);
	}).fail(function() {
		if(callback!==undefined) callback(false);
	});
}

// tsdb result to json list 
function gettsdata(data)
{
	var ret = {};
	
	
	console.log('gettsdata', data);
	
	ret.columns = data.results[0].series[0].columns;
	ret.list = [];
	
	for(var i=0; i<data.results[0].series[0].values.length; i++)
	{
		var items = data.results[0].series[0].values[i];
		var val = {};
		for(var c=0; c<items.length;c++) {
			var v = items[c];
			if(c==0) v = (new Date(v)).format("yyyy-MM-dd HH:mm:ss");
			val[ret.columns[c]] = v;
		}
		ret.list.push(val);
	}
	return ret;
}

// influx db query
//http://onsite-monitor.xip.kr:8086/query?db=powermonitor&q=select%20*%20from%20PM0001%20order%20by%20time%20desc%20limit%20100
function query(database, sql, callback, param)
{
	var username="whaleshark";
	var password="whaleshark";
	var data = {"db":database,"q":sql};
	$.ajax({
	  type: "GET",
	  url: "http://onsite-monitor.xip.kr:8086/query",
	  dataType: 'json',
      crossDomain: true,
	  contentType: "application/json; charset=utf-8",
//      data: JSON.stringify(data),
      data: data,
      cache: false,
	  headers: {
		"Authorization": "Basic " + btoa(username + ":" + password)
	  },
	  success: function (result, p){
		  if(callback!==undefined) {
			if(result.results[0].series === undefined ) callback(false, result, param)
			else callback(true, result, param); 
			return; 
		  }
		  console.log(result);
	  },
	  error:function(err){
		  if(callback!==undefined) { callback(false, err, param); return; }
		  console.log('error', err);
	  }
	});
}

// influx db query
//http://onsite-monitor.xip.kr:8086/query?db=powermonitor&q=select%20*%20from%20PM0001%20order%20by%20time%20desc%20limit%20100
function query_lite(ourl, database, sql, callback, param)
{
	var p0 = ourl.indexOf('://'); //account
	var p1 = ourl.indexOf(':',p0+3); // password
	var p2 = ourl.lastIndexOf('@'); //host
	var p3 = ourl.lastIndexOf(':'); //port
	var p4 = ourl.lastIndexOf('/');
	 
	var uid="";
	var pwd="";
	var host="";
	var port="";
	if(p0>=0 && p1>=0&& p2>=0&& p3>=0 && p4>=0)
	{
		uid = ourl.substring(p0+3,p1);
		pwd = ourl.substring(p1+1,p2);
		host = ourl.substring(p2+1,p3);
		port = ourl.substring(p3+1,p4);
	}

  	console.log('uid===>',uid);
  	console.log('pwd===>',pwd);
	
	var url = "http://"+host+":"+port+"/query"
	  
  	var username=uid;
  	var password=pwd;
  	
  	var data = {"db":database,"q":sql};
  	$.ajax({
  	  type: "GET",
  	  url: url,
  	  dataType: 'json',
        crossDomain: true,
  	  contentType: "application/json; charset=utf-8",
//            data: JSON.stringify(data),
        data: data,
        cache: false,
  	  headers: {
  		"Authorization": "Basic " + btoa(username + ":" + password)
  	  },
  	  success: function (result, p){
  		  if(callback!==undefined) {
  			if(result.results[0].series === undefined ) callback(false, result, param)
  			else callback(true, result, param); 
  			return; 
  		  }
  		  console.log(result);
  	  },
  	  error:function(err){
  		  if(callback!==undefined) { callback(false, err, param); return; }
  		  console.log('error', err);
  	  }
  	});
}        

// columns 선택창
function selectcolumn_dlg(columns, selected, ok_callback)
{
	var html = '';
	html += '<div class="modal columns-modal">';
	html += '<div class="modal-dialog">';
	html += '	<div class="modal-content">';
	html += '		<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>';
	html += '		<h4>컬럼선택</h4>';
	html += '		</div>';
	html += '		<div class="modal-body"><form class=form-horizontal>';
	html += '			<div class="form-group">';
	html += '			<label class="control-label col-md-3">컬럼선택</label>';
	html += '			<div class="col-md-9">';
	html += '			<input name=selected type=text class="form-control" value="'+selected.join(",")+'" readonly>';
	html += '			</div>';
	html += '			<div class="form-group">';
	html += '			<label class="control-label col-md-3">컬럼<a class="all">[전체]</a></label>';
	html += '			<div id="columnlist" class="col-md-8" style="height:400px; overflow:auto">';
	for(var i=0; i<columns.length;i++)
	{
		var checked = "";
		if(selected.indexOf(columns[i])>=0) checked = "checked";
		
		html += '			<input id="columnlist'+i+'" name=columnlist type=checkbox value="'+columns[i]+'" '+checked+'> <label for="columnlist'+i+'"> '+columns[i]+' </label><br>';
	}
	html += '			</div>';
	html += '			</div>';
	html += '		</form></div>';
	html += '		<div class="modal-footer remove-margin">';
	html += '			<button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-times"></i> 닫기</button>';
	html += '			<button type="button" class="btn btn-success btn-selok" ><i class="fa fa-check"></i>확인</button>';
	html += '		</div>';
	html += '	</div>';
	html += '</div>';
	html += '</div>';
	
	if($('.columns-modal').length>0) $('.columns-modal').remove();
	
	$(html).appendTo('body')
	$('.columns-modal').modal({backdrop:'static'}).find('.modal-content').draggable();
	
	$('.columns-modal a.all').off('click').on('click',function() {
		var old_vals = [];
		$('.columns-modal [type=checkbox]').each(function() { 
			var chk = $(this).prop('checked');
			if(chk) chk = false;
			else {
				chk = true;
				old_vals.push($(this).val());
			}
			$(this).prop('checked', chk); });
		
		$('.columns-modal input[name=selected]').val(old_vals.join(','));
	});
	$('.columns-modal [type=checkbox]').off('click').on('click',function() {
		var checked = $(this).prop('checked');
		var val = $(this).val();
		var vals = $('.columns-modal input[name=selected]').val();
		var old_vals = vals=="" ? [] : vals.split(',');
		var fp = old_vals.indexOf(val);
		if(checked)
		{
			if(fp<0) old_vals.push(val); 
		}
		else {
			if(fp>=0) old_vals.splice(fp,1); 

		}
		$('.columns-modal input[name=selected]').val(old_vals.join(','));
	});

	$('.columns-modal button.btn-selok').off('click').on('click',function() {
		$('.columns-modal').modal('hide');
		selected = [];
//		$('.columns-modal [type=checkbox]:checked').each(function() { selected.push($(this).val()); });
		selected = $('.columns-modal input[name=selected]').val().split(",");
		if(ok_callback!==undefined && ok_callback!=null) ok_callback(selected);
	});
}

// column 선택창
function selectcolumn1_dlg(columns, selected, ok_callback)
{
	var html = '';
	html += '<div class="modal columns-modal">';
	html += '<div class="modal-dialog">';
	html += '	<div class="modal-content">';
	html += '		<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>';
	html += '		<h4>컬럼선택</h4>';
	html += '		</div>';
	html += '		<div class="modal-body"><form class=form-horizontal>';
	html += '			<div class="form-group">';
	html += '			<label class="control-label col-md-3">컬럼</label>';
	html += '			<div id="columnlist" class="col-md-8" style="height:400px; overflow:auto">';
	for(var i=0; i<columns.length;i++)
	{
		var checked = "";
		if(selected.indexOf(columns[i])>=0) checked = "checked";
		
		html += '			<input id="columnlist'+i+'" name=columnlist type=radio value="'+columns[i]+'" '+checked+'> <label for="columnlist'+i+'"> '+columns[i]+' </label><br>';
	}
	html += '			</div>';
	html += '			</div>';
	html += '		</form></div>';
	html += '		<div class="modal-footer remove-margin">';
	html += '			<button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-times"></i> 닫기</button>';
	html += '			<button type="button" class="btn btn-success btn-selok" ><i class="fa fa-check"></i>확인</button>';
	html += '		</div>';
	html += '	</div>';
	html += '</div>';
	html += '</div>';
	
	if($('.columns-modal').length>0) $('.columns-modal').remove();
	
	$(html).appendTo('body')
	$('.columns-modal').modal({backdrop:'static'}).find('.modal-content').draggable();
	
	$('.columns-modal button.btn-selok').off('click').on('click',function() {
		$('.columns-modal').modal('hide');
		selected = [];
		$('.columns-modal [type=radio]:checked').each(function() { selected.push($(this).val()); });
		if(ok_callback!==undefined && ok_callback!=null) ok_callback(selected);
	});
}

// column 선택창
function selectcolumn1_dlg(columns, selected, ok_callback)
{
	var html = '';
	html += '<div class="modal columns-modal">';
	html += '<div class="modal-dialog">';
	html += '	<div class="modal-content">';
	html += '		<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>';
	html += '		<h4>컬럼선택</h4>';
	html += '		</div>';
	html += '		<div class="modal-body"><form class=form-horizontal>';
	html += '			<div class="form-group">';
	html += '			<label class="control-label col-md-3">컬럼</label>';
	html += '			<div id="columnlist" class="col-md-8" style="height:400px; overflow:auto">';
	for(var i=0; i<columns.length;i++)
	{
		var checked = "";
		if(selected.indexOf(columns[i])>=0) checked = "checked";
		
		html += '			<input id="columnlist'+i+'" name=columnlist type=radio value="'+columns[i]+'" '+checked+'> <label for="columnlist'+i+'"> '+columns[i]+' </label><br>';
	}
	html += '			</div>';
	html += '			</div>';
	html += '		</form></div>';
	html += '		<div class="modal-footer remove-margin">';
	html += '			<button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-times"></i> 닫기</button>';
	html += '			<button type="button" class="btn btn-success btn-selok" ><i class="fa fa-check"></i>확인</button>';
	html += '		</div>';
	html += '	</div>';
	html += '</div>';
	html += '</div>';
	
	if($('.columns-modal').length>0) $('.columns-modal').remove();
	
	$(html).appendTo('body')
	$('.columns-modal').modal({backdrop:'static'}).find('.modal-content').draggable();
	
	$('.columns-modal button.btn-selok').off('click').on('click',function() {
		$('.columns-modal').modal('hide');
		selected = [];
		$('.columns-modal [type=radio]:checked').each(function() { selected.push($(this).val()); });
		if(ok_callback!==undefined && ok_callback!=null) ok_callback(selected);
	});
}

function dur_fmt(seconds)
{
	seconds = Math.floor(seconds);
	var d = Math.floor(seconds / (60*60*24));
	var h = Math.floor((seconds % (60*60*24)) / (60*60));
	var m = Math.floor((seconds % (60*60)) / 60);
	var s = seconds % 60;
	
	var str = "";
	if(d>0) str += d+"일 ";
	if(h>0) str += h.zf(2)+"시간 ";
	if(m>0) str += m.zf(2)+"분 ";
	if(s>0) str += s.zf(2)+"초 ";
	return str;
}