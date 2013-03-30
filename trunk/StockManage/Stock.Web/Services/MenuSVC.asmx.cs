using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using EDI.Web.Base;
using EDI.BLL.Security;
using System.Data;
using System.Text;
using System.Web.Script.Services;

namespace EDI.Web.Services
{
    /// <summary>
    /// MenuSVC 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
    [System.Web.Script.Services.ScriptService]
    public class MenuSVC : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = true)]
        public string GetMenus()
        {
           
            AuthenUserMD logonUser = null;
            if (Session["LOGINUSER"] != null)
            {
                logonUser = (AuthenUserMD)Session["LOGINUSER"];
            }
            if (logonUser != null)
            {
                string loginName = logonUser.LOGINNAME;
                SecurityBLL secBLL = new SecurityBLL();
                DataTable dt = secBLL.GetUserMenus(loginName);
                return BuildMenuJasonString(dt);
            }
            else
            {
                return string.Empty;
            }


        }

        private string BuildMenuJasonString(DataTable dtMenus)
        {
            StringBuilder menuBuilder = new StringBuilder();
            string formater = string.Empty;
            menuBuilder.Append(@"{ 'menus': [");
            //分两级菜单，第一级为模块名，第二级为页面菜单
            //1. 首先获取模块名,根据排序字段进行升序排序
            DataRow[] drRoots = dtMenus.Select("PARENT_ID is NULL", "SORTINDEX ASC");
            //2. 遍历模块，获取模块下面的页面菜单。并将页面菜单进行升序排序
            int rootIndex = 0;
            foreach (DataRow dr in drRoots)
            {
                rootIndex++;
                //模块ID
                string rootID = dr["SORTINDEX"].ToString();
                //模块图片路径，如果未设置，则设置默认的图片
                string rootIconUrl = dr["ICONURL"].ToString().Trim().Length == 0 ? "icon-sys" : dr["ICONURL"].ToString().Trim();
                //模块名
                string rootMenuName = dr["TITLE"].ToString();

                formater = @"{  'menuid': '" + rootID + "', 'icon': '" + rootIconUrl + "', 'menuname': '" + rootMenuName + "', 'menus': [";
                menuBuilder.Append(formater);

                string parentID = dr["PK_ID"].ToString();
                DataRow[] drMenus = dtMenus.Select("PARENT_ID='" + parentID + "'", "SORTINDEX ASC");

                int menuIndex = 0;
                foreach (DataRow drMenu in drMenus)
                {
                    menuIndex++;
                    //菜单ID
                    string menuID = drMenu["SORTINDEX"].ToString();
                    //菜单图片路径，如果未设置，则设置默认的图片
                    string menuIconUrl = drMenu["ICONURL"].ToString().Trim().Length == 0 ? "icon-nav" : drMenu["ICONURL"].ToString().Trim();
                    //菜单名
                    string menuName = drMenu["TITLE"].ToString();
                    //菜单对应页面路径
                    string menuPageURL = drMenu["PAGEURL"].ToString().ToLower().Replace("~/pages","..");
                    if (menuIndex < drMenus.Length)
                        formater = @"{  'menuid': '" + menuID + "', 'icon': '" + menuIconUrl + "', 'menuname': '" + menuName + "', 'url': '" + menuPageURL + "'},";
                    else
                        formater = @"{  'menuid': '" + menuID + "', 'icon': '" + menuIconUrl + "', 'menuname': '" + menuName + "', 'url': '" + menuPageURL + "'}]}";
                    menuBuilder.Append(formater);
                }
                if (rootIndex < drRoots.Length)
                    menuBuilder.Append(",");
                else
                    menuBuilder.Append("]}");
            }
            return menuBuilder.ToString();

        }
    }
}
