var divselector = "#charts";

var colors = [
	'255, 99, 132',
	'54, 162, 235',
	'255, 206, 86',
	'75, 192, 192',
	'153, 102, 255',
	'255, 159, 64'];

for(var i=0; i<100; i++) colors.push(""+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255));

var App = {};
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

function graph(selector, type, data, labels) {

	var ds = [];
	
//	var colors = [];


	if(!Array.isArray(data[1][0]))
	{
		ds.push({
			legend: true,
			tooltips: true,
			label: labels[1],
			data: data[1],
			backgroundColor:'rgba(255, 99, 132, 0.2)',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,  //선굵기
			pointRadius: 2,
			pointHoverRadius: 2,
			fill:true

		 });
	}
	else
	{
		for(var i=0; i<data[1].length; i++)
		{
			ds.push({
				legend: true,
				tooltips: true,
				label: labels[1][i],
				data: data[1][i],
				backgroundColor:"rgba("+colors[i]+",0.2)",
				borderColor: "rgba("+colors[i]+",1)",
				borderWidth: 1, //선굵기
				pointRadius: 2,
				pointHoverRadius: 2,
				fill:true
			 });
		}
	
	}
	var chart = new Chart(selector, {
		type: type, //그래프 형태 지정하기
			data: {
				labels: data[0], //X축 제목
				datasets: ds,
			},
			options: {
//				responsive: true,
				maintainAspectRatio: false,
				scales: { //X,Y축 옵션
				yAxes: [{
					ticks: {
							beginAtZero: true //Y축의 값이 0부터 시작
						}
					}],
				},
				legend: {
					display: true
				},
				animation: {
					duration: 0
				}
			}
	});	
//	console.log('chart end', new Date());
	return chart;
}

function makechartobj(id)
{
	var chartobj = {};
	if(App.chid===undefined) App.chid = 0;
 	if(App.chartobjs===undefined) App.chartobjs = [];
 	
	if(id===undefined)
	{
		App.chid++;
		chartobj.id = "chart"+App.chid;
	}
	else 
	{
		chartobj.id = id;
		var cid = Number(id.replace("chart", ""));
		if(cid>App.chid) App.chid = cid;
	}
 	
	return chartobj;
}

function readdata(mtype, ourl, odatabase, table, filepath, sql, callback, param)
{
	if(App===undefined) App = {};
	if(App.baseurl===undefined) App.baseurl = "http://whalesharklite.datacentric.kr";	
	
	if(mtype=="tsdb")
	{
		query_lite(ourl, odatabase, sql, function(success, res){
			if(success)
			{
				var data = gettsdata(res);
				if(callback!==undefined) callback(true, data, param)
			}
			else if(callback!==undefined) callback(false, null, param)
		}, null);
		
	}
	else if(mtype=="rdb")
	{
		gridurl = App.baseurl+'/readrdb';
		
		console.log(gridurl);
		$.post(gridurl, {table:table,length:10000},function(res) {
    		if(res.success)
    		{
				var data = {list:res.list};
				data.columns = []; 
				if(res.list.length>0) data.columns = Object.keys(data.list[0]);
				if(callback!==undefined) callback(true, data, param)
    		}
			else if(callback!==undefined) callback(false, null, param)
    	});
		
	}
	else if(mtype=="csv" || mtype=="xls")
	{
		gridurl = App.baseurl+'/readcsv';
    	$.post(gridurl, {filepath:filepath,length:10000},function(res) {
    		if(res.success)
    		{
				var data = {list:res.list};
				data.columns = []; 
				if(res.list.length>0) data.columns = Object.keys(data.list[0]);
				if(callback!==undefined) callback(true, data, param)
    		}
			else if(callback!==undefined) callback(false, null, param)
    	});
	}
}


