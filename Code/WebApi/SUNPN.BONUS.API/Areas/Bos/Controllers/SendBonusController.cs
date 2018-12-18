using SUNPN.BONUS.BLL;
using SUNPN.BONUS.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;

namespace SUNPN.BONUS.API.Areas.Bos.Controllers
{
    public class SendBonusController : ApiController
    {
        #region 定义变量
        /// <summary>
        /// 奖金项业务逻辑类
        /// </summary>
        SendBonusBLL sendBonusBLL = new SendBonusBLL();
        #endregion

        #region 根据部门Id和公司Id查询对应的可发放的人员列表
        /// <summary>
        /// 获取部门奖金列表
        /// </summary>
        /// <param name="DepId"></param>
        /// <param name="CompanyId"></param>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage GetBenefitList(string DepId, string CompanyId,string BonusItemId)
        {
            return new HttpResponseMessage { Content = new StringContent(sendBonusBLL.GetBenefitList(DepId,CompanyId, BonusItemId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 添加常用原因
        /// <summary>
        /// 添加常用原因
        /// </summary>
        /// <param name="ur"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddUsualReason(UsualReason ur)
        {
            return new HttpResponseMessage { Content = new StringContent(sendBonusBLL.AddUsualReason(ur), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 获取常用原因信息
        /// <summary>
        /// 获取常用原因信息
        /// </summary>
        /// <param name="OpenId"></param>
        /// <returns></returns>
        public HttpResponseMessage GetUsualReason(string OpenId)
        {
            return new HttpResponseMessage { Content = new StringContent(sendBonusBLL.GetUsualReason(OpenId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 根据UserId、CompanyId、DepId查询出二维码信息是否有效
        /// <summary>
        /// 根据UserId、CompanyId、DepId查询出二维码信息是否有效
        /// </summary>
        /// <param name="UserId"></param>
        /// <param name="CompanyId"></param>
        /// <param name="DepId"></param>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage CheckQRValid(string UserId, string CompanyId, string DepId)
        {
            return new HttpResponseMessage { Content = new StringContent(sendBonusBLL.CheckQRValid(UserId, CompanyId, DepId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion


        #region 根据UserId、CompanyId查询出二维码信息是否有效
        /// <summary>
        /// 根据UserId、CompanyId、DepId查询出二维码信息是否有效
        /// </summary>
        /// <param name="UserId"></param>
        /// <param name="CompanyId"></param>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage CheckQRValid(string UserId, string CompanyId)
        {
            return new HttpResponseMessage { Content = new StringContent(sendBonusBLL.CheckQRValid(UserId, CompanyId, "0"), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 发奖金
        /// <summary>
        /// 发奖金
        /// </summary>
        /// <param name="bo"></param>
        /// <returns></returns>

        [HttpPost]
        public HttpResponseMessage SendOut(BonusOut bo)
        {            
            return new HttpResponseMessage { Content = new StringContent(sendBonusBLL.SendOut(bo), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        [HttpPost]
        public HttpResponseMessage SaveImg()
        {
            //AppenLog("ss");
            HttpPostedFile file = HttpContext.Current.Request.Files["uploadfile_ant"];

            if (file != null)
            {
                //AppenLog("file");
                //公司编号+上传日期文件主目录  


                //保存文件路径  
                string filePathName = AppDomain.CurrentDomain.BaseDirectory + "/ProductImage";
                if (!System.IO.Directory.Exists(filePathName))
                {

                    System.IO.Directory.CreateDirectory(filePathName);
                }
                //获取后缀名
                int i = file.FileName.LastIndexOf(".");
                string StrType = file.FileName.Substring(i);
                string filePathNames = DateTime.Now.ToString("yyyyMMddHHmmssfff") + StrType;

                file.SaveAs(System.IO.Path.Combine(filePathName, filePathNames));
                return new HttpResponseMessage { Content = new StringContent(filePathNames, Encoding.GetEncoding("UTF-8"), "text/json") };
            }
            else
            {
                return null;
            }

        }


        #region 罚奖金
        /// <summary>
        /// 罚奖金
        /// </summary>
        /// <param name="bo"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage SendFa(BonusOut bo)
        {
            return new HttpResponseMessage { Content = new StringContent(sendBonusBLL.SendFa(bo), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 日志
        private void WriteLog(string strmsg)
        {
            strmsg = $"{strmsg}\r\n";
            using (FileStream fs = System.IO.File.Open("D:\\SendBonus.txt", FileMode.Append, FileAccess.Write, FileShare.Write))
            {
                byte[] bys = Encoding.Default.GetBytes(strmsg);
                fs.Write(bys, 0, bys.Length);
                fs.Close();
            }
        }
        #endregion
    }
}
