//获取选中的报文类型的code
function getSelectedMsgTypeCode() {
    //debugger;
    var grid = $("#TV_msgType");

    var rowKey = grid.getGridParam("selrow");
    var rowData = grid.jqGrid("getRowData", rowKey);
    var selectCode = rowData.CODE;
    var isLeaf = rowData.IS_LEAF;
    var parentid = rowData.PARENTID;
    var selectName = rowData.NAME;
    if (parentid != "" && isLeaf == 1) {
        if (rowKey) {
            $.ajax(
                {
                    url: "DownloadFileMgt.aspx?downloadfilemgt_orgcode=" + parentid + "&downloadfilemgt_msgtypecode=" + selectCode,
                    type: "GET",
                    success: function() {
                        var grid1 = $("#GRD_downloadMsgList");
                        grid1.jqGrid("setCaption", "报文下载 - " + selectName).jqGrid("setGridParam", { search: false, postData: { "filters": ""} }).trigger("reloadGrid");
                    }
                });
        }
        else
            alert("No rows are selected");
    }
}

function formatGrid() {
    $('tr.jqgrow td').css({ 'border': '0px none' });
}
//获取选中的需要下载的报文文件
function getSelectedProcessor() {
    var grid = jQuery("#<%= GRD_ProSetting.ClientID %>");
    var rowKey = grid.getGridParam("selrow");
    var rowData = grid.jqGrid("getRowData", rowKey);
    var SelectName = rowData.CNAME;
    if (rowKey) {
        $.ajax(
                {
                    url: "MessageSetting.aspx?proSettingid=" + rowKey + "&settingCode=" + rowData.SETTING_CODE,
                    type: "GET"

                });
    }
    else
        alert("Now rows are selected");
}

//判断是否首次打开页面，并回发
function firstLoad() {
    if (window.name == "") {
        $.ajax(
                {
                    url: "DownloadFileMgt.aspx?Method=FirstLoad",
                    type: "GET",
                    success: function() {
                        window.name = "DownloadFileMgt";
                    }
                });
    }

}


//function expandSearchBody() {
//    $("#searchBody").slideToggle("fast");

//    if ($("#expand").attr("src") == "../../Scripts/themes/default/images/panel_tool_collapse.gif") {
//        $("#expand").removeAttr("src").attr("src", "../../Scripts/themes/default/images/panel_tool_expand.gif");
//    }
//    else {
//        $("#expand").removeAttr("src").attr("src", "../../Scripts/themes/default/images/panel_tool_collapse.gif");
//    }
//}

// 下载报文
function dialogDownLoad() {

    var grid = jQuery("#GRD_downloadMsgList");
    var rowKey = grid.getGridParam("selrow");
    if (rowKey) {
        $("#dialogDownloadFile").show();
        $("#dialogDownloadFile").attr("title", "下载");
        $("#dialogDownloadFile").dialog({
            width: 650,
            height: 200,
            draggable: true,
            resizable: true,
            modal: true,
            buttons:
                    [
                        {
                            text: '下载',
                            iconCls: 'icon-ok',
                            handler: function() {
                                var filepath = jQuery("#downLoad").val();
                                var rowData = grid.jqGrid("getRowData", rowKey);
                                var guidname = rowData.PK_ID;
                                var suffix = rowData.SUFFIX;
                                download(filepath, guidname, suffix);
                            }
                        },
				        {
				            text: '取消',
				            handler: function() {
				                $('#dialogDownloadFile').dialog('close');
				            }
				        }
				    ]
        });
    }
    else
        $.messager.alert('提示', "请选择某一行数据", 'info');

}

// 下载报文
function dialogDownLoad() {

    var grid = jQuery("#GRD_downloadMsgList");
    var rowKey = grid.getGridParam("selrow");
    if (rowKey) {
        var rowData = grid.jqGrid("getRowData", rowKey);
        var pk_id = rowData.EDIOUTMSGDTL_ID;
        window.open("../DownLoad/DownLoadMsg.aspx?Method=GeneratorFileDownLoad&pk_id=" + pk_id);
    }
    else
        $.messager.alert('提示', "请选择某一行数据", 'info');

}


//自适应高度和宽度
$(window).bind('resize', function() {
    //debugger;

    var body_width;
    var west_width;
    var center_width;

    var body = $(window);
    if (body != null) {
        body_width = body.get(0).innerWidth;
        west_width = $("#west").width();
        center_width = $("#searchPanleHeader").width();
        if (west_width != null) {
            jQuery("#TV_msgType").setGridWidth(parseInt(west_width) - 4);
        }
        if (center_width != null) {

            jQuery("#GRD_downloadMsgList").setGridWidth(parseInt(body_width) - parseInt(west_width) - 2);

        }
    }

}).trigger('resize');

$(window).bind('load', function() {
    jQuery("#GRD_downloadMsgList").setGridWidth(parseInt($("#searchPanleHeader").width()) + 2);
});
