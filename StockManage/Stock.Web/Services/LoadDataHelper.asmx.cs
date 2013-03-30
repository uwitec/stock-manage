using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Data;
using EDI.BLL.System;
using System.Runtime.Serialization.Json;
using System.Web.Script.Serialization;
namespace EDI.Web.Services
{
    /// <summary>
    /// LoadDataHelper 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
    [System.Web.Script.Services.ScriptService]
    public class LoadDataHelper : System.Web.Services.WebService
    {
        public LoadDataHelper()
        {

        }

        [WebMethod]
        public string GetRolePages(string roleID)
        {

            DataTable dt = (new SysRoleModuleBLL()).getModuRightbyRoleID(roleID);
            return ConventDataTableToJson.Serialize(dt);
        }

		[WebMethod]
		public string SaveRoleModule(string rid,string mids)
		{
			if(rid.Trim().Length>0)
			{
				 if((new SysRoleModuleBLL()).isCanDeleteRoleModule(rid))
                {
                    int delete = (new SysRoleModuleBLL()).DeleteRoleModulebyRId(rid);
                }
				
				string[] midArray = mids.Split(',');
				
				int j = 0;
				for (int i = 0; i < midArray.Length; i++)
				{
					j+=(new SysRoleModuleBLL()).InsertRoleModule(rid, midArray[i]);
				}

				if (j > 0)
				{
					return "success";
				}
				else
				{
					return "error";
				}
				
			}
			else
			{
				return "error";
			}
			
		}

        public class ConventDataTableToJson
        {
            /// <summary>
            /// 序列化方法（带分页）
            /// </summary>
            /// <param name="dt"></param>
            /// <returns></returns>
            public static string Serialize(DataTable dt)
            {
                List<Dictionary<string, object>> list = new List<Dictionary<string, object>>();
                foreach (DataRow dr in dt.Rows)
                {
                    Dictionary<string, object> result = new Dictionary<string, object>();
                    foreach (DataColumn dc in dt.Columns)
                    {
                        result.Add(dc.ColumnName, dr[dc].ToString());
                    }
                    list.Add(result);
                }
                int count = 0;
                try
                {
                    count = Convert.ToInt32(dt.TableName);
                }
                catch (System.Exception ex)
                {
                    count = dt.Rows.Count;
                }
                string strReturn = "";
                if (count == 0)
                {
                    strReturn = "{\"totalCount\":0,\"data\":[]}";
                }
                else
                {
                    strReturn = ConventToJson(list, count);
                }
                return strReturn;
            }

            /// <summary>
            /// 转换为JSON对象
            /// </summary>
            /// <returns></returns>
            public static string ConventToJson<T>(List<T> list, int count)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                string strJson = serializer.Serialize(list);
                strJson = strJson.Substring(1);
                strJson = strJson.Insert(0, "{\"totalCount\":" + count + ",\"data\":[");
                strJson += "}";

                return strJson;
            }

            /// <summary>
            /// 不需要分页
            /// </summary>
            /// <param name="dt"></param>
            /// <param name="flag">false</param>
            /// <returns></returns>
            public static string Serialize(DataTable dt, bool flag)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                List<Dictionary<string, object>> list = new List<Dictionary<string, object>>();
                foreach (DataRow dr in dt.Rows)
                {
                    Dictionary<string, object> result = new Dictionary<string, object>();
                    foreach (DataColumn dc in dt.Columns)
                    {
                        result.Add(dc.ColumnName, dr[dc].ToString());
                    }
                    list.Add(result);
                }
                return serializer.Serialize(list); ;
            }
        }


    }
}
