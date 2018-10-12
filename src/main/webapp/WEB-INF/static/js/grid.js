/**
 * 
 * 一个简单得通用 dataGrid 
 * 
 * field 字段开头
 * 参数注意项
 * 		{
 *			1：规范数据库 字段，数据库字段，实例类属性，页面展示属性要一致
 *			2：若字段只用于‘展示’ 不用于添加 在字段后额外添加一个   -  字符表示
 *			3：若字段只用于’添加‘ 不用于展示 在字段后额外添加一个   ~  字符表示
 *			4：若字段只用于‘隐藏添加’ 不用于展示 在字段后额外添加一个   *  字符表示
 *			5：由于字符 -,~,* 被用作区分是否在添加Div中显示，故 -,~,* 字符不能在用作 filed 字段的内容
 *			6: 所用字符为 英文“破折号 -” 不是 “下划线 _ ”注意区分
 *			7：隐藏添加示例：修改时，form 表单中需要添加一个保存属性 ID 得 input
 *			8：用作隐藏添加的也必须写上中文描述与宽度可以为空（添加时必须写中文描述），这样保证传递的三个数组长度一致
 * 			9：field得第一个数据我当作是将来要使用它 进行删除的数据 		
 * 		}
 * title 列得标题
 * width 宽度
 * 	参数注意项
 * 		{
 * 			1：宽度按百分比来显示
 * 			2：在添加时只用写 百分比数字即可，不用加 “%” ，我在代码中已经添加
 * 		} 
 * divId dataGrid 的 id
 * button dataGrid 将要显示的按钮
 * 	参数注意项
 * 		{
 * 			1：参数添加是 每个按钮都是一个对象
 * 			2：按钮现阶段有三个 add edit del 后阶段在进行拓展
 * 			3：按钮对项中的每个属性都必须有 
 * 			4：按钮对象示例 {fun:"add",path:""} path 中存放完整路径
 * 			5：按钮添加的顺序不做强制要求
 * 		}
 * sel 需要搜索的条件
 *  参数注意事项
 *  	{
 *  		1：参数为对象传递
 *  		2：对象的‘键’为搜索的ID（form 中的 neme） ‘值’为搜索提示
 *  	}
 * 
 * 注 ： 这只是一个最简单的’增删改‘封装，没有涉及到easyui 的其他强大的功能。需要使用其它功能请忽略这个封装。
 */

