using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.ComponentModel;
using System.Drawing.Design;
namespace EDI.WEB.UserControls
{


    /// <summary>
    ///CustomLinkButton 的摘要说明
    /// </summary>
    [ToolboxData("<zph:CustomImageButton runat=\"server\"></zph:CustomImageButton>")]
    public class CustomImageButton : LinkButton
    {

        [DefaultValue(""), Editor("System.Web.UI.Design.ImageUrlEditor, System.Design, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a", typeof(UITypeEditor)), UrlProperty, Description("Image_ImageUrl"), Bindable(true), Category("Appearance")]
        public virtual string ImageUrl
        {
            get
            {
                string str = (string)this.ViewState["ImageUrl"];
                if (str != null)
                {
                    return str;
                }
                return string.Empty;
            }
            set
            {
                this.ViewState["ImageUrl"] = value;
            }
        }

        public override string ValidationGroup
        {
            get
            {
                string str = (string)this.ViewState["ValidationGroup"];
                if (str != null)
                {
                    return str;
                }
                return string.Empty;
            }
            set
            {
                
                this.ViewState["ValidationGroup"] = value;
            }
        }



        /// <summary>

        /// This image will override any background mentioned in CSS. Use this in case you want to use ASP.net (non-CSS) style URLs (like ~/images/add.png)

        /// </summary>

        public string BackgroundImageUrl { get; set; }
        protected override void Render(HtmlTextWriter writer)
        {
            if (DesignMode)
            {
                base.Render(writer);
                return;
            }
            
            base.Render(writer);
        }


        public override void RenderBeginTag(HtmlTextWriter writer)
        {
            if (this.Enabled)
            {
                base.CssClass = "c-l-btn c-l-btn-plain";
            }
            else
            {
                base.CssClass = "c-l-btn c-l-btn-disabled";
            }
            base.RenderBeginTag(writer);
             

        }

        protected override void RenderContents(HtmlTextWriter writer)
        {
            //if (!(base.Width.Value > 0))
            //    base.Width = 50;
 
            writer.Write("<span class=\"c-l-btn-left\">");
            writer.Write("<span class=\"c-l-btn-text icon-save\" style=\"padding-left: 20px; background:url('" + base.ResolveUrl(this.ImageUrl) + "') no-repeat;\">");
       base.RenderContents(writer);
        writer.Write("</span>");
            writer.Write("</span>");
 

        }
    }

}
