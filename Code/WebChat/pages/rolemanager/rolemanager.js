// pages/rolemanager/rolemanager.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon: '../../src/image/depart.png',
    durl: app.globalData.ddurl,
    items: [],
    RoleArry: [],
    companyId:''
  },
  //添加角色
  addRole: function() {
    wx.navigateTo({
      url: '../addrolemanager/addrolemanager',
    })
  },
  //删除角色
  delRole: function(e) {
    console.log(e);
    var that = this;
    var RoleId = this.data.items[e.currentTarget.dataset.index].RoleId;
    var RoleName = this.data.items[e.currentTarget.dataset.index].RoleName;
    if (RoleId == "cjglycjgly") {
      wx.showModal({
        title: '提示',
        content: '超级管理员不能删除',
      })
      return;
    }
    if (RoleName == '管理员') {
      wx.showModal({
        title: '提示',
        content: '管理员为默认权限，不能编辑、删除、添加',
      })
      return;
    }
    wx.showModal({
      title: '删除',
      content: '确定要删除吗？',
      confirmText: "删除",
      cancelText: "取消",
      success: function(res) {
        console.log(res);
        if (res.confirm) {
          // 删除
          wx.request({
            url: that.data.durl + '/api/Sys/Role/DelRole',
            data: {
              RoleId: RoleId
            },
            method: "GET",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function(resd) {
              console.log(resd.data);
              if (resd.data.code == 100) {
                that.data.items.splice(e.currentTarget.dataset.index, 1)
                that.setData({
                  items: that.data.items
                })
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 3000
                });

              } else if (resd.data.code == 104) {
                wx.showModal({
                  title: '提示',
                  content: resd.data.msg,
                })
              }
            },
            fail: function() {
              console.log("no");
            }
          })
        } else {
          //取消
        }
      }
    });
  },
  //编辑角色
  editRole: function(e) {
    var RoleId = this.data.items[e.currentTarget.dataset.index].RoleId;
    wx.setStorage({
      key: 'RoleId',
      data: RoleId,
    })
    wx.navigateTo({
      url: '../editrolemanager/editrolemanager',
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //console.log("地址："+this.data.durl);
    
    
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function(e) {
    //开始触摸时 重置所有删除
    this.data.items.forEach(function(v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
    })
  },
  //滑动事件处理
  touchmove: function(e) {
    var that = this,
      index = e.currentTarget.dataset.index, //当前索引
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });
    that.data.items.forEach(function(v, i) {
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
  angle: function(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
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
    console.log("重新加载");
    this.setData({
      companyId: wx.getStorageSync('CompanyId')
    })
    var that = this;
    wx.request({
      url: this.data.durl + '/api/Sys/Role/GetAllRole',
      data: {
        CompanyId: that.data.companyId,
        Sign: 1
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (resd) {
        that.data.items = [];
        if(resd.data.code==100){
          for (var i = 0; i < resd.data.data.length; i++) {
            that.data.items.push({
              RoleName: resd.data.data[i].RoleName,
              count: 0,
              RoleId: resd.data.data[i].RoleId,
              isTouchMove: false //默认全隐藏删除
            })
          }
        }
        else{
          console.log("获取数据："+resd.data.msg);
        }
        that.setData({
          items: that.data.items
        });
      },
      fail: function () {
        console.log("no");
      }
    })
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