var selPath = []; 	//用来传递搜索路径 
var dataGrid = [];//用来传递 grid ID
var parameter = [];	//用来保存搜索参数,一个页面可能有多层 grid 所以用数组存储，每层对应一个 grid
var Index = 0 ;//数组的下标
//生成数据列主函数
function easyBuild(field,title,width,divId,button,selData){
	
	datagrid = divId;// dataGrid
	
	if(isArray(field) && isArray(title) &&  isArray(width)){ //判断传入进来的参数是否是数组
		
		if(field.length == title.length && field.length == width.length){//判断传递进来的数组长度是否一致，防止出错
			
			/*var toolbars = new Array(); //为添加按钮准备
			
			if(button != null && button != "" && button != undefined){//添加按钮 以及 按钮事件
				for(var i = 0; i < button.length; i++){
					switch (button[i].fun) {
						case "add":var pathAdd = button[i].path;
							toolbars.push({iconCls:'icon-add',text:"增加",handler:function(){Add_JS(field,title,divId,pathAdd)}});
							toolbars.push('-');
							break;
						case "edit":var pathEdit = button[i].path;
							toolbars.push({iconCls:'icon-edit',text:"修改",handler:function(){Edit_JS(field,title,divId,pathEdit)}});
							toolbars.push('-');
							break;
						case "del":var pathDel = button[i].path;
							toolbars.push({iconCls:'icon-remove',text:"批量删除",handler:function(){Del_JS(divId,pathDel,field[0])}});
							toolbars.push('-');
							break;
						case "sel":selPath = button[i].path;dataGrid = divId;
							break;
					}
				}
				
			}*/
			//$("#buttonDiv").html("");
			if($("#"+divId+"Div").attr("fire") != "me"){ //判断是否已经存在div 如果存在 则刷新，不存在就新建
				$("#toolbars").append("<div id='"+divId+"Div' fire='me'></div>"); //添加自定义  fire 标记用作判断 div 是否已经存在
			}
			$("#"+divId+"Div").html("");
			if(button != null && button != "" && button != undefined){//添加按钮 以及 按钮事件
				$("#"+divId+"Div").append("<div id='"+divId+"Button' ></div>");
				for(var i = 0; i < button.length; i++){
					var selUrl = "";
					switch (button[i].fun) {
						case "add":var pathAdd = button[i].path;
							$("#"+divId+"Button").append("<a herf='#' id='"+divId+"addA' gridcode='"+divId+"' class='easyui-linkbutton' iconCls='icon-add' plain='true'>增加</a> | ");
							$("#"+divId+"addA").on("click",function(){
								Add_JS(field,title,$("#"+divId+"addA").attr("gridcode"),pathAdd,selUrl); // 将每个按键 对应的 grid 的 id 存在按键里面，保证每个按键对应 每个 grid
							})
							break;
						case "edit":var pathEdit = button[i].path;
							$("#"+divId+"Button").append("<a herf='#'id='"+divId+"editA' gridcode='"+divId+"' class='easyui-linkbutton' iconCls='icon-edit' plain='true'>编辑</a> | ")
							$("#"+divId+"editA").on("click",function(){
								Edit_JS(field,title,$("#"+divId+"editA").attr("gridcode"),pathEdit,selUrl);
							})
							break;
						case "del":var pathDel = button[i].path;
							$("#"+divId+"Button").append("<a herf='#' id='"+divId+"delA' gridcode='"+divId+"' class='easyui-linkbutton' iconCls='icon-remove' plain='true'>批量删除 | </a>");
							$("#"+divId+"delA").on("click",function(){
								Del_JS($("#"+divId+"delA").attr("gridcode"),pathDel,field[0],selUrl);
							})
							break;
						case "search":var searchUrl = button[i].path;
							$("#"+divId+"Button").append("<a herf='#' id='"+divId+"searchA' gridcode='"+divId+"' class='easyui-linkbutton' iconCls='icon-search' plain='true'>查看  </a>");
							$("#"+divId+"searchA").on("click",function(){
								Search_JS($("#"+divId+"searchA").attr("gridcode"),searchUrl);
							})
							break;
						case "searchPhoto":var searchPhotoUrl = button[i].path;
							$("#"+divId+"Button").append("<a herf='#' id='"+divId+"searchPhotoA' gridcode='"+divId+"' class='easyui-linkbutton' iconCls='icon-search' plain='true'>查看图片 </a>");
							$("#"+divId+"searchPhotoA").on("click",function(){
								searchPhoto_JS($("#"+divId+"searchPhotoA").attr("gridcode"),searchPhotoUrl);
							})
							break;
						case "searchPhoto2":var searchPhotoUrl2 = button[i].path;
							$("#"+divId+"Button").append("<a herf='#' id='"+divId+"searchPhotoA2' gridcode='"+divId+"' class='easyui-linkbutton' iconCls='icon-search' plain='true'>查看图片 </a>");
							$("#"+divId+"searchPhotoA2").on("click",function(){
								searchPhoto_JS2($("#"+divId+"searchPhotoA2").attr("gridcode"),searchPhotoUrl2);
							})
							break;
						case "down":var pathDel = button[i].path;
							$("#"+divId+"Button").append("<a herf='#' id='"+divId+"downA' class='easyui-linkbutton' iconCls='icon-redo' plain='true'>下推</a>");
							break;
						case "sel": selPath[Index] = button[i].path;
									selUrl = button[i].path;
									dataGrid[Index] = divId;
							break;
					}
				}
				
				$.parser.parse("#"+divId+"Div");
			}
			
			//$("#selDiv").html("");
			//$("#toolbars #"+divId+"Sel").html("");
			if(selData != null && selData != "" && selData != undefined){//添加查询 以及 按钮事件
				$("#"+divId+"Div").append("<div id='"+divId+"Sel' ></div>");
				//$("#toolbars").append("<div id='"+divId+"Sel'></div>");
				var form = "<form id='selForm' method='post'> <table> <tr>";
				var flag = false;
				for(var name in selData){
					if(name != "pad"){
						form += "<td> "+selData[name] +": </td>" +
						"<td> <input class='easyui-textbox' style='width:160px;height:25px;' name = '"+divId+"."+name+"'/> </td> " ;
					}
					if(name == "pad"){
						flag = true;
					}
				}
				form += "<td> <a herf='#' id='"+divId+"S' class='easyui-linkbutton' iconCls='icon-search'>查询</a> </td>";
				if(flag){
					form += "<td> <a herf='#' id='"+divId+"A' class='easyui-linkbutton' iconCls='icon-ok'>确定</a> </td>";
				}
				form += "</tr></table></form> ";
				$("#"+divId+"Sel").append(form);
				reservedSel();
				$.parser.parse("#"+divId+"Sel");
				
				$("#"+divId+"A").on("click",function(){
					Pad_JS(divId);
				});
				
				$("#"+divId+"S").attr("pathUrl",selPath[Index]);
				$("#"+divId+"S").attr("gridId",dataGrid[Index]);
				
				$("#"+divId+"S").on("click",function(){
					selPath[Index] = $("#"+divId+"S").attr("pathUrl");
					dataGrid[Index] = $("#"+divId+"S").attr("gridId");
					sel($("#"+divId+"Sel form").serialize());
				});
				
			}
			
			var columns = new Array();//总头
			var column = new Array();//标题列
			
			if(!flag){
				column.push({field:'ck',checkbox:true});//添加复选按钮行
				$("#"+divId).datagrid({
					singleSelect:false
				});
			}else{
				$("#"+divId).datagrid({
					singleSelect:true
				});
			}
			
			for(var i =0;i<field.length;i++){//添加标题
				if(field[i].indexOf("~") < 0 && field[i].indexOf("*","") < 0){ //当字符中含有 ~ 表示只添加 不展示。此处忽略带有 ~ field
					column.push({field:field[i].replace("-",""),title:title[i],width:width[i]+'%',align:'center'});
				}
				/*column.push({field:field[i].replace("-",""),title:title[i],width:width[i]+"%",align:'center'});*/
			}
			columns.push(column);
			
			$("#"+divId).datagrid({//dataGrid 主体
				rownumbers:true,
				pagination:true,
				nowrap:false,
				striped:true,
				autoRowHeight:true,
				striped:true,
				pageList:[20,50,100],
				pageSize:20,
				fitColumns:true,
				columns:columns,
				toolbar:"#"+divId+"Div",
				onClickRow:function(rowIndex,rowData){
					$(this).datagrid('unselectAll');  
		            $(this).datagrid('selectRow',rowIndex);
		            gridClick(rowIndex,rowData);
				},
				onLoadSuccess:function(data){
					//防止datagrid 在删除的时候记住了 之前得选中的 ID
					$("#"+divId).datagrid('clearSelections');
				}
			});
			$("#"+divId).datagrid({loadFilter:pagerFilter}).datagrid('loadData', []);
			reservedGrid(); //预留接口如果 还需要对 datagrid 做其他事情 可以在这里实现
			
		}else{
			alert("检查传递的参数长度是否一致！");
		}
		
	}else{
		alert("检查传递的参数是数组？！");
	}
	
}

