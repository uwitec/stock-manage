//【保存 新增记录处理】
function SaveAddSetting(func_Name, cateCoryName, cateCoryType, controlID, propertyName, propertyValue) {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "SysBtnModule.aspx?Method=addMSG",
        //用json传入数据
        data: { func_Name: func_Name, cateCoryName: cateCoryName, cateCoryType: cateCoryType, controlID: controlID, propertyName: propertyName, propertyValue: propertyValue },
        success: function(json) {
            if (json.Message) {
                $.messager.alert('提示', json.Message, 'info');
                var grid = jQuery("#GRD_Btnifno");
                var rowKey = grid.getGridParam("selrow");
                grid.trigger("reloadGrid");//成功后对控件数据刷新
                grid.resetSelection();
                $("#GRD_Btnifno").jqGrid('setGridParam', { search: false, postData: { "filters": ""} }).trigger("reloadGrid");
                $('#dialogEdit').dialog('close');
            }
            if (json.Error) {
                $.messager.alert('提示', json.Error, 'info');
            }
        },

        error: function() {

            $.messager.alert('错误', '保存失败...请联系管理员!', 'Error');
        }
    });
}
//【保存 修改记录处理】
function SaveEditSetting(Module, func_Name, cateCoryName, cateCoryType, controlID, propertyName, propertyValue) {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "SysBtnModule.aspx?Method=editMSG",
        data: { Module: Module, func_Name: func_Name, cateCoryName: cateCoryName, cateCoryType: cateCoryType, controlID: controlID, propertyName: propertyName, propertyValue: propertyValue },
        success: function(json) {
            if (json.Message) {
                $.messager.alert('提示', json.Message, 'info');
                var grid = jQuery("#GRD_Btnifno");
                var rowKey = grid.getGridParam("selrow");
                grid.trigger("reloadGrid"); //成功后对控件数据刷新
                grid.resetSelection();
                $("#GRD_Btnifno").jqGrid('setGridParam', { search: false, postData: { "filters": ""} }).trigger("reloadGrid");
                $('#dialogEdit').dialog('close');
            }
            if (json.Error) {
                $.messager.alert('提示', json.Error, 'info');
            }
        },

        error: function() {

            $.messager.alert('错误', '保存失败...请联系管理员!', 'Error');
        }
    });
}
//弹出编辑对话框
function editTypeDialog() {
    $("#dialogEdit").show();
    $("#dialogEdit").attr("title", "页面功能维护");
    $("#dialogEdit").dialog({
        width: 450,
        height: 300,
        draggable: true,
        resizable: true,
        modal: true,
        buttons:
                    [
                        {
                            text: '提交',
                            iconCls: 'icon-ok',
                            handler: function() {
                                var grid = jQuery("#GRD_Btnifno");
                                var func_Name = jQuery("#TB_funcName").val();
                                var cateCoryName = jQuery("#TB_CateCory_Name").val();
                                var cateCoryType = jQuery("#DDL_CateCory_Type").val();
                                var controlID = jQuery("#TB_Control_ID").val();
                                var propertyName = jQuery("#DDL_Property_Name").val();
                                var propertyValue = jQuery("#TB_Property_Value").val();
                                var grid = $("#GRD_Btnifno"); //获取当前控件
                                var rowKey = grid.getGridParam("selrow"); //获取选中行
                                var rowData = grid.jqGrid("getRowData", rowKey); //得到选中行的行数据
                                var Module = rowData.PK_ID; //选择行的PK_ID
                                SaveEditSetting(Module, func_Name, cateCoryName, cateCoryType, controlID, propertyName, propertyValue);
                            }
                        },
				        {
				            text: '取消',
				            handler: function() {
				                $('#dialogEdit').dialog('close');
				            }
				        }
				    ]
    });
}

