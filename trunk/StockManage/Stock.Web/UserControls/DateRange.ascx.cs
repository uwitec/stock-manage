using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace EDI.WEB.UserControls
{
    public partial class DateRange : System.Web.UI.UserControl
    {

        private string _Height;
        public string Height
        {
            get
            {
                if (string.IsNullOrEmpty(_Height))
                {
                    _Height = "18";
                }
                return _Height;
            }
            set
            {
                if (value != null)
                {
                    _Height = value.Trim();
                }
            }
        }

        private string _Width;
        public string Width
        {
            get
            {
                if (string.IsNullOrEmpty(_Width))
                {
                    _Width = "auto";
                }
                return _Width;
            }
            set
            {
                if (value != null)
                {
                    _Width = value.Trim();
                }
            }
        }

        private string _validationGroup;
        public string ValidationGroup
        {
            get { return _validationGroup; }
            set { _validationGroup = value; }
        }

        private string _title;
        public string Title
        {
            get { return _title; }
            set { _title = value; }
        }

        private bool _IsRequiredField;
        /// <summary>
        /// 是否必须
        /// </summary>
        /// <value>true或者false</value>
        /// <returns>RequiredFieldValidator Enabled Status</returns>
        /// <remarks></remarks>
        public bool IsRequiredField
        {
            get { return _IsRequiredField; }
            set { _IsRequiredField = value; }
        }

        private void Page_Load(object sender, System.EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                InitDateRange();
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <remarks></remarks>

        public void InitDateRange()
        {
            if (!string.IsNullOrEmpty(this.ValidationGroup))
            {
                this.rexpvDateFrom.ValidationGroup = this.ValidationGroup;
                this.rexpvDateTo.ValidationGroup = this.ValidationGroup;

                this.reqvDateForm.ValidationGroup = this.ValidationGroup;
                this.reqvDateTo.ValidationGroup = this.ValidationGroup;
                this.vsMessage.ValidationGroup = this.ValidationGroup;
            }

            if (!string.IsNullOrEmpty(this.Title))
            {
                this.rexpvDateFrom.ErrorMessage = string.Format(@"{0}的开始日期格式必须是 yyyy-MM-dd。", this.Title);
                this.rexpvDateTo.ErrorMessage = string.Format(@"{0}的结束日期格式必须是 yyyy-MM-dd。", this.Title);

                this.reqvDateForm.ErrorMessage = string.Format("{0}的格式必须是yyyy-MM-dd。", this.Title);
                this.reqvDateTo.ErrorMessage = string.Format("{0}的格式必须是yyyy-MM-dd。", this.Title);
            }
            else
            {
                this.rexpvDateFrom.ErrorMessage = @"请按日期格式输入。(日期格式为：yyyy-MM-dd)";
                this.rexpvDateTo.ErrorMessage = @"请按日期格式输入。(日期格式为：yyyy-MM-dd)";

                this.reqvDateForm.ErrorMessage = "请填写。";
                this.reqvDateTo.ErrorMessage = "请填写。";
            }

            this.reqvDateForm.Enabled = this.IsRequiredField;
            this.reqvDateTo.Enabled = this.IsRequiredField;

        }

        /// <summary>
        /// 开始日期的字符串值
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public string FromDateText
        {
            get { return txtDateFrom.Text.Trim(); }
            set { txtDateFrom.Text = value; }
        }


        /// <summary>
        /// 结束日期的字符串值
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public string ToDateText
        {
            get { return txtDateTo.Text.Trim(); }
            set { txtDateTo.Text = value; }
        }

        /// <summary>
        /// 起始日期
        /// </summary>
        public Nullable<DateTime> FromDate
        {
            get { return ConvertDateStringToDateTime(this.FromDateText); }
        }

        /// <summary>
        /// 结束日期
        /// </summary>
        public Nullable<DateTime> ToDate
        {
            get { return ConvertDateStringToDateTime(this.ToDateText); }
        }

        private Nullable<DateTime> ConvertDateStringToDateTime(string value)
        {
            if (value.Length > 0)
            {
                DateTime tempDate = default(DateTime);
                if (DateTime.TryParseExact(value, "yyyy-MM-dd", new System.Globalization.CultureInfo("zh-CN"), System.Globalization.DateTimeStyles.None, out tempDate))
                {
                    return tempDate;
                }
            }
            return null;
        }

        public string NowDate
        {
            get
            {
                return DateTime.Now.ToString("yyyy-MM-dd");
            }
        }

    }
}