/**
 * 添加方法主题
 * field : 将要添加的的属性
 * title ：将要添加的标题
 * divId ：要添加内容的DIV
 * url	 ： 添加后保存的路径
 */
function Add_JS(field,title,divId,url,selUrl){
	
	if(verifyFar()){ //增加前判断是否还有其他操作没有完成
		
		$("#addDiv").html("");//清空将要内容的DIV 避免重复添加
		
		var html = "<form id='AddForm' method='post'><table class='tableForm'>";
		var tr = ""
		var length_ = fildeLength(field);
		if(length_ <=6){ //当要添加的项多余6项时 单列显示
			for(var i = 0;i<field.length;i++){
				if(field[i].indexOf("-") <= 0){
					if(field[i].indexOf("*")<= 0){
						tr += "<tr>" ;
						tr += "<td style='width:140px;text-align: right;'>" + title[i] +"：</td>"+
						"<td style='width:140px;text-align: right;'>" +
						"	<input class='easyui-textbox' style='width:160px;height:25px;' name = '"+divId+"."+field[i].replace("~","")+"' id= '"+field[i].replace("~","")+"'/> </td>" ;
						"</tr>"
					}else{
						tr += "<tr style='display:none'>" ;
						tr += "<td style='width:140px;text-align: right;'>" + title[i] +"：</td>"+
						"<td style='width:140px;text-align: right;'>" +
						"	<input class='easyui-textbox' style='width:160px;height:25px;' name = '"+divId+"."+field[i].replace("*","")+"' id= '"+field[i].replace("*","")+"' state='"+divId+"'/> </td>" ;
						"</tr>"
					}
					
				}
				$("#addDiv").dialog({ //弹出框主体
					title:'请输入信息',
					width: "300",		//当为一列显示的时候设置宽度为 350 px;
					height: "auto",
					modal:true,
					maximizable:false,
					buttons: '#submits',
					closed:true,
					left:250,
					top:150,
					onClose:function(){
						Index -= 1; //只要执行关闭操作 就进行 下标前移
					}
				});
			}
		}
			
		if(6 < length_ && length_ <= 12){ //当要添加的项 在 6-12项的时候 2 列显示
			for(var i = 0;i<field.length;i++){
				tr += "<tr>" ;
				while(true && i < field.length){ //死循环-并且防止 下标越界
					if(field[i].indexOf("-") < 0 ){//判断是否含有 - 符如果有 就不添加  并且判断是否是隐藏添加
						if(field[i].indexOf("*")< 0){
							tr += "<td style='width:140px;text-align: right;'>" + title[i] +"：</td>"+
							"<td style='width:140px;text-align: right;'>" +
							"	<input class='easyui-textbox' style='width:160px;height:25px;' name = '"+divId+"."+field[i].replace("~","")+"' id= '"+field[i].replace("~","")+"'/> </td>" ;
							i++;
							break;
						}else{
							tr += "<td style='width:140px;text-align: right;display:none;'>" + title[i] +"：</td>"+
							"<td style='width:140px;text-align: right;display:none;'>" +
							"	<input class='easyui-textbox' style='width:160px;height:25px;' name = '"+divId+"."+field[i].replace("*","")+"' id= '"+field[i].replace("*","")+"' state='"+divId+"'/> </td>" ;
							i++;
						}
						
					}else{
						i++;
					}
				}
				while(true && i < field.length){
					if(field[i].indexOf("-") < 0){
						if(field[i].indexOf("*")< 0){
							tr += "<td style='width:140px;text-align: right;'>" + title[i] +"：</td>"+
							"<td style='width:140px;text-align: right;'>" +
							"	<input class='easyui-textbox' style='width:160px;height:25px;' name = '"+divId+"."+field[i].replace("~","")+"' id= '"+field[i].replace("~","")+"'/> </td>" ;
							break;
						}else{
							tr += "<td style='width:140px;text-align: right;display:none;'>" + title[i] +"：</td>"+
							"<td style='width:140px;text-align: right;display:none;'>" +
							"	<input class='easyui-textbox' style='width:160px;height:25px;' name = '"+divId+"."+field[i].replace("*","")+"' id= '"+field[i].replace("*","")+"' state='"+divId+"'/> </td>" ;
							i++;
						}
					}else{
						i++;
					}
				}
				tr += "</tr>"
					$("#addDiv").dialog({
						title:'请输入信息',
						width: "550",	//当为两列显示的时候设置宽度为 550 px;
						height: "auto",
						modal:true,
						maximizable:false,
						buttons: '#submits',
						closed:true,
						left:250,
						top:150,
						onClose:function(){
							Index -= 1; //只要执行关闭操作 就进行 下标前移
						}
					});
			}
		}
		
		if(12<length_ ){//当要添加的项 在12 项以上的时候 4 列显示
			for(var i = 0;i<field.length;i++){
				tr += "<tr>" ;
				while(true && i < field.length ){
					if(field[i].indexOf("-") <= 0 && field[i].indexOf("*")<= 0){
						if(field[i].indexOf("*")< 0){
							tr += "<td style='width:140px;text-align: right;'>" + title[i] +"：</td>"+
							"<td style='width:140px;text-align: right;'>" +
							"	<input class='easyui-textbox' style='width:160px;height:25px;' name = '"+divId+"."+field[i].replace("~","")+"' id= '"+field[i].replace("~","")+"'/> </td>" ;
							i++;
							break;
						}else{
							tr += "<td style='width:140px;text-align: right;display:none;'>" + title[i] +"：</td>"+
							"<td style='width:140px;text-align: right;display:none;'>" +
							"	<input class='easyui-textbox' style='width:160px;height:25px;' name = '"+divId+"."+field[i].replace("*","")+"' id= '"+field[i].replace("*","")+"' state='"+divId+"'/> </td>" ;
							i++;
						}
					}else{
						i++;
					}
				}
				while(true && i < field.length ){
					if(field[i].indexOf("-") <= 0 && field[i].indexOf("*")<= 0){
						if(field[i].indexOf("*")< 0){
							tr += "<td style='width:140px;text-align: right;'>" + title[i] +"：</td>"+
							"<td style='width:140px;text-align: right;'>" +
							"	<input class='easyui-textbox' style='width:160px;height:25px;' name = '"+divId+"."+field[i].replace("~","")+"' id= '"+field[i].replace("~","")+"'/> </td>" ;
							i++;
							break;
						}else{
							tr += "<td style='width:140px;text-align: right;display:none;'>" + title[i] +"：</td>"+
							"<td style='width:140px;text-align: right;display:none;'>" +
							"	<input class='easyui-textbox' style='width:160px;height:25px;' name = '"+divId+"."+field[i].replace("*","")+"' id= '"+field[i].replace("*","")+"' state='"+divId+"'/> </td>" ;
							i++;
						}
					}else{
						i++;
					}
				}
				
				while(true && i < field.length ){
					if(field[i].indexOf("-") <= 0 && field[i].indexOf("*")<= 0){
						if(field[i].indexOf("*")< 0){
							tr += "<td style='width:140px;text-align: right;'>" + title[i] +"：</td>"+
							"<td style='width:140px;text-align: right;'>" +
							"	<input class='easyui-textbox' style='width:160px;height:25px;' name = '"+divId+"."+field[i].replace("~","")+"' id= '"+field[i].replace("~","")+"'/> </td>" ;
							i++;
							break;
						}else{
							tr += "<td style='width:140px;text-align: right;display:none;'>" + title[i] +"：</td>"+
							"<td style='width:140px;text-align: right;display:none;'>" +
							"	<input class='easyui-textbox' style='width:160px;height:25px;' name = '"+divId+"."+field[i].replace("*","")+"' id= '"+field[i].replace("*","")+"' state='"+divId+"'/> </td>" ;
							i++;
						}
					}else{
						i++;
					}
				}
				
				while(true && i < field.length ){
					if(field[i].indexOf("-") <= 0 && field[i].indexOf("*")<= 0){
						if(field[i].indexOf("*")< 0){
							tr += "<td style='width:140px;text-align: right;'>" + title[i] +"：</td>"+
							"<td style='width:140px;text-align: right;'>" +
							"	<input class='easyui-textbox' style='width:160px;height:25px;' name = '"+divId+"."+field[i].replace("~","")+"' id= '"+field[i].replace("~","")+"'/> </td>" ;
							break;
						}else{
							tr += "<td style='width:140px;text-align: right;display:none;'>" + title[i] +"：</td>"+
							"<td style='width:140px;text-align: right;display:none;'>" +
							"	<input class='easyui-textbox' style='width:160px;height:25px;' name = '"+divId+"."+field[i].replace("*","")+"' id= '"+field[i].replace("*","")+"' state='"+divId+"'/> </td>" ;
							i++;
						}
					}else{
						i++;
					}
				}
				
				tr += "</tr>"
					$("#addDiv").dialog({//弹出框 主体
						title:'请输入信息',
						width: "1080",	//当为三列显示的时候设置宽度为 100 px;
						height: "auto",
						modal:true,
						maximizable:false,
						buttons: '#submits',
						closed:true,
						left:150,
						top:150,
						onClose:function(){
							Index -= 1; //只要执行关闭操作 就进行 下标前移
						}
					});
			}
				
		}
		
		html +=  tr + "</table></form>"
		$("#addDiv").append(html);
		selPath[Index] = selUrl; 
		dataGrid[Index] = divId;
		Index += 1; //每次开启一层 下标后移
		$("#addDiv").dialog('open');
		$.parser.parse("#addDiv");
		reservedAdd();//预留接口，如果后续还需要对 增加div 做其他操作 可以在这里实现
		$("#submits a").attr("onclick","submit('"+url+"')");
		
	}else{
		$.messager.alert('提示', '请先保存父级数据！', 'error');
	}
	
}
	
