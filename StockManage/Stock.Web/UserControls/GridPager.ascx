<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="GridPager.ascx.cs" Inherits="EDI.WEB.UserControls.GridPager" %>

<script type="text/javascript">
    function CheckNumEnterKey() {
        if (event.keyCode == 13) {
            var oGo = $get('<% =ibtnGo.ClientID %>');
            oGo.click();
            event.returnValue = false;
        }
    }
</script>

<table class="Pager" cellpadding="0" cellspacing="0" border="0" width="<% =Width %>">
    <tr valign="baseline">
        <td style="width: auto;">
            &nbsp;
        </td>
        <td>
            <div style="float: right; vertical-align: middle;">
                <asp:TextBox ID="txtNum" runat="server" Width="30px" Height="14px" MaxLength="4"
                    onkeypress="CheckNumEnterKey();"></asp:TextBox>
            </div>
        </td>
        <td style="width: 17px;">
            <div style="float: right; vertical-align: middle;">
                <asp:ImageButton ID="ibtnGo" runat="server" ImageUrl="~/Images/Blue/Go.png" Style="vertical-align: middle"
                    ToolTip="前往" onclick="ibtnGo_Click" />
            </div>
        </td>
        <td style="width: 60px">
            <asp:Label ID="lblCurPage" runat="server" Text="1" />
            <asp:Localize ID="locPage2" runat="server" Text="/" />
            <asp:Label ID="lblTotalPage" runat="server" Text="1" />
        </td>
        <td align="center" style="height: 20px;" width="120px">
            <asp:ImageButton ID="ibtnFirst" runat="server" ImageUrl="~/Images/Blue/First record.png"
                ToolTip="第一页" onclick="ibtnFirst_Click" />
            &nbsp;
            <asp:ImageButton ID="ibtnPrev" runat="server" ImageUrl="~/Images/Blue/Previous record.png"
                ToolTip="前一页" onclick="ibtnPrev_Click" />&nbsp;&nbsp;
            <asp:ImageButton ID="ibtnNext" runat="server" ImageUrl="~/Images/Blue/Next track.png"
                ToolTip="后一页" onclick="ibtnNext_Click" />&nbsp;
            <asp:ImageButton ID="ibtnLast" runat="server" ImageUrl="~/Images/Blue/Last recor.png"
                ToolTip="最后一页" onclick="ibtnLast_Click" />
        </td>
        <td align="center" style="height: 20px; padding-left: 10px; padding-right: 10px;
            vertical-align: text-top;" width="100px">
            <asp:Localize ID="locPerPage" runat="server" Text="每页"></asp:Localize>
            <asp:DropDownList ID="ddlPageCount" runat="server" Width="50px" Height="20px" style="margin-top:2px" AutoPostBack="true" OnSelectedIndexChanged="ddlPageCount_SelectedIndexChanged">
                <asp:ListItem Value="10" Text="10" Selected="True"></asp:ListItem>
                <asp:ListItem Value="20" Text="20"></asp:ListItem>
                <asp:ListItem Value="30" Text="30"></asp:ListItem>
                <asp:ListItem Value="40" Text="40"></asp:ListItem>
            </asp:DropDownList>
            <asp:Localize ID="locCount" runat="server" Text="条"></asp:Localize>
        </td>
    </tr>
</table>
<ajaxToolkit:FilteredTextBoxExtender ID="aftxtNum" runat="server" TargetControlID="txtNum"
    FilterType="Numbers" Enabled="True" />
