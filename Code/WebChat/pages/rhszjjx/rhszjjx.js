// pages/rhszjjx/rhszjjx.js
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
      app.globalData.ddurl+'/Content/faq/item/item.png',
      app.globalData.ddurl +'/Content/faq/item/additem.png',
      app.globalData.ddurl +'/Content/faq/item/editgz.png',
    ],
    imgUrls2: [
      app.globalData.ddurl +'/Content/faq/item/left1.png',
      app.globalData.ddurl +'/Content/faq/item/left2.png',
    ],
    imgUrls3: [
      app.globalData.ddurl +'/Content/faq/item/zhuru.png',
      app.globalData.ddurl +'/Content/faq/item/addgz.png',
      app.globalData.ddurl +'/Content/faq/item/editgz.png',
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