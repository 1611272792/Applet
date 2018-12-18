// pages/itemremark/itemremark.js
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

    ],
    content: "",
    message: [],
    durl: app.globalData.ddurl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var content = this.data.content;
    var BonusId = options.BonusId;
    var imgUrls = this.dataimgUrls;
    var message = this.data.message;
    wx.getStorage({
      key: 'CompanyId',
      success: function (resc) {
        wx.request({
          url: that.data.durl+'/api/Bos/Wo/GetRemark',
          data: {
            CompanyId: resc.data,
            BonusId: BonusId,
          },
          method: "GET",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (ress) {
            //  console.log(ress.data)
            if (ress.data.code == 100) {
              if (ress.data.data != null) {
                that.setData({
                  content: ress.data.data[0].BrContent
                })
              }
              if (ress.data.data1 != null) {
                for (var a = 0; a < ress.data.data1.length; a++) {
                  that.data.imgUrls.push(that.data.durl +"/ProductImage/" + ress.data.data1[a].BrContent)
                }
                that.setData({
                  imgUrls: that.data.imgUrls
                })
              }
              that.setData({
                message:["as"]
              })
            }
            else {
              that.setData({
                message: []
              })
            }
          },
          fail: function () {
            console.log("no");
          }
        })
      },
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