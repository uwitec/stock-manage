using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;

namespace EDI.Web.Base
{
    /// <summary>
    /// 创建员：Paul
    /// 创建日期：2011-06-13 19:51:40
    /// 修改员：【Paul】
    /// 修改日期：【2011-06-13 19:51:40】
    /// 修改内容：【新增】
    /// BaseUserControl说明：用户自定义控件的基类。
    /// </summary>
    public class BaseUserControl : UserControl
    {
        private bool _Enabled;
        /// <summary>
        /// 控件是否可用。用户可进行重写。
        /// </summary>
        public virtual bool Enabled
        {
            get { return _Enabled; }
            set { _Enabled = value; }
        }
    }
}
