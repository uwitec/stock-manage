//当选中主表行后，重新加载子表数据，并且设置子表caption  达到级联效果
function getSelectedOrg() {
    var grid = jQuery("#GRD_Type");
    var rowKey = grid.getGridParam("selrow");
    var rowData = grid.jqGrid("getRowData", rowKey);
    var typeName = rowData.CNAME;
    if (rowKey) {
        $.ajax(
                {
                    url: "BasCompany.aspx?typeid=" + rowKey,
                    type: "GET",
                    success: function() {
                        $("#GRD_Company").jqGrid('setGridParam', { search: false, postData: { "filters": ""} }).jqGrid("setCaption", "公司信息 - " + typeName).trigger("reloadGrid");
                    }
                });





    }
    else
        alert("No rows are selected");
}


function formatGrid() {
    //            $('.ui-jqgrid-htable', '.ui-jqgrid-hbox').hide();
    $('tr.jqgrow td').css({ 'border': '0px none' });
}

//隐藏分页栏 包括按钮以及右边的条目信息
function HidePagerInfo() {

    $('td#GRD_Type_pager_right').hide();
    $('td#GRD_Type_toppager_right').hide();
    $('td#GRD_Type_toppager_center').hide();
    $('td#GRD_Type_pager_center').hide();
}

//级联刷新， 刷新主表的同时刷新子表
function Refresh() {
    $("#GRD_Type").trigger("reloadGrid");
    $("#GRD_Company").jqGrid("setCaption", "公司信息 - [请选择公司类型]").trigger("reloadGrid");

}


window.onload = function() {
    $(window).bind('resize', function() {
        var body_height;
        var body_width;
        var body = $(window);
        if (body != null) {
            body_width = document.documentElement.clientWidth;
            body_height = document.documentElement.clientHeight;
            jQuery("#GRD_Type").setGridHeight(body_height - 105);
            jQuery("#GRD_Company").setGridWidth(body_width - 308);
            jQuery("#GRD_Company").setGridHeight(body_height - 105);
        }

    }).trigger('resize');
}
 