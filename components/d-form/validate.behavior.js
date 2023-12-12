const { uniq } = require('../../utils/utils')

const initialData = {
  showConfirmBox: false, //显示提交确认框
  showWarningBox: false, //显示信息不完整提示框
  warningTxt: "",
  _resolve: null,
  _reject: null,
}

module.exports = Behavior({
  options: {
    pureDataPattern: /^_/,
  },
  data: {
    ...initialData,
  },
  methods: {
    validate(selectors) {
      return new Promise((_resolve, _reject) => {
        this.setData({ _resolve, _reject })

        const r = uniq(
          selectors
            .map(s => this.selectAllComponents(s))
            .flat()
            .map(f => f.getEmptyLabels())
            .flat()
        )

        if (r.length) {
          this.setData(
            { warningTxt: r.join('、') },
            () => this.setData({ showWarningBox: true })
          )
        } else {
          this.setData({ showConfirmBox: true });
        }
      })
    },
    confirmValidate() {
      this.data._resolve()
      this.setData(initialData)
    },
    cancelValidate() {
      this.data._reject(new Error('表单校验取消或未通过'))
      this.setData(initialData)
    },
  }
})