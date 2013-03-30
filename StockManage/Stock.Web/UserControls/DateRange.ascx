<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="DateRange.ascx.cs" Inherits="EDI.WEB.UserControls.DateRange" %>

<script type="text/javascript">
    function date(name) {
        var time = new Date();
        name.value = time.getFullYear() + "-" + time.getMonth() + "-" + time.getDate();
    }
</script>

<table cellpadding="0" cellspacing="0" border="0" width="<%=Width %>" style="height: <%=Height %>;">
    <tr>
        <td class="InputArea" style="width: 120px">
            <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td align="right">
                        <asp:TextBox ID="txtDateFrom" runat="server" Width="80px" SkinID="Date"></asp:TextBox>
                    </td>
                    <td align="left">
                        <asp:ImageButton ID="imgDateFrom" runat="server" ImageUrl="~/Images/Blue/Calendar.png"
                            CssClass="DatePickerCommon_Image" Style="border-top: solid 1px #7F9DB9; border-bottom: solid 1px #7F9DB9;
                            border-right: solid 1px #7F9DB9; vertical-align: bottom;" />
                    </td>
                    <td>
                        <ajaxToolkit:CalendarExtender ID="aceDateFrom" runat="server" TargetControlID="txtDateFrom"
                            PopupButtonID="imgDateFrom" Enabled="True" Format="yyyy-MM-dd">
                        </ajaxToolkit:CalendarExtender>
                        <ajaxToolkit:FilteredTextBoxExtender ID="aftDateFrom" runat="server" ValidChars="0123456789-"
                            TargetControlID="txtDateFrom" Enabled="True">
                        </ajaxToolkit:FilteredTextBoxExtender>
                        <asp:RequiredFieldValidator ID="reqvDateForm" runat="server" ControlToValidate="txtDateFrom"
                            Visible="true" Text="*" Display="static"></asp:RequiredFieldValidator>
                        <asp:RegularExpressionValidator ID="rexpvDateFrom" Text="*" runat="server" Display="Static"
                            Visible="true" ControlToValidate="txtDateFrom" ValidationExpression="^(((1[6-9]|[2-9]\d)(\d{2})-((0?[13578])|(1[02]))-((0?[1-9])|([12]\d)|(3[01])))|((1[6-9]|[2-9]\d)(\d{2})-((0?[469])|11)-((0?[1-9])|([12]\d)|30))|((1[6-9]|[2-9]\d)(\d{2})-0?2-((0?[1-9])|(1\d)|(2[0-8])))|((1[6-9]|[2-9]\d)([13579][26])-0?2-29)|((1[6-9]|[2-9]\d)([2468][048])-0?2-29)|((1[6-9]|[2-9]\d)(0[48])-0?2-29)|([13579]600-0?2-29)|([2468][048]00-0?2-29)|([3579]200-0?2-29))$">
                        </asp:RegularExpressionValidator>
                    </td>
                </tr>
            </table>
        </td>
        <td class="InputLabel" style="width: 20px; text-align: center; border-right-width: 1px;
            border-left-width: 1px;">
            <asp:Localize ID="locTo" runat="server" Text="—" meta:resourcekey="locToResource1"></asp:Localize>
        </td>
        <td class="InputArea" style="width: 120px">
            <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td class="InputLabel" style="width: 30px; text-align: center;">
                    </td>
                    <td align="right">
                        <asp:TextBox ID="txtDateTo" runat="server" Width="80px" SkinID="Date"></asp:TextBox>
                    </td>
                    <td align="left">
                        <asp:ImageButton ID="imgDateTo" runat="server" ImageUrl="~/Images/Blue/Calendar.png"
                            CssClass="DatePickerCommon_Image" Style="border-top: solid 1px #7F9DB9; border-bottom: solid 1px #7F9DB9;
                            border-right: solid 1px #7F9DB9; vertical-align: bottom;" />
                    </td>
                    <td>
                        <ajaxToolkit:CalendarExtender ID="aceDateTo" runat="server" TargetControlID="txtDateTo"
                            PopupButtonID="imgDateTo" Enabled="True" Format="yyyy-MM-dd">
                        </ajaxToolkit:CalendarExtender>
                        <ajaxToolkit:FilteredTextBoxExtender ID="aftDateTo" runat="server" ValidChars="0123456789-"
                            TargetControlID="txtDateTo" Enabled="True">
                        </ajaxToolkit:FilteredTextBoxExtender>
                        <asp:RequiredFieldValidator ID="reqvDateTo" runat="server" ControlToValidate="txtDateTo"
                            Visible="true" Display="Static" Text="*"></asp:RequiredFieldValidator>
                        <asp:RegularExpressionValidator ID="rexpvDateTo" runat="server" Text="*" Display="Static"
                            Visible="true" ControlToValidate="txtDateTo" ValidationExpression="^(((1[6-9]|[2-9]\d)(\d{2})-((0?[13578])|(1[02]))-((0?[1-9])|([12]\d)|(3[01])))|((1[6-9]|[2-9]\d)(\d{2})-((0?[469])|11)-((0?[1-9])|([12]\d)|30))|((1[6-9]|[2-9]\d)(\d{2})-0?2-((0?[1-9])|(1\d)|(2[0-8])))|((1[6-9]|[2-9]\d)([13579][26])-0?2-29)|((1[6-9]|[2-9]\d)([2468][048])-0?2-29)|((1[6-9]|[2-9]\d)(0[48])-0?2-29)|([13579]600-0?2-29)|([2468][048]00-0?2-29)|([3579]200-0?2-29))$">
                        </asp:RegularExpressionValidator>
                    </td>
                </tr>
            </table>
        </td>
        <td class="InputArea">
        </td>
    </tr>
    <tr>
        <td colspan="5">
            <asp:ValidationSummary ID="vsMessage" runat="server" DisplayMode="List" HeaderText="提示"
                ShowMessageBox="true" ShowSummary="false" />
        </td>
    </tr>
</table>
