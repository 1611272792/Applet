// pages/depbonusdetial/resondetial/resondetial.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resonId: 0,//原因id
    companyId: '',//公司id
    durl: app.globalData.ddurl,
    wzReson:'',//文字原因
    imgReson:[]//图片原因
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("原因id：" + options.resonid);
    var resonId = options.resonid;
    this.setData({
      resonId: resonId
    })
    this.SelectReson();
  },
  SelectReson: function (e) {
    var that = this;
    wx.request({
      url: that.data.durl + '/api/Bos/Reason/GetReason',
      method: "GET",
      data: {
        ReasonId: that.data.resonId,
        
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (resd) {
        
        if (resd.data.code == 100) {

          that.setData({
            wzReson: resd.data.data[0].BrContent,
            imgReson:resd.data.data1
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