const validateBehavior = require('../../components/d-form/validate.behavior')

Page({
  behaviors: [validateBehavior],

  data: {
    model: {
      insuranceNo: '12039796916230123',
    },
    configs: [
      {
        component: 'field',
        label: '保单号',
        key: 'insuranceNo',
        readonly: true,
      },
      {
        component: 'field',
        label: '投保人姓名',
        key: 'name',
        required: true,
        maxLength: 10,
      },
      {
        component: 'field',
        label: '投保人手机号',
        key: 'phone',
        type: 'number',
        required: true,
        maxLength: 11,
      },
      {
        component: 'radio',
        label: '投保人性别',
        key: 'sex',
        required: true,
        columns: [
          { text: '男', value: '1' },
          { text: '女', value: '0' },
        ],
      },
      {
        component: 'picker',
        label: '投保方案',
        key: 'plan',
        required: true,
        columns: [
          { text: '个人健康险A', value: 'A' },
          { text: '个人健康险B', value: 'B' },
          { text: '个人健康险B', value: 'C' },
        ],
      },
      {
        component: 'field',
        label: '投保金额',
        key: 'amount',
        type: 'digit',
        required: true,
        maxLength: 20,
      },
      {
        component: 'field',
        label: '补充',
        key: 'detail',
        type: 'textarea',
        maxLength: 160,
        autosize: { maxHeight: 100, minHeight: 100 },
      },
      {
        component: 'uploader',
        label: '附件',
        key: 'fileList',
      },
      {
        component: 'datetime-picker',
        label: '投保时间',
        key: 'date',
        type: 'date',
        format: 'yyyy-MM-dd',
        required: true,
      },
      {
        component: 'year-range-picker',
        label: '合同有效期',
        key: 'range',
        required: true,
      },
    ]
  },

  syncData(e) {
    const { key, value } = e.detail
    const { path } = e.target.dataset
    this.setData({
      [`${path}.${key}`]: value
    })
  },

  async submit() {
    await this.validate(['#form'], true)
  }
})