// chart 추가, id 가 있으면 .. load 
function addchart(mtype, ourl, odatabase, table, filepath, sql, timer, id, left, top, width, height)
{
//	if(App.chid==undefined) App.chid = 0;
// 	if(App.chartobjs==undefined) App.chartobjs = [];

	var chartobj = makechartobj(id);
	
	var style = "display:inline-block;width:95%;height:400px;";
	if(left!==undefined) style = "position:absolute;left:"+left+"px;top:"+top+"px;width:"+width+"px;height:"+height+"px;";
	$(divselector).append("<div class='chart' style='"+style+"'><canvas id="+chartobj.id+" width=400 height=400></canvas></div>");
	
//	if(id===undefined) App.start_loading('검색중...');

    chartobj.mtype = mtype;
    chartobj.ourl = ourl;
    chartobj.odatabase = odatabase;
    chartobj.table = table;
    chartobj.filepath= filepath;
    chartobj.sql = sql;
    chartobj.timer_interval = timer;
    chartobj.type = "line";
    chartobj.left = left;
    chartobj.top = top;
    chartobj.width = width;
    chartobj.height = height;

	readdata(mtype, ourl, odatabase, table, filepath, sql, function(issuccess, result, param) { // result == {columns:[], list:[]}
//		if(id===undefined) App.stop_loading();
		if(issuccess)
		{
			var xvals = [];
			var yvals = [];
			var ylabel = [];

			// columns info
			for(var i=0;i<result.columns.length; i++)
			{
				var item = result.columns[i];
				if(i>0) ylabel.push(item);
			}
			
//			console.log("labels", ylabel);
			// values
			for(var i=0; i<result.list.length; i++)
			{
				var item = result.list[i];
				var t = item[result.columns[0]]; // 첫번째 컬럼
				xvals.push(t);
				
				for(var c=1; c<result.columns.length;c++) {
					var cname = result.columns[c];
					if(i==0) 
						yvals.push([ item[cname] ]);
					else
						yvals[c-1].push(item[cname]);
				}
			}
			chartobj.data = {vals:[xvals,yvals],labels:["시간",ylabel]};
			chartobj.obj = graph(chartobj.id, "line", chartobj.data.vals,chartobj.data.labels);
		}
	}, null);
	chartobj.timer = null; //setTimeout();
	if(chartobj.timer_interval!="") chartobj.timer = setTimeout(refreshchart, 1000*chartobj.timer_interval, chartobj);
	
	App.chartobjs.push(chartobj);
}

// refreshchart
function refreshchart(chartobj)
{
//	console.log('refreshchart_'+chartobj.id+(new Date()).format('yyyy-MM-dd HH:mm:ss'));
	if($('#'+chartobj.id).length<=0) {
		return;
	}
	
	readdata(chartobj.mtype, chartobj.ourl, chartobj.odatabase, chartobj.table, chartobj.filepath, chartobj.sql, function(issuccess, result, param) {
		if(issuccess)
		{
			var xvals = [];
			var yvals = [];
			var ylabel = [];

			// columns info
			for(var i=0;i<result.columns.length; i++)
			{
				var item = result.columns[i];
				if(i>0) ylabel.push(item);
			}
			// values
			for(var i=0; i<result.list.length; i++)
			{
				var item = result.list[i];
				var t = item[result.columns[0]]; // 첫번째 컬럼
				xvals.push(t);
				
				for(var c=1; c<result.columns.length;c++) {
					var cname = result.columns[c];
					if(i==0) 
						yvals.push([ item[cname] ]);
					else
						yvals[c-1].push(item[cname]);
				}
			}
			chartobj.data = {vals:[xvals,yvals],labels:["시간",ylabel]};
			if(chartobj.obj!=null) {
				chartobj.obj.destroy();
				chartobj.obj = null;
			}
			chartobj.obj = graph(chartobj.id, "line", chartobj.data.vals,chartobj.data.labels);
		}
		else
		{
			console.log('query error...['+chartobj.sql+']', chartobj);
		}
		if(chartobj.timer!=null) {
			clearTimeout(chartobj.timer);
			chartobj.timer = null;
		}
		if(chartobj.timer_interval!="") chartobj.timer = setTimeout(refreshchart, 1000*chartobj.timer_interval, chartobj);
	});
}

//chart,pie allclear()
function clearAllChart()
{
	if(App.chartobjs==undefined) return;
	for(var i=0; i<App.chartobjs.length; i++)
	{
		var chartobj = App.chartobjs[i];
		if(chartobj.timer!==undefined && chartobj.timer!=null) clearTimeout(chartobj.timer);
		if(chartobj.obj!==undefined && chartobj.obj!=null) chartobj.obj.destroy();
		if(chartobj.type=="line" || chartobj.type=="pie") $('#'+chartobj.id).parent().remove();
		else $('#'+chartobj.id).remove();
	}
	App.chartobjs =[];
	App.chid = 0;
	
	$('#save-modal [name=name]').val('');
	$('#save-modal [name=id]').val('');
//	$('#save-modal [name=permission]').val('');
	$('#dashname').text('');
//	$('.W').show();
	$('#btnlayout').html('<i class="fa fa-pencil-square-o"></i> 레이아웃편집');
}

