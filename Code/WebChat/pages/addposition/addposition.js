// pages/addposition/addposition.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countryList: [],
    countryIndex: 0,
    max: 20,
    currentlength: 0,
    dropid: "",
    durl: app.globalData.ddurl,
    txtinpout:""
  },
  TextareaInput: function (e) {
    var that = this;
    if (e.detail.cursor >= 20) {
      wx.showModal({
        title: '提示',
        content: '不可超过20',
        showCancel: false,
        confirmColor: '#007aff'
      })
    }
    else {
      var currentlength = this.data.currentlength;
      that.setData({
        currentlength: e.detail.cursor
      })
    }
  },
  changeCountry(e) {
    // console.log(e.detail.value)
    var dropid = this.data.dropid;
    var countryLists = this.data.countryLists;
    // console.log(countryList[e.detail.value])
    this.setData({
      countryIndex: e.detail.value,
      dropid: countryLists[e.detail.value]
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var countryList = this.data.countryList;
    var countryLists = this.data.countryLists;
    var countryIndex = this.data.countryIndex;
    wx.getStorage({
      key: 'CompanyId',
      success: function (resc) {
        wx.request({
          url: that.data.durl+'/api/Sys/Depart/GetAllDepart',
          method: "GET",
          data: {
            CompanyId: resc.data
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (resd) {
            // console.log(resd.data);
            var msg = [];
            for (var i in resd.data.data) {
              msg.push(resd.data.data[i].split(',')[1]);
            }
            that.setData({
              countryList: msg,
              countryLists: resd.data.data
              // countryIndex: resd.data.data.length-1
            });
          },
          fail: function () {
            console.log("fail");
          }
        })
      },
    })
  },
  formSubmit: function (e) {
    var that = this;
    var dropid = this.data.dropid;
    var posName = this.data.posName;
    var countryIndex = this.data.countryIndex;
    var txtinpout = this.data.txtinpout;
    var departid = '';
    if (dropid == '') {
      departid = 0;
    }
    else {
      departid = dropid.split(',')[0];
    }
    // console.log(departid);
    var comname = /^[\u4E00-\u9FA5A-Za-z]+$/; //只能输入中文或英文
    // console.log(e.detail.value)
    if (e.detail.value.PosName == "") {
      wx.showModal({
        title: '提示',
        content: '职位名称必填',
        showCancel: false,
        confirmColor: '#007aff'
      })
    }
    // else if (!comname.test(e.detail.value.PosName)) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '职位名称只能输入中文或英文',
    //     showCancel: false,
    //     confirmColor: '#007aff'
    //   })
    // }
    // else if (e.detail.value.ResonContent == "") {
    //   wx.showModal({
    //     title: '提示',
    //     content: '备注内容必填',
    //     showCancel: false,
    //     confirmColor: '#007aff'
    //   })
    // }
    else {
      wx.getStorage({
        key: 'CompanyId',
        success: function (resc) {
          wx.request({
            url: that.data.durl +'/api/Sys/Position/AddPosition',
            data: {
              PostName: e.detail.value.PosName,
              CompanyId: resc.data,
              DepId: departid,
              Remake: e.detail.value.ResonContent
            },
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (ress) {
              if (ress.data.code == 100) {
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 3000
                });
                that.setData({
                  posName:"",
                  countryIndex:-1,
                  txtinpout:"",
                })
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