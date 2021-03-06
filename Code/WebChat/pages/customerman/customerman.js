// pages/customerman/customerman.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '0', value: '已过期', checked: 'true' },
      { name: '1', value: '全部' }
    ],
    show: true,
    show2: false,
    guqidata: [],
    //data 已审核，，data1已过期，，data2为审核
    yishenghe: [],
    weishenhe: [],
    durl: app.globalData.ddurl,
  },
  Update: function (e) {
    // console.log(e.currentTarget.dataset.text)  
    let str = JSON.stringify(e.currentTarget.dataset.text);
    wx.navigateTo({
      url: '../shencompany/shencompany?companyid=' + str,
    })
  },
  //单选按钮的选择事件
  radioChange: function (e) {
    var that = this;
    var guqidata = this.data.guqidata;
    var yishenghe = this.data.yishenghe;
    var weishenhe = this.data.weishenhe;
    // console.log(e.detail.value)
    if (e.detail.value == 1) {
      this.setData({
        show: false,
        show2: true
      })
      this.FindeDetail();
    }
    else {
      this.setData({
        show: true,
        show2: false
      })
      this.FindeDetail();
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  FindeDetail: function () {
    var that = this;
    var guqidata = this.data.guqidata;
    var yishenghe = this.data.yishenghe;
    var weishenhe = this.data.weishenhe;
    wx.request({
      url: that.data.durl+'/api/Sys/Client/GetAllList',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (ress) {
        // console.log(ress.data)
        //data 已审核，，data1已过期，，data2为审核
        that.setData({
          guqidata: ress.data.data1,
          yishenghe: ress.data.data,
          weishenhe: ress.data.data2,
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
    this.FindeDetail();
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