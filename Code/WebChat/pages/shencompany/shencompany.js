// pages/shencompany/shencompany.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    begindate: "", //时间
    enddate: "",
    cominfo: [],
    comid: 0,
    durl: app.globalData.ddurl,
  },
  changeBegindate(e) {
    var begindate = this.data.begindate;
    this.setData({
      begindate: e.detail.value
    });
  },
  changeEnddate(e) {
    var enddate = this.data.enddate;
    this.setData({
      enddate: e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var begindate = this.data.begindate;
    var enddate = this.data.enddate;
    var comid = this.data.comid;
    var companyid = JSON.parse(options.companyid);
    this.setData({
      cominfo: companyid,
      begindate: companyid.RegTime.split(' ')[0],
      enddate: companyid.EndTime.split(' ')[0],
      comid: companyid.CompanyId
    })
  },
  formSubmit: function (e){
    var that = this;
    var comid = this.data.comid;
    var enddate = this.data.enddate;
    wx.request({
      url: that.data.durl+'/api/Sys/Client/UpdPassState',
      data: {
        CompanyId: comid,
        UserCount: e.detail.value.CompanyCount,
        EndTime: enddate,
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (ress) {
        // console.log(ress.data)
        if (ress.data.code == 100) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 3000
          });
        } else {
          wx.showModal({
            title: '提示',
            content: ress.data.msg,
            showCancel: false,
            confirmColor: '#007aff'
          })
        }
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