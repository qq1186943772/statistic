var subUrl ;		// 提交的 url
var addView ;		// 打开弹窗的标记
var selName ;		// 查询的表单的 input name 集合 
var tableObj ;		// 初始化 table所 需要而 参数 

//增加的方法
function add(addUrl) {
	subUrl = addUrl;		//增加的路径
	addView = layer.open();		//打开增加窗口，不用初始化表格，会自动初始化
}

// 修改的方法
// data 数据表格中选中项
// myform 需要填充的 表单对象
// editUrl 修改的路径
function edit(data, myform,editUrl) {
	subUrl = editUrl;		// 修改的路径
	if (data.length == 1) {		// 修改时 只能修改一条
		var obj = data[0];
		addView = layer.open(); // 注意要先打开 窗口， 打开窗后会清空表单
		myform.val("subForm", obj);  // 想表单中填充数据 
	} else {
		layer.msg('您需要选中，或者只能选中一行进行编辑');
	}
}

// 删除的方法 
// 参数  checkStatus 列表选中项
// 参数  delUrl  删除的路径 
function del(checkStatus,delUrl) {
	var ids = [];			// 多条删除
	for(var i = 0;i<checkStatus.length;i++){
		var obj = checkStatus[i];
		ids.push(obj['user_code']);
	}
	
	$.ajax({
		headers: {	// 后端自动转换 前段传过去的 json 字符串，传输格式修改为 JSON
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	    },
		type : "POST",
		url : delUrl,
		data : JSON.stringify(ids),		// data 直接指向 JSON 字符串
		dataType : "Json",
		success : function(message) {
			var msg = "删除失败";
			if (message) {
				msg = "删除成功";
				selSubmit()
			}
			layer.msg(msg, {			// 修改提示框在 右下角
				time : 1500,
				offset : 'rb',
				anim : 2
			});
		}
	})
}

// 搜索的方法  
// 参数  fields 需要搜索的字段的 数组  
function selSubmit(){
	var names = selName;
	var obj = {};
	
	for(var i = 0 ;i < names.lenght;i++){
		var field = $("#"+names[i]).val();
		if(field != "" && field != null){
			obj[names[i]] = field;
		}
	}
	
	reloadTable(tableObj.tableId,tableObj.tableEntity,obj);
	
}

// 增加/修改的关闭窗口
function cancel(field,title,width){
	layer.close(addView);
}

// 表单初始化
// 参数  myform 操作的表单对象
// 参数 submitId 监听那个一个提交按钮
function formConfig(myform,submitId){
	
	myform.render(null, submitId);				//初始化所有列

	myform.on('submit('+submitId+')', function(data) {	// 表单提交事件监听
		layui.use('jquery', function() {
			var $ = layui.$;
			$.ajax({
				headers: {	// 后端自动转换 前段传过去的 json 字符串，传输格式修改为 JSON
			        'Accept': 'application/json',
			        'Content-Type': 'application/json'
			    },
				type:'POST',
				url : subUrl, // ajax请求路径  
				dataType:"Json",
				data:JSON.stringify(data.field),
				success : function(message) {
					var msg = "提交失败";
					if (message) {
						layer.close(addView);
						msg = "提交成功";
						selSubmit();
					}
					layer.msg(msg, {
						time : 1500,
						offset : 'rb',
						anim : 2
					});
				}
			});
		});
		return false;//禁止跳转，否则会提交两次，且页面会刷新
	});
}

// 弹出信息框初始化
function layerConfig(){
	layer.config({
		type : 1,
		title : "录入信息",
		area : '400px',
		btn : [],
		content : $("#dialog").html()
	});
}

// 创建 查询的 div 以及 添加的div
// 需要添加的 input 的name ，和 input的 提示
// name属性说明 最前面的 ‘-’ 表示 是搜索项 ，最后面的 ‘-’表示 该项 不做增加显示
function createSelAddHmtl(names,title,formFilter){
	
	var sels = [];	//  搜索需要添加的
	var adds = [];	// 	增加需要添加的
	
	for(var i = 0;i < names.length;i++){
		var name = names[i];
		if(name.indexOf('-') == 0) {	// 判断第一个字符是 - 字符
			name = name.substring(1,name.length+1); 			// 去掉第一个字符
			sels.push(name);	// 添加到sels
			adds.push(name);	// 添加到 adds
			continue;			// 跳出本次循环
		}
		adds.push(name);	// 如果第一个字符不是 - 则只添加到 adds 里面
	}
	selName = sels ;
	createSelHtml(sels,title);
	createAddHtml(adds,title,formFilter);
	
}

