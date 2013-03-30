<%@ Page Language="C#" AutoEventWireup="false" CodeBehind="Default.aspx.cs" Inherits="EDI.Web._Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>珠海港信息技术有限公司</title>
    <meta http-equiv="Expires" content="0" />
    <meta http-equiv="Cache-Control" content="no-cache" />
    <meta http-equiv="Pragma" content="no-cache" />
    <link rel="Stylesheet" href="../../Styles/default.css" />
    <%--<link rel="Stylesheet" href="../../Scripts/themes/default/easyui.css" />--%>
    <%--<link rel="Stylesheet" href="../../Scripts/themes/icon.css" />--%>
    <link href="../../Scripts/EasyUI/themes/default/easyui.css" rel="stylesheet" type="text/css" />
    <link href="../../Scripts/EasyUI/themes/icon.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript" src="../../Scripts/jquery-1.4.2.min.js"></script>

    <script type="text/javascript" src="../../Scripts/jQuery.easyui.js"></script>

    <script src="../../Scripts/outlook2.js" type="text/javascript"></script>

    <script type="text/javascript">

        var _menus;

        jQuery.ajax({
            type: "GET",   //访问WebService使用Get方式请求
            contentType: "application/json", //WebService 会返回Json类型
            url: "../../Services/MenuSVC.asmx/GetMenus", //调用WebService的地址和方法名称组合 ---- WsURL/方法名
            data: "{}",         //这里是要传递的参数，格式为 data: "{paraName:paraValue}",下面将会看到       
            dataType: 'json',
            success: function(result) {    //回调函数，result，返回值
                _menus = eval("(" + result.d + ")");
                InitLeftMenu();
                //tabClose();
                tabCloseEven();
                i = 1;
            }
        });

         
     
    </script>

</head>
<body class="easyui-layout" style="overflow-y: hidden" scroll="no">
    <div region="north" split="true" border="false" style="overflow: hidden; height: 30px;
        background: url(../../Images/layout-browser-hd-bg.gif) #7f99be repeat-x center 50%;
        line-height: 20px; color: #fff; font-family: Verdana, 微软雅黑,黑体">
        <%--<span style="float:right; padding-right:20px;" class="head">zhangzq<a href="#" id="loginOut"> | 安全退出</a></span>--%>
        <div style="padding-left: 10px; font-size: 16px; float: left;">
            <img src="../../Images/zph.gif" width="40" height="20" align="absmiddle" />
            EDI在线服务平台
        </div>
        <div style="float: right; margin-right: 40px; padding-left: 20px;">
            <%--<input type="button" onclick=getvalue()/>--%>
            <span style="float: left; font-family: 微软雅黑; color: white; font-size: 14px;">欢迎你，来自<%=LogonUser.ORGCNAME%>的<%=LogonUser.CNAME%>！</span>
            <a href="Exit.aspx" style="font-family: 微软雅黑; color: white; font-size: 14px; margin-left: 20px">
                重新登陆</a>
        </div>
    </div>
    <%-- <div region="south" split="true" style="height: 30px; background: #D2E0F2;">
        <div class="footer">
            <span style="float: left">帐户：<%=LogonUser.CNAME%></span> <span style="float: right;">
                CopyRight &copy; 珠海港信息技术有限公司</span>
        </div>
    </div>--%>
    <div region="west" split="true" title="在线查询" style="width: 180px;" id="west">
        <div class="easyui-accordion" fit="true" border="false">
            <%--<input name="hidden" id="menuid" style=" display:none" />--%>
            <!--  
		      左侧导航内容 
		      菜单内容
		-->
        </div>
    </div>
    <%--<div region="east" split="true" title="其他功能" style="width:180px;" id="east">
	    <!--  
		     右侧导航内容 
	    -->
</div>--%>
    <div id="mainPanle" region="center" style="background: #eee; overflow-y: hidden">
        <div id="tabs" class="easyui-tabs" fit="true" border="false">
            <div title="EDI在线服务" style="padding: 20px; overflow: hidden; background: url('../../Images/main-bg.jpg') no-repeat bottom right"
                id="home">
            </div>
        </div>
        <%--   <div id="mm" class="easyui-menu" style="width: 150px;">
            <div id="mm-tabclose">
                关闭</div>
            <div id="mm-tabcloseall">
                全部关闭</div>
            <div id="mm-tabcloseother">
                除此之外全部关闭</div>
            <div class="menu-sep">
            </div>
            <div id="mm-tabcloseright">
                当前页右侧全部关闭</div>
            <div id="mm-tabcloseleft">
                当前页左侧全部关闭</div>
        </div>--%>
    </div>
</body>
</html>
