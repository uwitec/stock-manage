<%@ Page Language="C#" AutoEventWireup="false" CodeBehind="Default1.aspx.cs" Inherits="EDI.Web._Default1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>珠海港信息技术有限公司</title>
    <meta http-equiv="Expires" content="0" />
    <meta http-equiv="Cache-Control" content="no-cache" />
    <meta http-equiv="Pragma" content="no-cache" />
    <style type="text/css">
        body
        {
            font-family: Verdana;
            font-size: 14px;
            margin: 0;
        }
        #container
        {
            margin: 0 auto;
        }
        #header
        {
            height: 100px;
            background: #6cf;
            margin-bottom: 5px;
        }
        #menu
        {
            height: 30px;
            background: #09c;
            margin-bottom: 5px;
        }
        #mainContent
        {
            height: 1000px;
            margin-bottom: 5px;
        }
        #sidebar
        {
            float: left;
            width: 200px;
            height: 1000px;
            background: #9ff;
        }
        #content
        {
            float: right;
            width: 1000px;
            height: 1000px;
            background: #cff;
        }
        /*因为是固定宽度，采用左右浮动方法可有效避免ie 3像素bug*/#footer
        {
            height: 60px;
            background: #6cf;
        }
        .Slider
        {
        	background-color:White;
        }
    </style>
    <link rel="Stylesheet" href="../../Styles/default.css" />
    <%--<link rel="Stylesheet" href="../../Scripts/themes/default/easyui.css" />--%>
    <%--<link rel="Stylesheet" href="../../Scripts/themes/icon.css" />--%>
    <%--    <link href="../../Scripts/EasyUI/themes/default/easyui.css" rel="stylesheet" type="text/css" />
    <link href="../../Scripts/EasyUI/themes/icon.css" rel="stylesheet" type="text/css" />--%>

    <script src="../../Scripts/jqueryUI/js/jquery-1.7.1.min.js" type="text/javascript"></script>

    <link href="../../Scripts/jqueryUI/css/redmond/jquery-ui-1.8.17.custom.css" rel="stylesheet"
        type="text/css" />

    <script src="../../Scripts/jqueryUI/js/jquery-ui-custom.min.js" type="text/javascript"></script>
<%--
    <script src="../../Scripts/jqueryUI/development-bundle/ui/jquery.ui.widget.js" type="text/javascript"></script>

    <script src="../../Scripts/jqueryUI/development-bundle/ui/jquery.ui.tabs.js" type="text/javascript"></script>
--%>
    <%-- <script src="../../Scripts/jqueryUI/js/jquery-ui-1.8.17.custom.min.js" type="text/javascript"></script>--%>
    <%--<script type="text/javascript" src="../../Scripts/jquery-1.4.2.min.js"></script>--%>
    <%--    <script type="text/javascript" src="../../Scripts/jQuery.easyui.js"></script>--%>

    <script src="../../Scripts/outlook2.js" type="text/javascript"></script>

    <script type="text/javascript">
        $(function() {
            $('#tabs').tabs();
        });
        $(document).ready(function() {
            init();
            $('#tabs').tabs({ add: addEventHandler });  //ç»tabsåç»å®addEventHandleräºä»¶
            $('#newtabs').click(addTab);
        })
        var tabCounter = 1;
        function addTab(tab_id, tab_name, tab_url, icon) {
            var boo = "false";
            var li = $('#tabs li');
            var li_div = $('#tabs div');
            for (var i = 0; i < li_div.length; i++) {
                if (li_div[i].id == "tab-" + tab_id) {
                    boo = "true";
                    $("#tabs").tabs({ selected: i });
                }
            }
            if (boo == "false") {
                if (tabCounter > 19) {
                    alert('窗口数必须小于20个！');
                    return;
                }
                var sHeight = parent.document.body.scrollHeight;
                sHeight = sHeight - 95;
                $('<div id="tab-' + tab_id + '">' + '<iframe id="' + tab_id + '" style="width:100%;height:' + sHeight + 'px;" src="' + tab_url + '" frameborder=0 scrolling="auto" ></iframe>    </div>').appendTo('#tabs');
                $('#tabs').tabs("add", "#tab-" + tab_id, tab_name);

                tabCounter++;
                $("#tabs").tabs({ selected: tabCounter - 2 });
            }
        }

        function addEventHandler(event, ui) {
            var li = $(ui.tab).parent();
            $(ui.tab).dblclick(function() {  //双击关闭窗口
                var index = $('#tabs li').index(li.get(0));
                if (index == "0") {
                    return false;
                } else {
                    $("#tabs").tabs("remove", index);
                    tabCounter--;
                }
            });

            //$(ui.tab).mouseover(function(){   //åå»å³é­äºä»¶ç»å®
            //	var index = $('#tabs li').index(li.get(0));
            //	$("#tabs").tabs({ selected: index });
            //});

        }
        function init() {
            addTab('101','home', 'http://www.baidu.com', '');
        }

        function homemouseover() {
            $("#tabs").tabs({ selected: 0 });
        }


        // tabs init with a custom tab template and an "add" callback filling in the content

        $("#tabs span.ui-icon-close").live("click", function() {
            var index = $("li", $("#tabs")).index($(this).parent());
            ////        $("#tabs").tabs("remove", index);

            if (index == "0") {
                return false;
            } else {
                $("#tabs").tabs("remove", index);
                tabCounter--;
            }


        })
    </script>

    <script src="../../Scripts/jqueryUI/js/jquery.layout-latest.min.js" type="text/javascript"></script>

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

        var maintab = jQuery('#tabs', '#RightPane').tabs({
            add: function(e, ui) {
                // append close thingy
                $(ui.tab).parents('li:first')
.append('<span class="ui-tabs-close ui-icon ui-icon-close" title="Close Tab"></span>')
.find('span.ui-tabs-close')
.click(function() {
    maintab.tabs('remove', $('li', maintab).index($(this).parents('li:first')[0]));
});
                // select just added tab
                maintab.tabs('select', '#' + ui.panel.id);
            }
        }); 
