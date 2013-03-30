<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ButtonTextBox.ascx.cs"
    Inherits="EDI.WEB.UserControls.ButtonTextBox" %>
<table cellpadding="0" cellspacing="0" border="0">
    <tr>
        <td>
            <table cellpadding="0" cellspacing="0" style="vertical-align: baseline">
                <tr style="text-align: left;">
                    <td>
                        <div style="border: solid 1px #99BBE8; padding: 1px 2px 1px 2px; background-color: White;">
                            <table cellpadding="0" cellspacing="0" border="0">
                                <tr style="text-align: left; border: solid 1px #99BBE8;">
                                    <td align="right">
                                        <asp:TextBox ID="TB_text" runat="server" Width="140px" AutoPostBack="true" MaxLength="10"
                                            Height="14px" BorderWidth="0px" OnTextChanged="txtDate_TextChanged"></asp:TextBox>
                                    </td>
                                    <td align="left">
                                 
                                                <asp:ImageButton ID="IMG_text" runat="server" Height="16px" Width="16px" ImageUrl="~/Images/Buttons/arrow-down-alt.png"
                                                    Style="vertical-align: middle; " OnClick="IMG_text_Click" />
                                    
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                    <td style="vertical-align: middle; width: 20px;">
                        <asp:RequiredFieldValidator ID="REQV_text" runat="server" Display="Dynamic" Text="*"
                            ControlToValidate="TB_text" ForeColor="red" Enabled="false"></asp:RequiredFieldValidator>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
