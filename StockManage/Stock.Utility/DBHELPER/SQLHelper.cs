using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.SqlClient;
using System.Data;
using System.Xml;

namespace Stock.Utility
{
    public class SQLHelper
    {
        private string connStr;
        private SqlConnection m_conn;
        public SQLHelper()
        {
            try
            {
                connStr = System.Configuration.ConfigurationSettings.AppSettings["Connstr"];
                m_conn = new SqlConnection(connStr);
                openConnection();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //private string getConnstr()
        //{
        //    XMLService xmlService = new XMLService(System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "appConfig.xml"));
        //    string connStr = xmlService.getElementValue("root/sql/connstr");
        //    return connStr;
            
        //}

        private void openConnection()
        {
            if (m_conn.State == ConnectionState.Closed)
                m_conn.Open();
        }

        public DataTable GetDataTable(string sql)
        {
            DataTable dt = new DataTable();
            SqlDataAdapter ada = new SqlDataAdapter(sql, m_conn);
            ada.Fill(dt);
            return dt;
        }

        public int ExecuteNonQuery(string sql)
        {
            try
            {
                int affectRowCount = 0;
                // OracleCommand oc = new OracleCommand();
                SqlCommand oc = new SqlCommand();
                oc.Connection = m_conn;
                oc.CommandType = CommandType.Text;

                oc.CommandText = sql;
                //oc.CommandText = "delete from T_CS_ECDBOOKING where PK_ID in (45)";
                affectRowCount = oc.ExecuteNonQuery();

                return affectRowCount;
            }
            catch (Exception excp)
            {
                throw excp;
            }
        }

        public DataTable UpdateChangedTable(DataTable dt, string tableName)
        {
            try
            {
                string sql = "SELECT * FROM " + tableName + " WHERE 1=0";
                SqlDataAdapter oda = new SqlDataAdapter(sql, m_conn);
                //oda.MissingSchemaAction = MissingSchemaAction.AddWithKey;
                SqlCommandBuilder ocb = new SqlCommandBuilder(oda);
                int affectRowsCount = oda.Update(dt);
                return dt;
            }
            catch (Exception excp)
            {
                throw excp;
            }
        }
    }
}
