// pages/tbygybm/tbygybm.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 800,
    imgUrls: [
      app.globalData.ddurl +'/Content/faq/user/员工.png',
      app.globalData.ddurl +'/Content/faq/user/depleft1.png',
    ],
    imgUrls2: [
      app.globalData.ddurl +'/Content/faq/user/left22.png',
      app.globalData.ddurl +'/Content/faq/user/addinfo.png',
      app.globalData.ddurl +'/Content/faq/user/left2.png',
    ],
    imgUrls3: [
      app.globalData.ddurl +'/Content/faq/user/add.png',
      app.globalData.ddurl +'/Content/faq/user/depleft2.png',
      app.globalData.ddurl +'/Content/faq/user/depleft3.png',
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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