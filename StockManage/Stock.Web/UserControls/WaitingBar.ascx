<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="WaitingBar.ascx.cs"
    Inherits="EDI.WEB.UserControls.WaitingBar" %>
<%@ Register Assembly="EDI.WEB" Namespace="EDI.WEB.UserControls" TagPrefix="cc1" %>

<script type="text/javascript">
    var prm = Sys.WebForms.PageRequestManager.getInstance();
    prm.add_initializeRequest(InitializeRequest);
    function InitializeRequest(sender, args) {
        if (prm.get_isInAsyncPostBack()) {
            args.set_cancel(true);
        }
    }

    function AbortPostBack() {
        if (prm.get_isInAsyncPostBack()) {
            prm.abortPostBack();
        }
    }
</script>

<asp:UpdateProgress ID="up" runat="server" DisplayAfter="500" DynamicLayout="false">
    <ProgressTemplate>
        <div id="divWaiting" runat="server" style="width: 298px; z-index: 100010;">
            <asp:Panel ID="PNL_header" runat="server" Style="cursor: pointer;">
                <div style="cursor: pointer; vertical-align: middle;" class="PanelHeader">
                    <div style="float: left; vertical-align: middle;">
                        <asp:Localize ID="Localize1" runat="server" Text="数据加载中, 请稍等..."></asp:Localize>
                    </div>
                </div>
            </asp:Panel>
            <asp:Panel ID="PNL_content" runat="server" Style="overflow: hidden; background-color: #E3F1F4;"
                CssClass="PanelBody">
                <div style="margin: 0px 7px 7px 7px;">
                    <table cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td align="center" valign="middle" style="text-align: center; height: 50px;">
                                <asp:Image ID="imgProgressBar" runat="server" ImageUrl="~/Images/Main/Waiting.gif" />
                                
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input id="btn_cancel" onclick="AbortPostBack()" type="button" value="取消" />
                            </td>
                        </tr>
                    </table>
                </div>
            </asp:Panel>
        </div>
    </ProgressTemplate>
</asp:UpdateProgress>
<ajaxToolkit:AlwaysVisibleControlExtender ID="avce" runat="server" TargetControlID="divWaiting"
    VerticalSide="Middle" HorizontalSide="Center" ScrollEffectDuration="2" Enabled="True" />