//        $(document).ready(function() {
//            $('body').layout({ applyDefaultStyles: true });
//        });
     
    </script>
<SCRIPT type="text/javascript">
    var pageLayout;

    $(document).ready(function() {
        // create page layout
        pageLayout = $('body').layout({
            scrollToBookmarkOnLoad: false // handled by custom code so can 'unhide' section first
		, defaults: {
}
		, north: {
		    size: "auto"
			, spacing_open: 0
			, closable: false
			, resizable: false
		}
		, west: {
		size: 250
		    , paneClass: "Slider"
			, spacing_closed: 22
			, togglerLength_closed: 140
			, togglerAlign_closed: "top"
			, togglerContent_closed: "菜<BR>单"
			, togglerTip_closed: "Open & Pin Contents"
			, sliderTip: "Slide Open Contents"
			, slideTrigger_open: "mouseover"
		}
        });

        // goto bookmark after creating the layout
        scrollToBookmark(self.location.hash);

    });
	</SCRIPT>
</head>
<body>
    <%--  <div id="container">
        <div id="header">
            This is the Header</div>
        <div id="menu">
            This is the Menu</div>
        <div id="mainContent">
            <div id="sidebar">
                <div class="easyui-accordion" fit="true" border="false">
                     
                </div>
            </div>
            <div id="content">
                 
                
            </div>
             
        </div>
    </div>--%>
    <%--    <div class="ui-layout-center">
        <div id="tabs">
            <ul>
            </ul>
        </div>
    </div>--%>
    <%--<div class="ui-layout-north">
        North</div>--%>
    <%--    <div class="ui-layout-west">
        <div class="easyui-accordion" fit="true" border="false">
        </div>
    </div>--%>
    <div class="ui-layout-north">
        <div id="logo">
            jQuery UI Layout Plug-in</div>
        <div id="navigation">
            <a href="index.cfm">HOME</a> <a href="demos.cfm">DEMOS</a> <a href="downloads.cfm">DOWNLOADS</a>
            <a href="documentation.cfm">DOCUMENTATION</a> <a href="tips.cfm" class="current">TIPS</a>
            <a href="plugin.cfm">PLUGIN</a> <a href="issues.cfm">ISSUES</a> <a target="_blank"
                href="http://groups.google.com/group/jquery-ui-layout">DISCUSSION</a>
        </div>
    </div>
    <div class="ui-layout-center content">
         <div id="tabs">
            <ul>
            </ul>
        </div> 
       
    </div>
    <div class="ui-layout-west" style="display: none;">
        <div class="header">
            Contents</div>
        <div class="ui-layout-content">
           <div class="easyui-accordion" fit="true" border="false">
            </div> 
             
        </div>
    </div>
</body>
</html>
