/**
*
*帮助JS 这里面写一些 前段通用部门的模块
*例如：combobox 取得字典管理里面的值，通用的 input 提示
*
*/

var inputId = ""; // 用来存储当前打开 弹窗的 input 的 ID;

//插入 user 信息的 js 
function dialogInsetUser(obj){
	inputId = obj;
	var dialogUser = "<div id='farther'> " +
						"<div id='dialogUser' title='人员信息' class='easyui-dialog' closed='true' style='width:600px;height:500px;'>" +
							"<table id='padGrid' class='easyui-datagrid' style='width:100%;height:100%;'></table>" +
						"</div> " +
						"<div id='toolbars' style='display: none;'></div>"+
					 "</div>";
	$("body").append(dialogUser);
	
	$.parser.parse("#farther");
	
	$("#dialogUser").dialog("open");
	
	var userField = ["loginName","userName","userPhone","organName"];
	var userTitle = ["人员编号","人员名称","联系电话","性别"];
	var userWidth =	["25","25","25","25"];
	var userButton = [{fun:"sel",path:"us!userData"}];
 	var userSel = {'loginName':'人员编号','userName':'人员名称','pad':'确定'};  //会将这些条件添加到一个ID 为 selForm 的表单里面
	easyBuild(userField,userTitle,userWidth,"padGrid",userButton,userSel);//
	sel($("#userPadSel form").serialize());
	
	$("#dialogUser").dialog("open");
	
	$("#padGrid").datagrid({
		onDblClickRow:function(rowIndex,rowData){
			$(obj).textbox("setValue",rowData.loginName);
			$("#dialogUser").dialog("close");
			$("body").remove("#farther");
		}
	});
}

//从数据字典中 获取 combobox 中的需要填充的信息
function comboboxUtil(id,comType){
	$.ajax({
		url:"combobox!ssTypeDate",
		method:"post",
		dataType:"json",
		async:false,
		data:{
			comType:comType
		},
		success:function(data){
			$(id).combobox({
				data:data,
				valueField:"VALUE",
				textField:"LABEL",
				panelHeight:"auto",
				editable:false,
			})
		}
	})
}

//geid 中的 确定按钮 事件重写
function padded(row){
	$(inputId).textbox("setValue",row.loginName);
	$("#dialogUser").dialog("close");
}