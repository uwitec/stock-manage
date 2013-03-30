<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="EDI.Web.Login" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>登陆 EDI 在线服务</title>
    <style type="text/css">
        .login
        {
            color: white;
            background-image: url(../../Images/Login/bg_login.png);
            background-position: top;
            background-repeat: repeat-x;
            background-color: #3B8DAE;
            height: 100%;
            width: 100%;
            padding: 0px;
            height: 604px;
            text-align: center;
        }
        .main
        {
            background-image: url(../../Images/Login/login_main.png);
            height: 100%;
            width: 800px;
            height: 500px;
            background-repeat: no-repeat;
            margin-left: 150px;
        }
        .root
        {
            padding: 0px;
            margin: 0px auto;
            width: 800px;
            height: 104px;
            margin-bottom: 0px;
            background-image: url(../../Images/Login/login_root.png);
        }
        .blank_bg
        {
            height: 270px;
            width: 800px;
        }
        .line1
        {
            width: 390px;
            height: 30px;
            float: left;
        }
        .line2
        {
            width: 80px;
            height: 30px;
            float: left;
            text-align: right;
            line-height: 30px;
            font-size: 16px;
            padding-right:10px;
            font-family: 隶书;
            color: #fff;
        }
        .line3
        {
            width: 160px;
            height: 30px;
            float: left;
            text-align:left;
        }
        .line4
        {
            width: 140px;
            height: 30px;
            float: left;
            text-align: left;
        }
        .btn
        {
            border-right: #7b9ebd 1px solid;
            padding-right: 5px;
            border-top: #7b9ebd 1px solid;
            padding-left: 5px;
            font-size: 12px;
            border-left: #7b9ebd 1px solid;
            background-color: #DDE7F5;
            filter: progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr=#ffffff, EndColorStr=#D2E0F2);
            cursor: hand;
            color: Black;
            padding-top: 2px;
            border-bottom: #7b9ebd 1px solid;
            width:80px;
        }
        .txt
        {
            width: 120px;
            height: 16px;
            line-height: 16px;
            margin-bottom: 5px;
            margin-top: 5px;
            color: #3C6485;
            font-weight: bold;
            border: 2px solid #D4D0C8;
        }
    </style>

    <script type="text/javascript">
        function change() {
            var imgNode = document.getElementById("vimg");
            imgNode.src = "ValidateCode.ashx?t=" + (new Date()).valueOf();  // 这里加个时间的参数是为了防止浏览器缓存的问题  
        }  
    </script>

</head>
<body style="margin: 0px;">
    <form id="formLogin" runat="server">
    <div class="login" style="text-align: center;">
        <div class="main">
            <div class="blank_bg">
            </div>
          
            <div>
                <div class="line1">
                </div>
                <div class="line2">
                    用户名</div>
                <div class="line3">
                    <asp:TextBox ID="txtName" CssClass="txt" Width="150px" runat="server"></asp:TextBox>
                </div>
                <div class="line4">
                </div>
            </div>
            <div>
                <div class="line1">
                </div>
                <div class="line2">
                    密码</div>
                <div class="line3">
                    <asp:TextBox ID="txtPassword" CssClass="txt"  Width="150px" TextMode="Password" runat="server"></asp:TextBox>
                </div>
                <div class="line4">
                </div>
            </div>
            <div>
                <div class="line1">
                </div>
                <div class="line2">
                    验证码</div>
                <div class="line3">
                    <table cellpadding="0" cellspacing="0">
                        <tr>
                            <td align="left">
                                <asp:TextBox ID="txtCheckCode" CssClass="txt" Width="80px" runat="server" MaxLength="5"></asp:TextBox>
                            </td>
                            <td align="right" style="padding-left:10px">
                                
                                <img src="ValidateCode.ashx" id="vimg" alt="" onclick="change()" />
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="line4">
                </div>
            </div>
            <div>
                <div class="line1">
                </div>
                <div class="line2">
                </div>
                <div class="line3" style="text-align:center;">
                <asp:Button ID="btnLogin" runat="server" CssClass="btn" Text="登录" OnClick="btnLogin_Click" />
                </div>
                <div class="line4">
                    
                </div>
            </div>
        </div>
        <div class="root">
        </div>
    </div>
    </form>
</body>
</html>
