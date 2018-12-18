// pages/depbonusdetial/depbonusdetial.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    departID: 0,//部门id
    companyId: '',//公司id
    durl: app.globalData.ddurl,
    begindate: "年-月-日",
    enddate: "年-月-日",
    BonusList:[]//奖金项明细表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    this.setData({
      departID: options.departID,
      companyId: options.companyId
    })
    this.SelectBonusList();
  },
  //查询这个部门下的奖金明细
  SelectBonusList: function (e) {
    var that = this;
    wx.request({
      url: that.data.durl + '/api/Bos/DepartBonus/GetDepartBonusList',
      method: "GET",
      data: {
        CompanyId: that.data.companyId,
        DepId: that.data.departID
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (resd) {
        var countryIndexs = 0;
        if (resd.data.code == 100) {

          that.setData({
            BonusList: resd.data.data
          })

        }
        else {
          wx.showModal({
            title: '提示',
            content: resd.data.msg,
          })
        }


      },
      fail: function () {
        console.log("fail");
      }
    })
  },
  //查看原因
  SelectReson:function(e){
    var resonid = e.currentTarget.dataset.resonid;
    wx.navigateTo({
      url: '../depbonusdetial/resondetial/resondetial?resonid=' + resonid,
    })
  },
  //开始时间选择
  bindBegin: function (e) {
    this.setData({
      begindate: e.detail.value
    })
  },
  //结束时间选择
  bindEnd: function (e) {
    this.setData({
      enddate: e.detail.value
    })
  },
  //根据日期搜索
  bindSearch:function(e){
    var that = this;
    if(that.data.begindate=='年-月-日'){
      wx.showModal({
        title: '提示',
        content: '开始日期未选择',
        success: function(res) {
          
        }
      })
    }
    else if(that.data.enddate=='年-月-日'){
      wx.showModal({
        title: '提示',
        content: '结束日期未选择',
        success: function(res) {
          
        }
      })
    }
    else if(that.data.enddate<that.data.begindate){
      wx.showModal({
        title: '提示',
        content: '结束日期不能小于开始日期',
        success: function(res) {
          
        }
      })
    }
    else{
      wx.request({
        url: that.data.durl + '/api/Bos/Wo/GetDepBonusInfo',
        method: "GET",
        data: {
          CompanyId: that.data.companyId,
          DepId: that.data.departID,
          StartTime:that.data.begindate,
          EndTime:that.data.enddate
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (resd) {
          var countryIndexs = 0;
          if (resd.data.code == 100) {
  
            that.setData({
              BonusList: resd.data.data
            })
  
          }
          else {
            that.setData({
              BonusList:[]
            })
            wx.showModal({
              title: '提示',
              content: resd.data.msg,
            })
          }
  
  
        },
        fail: function () {
          console.log("fail");
        }
      })
    }
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})