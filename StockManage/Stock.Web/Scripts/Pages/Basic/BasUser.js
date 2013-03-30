
// 主子表级联效果
function getSelectedOrg() {
    var grid = jQuery("#GRD_Company");
    var rowKey = grid.getGridParam("selrow");
    var rowData = grid.jqGrid("getRowData", rowKey);

    var typeName = rowData.NAME;
    if (rowKey) {
        $.ajax(
                {
                    url: "BasUser.aspx?companyid=" + rowKey,
                    type: "GET",
                    success: function() {
                        $("#GRD_User").jqGrid('setGridParam', { search: false, postData: { "filters": ""} }).jqGrid("setCaption", "用户信息 - " + typeName).trigger("reloadGrid");
                    }
                });

    }
    else
        alert("No rows are selected");
}


function formatGrid() {
    $('tr.jqgrow td').css({ 'border': '0px none' });

}

//编辑功能
function EditRow() {
    var grid = jQuery("#GRD_User");

    var rowKey = grid.getGridParam("selrow");
    var rowData = grid.jqGrid("getRowData", rowKey);
    if (rowKey != null) {
        jQuery("#loginName").html(rowData.LOGINNAME);
        jQuery("#password").html(rowData.PASSWORD);
        jQuery("#Ename").val(rowData.ENAME);
        jQuery("#Cname").val(rowData.CNAME);
        jQuery("#work").val(rowData.WORKS);
        jQuery("#mobile").val(rowData.MOBILE);
        jQuery("#tel").val(rowData.TEL);
        jQuery("#email").val(rowData.EMAIL);
        jQuery("#fax").val(rowData.FAX);
        jQuery("#qq").val(rowData.QQ);
        jQuery("#remark").val(rowData.REMARK);
        editTypeDialog();
    }
    else {
        $.messager.alert('提示', '<div style="text-align:left;"><br>请选取数据!</div>', 'info');
    }
}
//自定义编辑框弹出设置
function editTypeDialog() {
    $("#dialogEditRole").show();
    $("#dialogEditRole").attr("title", "编辑用户信息");

    $("#dialogEditRole").dialog({
        width: 850,
        height: 250,
        draggable: true,
        resizable: true,
        modal: true,
        buttons:
                    [
                        {
                            text: '提交',
                            iconCls: 'icon-ok',
                            handler: function() {
                                var grid = jQuery("#GRD_User");
                                var id = grid.getGridParam("selrow");
                                var cname = jQuery("#Cname").val();
                                var ename = jQuery("#Ename").val();
                                var works = jQuery("#work").val();
                                var mobile = jQuery("#mobile").val();
                                var tel = jQuery("#tel").val();
                                var email = jQuery("#email").val();
                                var fax = jQuery("#fax").val();
                                var qq = jQuery("#qq").val();
                                var remark = jQuery("#remark").val();
                                SaveType(id, ename, cname, works, mobile, tel, email, fax, qq, remark);
                            }
                        },
				        {
				            text: '取消',
				            handler: function() {
				                $('#dialogEditRole').dialog('close');
				            }
				        }
				    ]
    });
}
//数据回发到后台
function SaveType(id, ename, cname, works, mobile, tel, email, fax, qq, remark) {
    $.ajax({
        type: "POST",
        dataType: "json",
        //cache:true,
        url: "BasUser.aspx?Method=editUserInfo",
        data: { id: id, ename: ename, cname: cname, works: works, mobile: mobile, tel: tel, email: email, fax: fax, qq: qq, remark: remark },

        success: function(json) {
            if (json.Message) {
                $.messager.alert('提示', json.Message, 'info');
                var grid = jQuery("#GRD_User");

                var rowKey = grid.getGridParam("selrow");

                grid.trigger("reloadGrid");
                grid.resetSelection();
                $('#dialogEditRole').dialog('close');
            }
            if (json.Error) {
                $.messager.alert('提示', json.Error, 'info');
            }

        },
        error: function() {

            $.messager.alert('错误', '保存失败...请联系管理员!', 'error');
        }
    });
}
//重置密码
function ResetPassword() {
    var grid = jQuery("#GRD_User");

    var rowKey = grid.getGridParam("selrow");
    if (rowKey != null) {
        ResetPasswordDialog();
    }
    else {
        $.messager.alert('提示', '<div style="text-align:left;"><br>请选取数据!</div>', 'info');
    }
}
//重置密码弹出框设置
function ResetPasswordDialog() {
    $("#passwordReset").val("");
    $("#dialogResetPassword").show();
    $("#dialogResetPassword").attr("title", "重置密码");

    $("#dialogResetPassword").dialog({
        width: 350,
        height: 150,
        draggable: true,
        resizable: true,
        modal: true,
        buttons:
                    [
                        {
                            text: '提交',
                            iconCls: 'icon-ok',
                            handler: function() {
                                var grid = jQuery("#GRD_User");
                                var id = grid.getGridParam("selrow");
                                var password = jQuery("#passwordReset").val();  //取输入框的值
                                SavePassword(id, password);
                            }
                        },
				        {
				            text: '取消',
				            handler: function() {
				                $('#dialogResetPassword').dialog('close');
				            }
				        }
				    ]
    });
}
//回发数据到后台
function SavePassword(id, password) {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "BasUser.aspx?Method=ResetPWD",
        data: { id: id, password: password },

        success: function(json) {
            if (json.Message) {
                $.messager.alert('提示', json.Message, 'info');
                var grid = jQuery("#GRD_User");

                var rowKey = grid.getGridParam("selrow");

                grid.trigger("reloadGrid");
                grid.resetSelection();
                $('#dialogResetPassword').dialog('close');
            }
            if (json.Error) {
                $.messager.alert('提示', json.Error, 'info');
            }
        },
        error: function() {

            $.messager.alert('错误', '保存失败...请联系管理员!', 'error');
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
            body_height = body.get(0).innerHeight;
         
            grd_height = body_height - 102;
            body_width = body.get(0).innerWidth - 210;
            jQuery("#GRD_User").setGridWidth(body_width);

            jQuery("#GRD_User").setGridHeight(grd_height);

            jQuery("#GRD_Company").setGridHeight(body_height - 50);
        }

    }).trigger('resize');
}