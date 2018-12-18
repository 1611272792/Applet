// pages/departallmanager/departallmanager.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    icon: '../../src/image/depart.png',
    companyId: '',
    durl: app.globalData.ddurl,
    DepArry: [] //所有部门列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      companyId: wx.getStorageSync('CompanyId'),

    })
    this.SelectAllDep();
  },
  //查询这个公司下所有部门
  SelectAllDep: function() {
    var that = this;
    wx.request({
      url: that.data.durl + '/api/Bos/DepartBonus/GetAllDepart',
      method: "GET",
      data: {
        CompanyId: that.data.companyId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(resd) {
        var countryIndexs = 0;
        if (resd.data.code == 100) {

          that.setData({
            DepArry: resd.data.data
          })

        } else {
          wx.showModal({
            title: '提示',
            content: resd.data.msg,
          })
        }


      },
      fail: function() {
        console.log("fail");
      }
    })
  },
  //点击查看这个部门下的奖金信息
  CatSelectbonus: function(e) {
    var that = this;
    console.log(e);
    var departID = e.currentTarget.dataset.dipid;
    wx.navigateTo({
      url: '../depbonusdetial/depbonusdetial?departID=' + departID + '&companyId=' + that.data.companyId,
    })
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})