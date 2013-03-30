//获取选中的公司的ID
function getSelectedOrg() {
    var grid = jQuery("#TV_OrgName");
    var rowKey = grid.getGridParam("selrow");
    var rowData = grid.jqGrid("getRowData", rowKey);
    var SelectName = rowData.NAME;
    if (rowKey) {
        $.ajax(
                {
                    url: "MessageSetting.aspx?companyid=" + rowKey,
                    type: "GET",
                    success: function() {
                        $("#GRD_ProSetting").jqGrid("setCaption", "报文解析类配置 - " + SelectName).jqGrid("setGridParam", { search: false, postData: { "filters": ""} }).trigger("reloadGrid");
                    }
                });
    }
    else
        alert("No rows are selected");
}

function formatGrid() {
    $('tr.jqgrow td').css({ 'border': '0px none' });
}
//获取选中的报文解析类配置的ID
function getSelectedProcessor() {
    var grid = jQuery("#GRD_ProSetting");
    var rowKey = grid.getGridParam("selrow");
    var rowData = grid.jqGrid("getRowData", rowKey);
    var SelectName = rowData.CNAME;
    if (rowKey) {
        $.ajax(
                {
                    url: "MessageSetting.aspx?proSettingid=" + rowKey + "&settingCode=" + rowData.SETTING_CODE,
                    type: "GET",
                    success: function() {
                        $("#GRD_GenSetting").jqGrid("setCaption", "报文生成类配置 - " + SelectName).jqGrid('setGridParam', { search: false, postData: { "filters": ""} }).trigger("reloadGrid");
                    }
                });
    }
    else
        alert("Now rows are selected");
}
//编辑选中行
function editRow() {
    var grid = jQuery("#GRD_ProSetting");

    var rowKey = grid.getGridParam("selrow");
    var rowData = grid.jqGrid("getRowData", rowKey);
    if (rowKey != null) {
        jQuery("#TB_typeCode").val(rowData.CNAME);
        jQuery("#CKB_ISSTD").val(rowData.ISSTDPROCESSOR);
        if (rowData.ISSTDPROCESSOR == "Yes")
            document.getElementById("CKB_ISSTD").checked = true;
        else
            document.getElementById("CKB_ISSTD").checked = false;
        jQuery("#TB_customPro").val(rowData.CUSTOMPROCESSOR);
        jQuery("#TB_SettingCode").val(rowData.SETTING_CODE);
        jQuery("#TB_remark").val(rowData.REMARK);
        editTypeDialog();
    }
    else {
        $.messager.alert('提示', '<div style="text-align:left;"><br>请选取数据!</div>', 'info');
    }
}
//编辑对话框
function editTypeDialog() {
    $("#dialogEditProcessor").show();
    $("#dialogEditProcessor").attr("title", "编辑解析类配置");
    $("#dialogEditProcessor").dialog({
        width: 480,
        height: 250,
        left: 250,
        top: 70,
        draggable: true,
        resizable: true,
        modal: true,
        buttons:
                    [
                        {
                            text: '提交',
                            iconCls: 'icon-ok',
                            handler: function() {
                                var grid = jQuery("#GRD_ProSetting");
                                var proId = grid.getGridParam("selrow");
                                var typeCode = jQuery("#TB_typeCode").val();
                                var isStd = document.getElementById("CKB_ISSTD").checked ? 1 : 0;
                                var customPro = jQuery("#TB_customPro").val();
                                var setting_code = jQuery("#TB_SettingCode").val();
                                var remark = jQuery("#TB_remark").val();
                                SaveType(proId, typeCode, isStd, customPro, setting_code, remark);
                            }
                        },
				        {
				            text: '取消',
				            handler: function() {
				                $('#dialogEditProcessor').dialog('close');
				            }
				        }
				    ]
    });
}
//保存修改的数据
function SaveType(proId, typeCode, isStd, customPro, setting_code, remark) {
    $.ajax({
        type: "POST",
        dataType: "json",
        //cache:true,
        url: "MessageSetting.aspx?Method=editProSetting",
        data: { id: proId, typeCode: typeCode, isStd: isStd, customPro: customPro, setting_code: setting_code, remark: remark },
        success: function(json) {
            if (json.Message) {
                $.messager.alert('提示', json.Message, 'info');
                var grid = jQuery("#GRD_ProSetting");

                var rowKey = grid.getGridParam("selrow");

                grid.trigger("reloadGrid");
                grid.resetSelection();
                $("#GRD_ProSetting").jqGrid('setGridParam', { search: false, postData: { "filters": ""} }).trigger("reloadGrid");
                $('#dialogEditProcessor').dialog('close');
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
//弹出报文类型选择对话框
function showMsgType() {
    $("#dialogSelectType").show();
    $("#dialogSelectType").attr("title", "选择报文类型");
    $("#dialogSelectType").dialog({
        width: 520,
        height: 343,
        left: 245,
        top:100,
        draggable: true,
        resizable: true,
        modal: true
    });
}
//选择报文类型双击事件
function MsgTypeDBclick() {
    var grid = jQuery("#GRD_SelectMsgType");
    var rowKey = grid.getGridParam("selrow");
    var rowData = grid.jqGrid("getRowData", rowKey);
    jQuery("#TB_typeCode").val(rowData.CNAME);
    jQuery("#TB_filter").val("");
    $('#dialogSelectType').dialog('close');
}

//新增选中行
function AddRow() {
    jQuery("#TB_typeCode").val("");
    jQuery("#CKB_ISSTD").val("");
    document.getElementById("CKB_ISSTD").checked = false;
    jQuery("#TB_customPro").val("");
    jQuery("#TB_SettingCode").val("");
    jQuery("#TB_remark").val("");
    $("#dialogEditProcessor").show();
    $("#dialogEditProcessor").attr("title", "新增解析类配置");
    $("#dialogEditProcessor").dialog({
        width: 480,
        height: 250,
        left: 250,
        top: 70,
        draggable: true,
        resizable: true,
        modal: true,
        buttons:
                    [
                        {
                            text: '提交',
                            iconCls: 'icon-ok',
                            handler: function() {
                                var grid = jQuery("#GRD_ProSetting");
                                var typeCode = jQuery("#TB_typeCode").val();

                                var isStd = document.getElementById("CKB_ISSTD").checked ? 1 : 0;
                                var customPro = jQuery("#TB_customPro").val();
                                var setting_code = jQuery("#TB_SettingCode").val();
                                var remark = jQuery("#TB_remark").val();
                                SaveAddSetting(typeCode, isStd, customPro, setting_code, remark);
                            }
                        },
				        {
				            text: '取消',
				            handler: function() {
				                $('#dialogEditProcessor').dialog('close');
				            }
				        }
				    ]
    });
}

//保存修改的数据
function SaveAddSetting(typeCode, isStd, customPro, setting_code, remark) {
    $.ajax({
        type: "POST",
        dataType: "json",
        //cache:true,
        url: "MessageSetting.aspx?Method=addProSetting",
        data: { typeCode: typeCode, isStd: isStd, customPro: customPro, setting_code: setting_code, remark: remark },
        success: function(json) {
            if (json.Message) {
                $.messager.alert('提示', json.Message, 'info');
                var grid = jQuery("#GRD_ProSetting");
                var rowKey = grid.getGridParam("selrow");
                grid.trigger("reloadGrid");
                grid.resetSelection();
                $("#GRD_ProSetting").jqGrid('setGridParam', { search: false, postData: { "filters": ""} }).trigger("reloadGrid");
                $('#dialogEditProcessor').dialog('close');
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
//        //查询对话框
function searchType() {
    $("#dialogSearchMsgType").show();
    $("#dialogSearchMsgType").attr("title", "查找");
    $("#dialogSearchMsgType").dialog({
        width: 450,
        height: 170,
        left: 260,
        top:140,
        draggable: true,
        resizable: true,
        modal: true,
        buttons:
                            [
                                {
                                    text: '查找',
                                    iconCls: 'icon-search',
                                    handler: function() {
                                        var searchType = jQuery("#DDL_searchType").val();
                                        var searchFilter = jQuery("#DDL_searchFilter").val();
                                        var filter = jQuery("#TB_filter").val();
                                        SearchMsgType(searchType, searchFilter, filter);
                                    }
                                },
        				        {
        				            text: '取消',
        				            handler: function() {
        				                $('#dialogSearchMsgType').dialog('close');
        				            }
        				        }
        				    ]
    });
}
//按条件执行查询操作
function SearchMsgType(searchType, searchFilter, filter) {
    $.ajax({
        url: "MessageSetting.aspx?searchType=" + encodeURI(searchType) + "&searchFilter=" + encodeURI(searchFilter) + "&filter=" + encodeURI(filter),
        type: "GET",
        success: function() {
            $("#GRD_SelectMsgType").trigger("reloadGrid");
            $('#dialogSearchMsgType').dialog('close');
        }
    });
}

window.onload = function() {
    $(window).bind('resize', function() {
        var body_height;
        var body_width;
        var grd_height;
        var body = $(window);
        if (body != null) {
            body_width = document.documentElement.clientWidth - 210;
            body_height = document.documentElement.clientHeight;
            grd_height = body_height - 209;
            jQuery("#GRD_ProSetting").setGridWidth(body_width);
            jQuery("#GRD_GenSetting").setGridWidth(body_width);
            jQuery("#GRD_ProSetting").setGridHeight(grd_height * 0.75);
            jQuery("#GRD_GenSetting").setGridHeight(grd_height * 0.25);
            jQuery("#TV_OrgName").setGridHeight(body_height - 56);
        }

    }).trigger('resize');
}