//pie 추가 id 가 있으면 load
function addpie(mtype, ourl, odatabase, table, filepath, sql, timer, id, left, top, width, height)
{
//		App.chid++;
//		if(id===undefined) chartobj.id = "pie"+App.chid;
//		else chartobj.id = id;

		var chartobj = makechartobj(id);

		chartobj.mtype = mtype;
	    chartobj.ourl = ourl;
	    chartobj.odatabase = odatabase;
	    chartobj.table = table;
	    chartobj.filepath= filepath;
	    chartobj.sql = sql;
	    
//	    if(id===undefined) App.start_loading('검색중...');
	    
	    chartobj.timer_interval = timer;
	    chartobj.type = "pie";
	    
//	    chartobj.cinfo = infos[ci];
//	    chartobj.idx = ci;
		chartobj.data = {};


	    chartobj.left = left;
	    chartobj.top = top;
	    chartobj.width = width;
	    chartobj.height = height;

	    readdata(mtype, ourl, odatabase, table, filepath, sql, function(issuccess, result, cobj) {
//	    	if(id===undefined) App.stop_loading();
			if(issuccess)
			{
				var xvals = [];
				var yvals = [];
				var ylabel = [];

				// columns info
				for(var i=0;i<result.columns.length; i++)
				{
					var item = result.columns[i];
					if(i>0) ylabel.push(item);
				}
				// values
				for(var i=0; i<result.list.length; i++)
				{
					var item = result.list[i];
					var t = item[result.columns[0]];
					xvals.push(t);
					
					for(var c=1; c<result.columns.length;c++) {
						var cname = result.columns[c];
						if(i==0) 
							yvals.push([ item[cname] ]);
						else
							yvals[c-1].push( item[cname] );
					}
				}
				
				cobj.data = {vals:[xvals,yvals],labels:["시간",ylabel]};
				
				var style = "display:inline-block; width:400px;height:400px;";
				if(left!==undefined) style = "position:absolute; display:inline-block; left:"+left+"px;top:"+top+"px;width:"+width+"px;height:"+height+"px;";
				
//				console.log("pie",style);
				$(divselector).append("<div class='chart' style='"+style+"'><canvas id="+cobj.id+" width=100% height=100%></canvas></div>");
				
//				var maxval = cobj.cinfo.vrange.split("~")[1];

				var maxval = 200;
				
				cobj.maxval = maxval;
				cobj.name = ylabel[0];
				cobj.idx = 0;
				
				cobj.obj = pie(cobj.id, cobj.idx, cobj.name, cobj.maxval, yvals[0][0], null);

				cobj.timer = null; //setTimeout();
				if(cobj.timer_interval!="") cobj.timer = setTimeout(refreshpie, 1000*cobj.timer_interval, cobj);
				
				App.chartobjs.push(cobj);
			}
			else
			{
				console.log('query error...['+chartobj.sql+']');
			}
		},chartobj);
}

