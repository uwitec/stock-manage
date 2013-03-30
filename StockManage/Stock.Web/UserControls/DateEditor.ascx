<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="DateEditor.ascx.cs" Inherits="EDI.WEB.UserControls.DateEditor" %>
 <table cellpadding="0" cellspacing="0" border="0">
    <tr>
        <td>
            <table cellpadding="0" cellspacing="0" border="0">
                <tr style="text-align: left;">
                    <td align="right">
                        <asp:TextBox ID="txtDate" runat="server" Width="95px" MaxLength="10"></asp:TextBox>
                    </td>
                    <td align="left" style="width: 20px">
                        <asp:ImageButton ID="imgDate" runat="server" ImageUrl="~/Images/Blue/Calendar.png"
                            CssClass="DatePickerCommon_Image" 
                            Style="border-top: solid 1px #7F9DB9; border-bottom: solid 1px #7F9DB9;
                            border-right: solid 1px #7F9DB9; vertical-align: bottom; margin-top: 0px;" />
                            
                    </td>
                    
                    <td style="vertical-align: middle; width:30px;">
                        <ajaxToolkit:CalendarExtender ID="aceDate" runat="server" TargetControlID="txtDate"
                            PopupButtonID="imgDate" Format="yyyy-MM-dd">
                        </ajaxToolkit:CalendarExtender>
                        <asp:RequiredFieldValidator ID="reqvDate" runat="server" Display="Dynamic" Text="*"
                            ControlToValidate="txtDate" ForeColor="red"></asp:RequiredFieldValidator>
                        <asp:RegularExpressionValidator ID="rexqvDate" runat="server"
                            Text="*" Display="static" ControlToValidate="txtDate" ValidationExpression="^(((1[6-9]|[2-9]\d)(\d{2})-((0?[13578])|(1[02]))-((0?[1-9])|([12]\d)|(3[01])))|((1[6-9]|[2-9]\d)(\d{2})-((0?[469])|11)-((0?[1-9])|([12]\d)|30))|((1[6-9]|[2-9]\d)(\d{2})-0?2-((0?[1-9])|(1\d)|(2[0-8])))|((1[6-9]|[2-9]\d)([13579][26])-0?2-29)|((1[6-9]|[2-9]\d)([2468][048])-0?2-29)|((1[6-9]|[2-9]\d)(0[48])-0?2-29)|([13579]600-0?2-29)|([2468][048]00-0?2-29)|([3579]200-0?2-29))$">
                        </asp:RegularExpressionValidator>
                        <ajaxToolkit:TextBoxWatermarkExtender ID="tbwe" runat="server"
    TargetControlID="txtDate"   
    WatermarkCssClass="watermarked" />
                        </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