/**
 * 修改方法
 * @param field form表单 name 及 id 填充
 * @param title	提示输入头
 * @param divId	DIV 的ID
 * @param url	请求提交的 URL
 */
function Edit_JS(field,title,divId,url,selUrl){
	
	var rows = $("#"+divId).datagrid('getSelections');
	if(rows.length == 1){
		var length_ = fildeLength(field);
		$("#addDiv").html("");
		var html = "<form id='AddForm' method='post'><table class='tableForm'>";
		var tr = ""
			
		for(var i = 0;i<field.length;i++){
			if(length_ <= 6 ){
				if(field[i].indexOf("-") <= 0){
					if(field[i].indexOf("*") > -1){ // 判断
						tr += "<tr style='display:none'>" ;
					}else{
						tr += "<tr>" ;
					}
					tr += "<td style='width:140px;text-align: right;'>" + title[i] +"：</td>"+
					"<td style='width:140px;text-align: right;'>" +
					"	<input class='easyui-textbox' style='width:160px;height:25px;' name='"+divId+"."+field[i].replace("~","").replace("*","")+"' id= '"+field[i].replace("~","").replace("*","")+"' value='"+rows[0][field[i].replace("*","").replace("~","")]+"' state='"+divId+"' /> </td>" ;
					"</tr>"
				}
				$("#addDiv").dialog({
					title:'请输入信息',
					width: "350",	
					height: "auto",
					modal:true,
					maximizable:false,
					buttons: '#submits',
					closed:true,
					left:250,
					top:150,
					onClose:function(){
						Index -= 1; //只要执行关闭操作 就进行 下标前移
					}
				});
			}
			if(6 < length_ && length_ <= 12){
				
				tr += "<tr>" ;
				while(true && i < field.length){
					
					if(field[i].indexOf("-") < 0 ){
						if(field[i].indexOf("*") > -1){
							tr += "<td style='width:140px;text-align: right;display:none;'>" + title[i] +"：</td>"+
							"<td style='width:140px;text-align: right;display:none;'>" +
							"	<input class='easyui-textbox' style='width:160px;height:25px;' name = '"+divId+"."+field[i].replace("*","")+"' id= '"+field[i].replace("*","")+"' value='"+rows[0][field[i].replace("*","")]+"' state='"+divId+"' /> </td>" ;
							i++;
						}else{
							tr += "<td style='width:140px;text-align: right;'>" + title[i] +"：</td>"+
							"<td style='width:140px;text-align: right;'>" +
							"	<input class='easyui-textbox' style='width:160px;height:25px;' name = '"+divId+"."+field[i].replace("~","")+"' id= '"+field[i].replace("~","")+"' value='"+rows[0][field[i].replace("~","")]+"' state='"+divId+"' /> </td>" ;
							i++;
							break;
						}
						
					}else{
						i++;
					}
					
				}
				while(true && i < field.length){
					
					if(field[i].indexOf("-") < 0 ){
						if(field[i].indexOf("*") > -1){
							tr += "<td style='width:140px;text-align: right;display:none;'>" + title[i] +"：</td>"+
							"<td style='width:140px;text-align: right;display:none;'>" +
							"	<input class='easyui-textbox' style='width:160px;height:25px;' name = '"+divId+"."+field[i].replace("*","")+"' id= '"+field[i].replace("*","")+"' value='"+rows[0][field[i].replace("*","")]+"' state='"+divId+"' /> </td>" ;
							i++;
						}else{
							tr += "<td style='width:140px;text-align: right;'>" + title[i] +"：</td>"+
							"<td style='width:140px;text-align: right;'>" +
							"	<input class='easyui-textbox' style='width:160px;height:25px;' name = '"+divId+"."+field[i].replace("~","")+"' id= '"+field[i].replace("~","")+"' value='"+rows[0][field[i].replace("~","")]+"' state='"+divId+"' /> </td>" ;
							break;
						}
					}else{
						i++;
					}
				}
				tr += "</tr>"
				$("#addDiv").dialog({
					title:'请输入信息',
					width: "550",
					height: "auto",
					modal:true,
					maximizable:false,
					buttons: '#submits',
					closed:true,
					left:250,
					top:150,
					onClose:function(){
						Index -= 1; //只要执行关闭操作 就进行 下标前移
					}
				});
			}
			if(12<length_){
				tr += "<tr>" ;
				while(true && i < field.length){
					if(field[i].indexOf("-") < 0){
						if(field[i].indexOf("*") > -1){
							tr += "<td style='width:140px;text-align: right;display:none;'>" + title[i] +"：</td>"+
							"<td style='width:140px;text-align: right;display:none;'>" +
							"	<input class='easyui-textbox' style='width:160px;height:25px;' name = '"+divId+"."+field[i].replace("*","")+"' id= '"+field[i].replace("*","")+"' value='"+rows[0][field[i].replace("*","")]+"' state='"+divId+"' /> </td>" ;
							i++
						}else{
							tr += "<td style='width:140px;text-align: right;'>" + title[i] +"：</td>"+
							"<td style='width:140px;text-align: right;'>" +
							"	<input class='easyui-textbox' style='width:160px;height:25px;' name = '"+divId+"."+field[i].replace("~","")+"' id= '"+field[i].replace("~","")+"' value='"+rows[0][field[i].replace("~","")]+"' state='"+divId+"' /> </td>" ;
							i++;
							break;
						}
					}else{
						i++;
					}
				}
				while(true && i < field.length){
					if(field[i].indexOf("-") < 0 ){
						if(field[i].indexOf("*") > -1){
							tr += "<td style='width:140px;text-align: right;display:none;'>" + title[i] +"：</td>"+
							"<td style='width:140px;text-align: right;display:none;'>" +
							"	<input class='easyui-textbox' style='width:160px;height:25px;' name = '"+divId+"."+field[i].replace("*","")+"' id= '"+field[i].replace("*","")+"' value='"+rows[0][field[i].replace("*","")]+"' state='"+divId+"' /> </td>" ;
							i++;
						}else{
							tr += "<td style='width:140px;text-align: right;'>" + title[i] +"：</td>"+
							"<td style='width:140px;text-align: right;'>" +
							"	<input class='easyui-textbox' style='width:160px;height:25px;' name = '"+divId+"."+field[i].replace("~","")+"' id= '"+field[i].replace("~","")+"' value='"+rows[0][field[i].replace("~","")]+"' state='"+divId+"' /> </td>" ;
							i++;
							break;
						}
					}else{
						i++;
					}
				}
				while(true && i < field.length){
					if(field[i].indexOf("-") < 0 ){
						if(field[i].indexOf("*") > -1){
							tr += "<td style='width:140px;text-align: right;display:none;'>" + title[i] +"：</td>"+
							"<td style='width:140px;text-align: right;display:none;'>" +
							"	<input class='easyui-textbox' style='width:160px;height:25px;' name = '"+divId+"."+field[i].replace("*","")+"' id= '"+field[i].replace("*","")+"' value='"+rows[0][field[i].replace("*","")]+"' state='"+divId+"' /> </td>" ;
							i++;
						}else{
							tr += "<td style='width:140px;text-align: right;'>" + title[i] +"：</td>"+
							"<td style='width:140px;text-align: right;'>" +
							"	<input class='easyui-textbox' style='width:160px;height:25px;' name = '"+divId+"."+field[i].replace("~","")+"' id= '"+field[i].replace("~","")+"' value='"+rows[0][field[i].replace("~","")]+"' state='"+divId+"' /> </td>" ;
							i++;
							break;
						}
					}else{
						i++;
					}
				}
				while(true && i < field.length){
					if(field[i].indexOf("-") < 0){
						if(field[i].indexOf("*") > -1){
							tr += "<td style='width:140px;text-align: right;display:none;'>" + title[i] +"：</td>"+
							"<td style='width:140px;text-align: right;display:none;'>" +
							"	<input class='easyui-textbox' style='width:160px;height:25px;' name = '"+divId+"."+field[i].replace("*","")+"' id= '"+field[i].replace("*","")+"' value='"+rows[0][field[i].replace("*","")]+"' state='"+divId+"' /> </td>" ;
							i++;
						}else{
							tr += "<td style='width:140px;text-align: right;'>" + title[i] +"：</td>"+
							"<td style='width:140px;text-align: right;'>" +
							"	<input class='easyui-textbox' style='width:160px;height:25px;' name = '"+divId+"."+field[i].replace("~","")+"' id= '"+field[i].replace("~","")+"' value='"+rows[0][field[i].replace("~","")]+"' state='"+divId+"' /> </td>" ;
							break;
						}
					}else{
						i++;
					}
				}
				tr += "</tr>"
				$("#addDiv").dialog({
					title:'请输入信息',
					width: "1000",
					height: "auto",
					modal:true,
					maximizable:false,
					buttons: '#submits',
					closed:true,
					left:250,
					top:150,
					onClose:function(){
						Index -= 1; //只要执行关闭操作 就进行 下标前移
					}
				});
			}
		}
		html +=  tr + "</table></form>"
		$("#addDiv").append(html);
		$.parser.parse("#addDiv");
		reservedEdit();
		selPath[Index] = selUrl;
		dataGrid[Index] = divId;
		Index += 1; //每次开启一层 下标后移
		$("#addDiv").dialog('open');
		$("#submits a").attr("onclick","submit('"+url+"')");
		
	}else{
		$.messager.alert('提示', '请选择一项要编辑的记录！', 'error');
	}
}
/**
 * 删除方法
 * @param divId 删除时dataGrid 得ID
 * @param url	删除时得路径
 */
