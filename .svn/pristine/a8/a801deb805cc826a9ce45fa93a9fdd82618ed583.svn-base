using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SUNPN.BONUS.BLL;
using SUNPN.BONUS.Model;
using SUNPN.BONUS.API.Models;
using System.Web;
using System.IO;
using System.Text;

namespace SUNPN.BONUS.API.Areas.Sys.Controllers
{
    public class PositionController : ApiController
    {
        PositionBLL posBll = new PositionBLL();
        #region 添加职位
        [HttpPost]
        public HttpResponseMessage AddPosition([FromBody]Position pos)
        {
            return new HttpResponseMessage { Content = new StringContent(posBll.AddPosition(pos), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 修改职位
        [HttpPost]
        public HttpResponseMessage UpdPosition([FromBody]Position pos)
        {
            return new HttpResponseMessage { Content = new StringContent(posBll.UpdPosition(pos), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
        #endregion

        #region 删除职位
        [HttpGet]
        public HttpResponseMessage DelPosition(int PostId)
        {
            return new HttpResponseMessage { Content = new StringContent(posBll.DelPosition(PostId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 获取编辑职位信息
        [HttpGet]
        public HttpResponseMessage GetPosition(int PostId)
        {
            return new HttpResponseMessage { Content = new StringContent(posBll.GetPosition(PostId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 获取父级部门列表
        [HttpGet]
        public HttpResponseMessage GetParList(string CompanyId)
        {
            return new HttpResponseMessage { Content = new StringContent(posBll.GetParList(CompanyId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 获取部门下的子部门列表和职位
        [HttpGet]
        public HttpResponseMessage GetDepPosInfo(string CompanyId, string DepId)
        {
            return new HttpResponseMessage { Content = new StringContent(posBll.GetDepPosInfo(CompanyId, DepId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 获取无部门的职位
        [HttpGet]
        public HttpResponseMessage GetNoDepPosInfo(string CompanyId)
        {
            return new HttpResponseMessage { Content = new StringContent(posBll.GetNoDepPosInfo(CompanyId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

    }
}
