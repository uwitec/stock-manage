using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EDI.WEB;
using System.Web.UI.WebControls;
using System.Web.UI;
using System.Data;
using EDI.Web.Base;
using EDI.WEB.Base;
//using SAMS.WEB.QuerySRV;

namespace EDI.WEB.UserControls
{
    /// <summary>
    /// 创建员：Paul
    /// 创建日期：2011-06-13
    /// 修改员：【Paul】
    /// 修改日期：【2011-06-13】
    /// 修改内容：【新增】
    /// ButtonTextBox说明：带图标按钮的输入框。用户可点击图标按钮触发按钮事件。
    /// </summary> 
    public partial class ButtonTextBox : BaseUserControl
    {

        public event EventHandler<TextChangedArgs> TextChanged;
        public event EventHandler<EventArgs> Click;

        /// <summary>
        /// 输入框中的值
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public string Text
        {
            get { return this.TB_text.Text; }
            set { this.TB_text.Text = value; }
        }

        //弹出的ID
        public string PopupID
        {
            get { return PopupID; }
            set { PopupID = value; }
        }

        //初始化类
        private string m_HelpMDName;
        public string HelpMDName
        {
            get { return m_HelpMDName; }
            set { m_HelpMDName = value; }
        }

        //用于过滤查找的字段(名称)
        private string fieldToName;
        public string FieldToName
        {
            get { return fieldToName; }
            set { fieldToName = value; }
        }

        //用于过滤查找的字段(代码)
        private string fieldToCode;
        public string FieldToCode
        {
            get { return fieldToCode; }
            set { fieldToCode = value; }
        }

        //相关的数据库别名
        private string sqlName;
        public string SqlName
        {
            get { return sqlName; }
            set { sqlName = value; }
        }

        public string TextBoxClientID
        {
            get { return this.TB_text.ClientID; }
        }

        public TextBox TextBox
        {
            get { return this.TB_text; }
        }

        public ImageButton ImageButton
        {
            get { return this.IMG_text; }
        }

        /// <summary>
        /// 验证组设置
        /// </summary>
        /// <remarks></remarks>
        private string _validateGroup;
        public string ValidateGroup
        {
            get { return _validateGroup; }
            set { _validateGroup = value; }
        }


        /// <summary>
        /// 输入框显示的长度
        /// </summary>
        public Unit Width
        {
            get { return TB_text.Width; }
            set { TB_text.Width = value; }
        }

        public override bool Enabled
        {
            get { return TB_text.Enabled; }
            set
            {
                if (value)
                {
                    this.TB_text.Enabled = true;
                    if (EnableImageUrl!=null&&EnableImageUrl.Trim().Length > 0)
                        this.IMG_text.ImageUrl = EnableImageUrl;
                    else
                        this.IMG_text.ImageUrl = "~/Images/Buttons/arrow-down-alt.png";
                }
                else
                {
                    this.TB_text.Enabled = false;
                    if (DisabledImageUrl!=null&&DisabledImageUrl.Trim().Length > 0)
                        this.IMG_text.ImageUrl = DisabledImageUrl;
                    else
                        this.IMG_text.ImageUrl = "~/Images/Buttons/arrow-down-alt.png";
                }
            }
        }

        public string m_enableImageUrl;
        public string EnableImageUrl
        {
            get { return m_enableImageUrl; }
            set { m_enableImageUrl = value; }
        }

        public string m_disabledImageUrl;
        public string DisabledImageUrl
        {
            get { return m_disabledImageUrl; }
            set { m_disabledImageUrl = value; }
        }

        private bool _IsAutoPostBack;
        public bool IsAutoPostBack
        {
            get { return _IsAutoPostBack; }
            set { _IsAutoPostBack = value; }
        }

        private bool _readOnly;
        public bool ReadOnly
        {
            get { return _readOnly; }
            set { _readOnly = value; }
        }

        /// <summary>
        /// 是否必须输入
        /// </summary>
        /// <value>True 或 False</value>
        /// <returns></returns>
        /// <remarks></remarks>
        public bool IsRequiredField
        {

            get { return this.REQV_text.Enabled; }
            set { this.REQV_text.Enabled = value; }
        }

        private string _Title;
        public string Title
        {
            get { return _Title; }
            set { _Title = value; }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <remarks></remarks>
        public void InitDateRange()
        {
            this.TB_text.AutoPostBack = this.IsAutoPostBack;

            if (this.ValidateGroup != null)
            {
                this.REQV_text.ValidationGroup = this.ValidateGroup;
            }
        }

        protected void Page_Load(object sender, System.EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                InitDateRange();
            }
        }

        public void txtDate_TextChanged(object sender, EventArgs e)
        {
            
            DataRow dr = null;
            bool isValid = ValidateText(out dr);
            TextChangedArgs arg = new TextChangedArgs();
            arg.IsSucess = isValid;
            arg.DtRow = dr;
            if (TextChanged != null)
            {
                TextChanged(sender, arg);
            }
            
        }

        protected void IMG_text_Click(object sender, System.EventArgs e)
        {
            if (Click != null)
            {
                Click(sender, e);
            }
        }

        public ButtonTextBox()
        {
            Load += Page_Load;
        }

        /// <summary>
        /// 验证输入的数据是否和数据库中的数据一致。
        /// </summary>
        /// <param name="dr">返回和数据库一致的数据行</param>
        /// <returns></returns>
        private bool ValidateText(out DataRow dr)
        {
            if (this.Text.Trim().Length > 0)
            {
                //QuerySRV.QuerySRVSoapClient querySrv = new QuerySRVSoapClient();
                //DataTable dt = querySrv.SearchData(SqlName, FieldToName + "='" + Text + "' or " + FieldToCode + "='" + Text + "'");

                //if (dt != null && dt.Rows.Count > 0)
                //{
                //    DataRow datarow = dt.Rows[0];
                //    dr = datarow;
                //    return true;
                //}
            }

            dr = null;
            return false;
        }

    }

}