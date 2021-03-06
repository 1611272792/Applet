// pages/bonusseldataUse/bonusseldataUse.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    begindate: "",
    enddate: "",
    userDetail: [],
    openids: "",
    durl: app.globalData.ddurl,

  },
  SouSuo: function () {
    var that = this;
    var begindate = this.data.begindate;
    var enddate = this.data.enddate;
    var openids = this.data.openids;
    if (begindate != "" && enddate != "") {
      if (begindate > enddate) {
        wx.showModal({
          title: '提示',
          content: '开始日期不能大于结束日期',
          showCancel: false,
          confirmColor: '#007aff'
        })
      } else {
        wx.getStorage({
          key: 'CompanyId',
          success: function (resc) {
            wx.request({
              url: that.data.durl+'/api/Bos/BonusDataQuery/GetEmpBonusData',
              method: "GET",
              data: {
                CompanyId: resc.data,
                OpneID: openids,
                StartTime: begindate,
                EndTime: enddate
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (resd) {
                // console.log(resd.data);
                that.setData({
                  userDetail: resd.data.data,
                })
              },
              fail: function () {
                console.log("fail");
              }
            })
          },
        })
      }
    }
    else {
      wx.getStorage({
        key: 'CompanyId',
        success: function (resc) {
          wx.request({
            url: that.data.durl +'/api/Bos/BonusDataQuery/GetEmpBonusData',
            method: "GET",
            data: {
              CompanyId: resc.data,
              OpneID: openids,
              StartTime: begindate,
              EndTime: enddate
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (resd) {
              // console.log(resd.data);
              that.setData({
                userDetail: resd.data.data,
              })
            },
            fail: function () {
              console.log("fail");
            }
          })
        },
      })
    }
  },
  changeBegindate(e) {
    var begindate = this.data.begindate;
    this.setData({ begindate: e.detail.value });
  },
  changeEnddate(e) {
    var enddate = this.data.enddate;
    this.setData({ enddate: e.detail.value });
  },
  GrPriClick: function (e) {
    //  console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '../itemremark/itemremark?BonusId=' + e.currentTarget.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userDetail = this.data.userDetail;
    var openids = this.data.openids;
    var openid = options.openid;
    this.setData({
      openids: openid
    })
    wx.getStorage({
      key: 'CompanyId',
      success: function (resc) {
        wx.request({
          url: that.data.durl +'/api/Bos/BonusDataQuery/GetEmpBonusData',
          method: "GET",
          data: {
            CompanyId: resc.data,
            OpneID: openid
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (resd) {
            //  console.log(resd.data); 
            that.setData({
              userDetail: resd.data.data,
            })
          },
          fail: function () {
            console.log("fail");
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