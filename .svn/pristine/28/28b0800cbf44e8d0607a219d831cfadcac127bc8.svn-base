// pages/itemdetailwo/itemdetailwo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '0', value: '支出', checked: 'true' },
      { name: '1', value: '收入' }
    ],
    show: true,
    show2: false,
    zhichu: [],
    shouru: [],
    durl: app.globalData.ddurl,
  },
  radioChange: function (e) {
    // console.log(e.detail.value)
    if (e.detail.value == 1) {
      this.setData({
        show: false,
        show2: true
      })
    }
    else {
      this.setData({
        show: true,
        show2: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var zhichu = this.data.zhichu;
    var shouru = this.data.shouru;
    var ItemsId = options.ItemsId;
    wx.getStorage({
      key: 'CompanyId',
      success: function (resc) {
        wx.getStorage({
          key: 'openid',
          success: function (resop) {
            wx.request({
              url: that.data.durl+'/api/Bos/Wo/GetMyItemsDetail',
              data: {
                CompanyId: resc.data,
                OpenId: resop.data,
                ItemsId: ItemsId
              },
              method: "GET",
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success: function (ress) {
                // console.log(ress.data);
                // console.log("CompanyId:" + resc.data)
                // console.log("OpenId:" + resop.data)
                // console.log("ItemsId:" + ItemsId)
                if (ress.data.code == 100) {
                  that.setData({
                    zhichu: ress.data.data,
                    shouru: ress.data.data1,
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
  GrPriClick: function (e) {
    wx.navigateTo({
      url: '../itemremark/itemremark?BonusId=' + e.currentTarget.id,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})