function Del_JS(divId,url,dataId,selUrl){
	
	var rows = $("#"+divId).datagrid('getSelections');
	if(rows.length>=1){
		var ids = "";//获取多个ID
		for(var i = 0 ;i<rows.length;i++){
			if(i<rows.length-1){
				ids += "'" + rows[i][dataId.replace("~","").replace("*","").replace("-","")] + "',"
			}else{
				ids += "'" + rows[i][dataId.replace("~","").replace("*","").replace("-","")] + "'"
			}
		}
		$.messager.confirm("confirm", "你确定要删除吗？", function(r){
			
			selPath[Index] = selUrl; 
			dataGrid[Index] = divId;
			
			if(r){
				$.ajax({
					method:'post',
					url:url,
					dataType:'json',
					data:{
						"ids":ids
					},
					success:function(data){
						sel(parameter[Index]);
					}
				}); 
			}
		})
		
	}else{
		$.messager.alert('提示', '请选择要删除的记录！', 'error');
	}
}

function Search_JS(divId,pathDel,selUrl){
	
}
/**
 * 提交方法
 * @param url 提交路径
 */
function submit(url){
	
	var formData = new FormData($("#AddForm")[0]);
	
	$.ajax({
		type:'post',
		url:url,
		dataType:'json',
		data:formData,
		processData: false,  
        contentType: false,
		success:function(data){
			$("#addDiv").dialog('close');
			sel(parameter[Index]);
		}
	}); 
	
	/*data:$("#AddForm").serialize(),*/
}

