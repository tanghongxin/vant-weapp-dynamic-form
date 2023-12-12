// components/page-container/index.js
Component({
  data: {
    top: 0,
    bottom: 0,
  },
  lifetimes: {
    attached() {
      wx.getSystemInfo({
        success: ({ safeArea, screenHeight, statusBarHeight }) => {
          // 胶囊区域
          const { height, top } = wx.getMenuButtonBoundingClientRect()

          this.setData({
            top: statusBarHeight + height + (top - statusBarHeight) * 2,
            bottom: safeArea ? screenHeight - safeArea.bottom : 0,
          })
        }
      })
    }
  }
})
