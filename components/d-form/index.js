// components/d-form/index.js
const { isFalsy } = require('../utils/index')

Component({
  behaviors: ['wx://component-export'],
  export() {
    return {
      validate: this.validate.bind(this),
      getEmptyFields: this.getEmptyFields.bind(this),
      getEmptyLabels: this.getEmptyLabels.bind(this),
    }
  },

  options: {
    multipleSlots: true,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    configs: {
      type: Array,
      value: [],
    },
    model: {
      type: Object,
      value: {},
    },
    border: {
      type: Boolean,
      value: false,
    },
    showAllFields: {
      type: Boolean,
      value: true, 
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    syncData(e) {
      const { key, value } = e.detail
      this.setData({ [`model.${key}`]: value })
      this.triggerEvent('sync', { key, value })
    },
    validate() {
      const { configs, model } = this.data
      const emptyFields = []

      for (const config of configs) {
        // 过滤非必填字段
        if (!config.required) continue
        const value = model[config.key]

        // 过滤正在上传、上传失败的图片
        if (config.component === 'uploader') {
          const uploadedList = (value || []).filter(item => !['uploading', 'failed'].includes(item.status))
          if (uploadedList.length === 0) {
            emptyFields.push(config)
            continue
          }
        }

        // 过滤空值
        if (isFalsy(value)) {
          emptyFields.push(config)
          continue
        }
      }

      const emptyLabels = emptyFields.map(config => config.label)

      return {
        emptyFields,
        emptyLabels
      }
    },
    getEmptyFields() {
      return this.validate().emptyFields
    },
    getEmptyLabels() {
      return this.validate().emptyLabels
    },
  }
})
