using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace EDI.WEB.UserControls
{
    public partial class DateEditor : System.Web.UI.UserControl
    {

        private string _Format;
        public event EventHandler<EventArgs> DateChanged;

        /// <summary>
        /// String value for Date TextBox
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public string DateText
        {
            get { return this.txtDate.Text; }
            set { this.txtDate.Text = value; }
        }

        /// <summary>
        /// 验证组
        /// </summary>
        /// <remarks></remarks>
        public string ValidationGroup
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
                this.txtDate.ValidationGroup = value;
                this.reqvDate.ValidationGroup = value;
                this.rexqvDate.ValidationGroup = value;
            }
        }
        /// <summary>
        /// 日期格式化字符串
        /// </summary>
        public string FormatText
        {
            get
            {
                string str = (string)this.ViewState["FormatText"];

                if (str == null || str.Length == 0)
                {
                    this.ViewState["FormatText"] = "yyyy-MM-dd";
                }
                return (string)this.ViewState["FormatText"];
            }
            set
            {
                this.ViewState["FormatText"] = value;
                this.aceDate.Format = value;
                this.tbwe.WatermarkText = value;

            }
        }

        public string TextBoxClientID
        {
            get { return this.txtDate.ClientID; }
        }

        public TextBox TextBox
        {
            get { return this.txtDate; }
        }



        public string RequiredFieldValidatorClientID
        {
            get { return this.reqvDate.ClientID; }
        }

        public RequiredFieldValidator RequiredFieldValidator
        {
            get { return this.reqvDate; }
        }

        public RegularExpressionValidator RegularExpressionValidator
        {
            get { return this.rexqvDate; }
        }



        public bool Enabled
        {
            get { return txtDate.Enabled; }
            set
            {
                if (value)
                {
                    this.txtDate.Enabled = true;
                    this.aceDate.Enabled = true;
                    this.imgDate.ImageUrl = "~/Images/Blue/Calendar.png";
                }
                else
                {
                    this.txtDate.Enabled = false;
                    this.aceDate.Enabled = false;
                    this.imgDate.ImageUrl = "~/Images/Main/DisableCalendar.gif";
                }
            }
        }

        private bool _IsAutoPostBack;
        public bool IsAutoPostBack
        {
            get { return _IsAutoPostBack; }
            set { _IsAutoPostBack = value; }
        }


        /// <summary>
        ///是否必须
        /// </summary>
        /// <value>true或者false</value>
        /// <returns>RequiredFieldValidator的Enabled值</returns>
        /// <remarks></remarks>
        public bool IsRequiredField
        {

            get { return this.reqvDate.Enabled; }

            set { this.reqvDate.Enabled = value; }
        }

        private string _Title;
        public string Title
        {
            get { return _Title; }
            set { _Title = value; }
        }

        private string _autoComplete;
        public string AutoComplete
        {
            get { return _autoComplete; }
            set { _autoComplete = value; }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <remarks></remarks>
        public void InitDateRange()
        {
            this.txtDate.AutoPostBack = this.IsAutoPostBack;

            if (this.ValidationGroup != null)
            {
                this.reqvDate.ValidationGroup = this.ValidationGroup;
                this.rexqvDate.ValidationGroup = this.ValidationGroup;
            }

            if (this.Title != null)
            {
                this.reqvDate.ErrorMessage = "请填写。";
                this.rexqvDate.ErrorMessage = string.Format("{0}的格式必须是{1}。", this.Title, this.FormatText);
            }
            else
            {
                this.reqvDate.ErrorMessage = "请填写。";
                this.rexqvDate.ErrorMessage = "请按日期格式输入。(日期格式为：" + this.FormatText + ")";
            }

            if (this.AutoComplete != null && this.AutoComplete.ToUpper() == "OFF")
            {
                this.txtDate.Attributes.Add("autoComplete", "off");
            }
        }

        private void Page_Load(object sender, System.EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                InitDateRange();
            }
        }

        public Nullable<DateTime> Date
        {
            get { return ConvertDateStringToDateTime(txtDate.Text); }
        }

        /// <summary>
        /// 转换字符串为日期
        /// </summary>
        /// <param name="value">
        /// </param>
        /// <returns>
        /// 可空的日期类型
        /// </returns>
        /// <remarks>
        /// 如果输入的值不是有效的日期类型，则返回空
        /// 输入值为空，则返回空
        /// </remarks>
        private Nullable<DateTime> ConvertDateStringToDateTime(string value)
        {
            if (value != null && value.Length > 0)
            {
                DateTime tempDate = default(DateTime);
                //if (DateTime.TryParseExact(value, "yyyy-MM-dd", new System.Globalization.CultureInfo("zh-CN"), System.Globalization.DateTimeStyles.None, out tempDate))
                //{
                //    return tempDate;
                //}
                if(DateTime.TryParse(value,new System.Globalization.CultureInfo("zh-CN"),System.Globalization.DateTimeStyles.None,out tempDate))
                {
                    return tempDate;
                }
            }
            return null;
        }

        private void txtDate_TextChanged(object sender, System.EventArgs e)
        {
            if (DateChanged != null)
            {
                DateChanged(sender, e);
            }
        }


    }
}