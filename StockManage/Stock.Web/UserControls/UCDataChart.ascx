<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="UCDataChart.ascx.cs" Inherits="EDI.Web.UserControls.UCDataChart" %>
<table cellpadding="0" cellspacing="0" border="0">
    <tr>
        <td>
            <asp:UpdatePanel ID="upp_chart" runat="server" UpdateMode="Conditional">
                <ContentTemplate>
                    <trirand:JQChart runat="server" ID="DataChart">
                        <Legend Layout="Vertical" Align="Right" VerticalAlign="Top" X="100" Y="100" Floating="true"
                            BorderWidth="1" BackgroundColor="#FFFFFF" Shadow="true" />
                    </trirand:JQChart>
                </ContentTemplate>
            </asp:UpdatePanel>
        </td>
    </tr>
</table>
