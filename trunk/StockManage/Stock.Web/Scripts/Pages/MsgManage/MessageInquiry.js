function getSelectedOrg() {
    var grid = jQuery("#GRD_Message_P");
    var rowKey = grid.getGridParam("selrow");
    if (rowKey) {
        $.ajax(
                {
                    url: "MessageInquiry.aspx?msgID=" + rowKey,
                    type: "GET",
                    success: function() {
                        $("#GRD_Message_G").jqGrid('setGridParam', { search: false, postData: { "filters": ""} }).trigger("reloadGrid");
                    }
                });

    }
    else
        alert("No rows are selected");
}
//显示子级grid
function showSubGrid(subgrid_id, row_id) {
    showSubGrid_GRD_Message_G_Detail(subgrid_id, row_id);
}

function searchDialog() {
    var begin = jQuery("#DP_Begin").val();
    var end = jQuery("#DP_End").val();
    var Ucode = jQuery("#TB_Ucode").val();
    var code = jQuery("#TB_Code").val();
    var cname = jQuery("#TB_CNAME").val();
    var oldname = jQuery("#TB_OldName").val();
    var status = jQuery("#DDL_Status").val();
    Search(begin, end, Ucode, code, cname, oldname, status);

}


//判断是否首次打开页面，并回发
function firstLoad() {
    if (window.name == "") {
        $.ajax(
                {
                    url: "MessageInquiry.aspx?Method=FirstLoad",
                    type: "GET"
                });
    }
    window.name = "edi";
}

function dialogDownLoad() {

    var grid = jQuery("#GRD_Message_P");
    var rowKey = grid.getGridParam("selrow");
    if (rowKey) {
        var rowData = grid.jqGrid("getRowData", rowKey);
        var pk_id = rowData.PK_ID;
        var suffix = rowData.SUFFIX;
        window.open("../DownLoad/DownLoadMsg.aspx?Method=UploadFileDownLoad&&pk_id=" + pk_id + "&suffix=" + suffix);
    }
    else
        $.messager.alert('提示', "请选择某一行数据", 'info');

}



function expandSearchBody() {
    $("#searchBody").slideToggle("fast", function() {
        var body_heigth;
        var body_width;
 
        var body = $(window);
        if (body != null) {
            body_heigth = body.get(0).innerHeight; 
            body_width = $("#searchPanleHeader").width();
            jQuery("#GRD_Message_P").setGridWidth(parseInt(body_width * 0.6) -3);
            jQuery("#GRD_Message_G").setGridWidth(parseInt(body_width * 0.4));
        }
    });


    if ($("#expand").attr("src") == "../../Scripts/themes/default/images/panel_tool_collapse.gif") {
        $("#expand").removeAttr("src").attr("src", "../../Scripts/themes/default/images/panel_tool_expand.gif");
    }
    else {
        $("#expand").removeAttr("src").attr("src", "../../Scripts/themes/default/images/panel_tool_collapse.gif");
    }

}

//自适应高度和宽度
$(window).bind('resize', function() {
    //debugger;

    var body_heigth;
    var body_width;
    //    var scroll_Y;
    //   if (document.documentElement.clientHeight < document.documentElement.offsetHeight) scroll_Y = true;
    var body = $(window);
    if (body != null) {
        body_heigth = body.get(0).innerHeight;
        //body_width = body.get(0).innerWidth;
        body_width = $("#searchPanleHeader").width();

        jQuery("#GRD_Message_P").setGridWidth(parseInt(body_width * 0.6) - 3);

        jQuery("#GRD_Message_G").setGridWidth(parseInt(body_width * 0.4));

      
    }

}).trigger('resize');