//【新增选中行】
function AddRow() {

    jQuery("#TB_funcName").val("");
    jQuery("#TB_CateCory_Name").val("");
    //        jQuery("#DDL_CateCory_Type").val("");
    jQuery("#TB_Control_ID").val("");
    jQuery("#DDL_Property_Name").val("");
    jQuery("#TB_Property_Value").val("");
    $("#DDL_Property_Name").attr({ Enabled: "False" });
    $("#TB_Property_Value").attr({ Enabled: "False" });
    $("#dialogEdit").show();
    $("#dialogEdit").attr("title", "页面功能维护");
    $("#dialogEdit").dialog({
        width: 450,
        height: 300,
        draggable: true,
        resizable: true,
        modal: true,
        buttons:
                    [
                        {
                            text: '提交',
                            iconCls: 'icon-ok',
                            handler: function() {
                                var grid = jQuery("#GRD_Btnifno");
                                var func_Name = jQuery("#TB_funcName").val();
                                var cateCoryName = jQuery("#TB_CateCory_Name").val();
                                var cateCoryType = jQuery("#DDL_CateCory_Type").val();
                                var controlID = jQuery("#TB_Control_ID").val();
                                var propertyName = jQuery("#DDL_Property_Name").val();
                                var propertyValue = jQuery("#TB_Property_Value").val();
                                SaveAddSetting(func_Name, cateCoryName, cateCoryType, controlID, propertyName, propertyValue);
                            }
                        },
				        {
				            text: '取消',
				            handler: function() {
				                $.ajax({
				                    type: "POST",
				                    dataType: "json",
				                    url: "SysBtnModule.aspx?Method=ModifyDDL",
				                    //data: { Module: Module, func_Name: func_Name, cateCoryName: cateCoryName, cateCoryType: cateCoryType, controlID: controlID, propertyName: propertyName, propertyValue: propertyValue },
				                    success: function(json) {
				                        if (json.Message) {
				                            $('#dialogEdit').dialog('close');
				                        }
				                        if (json.Error) {
				                            $.messager.alert('提示', json.Error, 'info');
				                        }
				                    },
				                    error: function() {
				                        $.messager.alert('错误', '保存失败...请联系管理员!', 'Error');
				                    }
				                });
				                $('#dialogEdit').dialog('close');
				            }
				        }
				    ]
    });
}
//【编辑选中行】
function editRow() {
    var grid = jQuery("#GRD_Btnifno");

    var rowKey = grid.getGridParam("selrow");
    var rowData = grid.jqGrid("getRowData", rowKey);
    if (rowKey != null) {
        var test = rowData.CATEGORY_TYPE;
        var pro = rowData.PROPERTY_NAME;
        //给控件赋上所选行的值
        jQuery("#TB_funcName").val(rowData.FUNC_NAME);
        jQuery("#TB_CateCory_Name").val(rowData.CATEGORY_NAME);
        //为DDL控件的值做控制
        if (test == "JQGrid") {
            jQuery("#DDL_CateCory_Type").attr("value", "1");
        }
        if (test == "一般控件") {
            jQuery("#DDL_CateCory_Type").attr("value", "0");
            jQuery("#DDL_Property_Name").attr("value", "");

        }
        if (test == "GridView") {
            jQuery("#DDL_CateCory_Type").attr("value", "2");
        }
        if (test == "UserControl") {
            jQuery("#DDL_CateCory_Type").attr("value", "3");
        }
        jQuery("#TB_Control_ID").val(rowData.CONTROL_ID);
        if (pro == "BUTTON") {
            jQuery("#DDL_Property_Name").attr("value", "0");
        }
        if (pro == "COLUMN") {
            jQuery("#DDL_Property_Name").attr("value", "1");
        }
        jQuery("#TB_Property_Value").val(rowData.PROPERTY_VALUE);
        editTypeDialog();
    }
    else {
        $.messager.alert('提示', '<div style="text-align:left;"><br>请选取数据!</div>', 'info');
    }
}
function formatGrid() {
    $('tr.jqgrow td').css({ 'border': '0px none' });
}
//【获取当前数据行的子节点，父节点】
function getSelectedModule() {

    var grid = $("#TV_Type"); //获取当前控件
    var rowKey = grid.getGridParam("selrow"); //获取选中行
    var rowData = grid.jqGrid("getRowData", rowKey); //得到选中行的行数据
    var Module = rowData.ID; //选择行的PK_ID
    var Parent = rowData.tree_parent; //选择行的父节点
    if (Parent != "") {//判断父节点，为空说明为标题项不给于刷新GRD
        if (rowKey) {
            $.ajax(
                {
                    url: "SysBtnModule.aspx?BtnModule_SelectedModule=" + Module + "&BtnModule_SelectedParent=" + Parent,
                    type: "GET",
                    success: function() {
                    var grid1 = $("#GRD_Btnifno");
                    grid1.jqGrid("setCaption", "按钮维护 - " + rowData.NAME).trigger("reloadGrid");
                       
                    }
                });
            
        }
        else
            alert("No rows are selected");
    }
}



window.onload = function() {
    $(window).bind('resize', function() {
        var body_height;
        var body_width;
        var grd_height;
        var body = $(window);
        if (body != null) {
            body_width = document.documentElement.clientWidth;
            body_height = document.documentElement.clientHeight;
            jQuery("#GRD_Btnifno").setGridWidth(body_width - 247);
            jQuery("#GRD_Btnifno").setGridHeight(body_height - 104);
            jQuery("#TV_Type").setGridHeight(body_height-52);
        }

    }).trigger('resize');
}