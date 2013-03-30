using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace EDI.WEB.Pages.Common
{
    public partial class Exit : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Response.Buffer = true; 
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1); 
            Response.Expires = 0; 
            Response.CacheControl = "no-cache";
            Response.AddHeader("Pragma", "No-Cache");

            if (Session!= null)
            {
                Session.Clear();
            }
            Response.Redirect("Login.aspx");
            //Response.Redirect("~/Pages/Common/Login.aspx");
            
        }
    }
}
