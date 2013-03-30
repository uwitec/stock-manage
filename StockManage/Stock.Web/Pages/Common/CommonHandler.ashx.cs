using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace EDI.Web.Pages.Common
{
    /// <summary>
    ///CommonHandler的摘要说明：一般性的后台业务处理。
    /// </summary>
    public class CommonHandler : IHttpHandler, IRequiresSessionState
    {
        public string method { get; set; }
        public void ProcessRequest(HttpContext context)
        {
            if (context.Request.QueryString.AllKeys.Contains("Method"))
            {
                method = context.Request.QueryString["Method"].Trim();
            }
            //清除Session
            if (method.Trim().ToLower() == "clearsession")
            {
                context.Session.Clear();
            }
           
        }

     

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}
