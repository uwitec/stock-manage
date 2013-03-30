function SelectOneModlue() {
    var grid = jQuery("#GRD_topModule");
    var rowKey = grid.getGridParam("selrow");
    var rowData = grid.jqGrid("getRowData", rowKey);

    var typeName = rowData.TITLE;
    if (rowKey) {
        $.ajax(
                {
                    url: "SysModule.aspx?moduleid=" + rowKey,
                    type: "GET",
                    success: function() {
                        $("#GRD_pages").jqGrid('setGridParam', { search: false, postData: { "filters": ""} }).jqGrid("setCaption", "页面信息 - " + typeName).trigger("reloadGrid");
                    }
                });




    }
    else
        alert("请选择模块！");
}
//隐藏分页信息
function HidePagerInfo() {

    $('td#GRD_topModule_pager_right').hide();
    $('td#GRD_topModule_toppager_right').hide();
    $('td#GRD_topModule_toppager_center').hide();
    $('td#GRD_topModule_pager_center').hide();
}

function Refresh() {
    $("#GRD_topModule").trigger("reloadGrid");
    $("#GRD_pages").jqGrid("setCaption", "页面信息 - 请选择系统模块").trigger("reloadGrid");

}

var div;
function SelectIconsDialog() {
    $("#icontable").empty();
    var icon = null;
    $.ajax(
                {
                    url: "SysModule.aspx?Method=GetIcons",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(json) {
                        icon = json.split(',');
                        var totalTags = "";
                        for (var i = 0; i < icon.length / 22; i++) {
                            var s = "<tr>";
                            var d = "</tr>";
                            var ss = "";
                            for (var j = 0; j < 22; j++) {
                                var x = 22 * i + j;
                                if (icon[x]) {
                                    ss += "<td><div title='" + icon[x] + "' class='" + icon[x] + "' style='height: 16px; width: 16px;cursor:pointer;border:solid 1px white;' onclick='clickIcon(this)' ondblclick='dblclickIcon(this)' /> </td>";
                                }
                            }
                            totalTags += s + ss + d
                            //$("#icontable").append(s + ss + d);
                        }
                        $("#icontable").append(totalTags);
                    }
                });
    $("#dialogSelectIcons").show();
    $("#dialogSelectIcons").attr("title", "选择图标");
    $("#dialogSelectIcons").dialog({
        width: 500,
        height: 500,
        draggable: true,
        resizable: true,
        modal: true,
        buttons:
                    [
                        {
                            text: '提交',
                            iconCls: 'icon-ok',
                            handler: function() {
                                var qq = $(".icons-selected").attr("title");
                                $("#ICONURL").val(qq);
                                $('#dialogSelectIcons').dialog('close');
                            }
                        },
				        {
				            text: '取消',
				            handler: function() {
				                $('#dialogSelectIcons').dialog('close');
				            }
				        }
				    ]
    });
}
function clickIcon(obj) {
    if (div) {
        $(div).removeClass("icons-selected");
        $(div).css("border-color", "white");
    }
    $(obj).css("border-color", "red");
    $(obj).addClass("icons-selected");
    div = obj;
}

function dblclickIcon(obj) {
    var ss = $(obj).attr("title");
    $("#ICONURL").val(ss);
    $('#dialogSelectIcons').dialog('close');
}

function Addclick() {
    var ss = "<input  type='button' value='选取' onclick='SelectIconsDialog()' />";
    $(ss).insertAfter("#ICONURL");

}