/**
 * 搜索的方法
 * 其中 selPath，dataGrid 为全局变量，在js初始时赋值
 * @param data 传到后台的值
 */
function sel(dataFrom){
	//由于提交过后 还需要用到当前的参数，所以先将参数保存到全局 然后再 使用全局参数（在添加删除修改之后刷新数据 还是会用到）
	parameter[Index] = dataFrom; 
	$.ajax({
		method:'post',
		async:false,
		url:selPath[Index],  //全局变量
		dataType:'json',
		data:parameter[Index],
		success:function(data){
			var dataObj = {data:data}
			$("#"+dataGrid[Index]).datagrid(dataObj);
		}
	});
}

function Pad_JS(divId){
	var rows = $("#"+divId).datagrid('getSelections');
	if(rows.length == 1){
		padded(rows[0]);//确认功能时 将获得到的值 传到调用页面
	}else{
		$.messager.alert('提示', '请选一项要确认的项！', 'error');
	}
}

function padded(row){ //确认功能时 将获得到的值 传到调用页面 ，获得到值之后进行的相关操作， 也在调用页面重写
	console.log(row);
}

/**
 * 验证是否为数组的方法
 * @param obj  需要验证的参数
 * @returns {Boolean}
 */
function isArray(obj){
	 return Object.prototype.toString.call(obj) === '[object Array]';
}


