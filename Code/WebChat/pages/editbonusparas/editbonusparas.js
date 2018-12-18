// pages/editbonusparas/editbonusparas.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typename: "",
    bonusnum: 0,
    BonusParamIds: 0,
    durl: app.globalData.ddurl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var BonusParamId = options.BonusParamId;
    var BonusParamIds = this.data.BonusParamIds;
    var bonusnum = this.data.bonusnum;
    var typename = this.data.typename;
    this.setData({
      BonusParamIds: BonusParamId
    })
    // console.log(BonusParamId)
    wx.request({
      url: that.data.durl+'/api/Bos/BonusParam/GetBonusParam',
      data: {
        bounsParId: BonusParamId
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (resd) {
        // console.log(resd.data);
        if (resd.data.code == 100) {
          that.setData({
            bonusnum: resd.data.data[0].BPMoney,
            typename: resd.data.data[0].BPName,
          })
        }
        else {
          wx.showModal({
            title: '提示',
            content: resd.data.msg,
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
  formSubmit: function (e) {
    // console.log(e.detail.value);
    var that=this;
    var BonusParamIds = this.data.BonusParamIds;
    var money = /^\d+$/;
    var comname = /^[\u4E00-\u9FA5A-Za-z]+$/; //只能输入中文或英文
    if (e.detail.value.TypeName == '') {
      wx.showModal({
        title: '提示',
        content: '参数名称必填',
        showCancel: false,
        confirmColor: '#007aff'
      })
    }
    else if (!comname.test(e.detail.value.TypeName)) {
      wx.showModal({
        title: '提示',
        content: '参数名称只能输入中文或英文',
        showCancel: false,
        confirmColor: '#007aff'
      })
    }
    else if (e.detail.value.BonusNum == '') {
      wx.showModal({
        title: '提示',
        content: '金额必填',
        showCancel: false,
        confirmColor: '#007aff'
      })
    }
    else if (!money.test(e.detail.value.BonusNum)) {
      wx.showModal({
        title: '提示',
        content: '金额为数字',
        showCancel: false,
        confirmColor: '#007aff'
      })
    }
    else if (e.detail.value.Remark == '') {
      wx.showModal({
        title: '提示',
        content: '备注内容必填',
        showCancel: false,
        confirmColor: '#007aff'
      })
    }
    else if (!comname.test(e.detail.value.Remark)) {
      wx.showModal({
        title: '提示',
        content: '备注内容只能输入中文或英文',
        showCancel: false,
        confirmColor: '#007aff'
      })
    }
    else {
      wx.getStorage({
        key: 'CompanyId',
        success: function (resc) {
          wx.request({
            url: that.data.durl +'/api/Bos/BonusParam/UpdBonusParam',
            data: {
              BPName: e.detail.value.TypeName,
              BPMoney: e.detail.value.BonusNum,
              CompanyId: resc.data,
              BonusParamId: BonusParamIds
            },
            method: "POST",
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
              }
              else {
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
      })


    }
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