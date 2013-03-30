using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EDI.Web.Base
{   /// <summary>
    /// 用户登陆信息
    /// 创建员：Paul
    /// 创建日期：2011-07-10
    /// 修改员：【Paul】
    /// 修改日期：【2011-07-10】
    /// 修改内容：【新增】
    /// </summary>
    [Serializable()]
    public class AuthenUserMD
    {
        public AuthenUserMD()
        {
        }

        public AuthenUserMD(System.Data.DataRow drUser)
        {
            SetUserInfoByDataRow(drUser);
        }

        public void SetUserInfoByDataRow(System.Data.DataRow drUser)
        {
            try
            {
                PKID = drUser["PK_ID"].ToString();
                CNAME = drUser["CNAME"].ToString();
                ENAME = drUser["ENAME"].ToString();
                EMAIL = drUser["EMAIL"].ToString();
                FAX = drUser["FAX"].ToString();
                IS_LOCK = drUser["IS_LOCK"].ToString().Trim() == "0" ? false : true;
                IS_USE = drUser["IS_USE"].ToString().Trim() == "0" ? false : true;
                LOGINNAME = drUser["LOGINNAME"].ToString();
                MOBILE = drUser["MOBILE"].ToString();
                ORGID = drUser["ORGID"].ToString();
                ORGCNAME = drUser["ORGCNAME"].ToString();
                ORGENAME = drUser["ORGENAME"].ToString();
                QQ = drUser["QQ"].ToString();
                REMARK = drUser["REMARK"].ToString();
                TEL = drUser["TEL"].ToString();
                WORKS = drUser["WORKS"].ToString();
                ORG_CODE = drUser["CODE"].ToString();
                PASSWORD = drUser["PASSWORD"].ToString();
            }
            catch
            {
                throw new Exception("用户类赋值过程中发生错误.");
            }
        }

        #region "私有变量"
        private string _pkid;
        private string _loginname;
        private string _cname;
        private string _ename;
        private string _works;
        private string _mobile;
        private string _tel;
        private string _email;
        private string _fax;
        private string _qq;
        private string _remark;
        private Nullable<bool> _is_use = true;
        private Nullable<bool> _is_lock = false;
        private string _orgCname;
        private string _orgEname;
        private string _orgID;
        private string _orgCode;
        private string _password;


        #endregion

        #region 公有属性
        /// <summary>
        /// 用户主键
        /// </summary>
        public string PKID
        {
            set { _pkid = value; }
            get { return _pkid; }
        }

        /// <summary>
        /// 公司中文名
        /// </summary>
        public string ORGID
        {
            set { _orgID = value; }
            get { return _orgID; }
        }

        /// <summary>
        /// 公司中文名
        /// </summary>
        public string ORGCNAME
        {
            set { _orgCname = value; }
            get { return _orgCname; }
        }
        /// <summary>
        /// 公司英文名
        /// </summary>
        public string ORGENAME
        {
            set { _orgEname = value; }
            get { return _orgEname; }
        }
        /// <summary>
        /// 用户登录名
        /// </summary>
        public string LOGINNAME
        {
            set { _loginname = value; }
            get { return _loginname; }
        }

        /// <summary>
        /// 中文名
        /// </summary>
        public string CNAME
        {
            set { _cname = value; }
            get { return _cname; }
        }
        /// <summary>
        /// 英文名
        /// </summary>
        public string ENAME
        {
            set { _ename = value; }
            get { return _ename; }
        }
        /// <summary>
        /// 工作
        /// </summary>
        public string WORKS
        {
            set { _works = value; }
            get { return _works; }
        }
        /// <summary>
        /// 移动电话
        /// </summary>
        public string MOBILE
        {
            set { _mobile = value; }
            get { return _mobile; }
        }
        /// <summary>
        /// 办公电话
        /// </summary>
        public string TEL
        {
            set { _tel = value; }
            get { return _tel; }
        }
        /// <summary>
        /// 电子邮箱
        /// </summary>
        public string EMAIL
        {
            set { _email = value; }
            get { return _email; }
        }
        /// <summary>
        /// 传真
        /// </summary>
        public string FAX
        {
            set { _fax = value; }
            get { return _fax; }
        }
        /// <summary>
        /// QQ
        /// </summary>
        public string QQ
        {
            set { _qq = value; }
            get { return _qq; }
        }
        /// <summary>
        /// 备注
        /// </summary>
        public string REMARK
        {
            set { _remark = value; }
            get { return _remark; }
        }
        /// <summary>
        /// 是否正在使用
        /// </summary>
        public Nullable<bool> IS_USE
        {
            set { _is_use = value; }
            get { return _is_use; }
        }
        /// <summary>
        /// 是否锁定
        /// </summary>
        public Nullable<bool> IS_LOCK
        {
            set { _is_lock = value; }
            get { return _is_lock; }
        }
        /// <summary>
        /// 公司代码
        /// </summary>
        public string ORG_CODE
        {
            set { _orgCode = value; }
            get { return _orgCode; }
        }

        /// <summary>
        /// 密码
        /// </summary>
        public string PASSWORD
        {
            set { _password = value; }
            get { return _password; }
        }


        #endregion Model

    }
}