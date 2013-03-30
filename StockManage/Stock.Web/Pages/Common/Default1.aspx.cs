using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using EDI.Web.Base;
using System.Data;

namespace EDI.Web
{
    public partial class _Default1 : BasePage
    {/*
        private void Page_Load(object sender, EventArgs e)
	    {
            Ajax.Utility.RegisterTypeForAjax(typeof(_Default));
	    }

        public const string Query_V_USERPAGES = "Security_GetUserPages";

        //[Ajax.AjaxMethod(Ajax.HttpSessionStateRequirement.Read)]
        [Ajax.AjaxMethod()]
        public static string GetStr()
        {
            string menuSTR = string.Empty;
            menuSTR += "{ \"menus\": [";

            string user = HttpContext.Current.Session["LogonUser"].ToString() == String.Empty ? "" : HttpContext.Current.Session["LogonUser"].ToString();
            EDI.Web.QuerySVC.QueryServiceClient qry = new EDI.Web.QuerySVC.QueryServiceClient();
            DataTable dt = qry.SearchData(Query_V_USERPAGES, "LOGINNAME='" + user + "'");

            if (dt.Rows.Count > 0)
            {
                //DataView dv = dt.DefaultView;
                //dv.RowFilter = " PARENT_ID IS NULL ";
                //dv.Sort = " SORTINDEX ASC";
                DataRow[] drs = dt.Select(" PARENT_ID IS NULL and ISMENU='1'", " SORTINDEX ASC");
                if (drs != null && drs.Length > 0)
                {
                    //"menuid": "1", "icon": "icon-sys", "menuname": "报文管理",
                    //"menus": [
                    //          { "menuid": "11", "menuname": "报文上传1", "icon": "icon-nav", "url": "../Upload/testupload.aspx" }
                    //        , { "menuid": "12", "menuname": "报文上传2", "icon": "icon-nav", "url": "../Upload/UploadFileMgt.aspx" }
                    ////						               , { "menuid": "13", "menuname": "布局测试-内容页", "icon": "icon-nav", "url": "../Export/Test1.aspx" }
                    //         ]
                    foreach (DataRow dr in drs)
                    {
                        menuSTR += "{\"menuid\": " + dr["SORTINDEX"] + "\", \"icon\": \"icon-sys\", \"menuname\": \"" + dr["TITLE"] + "\",";
                        menuSTR += "\"menus\": [";

                        DataRow[] ddrs = dt.Select("PARENT_ID='" + dr["PK_ID"] + "'", " SORTINDEX ASC");
                        if (ddrs != null && ddrs.Length > 0)
                        {
                            foreach (DataRow drr in ddrs)
                            {
                                menuSTR += "{ \"menuid\": \"" + drr["SORTINDEX"] + "\", \"menuname\": \"" + drr["TITLE"] + "\", \"icon\": \"icon-nav\", \"url\": \"" + drr["PAGEURL"] + "\" },";
                            }
                        }

                        menuSTR += "]},";
                    }
                }

            }
            menuSTR += "]};";

            return menuSTR;

        }*/
    }
}
