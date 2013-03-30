using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using EDI.Web.Base;
using System.Web.Security;
using Utility.FileService;
using System.Data;
using EDI.Web.SecuritySVC;
using EDI.BLL.Security;
using System.Web.UI.WebControls;
using StringService = Utility.StringService;


namespace EDI.Web.Base
{
    public class BasePage : Page
    {

        public BasePage()
        {
            this.PreLoad += new System.EventHandler(BaseOnPagePreLoad);
        }

        #region 登录判断、页面操作权限判断
        /// <summary>
        /// 用户登录后的记录的个人信息
        /// 个人信息存储在Session("LogonUser")
        /// </summary>
        public AuthenUserMD LogonUser
        {
            get
            {
                if (Session["LOGINUSER"] != null)
                {
                    return (AuthenUserMD)Session["LOGINUSER"];
                }
                return null;
            }
            protected set
            {
                Session["LOGINUSER"] = value;
            }
        }

        /// <summary>
        /// 检查请求用户是否登录，检查用户是否有操作权限
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected virtual void BaseOnPagePreLoad(object sender, EventArgs e)
        {
            CheckLogin();
            CheckPermission();
        }

        /// <summary>
        /// 检查请求用户是否已过登录，如未登录则跳转到登录页面
        /// </summary>
        protected void CheckLogin()
        {
            //Session["LOGINUSER"] = null;//用于测试
            if (LogonUser == null)
            {
                string pageUrl = Request.AppRelativeCurrentExecutionFilePath;

                if (string.Compare("~/Pages/Common/Default.aspx", pageUrl, true) != 0)
                {
                    Response.Redirect("~/Pages/Common/OverTime.htm");//子页面的session超时时，进入系统超时页面
                }
                else
                {
                    Response.Redirect("~/Pages/Common/Login.aspx");
                }
            }
        }

        /// <summary>
        ///检查用户是否有权限访问请求的页面
        /// 如果数据库中设置该页面的属性Skip=true,那么该页面始终都可以访问。
        /// </summary>
        /// <remarks></remarks>
        protected void CheckPermission()
        {
            string path = Request.AppRelativeCurrentExecutionFilePath;
            if (string.Compare("~/Pages/Common/Login.aspx", path, true) != 0 && string.Compare("~/Pages/Common/Default.aspx", path, true) != 0)
            {
                //通过WebService验证页面是否有权限访问。
                //SecuritySRVClient securityClient = new SecuritySRVClient();
                //this.LogonUser = new EDI.WEB.Base.AuthenUserMD();
                SecurityServiceClient securityClient = new SecurityServiceClient();
                bool canAccess = false;
                canAccess = securityClient.CheckCanAccessPage(LogonUser.LOGINNAME.ToString(), path);
                if (!canAccess)
                {
                    this.Alert("你无权访问该页面。如需访问，请联系系统管理员解决！");
                    //Server.Transfer("~/Pages/Common/Default.aspx", false);
                    Response.Close(); //TODO: 创建一个AccessDeny.aspx页面。
                }
            }
        }

