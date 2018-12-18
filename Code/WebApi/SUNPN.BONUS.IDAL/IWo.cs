﻿using SUNPN.BONUS.IDAL;
using SUNPN.BONUS.Model;
using SUNPN.BONUS.Model.UserClass.EditUser;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.IDAL
{
  public interface IWo
    {
        /// <summary>
        /// 查看个人奖金余额
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <param name="OpenId"></param>
        /// <returns></returns>
        DataTable GetEmpBonus(string CompanyId, string OpenId);

        /// <summary>
        /// 查看单个人员奖金详情
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <param name="OpenId"></param>
        /// <returns></returns>
        DataTable GetOneBonusInfo(string CompanyId, string OpenId, string StartTime, string EndTime);
        

        /// <summary>
        /// 查看部门奖金余额
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <param name="OpenId"></param>
        /// <returns></returns>
        DataTable GetDepBonus(string CompanyId, string OpenId);

        /// <summary>
        /// 查看个人信息
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <param name="OpenId"></param>
        /// <returns></returns>
        DataTable GetEmpInfo(string CompanyId, string OpenId);

        /// <summary>
        /// 个人提现
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <param name="OpenId"></param>
        /// <param name="Summoney"></param>
        /// <returns></returns>
        string GetDeposit(string CompanyId, string OpenId,decimal Summoney);


        /// <summary>
        /// 部门提现
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <param name="OpenId"></param>
        /// <returns></returns>
        string GetDepDeposit(string CompanyId, int DepID);

        /// <summary>
        /// 查看奖金项
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <param name="OpenId"></param>
        /// <returns></returns>
        List<BonusItemInfo> GetItemsBonus(string CompanyId, string OpenId);
        /// <summary>
        /// 查看自己负责的奖金项
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <param name="OpenId"></param>
        /// <returns></returns>
        DataTable GetMyItemsBonus(string CompanyId, string OpenId);

        /// <summary>
        /// 查看奖金项明细
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <param name="OpenId"></param>
        /// <returns></returns>
        List<DataTable> GetMyItemsDetail(string CompanyId, string OpenId,string ItemsId);

        /// <summary>
        /// 部门信息
        /// </summary>
        /// <param name="DepId"></param>
        /// <param name="CompanyId"></param>
        /// <param name="StartTime"></param>
        /// <param name="EndTime"></param>
        /// <returns></returns>
        DataTable GetDepBonusInfo(string DepId, string CompanyId, string StartTime, string EndTime);


        /// <summary>
        /// 个人交易
        /// </summary>
        /// <param name="deal"></param>
        /// <returns></returns>
       string  AddTrading(BonusDeal deal);



        ///// <summary>
        ///// 意见反馈
        ///// </summary>
        ///// <param name="sug"></param>
        ///// <returns></returns>
        //string AddSuggest(Suggest sug);

        /// <summary>
        /// 意见反馈 
        /// </summary>
        /// <param name="sug"></param>
        /// <returns></returns>
        string AddSuggestNoImg(Suggest sug);

        /// <summary>
        /// 查看意见反馈 
        /// </summary>
        /// <param name="sug"></param>
        /// <returns></returns>
        DataTable GetSuggest(string StartTime,string EndTime);

        /// <summary>
        /// 查看意见反馈详情 
        /// </summary>
        /// <param name="sug"></param>
        /// <returns></returns>
        List<DataTable> GetSuggestDetail(string ResonId);

        /// <summary>
        /// 查看奖金数据中的备注
        /// </summary>
        /// <param name="BonusId"></param>
        /// <param name="CompanyId"></param>
        ///  /// <param name="RemarkType"></param>
        /// <returns></returns>
        DataTable GetRemark(string BonusId, string CompanyId,int RemarkType);

        /// <summary>
        /// 负责人我页面获取公司Id(秘钥)
        /// </summary>
        /// <param name="OpneId">用户OpenId</param>
        /// <returns></returns>
        DataTable GetMyCompanyInfo(string OpneId);

    }
}