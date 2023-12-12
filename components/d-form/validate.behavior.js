const { uniq } = require('../utils/index')

module.exports = Behavior({
  methods: {
    validate(selectors, showErrors = false) {
      return new Promise((resolve, reject) => {
        const r = uniq(
          selectors
            .map(s => this.selectAllComponents(s))
            .flat()
            .map(f => f.getEmptyLabels())
            .flat()
        )

        if (r.length) {
          const title = '以下信息未录入：'
          const content = r.join('、')
          reject(new Error(title + content))
          if (showErrors) {
            wx.showModal({
              title,
              content,
              duration: 2000,
              showCancel: false,
            })
          }
        } else {
          resolve()
        }
      })
    },
  }
})