        /// <summary>
        /// 初始化当前请求页面的功能权限
        /// </summary>
        protected void InitialUserFunction()
        {
            if (!IsPostBack)
            {
                string path = Request.AppRelativeCurrentExecutionFilePath;
                if (string.Compare("~/Pages/Common/Login.aspx", path, true) != 0 && string.Compare("~/Pages/Common/Default.aspx", path, true) != 0)
                {
                    //**add by zdh 
                    if (LogonUser == null)
                    {
                        Response.Redirect("~/Pages/Common/OverTime.htm");//子页面的session超时时，进入系统超时页面
                    }
                    //**end

                    //获取当前请求页面中，没有权限的功能清单
                    DataTable dtNoFunctions = new SecurityBLL().GetUserNoFunctions(this.LogonUser.LOGINNAME, path);
                    foreach (DataRow dr in dtNoFunctions.Rows)
                    {

                        string controlID = dr["CONTROL_ID"].ToString().Trim();
                        string controlType = dr["CATEGORY_TYPE"].ToString().Trim();
                        string propertyName = dr["PROPERTY_NAME"].ToString().Trim();
                        string propertyValue = dr["PROPERTY_VALUE"].ToString().Trim();
                        Control ctl = this.Controls[0].FindControl(controlID);
                        if (ctl != null)
                        {
                            switch (controlType)
                            {
                                case "0": //一般控件
                                    ctl.Visible = false;
                                    break;
                                case "1": //JQGrid
                                    Trirand.Web.UI.WebControls.JQGrid grid = ctl as Trirand.Web.UI.WebControls.JQGrid;
                                    if (propertyName.ToUpper() == "BUTTON") //JQGrid的按钮处理
                                    {
                                        if (grid.ToolBarSettings.AddText == propertyValue)
                                        {
                                            grid.ToolBarSettings.ShowAddButton = false;
                                        }
                                        else if (grid.ToolBarSettings.EditText == propertyValue)
                                        {
                                            grid.ToolBarSettings.ShowEditButton = false;
                                        }
                                        else if (grid.ToolBarSettings.DeleteText == propertyValue)
                                        {
                                            grid.ToolBarSettings.ShowDeleteButton = false;
                                        }
                                        else if (grid.ToolBarSettings.RefreshText == propertyValue)
                                        {
                                            grid.ToolBarSettings.ShowRefreshButton = false;
                                        }
                                        else if (grid.ToolBarSettings.SearchText == propertyValue)
                                        {
                                            grid.ToolBarSettings.ShowSearchButton = false;
                                        }
                                        else if (grid.ToolBarSettings.ViewText == propertyValue)
                                        {
                                            grid.ToolBarSettings.ShowViewRowDetailsButton = false;
                                        }
                                        else
                                        {
                                            foreach (Trirand.Web.UI.WebControls.JQGridToolBarButton cb in grid.ToolBarSettings.CustomButtons)
                                            {
                                                if (cb.Text == propertyValue)
                                                {
                                                    grid.ToolBarSettings.CustomButtons[0].Visible = false;
                                                    break;
                                                }
                                            }
                                        }
                                        //switch (propertyValue)
                                        //{
                                        //    case "添加":
                                        //        grid.ToolBarSettings.ShowAddButton = false;
                                        //        break;                                            
                                        //    case "编辑":
                                        //        grid.ToolBarSettings.ShowEditButton = false;
                                        //        break;
                                        //    case "删除":
                                        //        grid.ToolBarSettings.ShowDeleteButton = false;
                                        //        break;
                                        //    case "刷新":
                                        //        grid.ToolBarSettings.ShowRefreshButton = false;
                                        //        break;
                                        //    case "查找":
                                        //        grid.ToolBarSettings.ShowSearchButton = false;
                                        //        break;
                                        //    case "查看":
                                        //        grid.ToolBarSettings.ShowViewRowDetailsButton = false;
                                        //        break;
                                        //    case "行内-添加":
                                        //        grid.ToolBarSettings.ShowInlineAddButton = false;
                                        //        break;
                                        //    case "行内-取消":
                                        //        grid.ToolBarSettings.ShowInlineCancelButton = false;
                                        //        break;
                                        //    case "行内-删除":
                                        //        grid.ToolBarSettings.ShowInlineDeleteButton = false;
                                        //        break;
                                        //    case "行内-编辑":
                                        //        grid.ToolBarSettings.ShowInlineEditButton = false;
                                        //        break;
                                        //    default: //自定义按钮处理
                                        //        foreach (Trirand.Web.UI.WebControls.JQGridToolBarButton cb in grid.ToolBarSettings.CustomButtons)
                                        //        {
                                        //            if (cb.Text == propertyValue)
                                        //            {
                                        //                grid.ToolBarSettings.CustomButtons[0].Visible = false;
                                        //                break;
                                        //            }
                                        //        }
                                        //        break;
                                        //}
                                    }
                                    else if (propertyName.ToUpper() == "COLUMN")  //JQGrid的列
                                    {
                                        foreach (Trirand.Web.UI.WebControls.JQGridColumn col in grid.Columns)
                                        {
                                            if (col.HeaderText == propertyValue)
                                            {
                                                col.Visible = false;
                                                break;
                                            }
                                        }
                                    }
                                    break;
                                case "2": //GridView
                                    GridView grd = ctl as GridView;
                                    foreach (DataControlField col in grd.Columns)
                                    {
                                        if (col.HeaderText == propertyValue)
                                        {
                                            col.Visible = false;
                                            break;
                                        }
                                    }
                                    break;
                                case "3": //UserControl
                                    ctl.Visible = false;
                                    break;
                                default:
                                    break;
                            }

                        }
                    }

                }

            }


        }
        #endregion

