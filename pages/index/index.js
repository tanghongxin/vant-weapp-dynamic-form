const validateBehavior = require('../../components/d-form/validate.behavior')

Page({
  behaviors: [validateBehavior],

  data: {
    model: {
      insuranceNo: '12039796916230123',
      name: 'Tom',
      phone: '12345678901',
      sex: '1',
      plan: 'A',
      detail: 'Is that what this was?',
      fileList: [
        {
          url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        }
      ],
      date: 1575129600000,
      range: '2020-2023'
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
        label: '姓名',
        key: 'name',
        required: true,
        maxLength: 10,
      },
      {
        component: 'field',
        label: '手机号',
        key: 'phone',
        type: 'number',
        required: false,
        maxLength: 11,
      },
      {
        component: 'radio',
        label: '性别',
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
        required: false,
      },
      {
        component: 'year-range-picker',
        label: '合同有效期',
        key: 'range',
        required: false,
        maxYear: 2040,
        minYear: 2000,
      },
    ],
    readonly: false,
  },

  syncData(e) {
    const { key, value } = e.detail
    const { path } = e.target.dataset
    this.setData({
      [`${path}.${key}`]: value
    })
  },

  async submit() {
    if (this.data.readonly) {
      this.setData({
        readonly: false,
      })
    } else {
      await this.validate(['#form'], true)
      this.setData({
        readonly: true,
      })
    }
  }
})