/**
 * 判断传进来的参数，需要添加的项的个数
 */
function fildeLength(filde){
	
	var length = filde.length;
	
	for(var i=0;i<filde.length ;i++){
		if(filde[i].indexOf('-') >=0 || filde[i].indexOf('*') >=0){ // ‘-’ 表示只显示不添加
			length--;
		}
	}
	return length;
}

function reservedGrid(){ // dategrid添加完成后 想要做的操作  可以在调用页面重写
	
}

function reservedAdd(){  //弹出DIV 添加完成时 想要做的其他操作   可以在调用页面重写
	
}
function reservedEdit(){ //修改时预留的 方法
	
}

function verifyFar(){ // 执行添加操作前 判断是否还有其他操作没有完成  可以在调用页面重写
	return true;
}

// 在datagrid 选中某行时 预留的接口  
function gridClick(rowIndex,rowData){
	
}

//在搜索框 重绘之前执行，可以修改或则添加部分搜索框的内容。
function reservedSel(){
	
}

//分页
/*function getData(){
	var rows = [];
	for(var i=1; i<=800; i++){
		var amount = Math.floor(Math.random()*1000);
		var price = Math.floor(Math.random()*1000);
		rows.push({
			inv: 'Inv No '+i,
			date: $.fn.datebox.defaults.formatter(new Date()),
			name: 'Name '+i,
			amount: amount,
			price: price,
			cost: amount*price,
			note: 'Note '+i
		});
	}
	return rows;
}*/