        #region 页面事件
        /// <summary>
        /// 页面初始化时，使浏览器滚动条保持在同一位置
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Page_Init(object sender, System.EventArgs e)
        {
            this.MaintainScrollPositionOnPostBack = true;
            //初始化功能权限
            InitialUserFunction();
        }

        private void Page_PreRenderComplete(object sender, System.EventArgs e)
        {
            ClearBrowerHistory();
        }


        /// <summary>
        /// 页面错误处理。
        /// 记录错误日志
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Page_Error(object sender, System.EventArgs e)
        {
            try
            {

                Exception innerEx = Server.GetLastError().InnerException;
                if (innerEx != null)
                {

                    LoggerService.Error(innerEx.Message + Environment.NewLine + innerEx.StackTrace);
                }
                else
                {
                    LoggerService.Error(Server.GetLastError().Message + Environment.NewLine + Server.GetLastError().StackTrace);
                }
            }
            catch (Exception ex)
            {
                LoggerService.Error(ex.Message + Environment.NewLine + ex.StackTrace);
                throw;
            }
        }


        #endregion


        #region 公用方法

        ///// <summary>
        ///// 检查用户的Session是否存在，如果不存在，则转入登陆页面。
        ///// </summary>
        ///// <remarks></remarks>
        //public void CheckSession()
        //{
        //    string pageUrl = Request.AppRelativeCurrentExecutionFilePath;
        //    //登陆的页面不需要检查Session
        //    if (string.Compare(pageUrl, "~/Pages/Common/Login.aspx", true) != 0)
        //    {
        //        if (this.LogonUser == null)
        //        {
        //            if (this.Page.User.Identity.Name != null)
        //            {
        //                //获取用户的账号信息
        //                SecurityServiceClient SecurityClient = new SecurityServiceClient();
        //                DataTable dtUser = SecurityClient.GetUserAccount(this.Page.User.Identity.Name);
        //                AuthenUserMD authenMD = new AuthenUserMD();
        //                if (dtUser.Rows.Count > 0)
        //                {
        //                    BuildUserInfo(dtUser.Rows[0]);
        //                }
        //                if (authenMD != null)
        //                {
        //                    this.LogonUser = authenMD;
        //                }
        //                else
        //                {
        //                    Logout();
        //                }

        //            }
        //            else
        //            {
        //                Logout();
        //            }
        //        }

        //FormsAuthentication.SignOut()
        //Session.Clear()
        //Response.Redirect(FormsAuthentication.LoginUrl, True)
        //    }
        //}

        #endregion

        #region 私有方法

        ///// <summary>
        ///// 退出登录   只有一处入口，不用放在基类
        ///// </summary>
        //private void Logout()
        //{
        //    FormsAuthentication.SignOut();
        //    Session.Clear();
        //    Response.Redirect(FormsAuthentication.LoginUrl, true);
        //}

        /// <summary>
        /// 清除浏览器的历史信息，当用户点击前进和后退时，需要重新请求服务器。
        /// 目的是为了保证用户提交了数据后，点击后退，阻止重新进行数据提交的操作。
        /// </summary>
        /// <remarks>
        /// 一些前进和后退的异步操作将会失效。
        /// </remarks>
        private void ClearBrowerHistory()
        {
            Response.Buffer = true;
            Response.Expires = 0;
            Response.ExpiresAbsolute = DateTime.Now.AddDays(-1);
            Response.CacheControl = "no-cache";
        }

        #endregion

        #region 页面公共方法：执行JS脚本、弹消息窗
        /// <summary>
        /// 执行javascript
        /// </summary>
        /// <param name="page"></param>
        /// <param name="funStr"></param>
        public void RegisterScript(Page page, string funStr)
        {
            string strFun = "";
            string MsgFunId = StringService.PublicStrUtil.getGuid().ToString();
            strFun += "<script type=\"text/javascript\">" + Environment.NewLine;
            strFun += funStr + Environment.NewLine;
            strFun += "</script>" + Environment.NewLine;
            ScriptManager.RegisterStartupScript(page, this.GetType(), MsgFunId, strFun, false);
        }

        /// <summary>
        /// 弹出消息提示框
        /// </summary>
        /// <param name="message">消息内容</param>
        public void Alert(string message)
        {
            RegisterScript(this, "$.messager.alert('提示', '<div style=\"text-align:left;\"><br>" + message + "</div>', 'info');");
        }

        #endregion

    }
}
