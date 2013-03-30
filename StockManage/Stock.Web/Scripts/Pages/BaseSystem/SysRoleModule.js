function SelectOneRole() {
    //debugger;
    var grid = jQuery("#GRD_RoleModule");
    var rowKey = grid.getGridParam("selrow");

    if (rowKey) {
        var rowData = grid.jqGrid("getRowData", rowKey);

        var rName = rowData.NAME;

        $.ajax(
                {
                    url: "SysRoleModule.aspx?rid=" + rowKey + "&name=" + encodeURI(rName),
                    type: "GET",
                    success: function(e) {
                        $("#GRD_Pages").jqGrid("setCaption", "页面列表 - " + rName);
                        $('#GRD_Pages').jqGrid('setGridParam', { search: false, postData: { 'filters': ''} }).trigger('reloadGrid');
                    }
                });

    }
    else
        alert("error！");
}

function GrdRowSelect1() {
    var grid = jQuery("#GRD_Pages");
    var rowKey = grid.getGridParam("selrow");
    if (rowKey) {
        var rowData = grid.jqGrid("getRowData", rowKey);
        var Pageid = rowData.PK_ID;
        var PageName = rowData.TITLE;
        $.ajax(
                {
                    url: "SysRoleModule.aspx?pageid=" + Pageid + "&pagename=" + encodeURI(PageName),
                    type: "GET"
                });
    }
}

//判断是否首次打开页面，并回发
function firstLoad() {
    if (window.name == "") {
        $.ajax(
                {
                    url: "SysRoleModule.aspx?Method=FirstLoad",
                    type: "GET"
                });
    }
    window.name = "edi";
}

//隐藏分页信息
function HidePagerInfo() {

    $('td#GRD_RoleModule_pager_right').hide();
    $('td#GRD_RoleModule_toppager_right').hide();
    $('td#GRD_RoleModule_toppager_center').hide();
    $('td#GRD_RoleModule_pager_center').hide();
}

//刷新
function Refresh() {
    $("#GRD_RoleModule").trigger("reloadGrid");
}


function SelectCheckBox(e) {
    e = e || window.event;
    var o = (e.target) ? e.target : e.srcElement;
    var inputobj;

    if (o.tagName == "INPUT" && o.type == "checkbox") {
        var parentobj = o.parentNode;

        inputobj = o;
        while (parentobj.tagName != "TABLE")
        { parentobj = parentobj.parentNode }
        SetParentCheckBox(inputobj);
        var nextobj = parentobj.nextSibling
        if (nextobj.tagName != "DIV")
            return;
        var x = nextobj.getElementsByTagName("INPUT");
        var s = "";
        for (var i = 0; i < x.length; i++) {
            if (x[i].tagName == "INPUT" && x[i].type == "checkbox") {
                if (inputobj.checked)
                    x[i].checked = true
                else
                    x[i].checked = false

            }

        }

    }

}

//checkbox点击事件
function OnCheckEvent() {
    var objNode = event.srcElement;
    if (objNode.tagName != "INPUT" || objNode.type != "checkbox")
        return;
    //获得当前树结点
    var ck_ID = objNode.getAttribute("ID");
    var node_ID = ck_ID.substring(0, ck_ID.indexOf("CheckBox")) + "Nodes";
    var curTreeNode = document.getElementById(node_ID);
    //级联选择
    SetChildCheckBox(curTreeNode, objNode.checked);
    SetParentCheckBox(objNode);
}

//子结点字符串
var childIds = "";
//获取子结点ID数组
function GetChildIdArray(parentNode) {
    if (parentNode == null)
        return;
    var childNodes = parentNode.children;
    var count = childNodes.length;
    for (var i = 0; i < count; i++) {
        var tmpNode = childNodes[i];
        if (tmpNode.tagName == "INPUT" && tmpNode.type == "checkbox") {
            childIds = tmpNode.id + ":" + childIds;
        }
        GetChildIdArray(tmpNode);
    }
}

//设置子结点的checkbox
function SetChildCheckBox(parentNode, checked) {
    if (parentNode == null)
        return;
    var childNodes = parentNode.children;
    var count = childNodes.length;
    for (var i = 0; i < count; i++) {
        var tmpNode = childNodes[i];
        if (tmpNode.tagName == "INPUT" && tmpNode.type == "checkbox") {
            tmpNode.checked = checked;
        }
        SetChildCheckBox(tmpNode, checked);
    }
}

//设置父结点的checkbox
function SetParentCheckBox(childNode) {
    if (childNode == null)
        return;
    var parent = childNode.parentNode;
    if (parent == null || parent == "undefined")
        return;
    do {
        parent = parent.parentNode;
    }
    while (parent && parent.tagName != "DIV");
    if (parent == "undefined" || parent == null)
        return;
    var parentId = parent.getAttribute("ID");
    var objParent = document.getElementById(parentId);
    childIds = "";
    GetChildIdArray(objParent);
    //判断子结点状态
    childIds = childIds.substring(0, childIds.length - 1);
    var aryChild = childIds.split(":");
    var result = false;
    //当子结点的checkbox状态有一个为true，其父结点checkbox状态即为true,否则为false
    for (var i in aryChild) {
        var childCk = document.getElementById(aryChild[i]);
        if (childCk.checked)
            result = true;
    }
    parentId = parentId.replace("Nodes", "CheckBox");
    var parentCk = document.getElementById(parentId);
    if (parentCk == null)
        return;
    if (result)
        parentCk.checked = true;
    else
        parentCk.checked = false;
    //SetParentCheckBox(parentCk);
}

function CheckSelect() {
    //alert("123");
    var tb = document.getElementById("Checkbox");
    for (var i = 0; i < tb.rows.length; i++) {
        var chk = tb.rows[i].firstChild.firstChild;
        if (chk != event.srcElement) {
            chk.checked = false;
        }
    }
}