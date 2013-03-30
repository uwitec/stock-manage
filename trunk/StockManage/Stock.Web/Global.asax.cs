using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;

namespace EDI.Web
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {

        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {
            try
            {
                Exception innerEx = Server.GetLastError().InnerException;
                if (innerEx != null)
                {
                    Utility.FileService.LoggerService.Error(innerEx.InnerException.Message + Environment.NewLine + innerEx.InnerException.StackTrace);
                }
                else
                {
                    Utility.FileService.LoggerService.Error(Server.GetLastError().Message + Environment.NewLine + Server.GetLastError().StackTrace);
                }
            }
            catch (Exception exc)
            {
                Utility.FileService.LoggerService.Error(exc.Message + Environment.NewLine +exc.StackTrace);
            }

        }

        protected void Session_End(object sender, EventArgs e)
        {
            Session.Clear();
        }

        protected void Application_End(object sender, EventArgs e)
        {
            Session.Clear();
        }
    }
}