//点击分页实现   重新加载页码
function pagerFilter(data){
	if (typeof data.length == 'number' && typeof data.splice == 'function'){	// is array
		data = {
			total: data.length,
			rows: data
		}
	}
	var dg = $(this);
	var opts = dg.datagrid('options');
	var pager = dg.datagrid('getPager');
	pager.pagination({
		onSelectPage:function(pageNum, pageSize){
			opts.pageNumber = pageNum;
			opts.pageSize = pageSize;
			pager.pagination('refresh',{
				pageNumber:pageNum,
				pageSize:pageSize
			});
			dg.datagrid('loadData',data);
		}
	});
	if (!data.originalRows){
		data.originalRows = (data.rows);
	}
	var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
	var end = start + parseInt(opts.pageSize);
	data.rows = (data.originalRows.slice(start, end));
	return data;
}

//结束编辑
function endEditing(id){
	if (indexTr == undefined){return true}
	if ($(id).datagrid('validateRow', indexTr)){
		indexTr = undefined;
		return true;
	} else {
		return false;
	}
}

//选中时开启编辑
function onClickRow(index,id){
	$(id).datagrid('acceptChanges');
	if (indexTr != index){
		if (endEditing(id)){
			$(id).datagrid('selectRow', index).datagrid('beginEdit', index);
			indexTr = undefined;
			nowindex = index;
		} else {
			$(id).datagrid('selectRow', indexTr);
		}
	}
}

function searchPhoto_JS(gridId,url){
	var row = $("#"+gridId).datagrid("getSelections")[0];
	if(row.refPhotoName != null && row.refPhotoName != undefined){
		var dialogUser = "<div id='farther'> " 																									+
				"<div id='dialogPhoto' title='参考图片' class='easyui-dialog' closed='true' style='width:500px;height:500px;overflow: visible;'>" 	+
				"</div> " 																														+
			"</div>";
		$("body").append(dialogUser);
		$("#dialogPhoto").html("");
		var img = "<img id='searchPhotoImg' width='auto' height='100%' src='"+url+"?item.itemCode="+row.itemCode+"'>" ;
		$("#dialogPhoto").append(img)
		$.parser.parse("#farther");
		
		$("#dialogPhoto").dialog("open");
	}else{
		$.messager.alert('提示', '请添加参考图片！', 'error');
	}
	
}

function searchPhoto_JS2(gridId,url){
	
	console.log("进入~");
	
	var layer;
	layui.use(['layer'],function(){
		layer = layui.layer;
		/*layer.msg("hello word");*/
	})
	
	
	var row = $("#"+gridId).datagrid("getSelections")[0];
	/*var dialogUser = "<div id='farther'> " 																									+
	"<div id='dialogPhoto' title='参考图片' class='easyui-dialog' closed='true' style='width:500px;height:500px;overflow: visible;'>" 	+
		"</div> " 																														+
	"</div>";
	$("body").append(dialogUser);
	$("#dialogPhoto").html("");*/
	
	$.ajax({
		method:"post",
		url:url,
		async:false,
		dataType:"json",
		data:{
			ids:row.id
		},
		success:function(data){
			/*var img = "<img id='searchPhotoImg' width='auto' height='100%' src='"+data+"'>" ;
			$("#dialogPhoto").append(img);*/
			
			if(data != 'null' && data != null){
				var img = '<img src="'+data+'" id="haha" height="auto" width="800px" />';
				layer.open({
					id:"001",
					type :1,
					title: false,
					closeBtn  :false,
					content: img ,
					offset: '80px',
					btn:[],
					shadeClose : true,
					skin: 'layui-layer-nobg',
					area: '800px'
				}); 
			}else{
				layer.msg("未能及时上传!");
			}
			
		}
	})
	
	/*$.parser.parse("#farther");
	$("#dialogPhoto").dialog("open");*/
	
	/*if(row.refPhotoName != null && row.refPhotoName != undefined){*/
		
		
	/*}else{
		$.messager.alert('提示', '请添加参考图片！', 'error');
	}*/
	
}