function refreshpie(chartobj)
{
//	console.log('refreshpie_'+chartobj.id+(new Date()).format('yyyy-MM-dd HH:mm:ss'));
	if($('#'+chartobj.id).length<=0) {
		return;
	}
	
	readdata(chartobj.mtype, chartobj.ourl, chartobj.odatabase, chartobj.table, chartobj.filepath, chartobj.sql, function(issuccess, result, cobj) {
		if(issuccess)
		{
			var xvals = [];
			var yvals = [];
			var ylabel = [];

			// columns info
			for(var i=0;i<result.columns.length; i++)
			{
				var item = result.columns[i];
				if(i>0) ylabel.push(item);
			}
			// values
			for(var i=0; i<result.list.length; i++)
			{
				var item = result.list[i];
				var t = item[result.columns[0]];
				xvals.push(t);
				
				for(var c=1; c<result.columns.length;c++) {
					var cname = result.columns[c];
					if(i==0) 
						yvals.push([ item[cname] ]);
					else
						yvals[c-1].push( item[cname] );
				}
			}
			
			chartobj.data = {vals:[xvals,yvals],labels:["시간",ylabel]};
			
			var maxval = 200;
			
			cobj.maxval = maxval;
			cobj.name = ylabel[0];
			cobj.idx = 0;

			chartobj.obj = pie(chartobj.id, chartobj.idx, chartobj.cinfo.name, maxval, yvals[0][0], chartobj.obj);
		}
		else
		{
			console.log('query error...['+chartobj.sql+']', chartobj);
		}
		
		if(chartobj.timer!=null) {
			clearTimeout(chartobj.timer);
			chartobj.timer = null;
		}
		if(chartobj.timer_interval!="") chartobj.timer = setTimeout(refreshpie, 1000*chartobj.timer_interval, chartobj);
	}, chartobj);
}

function pie(id, idx, title, maxval, value, chart)
{
	var keys = [title,''];
	var vals = [value, maxval-value];

	var pieinfo = {
		type : 'doughnut',
		data : {
			datasets : [ {
				data : vals,
				label : title,
				backgroundColor:["rgba("+colors[idx]+",1)", 'lightgrey'],
				borderColor: ["rgba("+colors[idx]+",1)", 'white'],
				borderWidth: 0//[0, 0, 0, 0, 0, 0, 0]
			} ],
			labels : keys
		},
		options : {
			circumference: Math.PI+1,
			rotation: -Math.PI - 0.5,
			legend:{
			display:false,
			position : 'right'
		},
		responsive : true,
		title : {
				display:true,
				text : title+"("+value+")",
				fontSize:20,
				fontStyle:'bold',
				position:'top'
		},
		plugins: {
		          labels: { 
		        	  	render: 'value',
		              	position: 'outside'
		              }	            
		         },
		}
	};

	if(chart==null || chart === undefined)
		chart = new Chart(id,pieinfo);
	else {
		chart.options.title.text = title+"("+value+")";
		chart.data.datasets[0].data = vals;
		chart.data.labels = keys;
		chart.update();
	}

	return chart;
}


var loaddashs = [];

function updatedashdata(name, data)
{
	$('#dashname').text(name);
	
	var lst = data; //JSON.parse(data);
	for(var i=0; i<lst.length; i++)
	{
		var item = lst[i];
		
		if(item.type=="line") addchart(item.mtype, item.ourl, item.odatabase, item.table, item.filepath, item.sql, item.timer_interval, item.id, item.left, item.top, item.width, item.height);
		else if (item.type=="pie") addpie(item.mtype, item.ourl, item.odatabase, item.table, item.filepath, item.sql, item.timer_interval, item.id, item.left, item.top, item.width, item.height);
		else if (item.type=="text") addstatictext(item.text, item.id, item.fontattr, item.left, item.top, item.width, item.height);
		else if (item.type=="sensortext") addtext(item.mtype, item.ourl, item.odatabase, item.table, item.filepath, item.sql, item.timer_interval, item.id, item.text, item.fontattr, item.left, item.top, item.width, item.height);
		else if (item.type=="img") addimg(item.text, item.id, item.left, item.top, item.width, item.height);
		else if (item.type=="background") {
			$(divselector).css("background-image", item.data).css("background-repeat","no-repeat");
//        	$('#btnAddBack').text("배경지우기");
		}
	}
}

function loaddashboard(selector, id)
{
	divselector = selector;

	$.post("http://whalesharklite.datacentric.kr/list", {qid:'dashboardget',id:id}, function(res) {
	
	if(res.success && res.list.length>0)
	{
		var json = res.list[0].data;
		var sp = json.indexOf('"sql":"');
		
		var cvtjson="";
		while(sp>=0)
		{
			var ep = json.indexOf('","timer_interval"', sp+7);
			if(ep>=0)
			{
				cvtjson += json.substring(0,sp+7);
				cvtjson += json.substring(sp+7, ep).split('"').join('\\"');
				
				json = json.substring(ep);
				sp = json.indexOf('"sql":"');
			}
		}
		cvtjson += json;
				
		updatedashdata('load', JSON.parse(cvtjson));
	
	}
	
	});
}
