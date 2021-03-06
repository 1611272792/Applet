// pages/depart/depart.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon: '../../src/image/depart.png',
    items: [],
    startX: 0, //开始坐标
    startY: 0,
    he: 0,
    durl: app.globalData.ddurl,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var he = this.data.he;
    this.setData({
      he: app.globalData.phoneheight
    })
  },
  SelectLoad() {
    var that = this;
    wx.getStorage({
      key: 'CompanyId',
      success: function (resc) {
        // console.log(resc.data);
        wx.request({
          url: that.data.durl+'/api/Sys/Depart/GetParentDepart',
          data: {
            CompanyId: resc.data
          },
          method: "GET",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (resd) {
            // console.log(resd.data);
            var items = that.data.items;
            var itemss = [];
            if (resd.data.data != null) {
              for (var i = 0; i < resd.data.data.length; i++) {
                itemss.push({
                  content: resd.data.data[i].DepName,
                  count: resd.data.data[i].sonCount,
                  DepId: resd.data.data[i].DepId,
                  Pid: resd.data.data[i].Pid,
                  isTouchMove: false //默认全隐藏删除
                })
              }
              that.setData({
                items: itemss
              });
            }
            else{
              that.setData({
                items: []
              });
            }
          },
          fail: function () {
            console.log("no");
          }
        })
      },
    });
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
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除事件
  del: function (e) {
    var that = this;
    var items = this.data.items;
    // var departID = this.data.items.splice(e.currentTarget.dataset.index, 1)[0].DepId;
    var departID = e.target.id;
    wx.showModal({
      title: '删除',
      content: '确定要删除此部门以及子部门吗？',
      confirmText: "删除",
      cancelText: "取消",
      confirmColor: '#007aff',
      success: function (res) {
        // console.log(res);
        if (res.confirm) {
          that.data.items.splice(e.currentTarget.dataset.index, 1)
          // 删除
          wx.request({
            url: that.data.durl +'/api/Sys/Depart/DelDepart',
            data: {
              DepartId: departID
            },
            method: "GET",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (resd) {
               console.log(resd.data);
              if (resd.data.code == 100) {
                 
                that.SelectLoad();
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 3000
                });
              }
              else if (resd.data.code == 104) {
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
        } else {
          //取消
        }
      }
    });
  },
  //编辑事件
  edit: function (e) {
    //  console.log(e.target.id);
    // var departID = this.data.items.splice(e.currentTarget.dataset.index, 1)[0].DepId;
    wx.navigateTo({
      url: '../editdepart/editdepart?departID=' + e.target.id,
    })
  },
  DepartAdd: function () {
    wx.navigateTo({
      url: '../adddepart/adddepart',
    })
  },
  DepartClick: function (e) {
    // var departID = e.currentTarget.id;
    wx.navigateTo({
      url: '../departson/departson?departID=' + e.currentTarget.id,
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
    this.SelectLoad();
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