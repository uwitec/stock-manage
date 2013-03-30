using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace EDI.WEB.UserControls
{
    public partial class GridPager : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                PageIndex = 1;
                TotalRows = 0;
            }
        }

        /// <summary>
        /// 宽度
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks>可以是百分比;也可以是int类型，单位为px</remarks>
        public string Width
        {
            get
            {
                if (ViewState["GridPager_Width"] == null)
                {
                    ViewState["GridPager_Width"] = "100%";
                }
                return ViewState["GridPager_Width"].ToString();
            }
            set { ViewState["GridPager_Width"] = value; }
        }

        /// <summary>
        /// 每页的最大行数
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public int PageSize
        {
            get
            {
                return Convert.ToInt32(this.ddlPageCount.SelectedValue);
            }
        }

        /// <summary>
        /// 页数
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks>最小为1</remarks>
        public int PageIndex
        {
            get
            {
                if (ViewState["GridPager_PageIndex"] == null)
                {
                    ViewState["GridPager_PageIndex"] = 1;
                }
                return Convert.ToInt32(ViewState["GridPager_PageIndex"]);
            }
            set
            {
                if (value <= 0)
                {
                    value = 1;
                }
                else if (value > TotalPage)
                {
                    value = TotalPage;
                }


                ibtnNext.Enabled = value < TotalPage;
                ibtnLast.Enabled = value < TotalPage;

                ibtnPrev.Enabled = value > 1;
                ibtnFirst.Enabled = value > 1;

                ViewState["GridPager_PageIndex"] = value;
                lblCurPage.Text = value.ToString();
            }
        }

        /// <summary>
        /// 当前页的起始行
        /// </summary>
        /// <returns></returns>
        /// <remarks></remarks>
        public int StartRow
        {
            get { return (PageIndex - 1) * PageSize + 1; }
        }


        /// <summary>
        /// 当前页的结束行
        /// </summary>
        /// <returns></returns>
        /// <remarks></remarks>
        public int EndRow
        {
            get
            {
                if (PageIndex == TotalPage)
                {
                    return TotalRows - 1;
                }
                return StartRow + PageSize - 1;
            }
        }



        /// <summary>
        ///总页数
        /// </summary>
        /// <returns></returns>
        /// <remarks></remarks>
        public int TotalPage
        {
            get
            {
                if (ViewState[this.ID + "GridPager_TotalPage"] == null)
                {
                    ViewState[this.ID + "GridPager_TotalPage"] = 1;
                }
                return Convert.ToInt32(ViewState[this.ID + "GridPager_TotalPage"]);
            }
            private set
            {
                if (value <= 0)
                {
                    value = 1;
                }
                ViewState[this.ID + "GridPager_TotalPage"] = value;
                lblTotalPage.Text = value.ToString();
            }
        }


        /// <summary>
        /// 总行数
        /// </summary>
        /// <returns></returns>
        /// <remarks></remarks>
        public int TotalRows
        {
            get
            {
                if (ViewState[this.ID + "GridPager_TotalRows"] == null)
                {
                    ViewState[this.ID + "GridPager_TotalRows"] = 0;
                }
                return Convert.ToInt32(ViewState[this.ID + "GridPager_TotalRows"]);
            }
            set
            {
                if (value < 0)
                {
                    value = 0;
                    this.TotalPage = int.Parse(Decimal.Ceiling(decimal.Parse((value / this.PageSize).ToString())).ToString());

                }
                ViewState[this.ID + "GridPager_TotalRows"] = value;
                RefreshPager(value);

            }
        }

        public event EventHandler PageIndexChanged;

        protected virtual void OnPageIndexChange()
        {
            if (PageIndexChanged != null)
            {
                PageIndexChanged(this, EventArgs.Empty);
            }
        }

        /// <summary>
        /// 刷新控件的状态
        /// </summary>
        /// <param name="rowCount">总记录行数</param>
        /// <remarks>每次列表绑定数据都需要进行状态刷新</remarks>
        public void RefreshPager(int rowCount)
        {
            //TotalRows = rowCount;
            TotalPage = rowCount / PageSize;
            if (rowCount > PageSize && rowCount % PageSize > 0)
            {
                TotalPage += 1;

            }

            if (TotalPage == 1)
            {
                ibtnGo.Enabled = false;
            }
            else
            {
                ibtnGo.Enabled = true;
            }
            ibtnFirst.Enabled = true;
            ibtnPrev.Enabled = true;
            ibtnNext.Enabled = true;
            ibtnLast.Enabled = true;
            ibtnFirst.Attributes.CssStyle.Remove("filter");
            ibtnPrev.Attributes.CssStyle.Remove("filter");
            ibtnNext.Attributes.CssStyle.Remove("filter");
            ibtnLast.Attributes.CssStyle.Remove("filter");

            if (PageIndex <= 1)
            {
                PageIndex = 1;
                ibtnFirst.Enabled = false;
                ibtnPrev.Enabled = false;
                ibtnFirst.Attributes.CssStyle.Add("filter", "gray");
                ibtnPrev.Attributes.CssStyle.Add("filter", "gray");
            }

            if (PageIndex >= TotalPage)
            {
                PageIndex = TotalPage;
                ibtnNext.Enabled = false;
                ibtnLast.Enabled = false;
                ibtnNext.Attributes.CssStyle.Add("filter", "gray");
                ibtnLast.Attributes.CssStyle.Add("filter", "gray");
            }

        }

        protected void ibtnGo_Click(object sender, ImageClickEventArgs e)
        {
            int index = 0;
            if (int.TryParse(txtNum.Text.Trim(), out index))
            {
                if (index != PageIndex)
                {
                    PageIndex = index;
                    txtNum.Text = string.Empty;
                    OnPageIndexChange();
                }
            }
        }

        protected void ibtnFirst_Click(object sender, ImageClickEventArgs e)
        {
            PageIndex = 1;
            OnPageIndexChange();
        }

        protected void ibtnPrev_Click(object sender, ImageClickEventArgs e)
        {
            PageIndex -= 1;
            OnPageIndexChange();
        }

        protected void ibtnNext_Click(object sender, ImageClickEventArgs e)
        {
            PageIndex += 1;
            OnPageIndexChange();
        }

        protected void ibtnLast_Click(object sender, ImageClickEventArgs e)
        {
            PageIndex = TotalPage;
            OnPageIndexChange();
        }

        protected void ddlPageCount_SelectedIndexChanged(object sender, EventArgs e)
        {
            //PageIndex = this.PageIndex;
            PageIndex = 1;
            OnPageIndexChange();
        }
    }
}