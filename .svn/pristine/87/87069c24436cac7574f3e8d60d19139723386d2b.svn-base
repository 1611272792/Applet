// pages/sonposition/sonposition.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    departlist: [],
    icon: '../../src/image/depart.png',
    icon1: '../../src/image/zhiwei.png',
    items: [],
    startX: 0, //开始坐标
    startY: 0,
    he: 0,
    durl: app.globalData.ddurl,
    DepIDs:0
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.items.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.items.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      items: that.data.items
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var DepIDs = that.data.DepIDs;
    that.setData({
      DepIDs: options.DepId
    })
    var he = this.data.he;
    var departlist = that.data.departlist;
    var items = that.data.items;
    this.setData({
      he: app.globalData.phoneheight
    })  
    wx.getStorage({
      key: 'CompanyId',
      success: function (resc) {
        wx.request({
          url: that.data.durl + '/api/Sys/Position/GetDepPosInfo',
          data: {
            CompanyId: resc.data,
            DepId: options.DepId
          },
          method: "GET",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (resd) {
            //  console.log(resd.data);
            if (resd.data.data==null){
              that.setData({
                departlist: [],
                items: resd.data.data1
              })
            }
            else{
              that.setData({
                departlist: resd.data.data,
                items: resd.data.data1
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
  //删除事件
  del: function (e) {
    //  console.log(e)
    var that = this;
    wx.showModal({
      title: '删除',
      content: '确定要删除吗？',
      confirmText: "删除",
      confirmColor: '#007aff',
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          // 删除
          wx.request({
            url: that.data.durl + '/api/Sys/Position/DelPosition',
            data: {
              PostId: e.currentTarget.id
            },
            method: "GET",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (resd) {
              // console.log(resd.data);
              //that.data.items.splice(e.currentTarget.dataset.index, 1)
              if (resd.data.code == 100) {
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 3000
                });
                that.SelectDetail();
              }
              else {
                wx.showModal({
                  title: '提示',
                  content: '删除失败',
                  showCancel: false,
                  confirmColor: '#007aff'
                })
              }
            },
            fail: function () {
              console.log("no");
            }
          })
        } else {
          //取消
        }
      }
    });
  },
  //编辑事件
  edit: function (e) {
    // console.log(e.currentTarget.id);
    wx.navigateTo({
      url: '../editposition/editposition?PostId=' + e.currentTarget.id,
    })
  },
  PositionAdd: function () {
    wx.navigateTo({
      url: '../addposition/addposition',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  DepartClick: function (e) {
    // console.log(e.currentTarget.id)
    var that = this;
    wx.navigateTo({
      url: '../sonsposition/sonsposition?DepId=' + e.currentTarget.id,
    })
  },
  SelectDetail: function () {
    var that = this;
    var departlist = that.data.departlist;
    var items = that.data.items;
    var DepIDs = that.data.DepIDs;
    wx.getStorage({
      key: 'CompanyId',
      success: function (resc) {
        wx.request({
          url: that.data.durl + '/api/Sys/Position/GetDepPosInfo',
          data: {
            CompanyId: resc.data,
            DepId: DepIDs
          },
          method: "GET",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (resd) {
            //  console.log(resd.data);
            if (resd.data.data==null){
              that.setData({
                departlist: []
              })
            }else{
              that.setData({
                departlist: resd.data.data
              })
            }  
            that.setData({
              items: resd.data.data1
            })         
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
    this.SelectDetail();
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