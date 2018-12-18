// pages/onebouns/onebouns.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    begindate: "",
    enddate: "",
    onebonudetail: [],
    durl: app.globalData.ddurl,
  },
  changeBegindate(e) {
    var begindate = this.data.begindate;
    this.setData({ begindate: e.detail.value });
  },
  changeEnddate(e) {
    var enddate = this.data.enddate;
    this.setData({ enddate: e.detail.value });
  },
  SouSuo: function () {
    var that = this;
    var begindate = this.data.begindate;
    var enddate = this.data.enddate;
    var onebonudetail = this.data.onebonudetail;
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
          key: 'openid',
          success: function (resop) {
            wx.getStorage({
              key: 'CompanyId',
              success: function (resc) {
                wx.request({
                  url: that.data.durl+'/api/Bos/Wo/GetOneEmpBonusInfo',
                  data: {
                    CompanyId: resc.data,
                    OpenId: resop.data,
                    StartTime: begindate,
                    EndTime: enddate
                  },
                  method: "GET",
                  header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                  },
                  success: function (ress) {
                    that.setData({
                      onebonudetail: ress.data.data,
                    })
                  },
                  fail: function () {
                    console.log("no");
                  }
                })
              },
            })

          },
        })
      }
    }
    else {
      wx.getStorage({
        key: 'openid',
        success: function (resop) {
          wx.getStorage({
            key: 'CompanyId',
            success: function (resc) {
              wx.request({
                url: that.data.durl +'/api/Bos/Wo/GetOneEmpBonusInfo',
                data: {
                  CompanyId: resc.data,
                  OpenId: resop.data,
                  StartTime: begindate,
                  EndTime: enddate
                },
                method: "GET",
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                success: function (ress) {
                  that.setData({
                    onebonudetail: ress.data.data,
                  })
                },
                fail: function () {
                  console.log("no");
                }
              })
            },
          })

        },
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var onebonudetail = this.data.onebonudetail;
    wx.getStorage({
      key: 'openid',
      success: function (resop) {
        wx.getStorage({
          key: 'CompanyId',
          success: function (resc) {
            wx.request({
              url: that.data.durl +'/api/Bos/Wo/GetOneEmpBonusInfo',
              data: {
                CompanyId: resc.data,
                OpenId: resop.data,
              },
              method: "GET",
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success: function (ress) {
                that.setData({
                  onebonudetail: ress.data.data,
                })
              },
              fail: function () {
                console.log("no");
              }
            })
          },
        })

      },
    })


  },
  GrPriClick: function (e) {
    //  console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '../itemremark/itemremark?BonusId=' + e.currentTarget.id,
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