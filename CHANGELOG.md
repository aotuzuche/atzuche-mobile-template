# CHANGELOG

> 记录脚手架  文件变动

### 2018-09-05 14:45:18

1. 修改 auto-prod-filter-loader 插件，只有在 test 环境才出现 vconsole
2. 修复微信分享 http 导致 error 报错，修改其中出现的域名的协议为当前页面的协议
3. 升级 babel 的版本，支持写法

可选链

```js
const obj = {}

obj?.a?.b?.c
```

绑定

```js
obj::func // 等价于 func.bind(obj)
::obj.func  // 等价于 obj.func.bind(obj)
```

管道操作符

```js
function doubleSay(str) {
  return str + ', ' + str
}
function capitalize(str) {
  return str[0].toUpperCase() + str.substring(1)
}
function exclaim(str) {
  return str + '!'
}

let result = "hello" |> doubleSay |> capitalize |> exclaim;result //=> "Hello, hello!"
```

逻辑操作符
```js
a ||= b;
a || (a = b);

a &&= b;
a && (a = b);

a ??= b;
a ?? (a = b);
```

### 2018-09-04 11:25:07

1. 添加 as.js 文件，统计埋点
2. 添加 wx.js 文件，微信分享
3. 添加 tool.js 高阶组件，抽离出 view.js 中功能相关的方法
4. 剥离 view.js 高阶组件中功能方法，纯粹为页面高阶组件，增加微信分享方法和微信分享初始化

### 2018-09-03 16:13:42

1. 添加 editorconfig

### 2018-08-31 10:16:52

1. appConfig.js 增加端口、代理地址配置和 html title
2. 抽出 flexible 文件

### 2018-08-28 18:00:00

1. 修改 pwa 插件会把 index.html 离线的问题
2. 修改 button 组件 children 包装标签的方式

### 2018-08-28 17:49:20

1. 修改 package.json 中 prettier 的初始化命令，并且增加 prettier 依赖
2. 增加 CHANGELOG.md 文件
3. 修正根目录 js 文件的  eslint 错误
