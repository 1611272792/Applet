// pages/cashsh/cashsh.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  shendetail:[],
    durl: app.globalData.ddurl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var GetBonusID = options.GetBonusID;
    wx.request({
      url: that.data.durl+'/api/Bos/AuditBonus/GetAuditDetail',
      data: {
        GetBonusID: GetBonusID
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (ress) {
        //  console.log(ress.data);
        that.setData({
          shendetail: ress.data.data
        })
      },
      fail: function () {
        console.log("no");
      }
    })
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