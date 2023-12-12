# vant-weapp-dynamic-form

基于 [vant](https://vant-contrib.gitee.io/vant-weapp/#/home) 的微信小程序动态表单组件实现，支持以声明式配置动态创建表单

## 安装
1. 安装相关依赖 ```npm i -S @vant/weapp miniprogram-computed```
2. 微信开发者工具/工具/构建 npm
3. 拷贝 ```components``` 目录至你的项目下


## 使用
参见 [pages/index](./pages/index/index.wxml)

## 配置方式

### 输入框（field）
```json
{
  "component": "field",
  "key": "",
  "label": "",
  "readonly": false,
  "required": false,
  "maxLength": 20,
  // "type": "input",
  // "type": "number",
  // "type": "digit",
  "type": "textarea",
  "autosize": { "maxHeight": 100, "minHeight": 100 }
}
```

### 选择器（picker）
```json
{
  "component": "picker",
  "key": "",
  "label": "",
  "readonly": false,
  "required": false,
  // "columns": ["A", "B"],
  "columns": [
    { "text": "A", "value": "0" },
    { "text": "B", "value": "1" }
  ]
}
```

### 单选框（radio）
```json
{
  "component": "radio",
  "key": "",
  "label": "",
  "readonly": false,
  "required": false,
  // "columns": ["A", "B"],
  "columns": [
    { "text": "A", "value": "0" },
    { "text": "B", "value": "1" }
  ],
  // "direction": "horizontal",
  "direction": "vertical"
}
```

### 图像、视频上传（uploader）
```json
{
  "component": "uploader",
  "key": "",
  "label": "",
  "readonly": false,
  "required": false,
  "mediaType": ["image", "video"],
  "capture": ["album", "camera"],
  "maxCount": 6,
  "maxDuration": 60
}
```

### 时间选择（datetime-picker）
```json
{
  "component": "datetime-picker",
  "key": "",
  "label": "",
  "readonly": false,
  "required": false,
  "maxDate": 1702383027000,
  "minDate": 0,
}
```

### 年份区间选择（year-range-picker）
```json
{
  "component": "year-range-picker",
  "key": "",
  "label": "",
  "readonly": false,
  "required": false
}
```
