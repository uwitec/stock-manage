using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace EDI.WEB.Base
{
    public class TextChangedArgs : EventArgs
    {
        //数据行
        public DataRow _dtRow;
        public DataRow DtRow
        {
            get
            {
                return _dtRow;
            }
            set
            {
                _dtRow = value;
            }
        }

        //是否成功获取数据行
        public bool _isSuccess;
        public bool IsSucess
        {
            get
            {
                return _isSuccess;
            }
            set
            {
                _isSuccess = value;
            }
        }
    }
}


