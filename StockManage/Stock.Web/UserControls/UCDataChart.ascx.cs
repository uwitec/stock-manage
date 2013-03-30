using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using Trirand.Web.UI.WebControls;

namespace EDI.Web.UserControls
{
    public partial class UCDataChart : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                InitColumnsChart();
            }
        }

        #region "变量定义"
        /// <summary>
        ///  绑定的数据源
        /// </summary>
        private DataTable m_mDataSource;
        public DataTable DataSource
        {
            get { return m_mDataSource; }
            set { m_mDataSource = value; }
        }

        /// <summary>
        /// X轴列名
        /// </summary>
        private string m_mXAxis;
        public string XAxis
        {
            get { return m_mXAxis; }
            set { m_mXAxis = value; }
        }

        /// <summary>
        /// X轴显示名称
        /// </summary>
        private string m_mXAxisText;
        public string XAxisText
        {
            get { return m_mXAxisText; }
            set { m_mXAxisText = value; }
        }

        /// <summary>
        /// Y轴列名
        /// </summary>
        private string m_mYAxis;
        public string YAxis
        {
            get { return m_mYAxis; }
            set { m_mYAxis = value; }
        }

        /// <summary>
        /// Y轴显示名称
        /// </summary>
        private string m_mYAxisText;
        public string YAxisTest
        {
            get { return m_mYAxisText; }
            set { m_mYAxisText = value; }
        }

        /// <summary>
        /// 欲显示数据列名
        /// </summary>
        private string m_mChartPoint;
        public string CharPoint
        {
            get { return m_mChartPoint; }
            set { m_mChartPoint = value; }
        }

        /// <summary>
        /// 图表类型
        /// </summary>
        private ChartType m_mChartStyle;
        public ChartType ChartStyle
        {
            get { return m_mChartStyle; }
            set { m_mChartStyle = value; }
        }

        /// <summary>
        /// 图表标题
        /// </summary>
        private string m_mChartTitle;
        public string ChartTitle
        {
            get { return m_mChartTitle; }
            set { m_mChartTitle = value; }
        }

        /// <summary>
        /// 图表宽度
        /// </summary>
        private double m_mWidth;
        public double Width
        {
            get { return m_mWidth; }
            set { m_mWidth = value; }
        }

        /// <summary>
        /// 图表高度
        /// </summary>
        private double m_mHeight;
        public double Height
        {
            get { return m_mHeight; }
            set { m_mHeight = value; }
        }
        #endregion

        protected void InitColumnsChart()
        {
            if (m_mChartStyle.ToString().Trim().Length == 0)
                return;
            else
            {
                if (m_mDataSource == null || m_mDataSource.Rows.Count == 0)
                {
                    return;
                }
                //移除之前设置
                DataChart.XAxis.RemoveRange(0, DataChart.XAxis.Count);
                DataChart.YAxis.RemoveRange(0, DataChart.YAxis.Count);
                DataChart.Series.RemoveRange(0, DataChart.Series.Count);
                //图表设置
                ChartXAxisSettings cxs = new ChartXAxisSettings();//实例化X轴
                ChartSeriesSettings css = new ChartSeriesSettings();//实例化数据集
                css.DataLabels.Enabled = true;
                css.DataLabels.Rotation = -90;
                css.DataLabels.Color = "#FFFFFF";
                css.DataLabels.Align = ChartHorizontalAlign.Right;
                css.DataLabels.Formatter = "formatSeriesLabel";//设置鼠标放在图形时显示的数据
                css.DataLabels.X = -3;
                css.DataLabels.Y = 10;
                switch (m_mChartStyle)
                {
                    case ChartType.Column: { css.Type = ChartType.Column; } break;
                    case ChartType.Pie: { css.Type = ChartType.Pie; } break;
                    default:
                        break;
                }
                foreach (DataRow dr in m_mDataSource.Rows)
                {

                    AxisCategory ac = new AxisCategory();
                    ac.Text = dr[m_mXAxis].ToString();
                    cxs.Categories.Add(ac);//添加X轴数据
                    ChartPoint cp = new ChartPoint();
                    cp.Y = Convert.ToDouble(dr[m_mChartPoint].ToString());
                    css.Data.Add(cp);//添加X轴数据对应的Y轴数据
                }

                ChartYAxisSettings cys = new ChartYAxisSettings();
                cxs.Title.Text = m_mXAxisText;
                cys.Title.Text = m_mYAxisText;
                DataChart.Title.Text = "各公司报文流量统计表";
                cys.Min = 0;
                DataChart.Legend.Enabled = false;//不显示图例
                DataChart.YAxis.Add(cys);
                DataChart.Series.Add(css);
                DataChart.XAxis.Add(cxs);
                upp_chart.Update();
            }
        }

        public void Refresh()
        {
            InitColumnsChart();
        }
    }
}