// 创建搜索 DIV
// sels 搜索需要的 names
// title 搜索需要的提示
function createSelHtml(sels,title){
	
	// 添加 搜索列表的主结构
	var html = "<div class='layui-layout layui-layout-admin'> 					"	+
				"	<form id='selForm' class='layui-form-pane'>					"	+
				"		<div class='layui-header layui-container layui-bg-gray' id='rows'></div> "	+
				"	</form>														"	+
				"</div>";
	$("#dataGrid").before(html);

	var colNum = 0;	//  行空间初始化为0 
	
	for(var i = 0;i<sels.length;i++){
		if(colNum <= 0){ 	// 判断行空间是否为0 
			
			var rowId = "row"+i
			var row =	"<div class='layui-row' id='"+rowId+"'> </div>";
			
			$("#rows").append(row);	// 如果是则 添加一行 
			colNum = 12 ;			// 并且增加 12 个行空间 
		}
		
		// 添加 搜索列表的 内容 
		var col = 	"<div class='layui-col-md3 row-padding'>					"	+
		"	<label class='layui-form-label'>"+title[i]+"</label>	"	+
		"	<div class='layui-input-block'>							"	+
		"		<input type='text' name='"+sels[i]+"' id ='"+sels[i]+"' placeholder='请输入"+title[i]+"' autocomplete='off' class='layui-input'> " +
		"	<div>													"	+
		"</div>	";	
		
		$("#"+rowId).append(col);	// 增加一列 
	
		colNum = colNum - 4; 		// 并且 行空间减去 4 （一列占用 4个行 空间 ）
		
		if(i == sels.length -1 ){	// 判断是否是最后一个循环
			var button = "<div class='layui-col-md2 row-padding layui-col-md-offset1'>					 	"	+
						 "	<a href='#' class='layui-btn layui-btn-normal' onclick='selSubmit()'>提交</a> 	"	+
						 "	<button class='layui-btn layui-btn-normal' >重置</button> 					 	"	+
						 "</div>";
						 
			$("#"+rowId).append(button); // 在最后一个 搜索内容添加进入之后 ， 增加一个 搜索提交按钮 
		}
	}
	
}

/* 
	创建添加时的 div 
	adds 添加input 的name 
	title 添加时 input 的提示
	values 修改的时候 填充的值 
	formFilter 与添加的 form 绑定的键 
*/
function createAddHtml(adds,title,formFilter){
	
	var html =  "<div id='dialog' style='display: none' >													"	+
			    "	<form class='layui-form layui-form-pane' id='"+formFilter+"' lay-filter='"+formFilter+"'>	"	+
			   	"   	<div id ='addRows' class='layui-container' ></div>										"	+
			    "	</form>																					"	+
			    "</div>																						"	;
			    
    $("#dataGrid").after(html);	// 添加主框架 
    
    
    for(var i =0;i<adds.length;i++){
    	
    	if(adds[i].indexOf('-') == -1){
    		var row = 	"	<div class='layui-row row-padding'>														"	+
		  	"		<div class='layui-col-md12'>														"	+
			"		<label class='layui-form-label'>"+title[i]+"</label>										"	+
			"			<div class='layui-input-block'>													"	+
			"				<input type='text' lay-verify='"+adds[i]+"' placeholder='请输入"+title[i]+"' autocomplete='off' class='layui-input' name='"+adds[i]+"'> "	+
			"			</div>																			"	+
			"			</div>																			"	+
			"		</div>																				"	;				

			$("#addRows").append(row);	// 添加每一行，输入与提示 
    	}
    	
    }
	
	var button = "	<div class='layui-row row-padding '>												"	+
				 "		<div class='layui-col-md6 layui-col-md-offset6'>								"	+
				 "			<button class='layui-btn layui-btn-normal' lay-filter='"+formFilter+"' lay-submit>提交</button>	"	+
				 "			<a href='#' class='layui-btn layui-btn-normal' onclick='cancel()'>取消</a>	" 	+
				 "		</div>																			"	+
				 "	</div>																				"	;
			
	$("#addRows").append(button); //  添加最终提交的按钮 
	
}

// 创建表头
// 参数  field 表头的字段
// 参数  title 表头的标题
// 参数  width 表头的宽度
function createCols(field,title,width){
	
	var col = [{type : 'checkbox'}];
	
	for(var i = 0;i<field.length;i++){
		var obj ;
		if(i != Number(field.length) -1){
			obj = {field:field[i],title:title[i],width:width[i]+'%'} ;
		}else{
			obj = {field:field[i],title:title[i]} ;  // 最后一个 不设置宽度 用来做屏幕适配
		}
		col.push(obj);
	}
	
	return col;
	
}

// 数据表格初始化
// 参数  table 需要初始化的表格
// 参数  listUrl 数据表格的接口地址
// 参数  tagTable 需要初始化的 label 标签
// 参数  tableId 给这个 layui tabel 的ID
function tableConfig(table,listUrl,tagTable,tableId,event,cols){
	tableObj = {tableEntity:table,tableId:tableId};
	//第一个实例
	table.render({
		elem : tagTable				// 需要初始化的 table 标签
		,id:tableId					// table 在 layui 中的 ID 刷新时用到
		,height : 650
		,toolbar : 'default'
		,url : listUrl //数据接口
		,page : true //开启分页
		,limit : 20
		,limits : [ 10, 20, 30, 40, 50, 60, 70, 80, 90 ]
		,cols :cols // 表头
		,parseData : function(data) {
			var array = data['list'];
			return {
				"code" : "",
				"msg" : "查找数据中... ",
				"count" : array.length ,
				"data" : array
			};
		}
	});

	table.on('toolbar()', function(obj) { // 监听 列表 按钮事件
		var checkStatus = table.checkStatus(obj.config.id);
		switch (obj.event) {
		case 'add':
			add(event['add']);
			break;
		case 'delete':
			del(checkStatus['data'],event['del']);
			break;
		case 'update':
			edit(checkStatus['data'], myform,event['edit'])
			break;
		}
		;
	});
}

// 素具表格 数据刷星
function reloadTable(tableName,LayTable,whereObj){
	LayTable.reload(tableName, {
		where: whereObj //设定异步数据接口的额外参数，任意设
		,page: {
		  curr: 1 //重新从第 1 页开始
		}
	});
}