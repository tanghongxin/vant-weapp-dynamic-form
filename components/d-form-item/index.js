// components/d-form-item/index.js
const computedBehavior = require('miniprogram-computed').behavior
const { formatTimestamp, isTruthy } = require('../utils/index')

Component({
  behaviors: ['wx://form-field', computedBehavior],
  options: {
    pureDataPattern: /^_/,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    config: {
      type: Object,
      value: {
        label: '',
      },
    },
    model: {
      type: Object,
      value: {},
    },
  },
  options: {
    styleIsolation: 'shared',
  },

  /**
   * 组件的初始数据
   */
  data: {
    columns: [],
    show: false,
    _rangeStart: null,

    // computed 初始值设置（可选），减少控制台 warnings 提示
    placeholder: '',
    text: '',
    maxDate: 0,
    minDate: 0,
    fileList: [],
    yearRange: [],
  },

  computed: {
    text(data) {
      const { key, component, format } = data.config
      const { columns, model } = data
      const value = model[key]

      if (component === 'datetime-picker' && format && isTruthy(value)) {
        return formatTimestamp(Number(value), format)
      }

      if (!['picker', 'radio'].includes(component)) {
        return isTruthy(value) ? `${value}` : ''
      }

      const target = columns.find(el => typeof el === 'object' ? el.value === value : el === value)
      const result = isTruthy(target) ? (typeof target === 'object' ? target.text : target) : ''
      return isTruthy(result) ? `${result}` : ''
    },
    placeholder(data) {
      const { readonly, component } = data.config
      if (readonly) return ''
      return `请${component === 'field' ? '输入' : '选择'}`
    },
    required(data) {
      const { required, readonly } = data.config
      return !readonly && !!required
    },
    emptyFileList(data) {
      const { component, key } = data.config
      const { model } = data

      if (component !== 'uploader') return false

      return !(Array.isArray(model[key]) && model[key].length)
    },
    maxDate(data) {
      const { maxDate } = data.config
      return maxDate || Date.now()
    },
    minDate(data) {
      const { minDate } = data.config
      return minDate || 0
    },
    minYear(data) {
      const { minYear } = data.config
      return minYear || 1970
    },
    maxYear(data) {
      const { maxYear } = data.config
      return maxYear || new Date().getFullYear()
    },
    yearRange(data) {
      const { maxYear, minYear, _rangeStart, config } = data
      if (config.component !== 'year-range-picker') return []

      const startRange = Array.from(
        { length: maxYear - minYear + 1 },
        (_, index) => minYear + index
      )

      return [
        {
          values: startRange,
        },
        {
          values: startRange.filter(
            y => _rangeStart ? y >= _rangeStart : y >= minYear
          ),
        },
      ]
    },
    clearable(data) {
      if (data.config.readonly) return false
      return !!data.text
    },
    fileList(data) {
      const { model } = data
      const { component, key } = data.config

      if (!['uploader'].includes(component)) return []

      return model[key] || []
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    syncData(key, value, cb = () => { }) {
      const { component, type } = this.data.config

      // 数字类型处理，应对第三方键盘输入或手动粘贴的情况
      if (component === 'field' && ['number', 'digit'].includes(type)) {
        value = value || ''

        if (type === 'number') {
          value = value.replace(/[^\d]/g, '')
        }

        else if (type === 'digit') {
          // 至多保留一个小数点
          value = value
            .replace(/[^\d.]/g, '')
            .replace(".", "$#$")
            .replace(/\./g, "")
            .replace("$#$", ".")
        }
      }
      
      this.triggerEvent('sync', { key, value })
    },
    showPopup() {
      if (this.data.config.readonly) return
      this.setData({ show: true })
    },
    closePopup() {
      this.setData({ show: false })
    },
    onConfirm(e) {
      const { component } = this.data.config
      const { detail } = e

      let value
      if (component === 'year-range-picker') {
        value = detail.value.join('-')
      } else if (component === 'picker') {
        value = detail.value
      } else if (component === 'datetime-picker') {
        value = detail
      }

      this.closePopup()
      this.syncData(this.data.config.key, typeof value === 'object' ? value.value : value)
    },
    onClear() {
      this.syncData(this.data.config.key, '')
    },
    onChange(e) {
      this.syncData(this.data.config.key, e.detail)
    },
    onDelete(e) {
      const { index } = e.detail
      const { model, config } = this.data
      model[config.key].splice(index, 1)

      this.syncData(config.key, model[config.key])
    },
    beforeUpload(e) {
      const { url } = e.detail.file
      return this.upload({ url })
    },
    upload(item) {
      const { model, config } = this.data
      const { key } = config

      let index = model[key].findIndex(file => file === item)

      if (index === -1) {
        model[key].push(item)
        index = model[key].length - 1
      }

      const complete = () => {
        // this.syncData(key, model[key])
        // 图像、视频文件可同时上传多个
        // 过程中，model[key] 可能不是最新的（闭包下）
        // 也可能在过程中手动取消了图片上传
        // 故在上传结束后需对状态进行确认（通过 this.data 访问最新数据）
        const index = this.data.model[key].findIndex(e => e.url === item.url)
        if (index !== -1) {
          this.data.model[key].splice(index, 1, item)
          this.syncData(key, this.data.model[key])
        }
      }

      // mock
      setTimeout(complete, 300)

      // const handleErr = (err) => {
      //   Object.assign(item, { status: 'failed', message: `上传失败\r\n点击重试` })
      //   console.error(err)
      // }
      // Object.assign(item, { status: 'uploading', message: '上传中' })
      // this.syncData(key, model[key], () => {
      //   wx.uploadFile({
      //     url: '/TODO',
      //     filePath: item.url,
      //     name: 'file',
      //     header: {},
      //     statusCode: 200,
      //     success: (res) => {
      //       try {
      //         const { data } = JSON.parse(res.data)
      //         Object.assign(item, { status: 'done', message: '上传成功', ...data })
      //       } catch (err) {
      //         handleErr(err)
      //       }
      //     },
      //     fail: handleErr,
      //     complete,
      //   })
      // })
    },
    onPreview(e) {
      const { url, status } = e.detail
      const { model, config } = this.data
      const { key } = config

      // 上传失败重试
      if (status === 'failed') {
        const item = model[key].find(file => file.url === url)
        return this.upload(item)
      }
    },
    rangeChange(e) {
      const { value } = e.detail
      const [_rangeStart] = value
      this.setData({ _rangeStart })
    },
  },

  lifetimes: {
    async attached() {
      const { key, component, columns = [] } = this.data.config
      const { model } = this.data

      this.setData({ columns })

      // init default value
      if (['uploader'].includes(component)) {
        if (!Array.isArray(model[key])) {
          this.syncData(key, [])
        }
      }
    },
  },
})
