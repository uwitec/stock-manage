using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Web.Security;
using Utility.StringService;

using EDI.Web.Base;
using EDI.Web.SecuritySVC;


namespace EDI.Web
{
    public partial class Login : Page
    {
//        private DataTable dtLogin = null;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {

            }
        }

        private void Page_PreRenderComplete(object sender, System.EventArgs e)
        {
            Response.Expires = -1;
            Response.ExpiresAbsolute = DateTime.Now.AddDays(-1);
            Response.CacheControl = "no-cache";
        }

        protected void btnLogin_Click(object sender, EventArgs e)
        {
            string msg = string.Empty;
            if (this.txtName.Text.Trim() == "")
            {
                txtName.Focus();
                msg = "请输入用户名！" ;
                ClientScript.RegisterStartupScript(this.GetType(), "key1", "window.alert('" + msg + "');", true);
                return;
                 
            }
            if (this.txtPassword.Text.Trim().Length == 0)
            {
                txtPassword.Focus();
                msg = "请输入密码！";
                ClientScript.RegisterStartupScript(this.GetType(), "key2", "window.alert('" + msg + "');", true);
                return;
               
            }
            if (this.txtCheckCode.Text.Trim().Length == 0)
            {
                txtCheckCode.Focus();
                msg = "请输入验证码！";
                ClientScript.RegisterStartupScript(this.GetType(), "key3", "window.alert('" + msg + "');", true);
                return;
            }            
 
            //判断验证码是否匹配
            if (Session["Validate_Code"] != null && Session["Validate_Code"].ToString().Trim().ToLower() != txtCheckCode.Text.Trim().ToLower())
            {
                msg = "验证码不匹配，请重新输入!";
                ClientScript.RegisterStartupScript(this.GetType(), "key4", "window.alert('" + msg + "');", true);
                return;
            }

            string message = string.Empty;

            SecurityServiceClient securityClient = new SecurityServiceClient();
            //securityClient.ClientCredentials.UserName.UserName = this.txtName.Text.Trim();
            //securityClient.ClientCredentials.UserName.Password = this.txtPassword.Text.Trim();

            //DataTable dt = securityClient.GetUserAccount("paul");

            if (CheckLogin(out message))
            {
                FormsAuthentication.Authenticate(this.txtName.Text, this.txtPassword.Text);
                if (Request.QueryString.Get("ReturnUrl") != null)
                {
                    FormsAuthentication.RedirectFromLoginPage(this.txtName.Text, false);
                }
                else
                {
                    FormsAuthentication.SetAuthCookie(this.txtName.Text, false);
                    Response.Redirect("~/Pages/Common/Default.aspx");
                     
                    
                }

            }
            else
            {
                ClientScript.RegisterStartupScript(this.GetType(), "key5", "window.alert('" + message + "');", true);
            }
        }

        protected void btnReset_Click(object sender, EventArgs e)
        {
            txtName.Text = "";
            txtPassword.Text = "";
        }


        /// <summary>
        /// 登录权限有效性判断
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        private bool CheckLogin(out string message)
        {
            message = string.Empty;
            SecurityServiceClient SecurityClient = new SecurityServiceClient();
            DataTable dtUser = new DataTable();
            int flag = SecurityClient.CheckUserLogin(out dtUser, txtName.Text.ToString().Trim(), txtPassword.Text.Trim());
            if (flag == 1) //用户有效，但是被锁定
            {
                message = "该用户已被锁定，请联系管理员解决！";
                return false;

            }
            else if (flag == 3) //登录成功
            {

                AuthenUserMD LoginUser = new AuthenUserMD(dtUser.Rows[0]);
                Session.Add("LOGINUSER", LoginUser);
                Response.Cookies["ORGID"].Value = LoginUser.ORGID;
                Response.Cookies["ORG_CODE"].Value = LoginUser.ORG_CODE;
                Response.Cookies["ORGID"].Expires = DateTime.Now.AddDays(1);
                Response.Cookies["ORG_CODE"].Expires = DateTime.Now.AddDays(1);
                Response.Cookies["SelectedMsg"].Expires = DateTime.Now.AddDays(-1);
                return true;
            }
            else //登录失败
            {
                message = "用户名或密码不正确,请重新输入!";
                return false;
            }

        }

    }
}
