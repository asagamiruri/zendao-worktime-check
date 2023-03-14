# zendao-worktime-check
用于自家公司禅道日志页面，通过油猴注入脚本提示工作日欠缺工时（需要安装油猴插件）

---

## 油猴相关
chrome扩展程序安装 Tampermonkey
  - @name 脚本名称
  - @match 匹配页面
  - @include 匹配多个页面，多个页面声明多个@include
  - @grant 声明 GM_xxx 函数的使用列表
  
---
## 项目

### 脚手架
使用 [vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey "vite-plugin-monkey")。
使用方式参照文档，这里使用 react + js 开发

### 项目启动
[油猴脚本中引用的 localhost 域下脚本，一般情况下是不能在一个正常网页下运行的，会违反浏览器与网站的安全策略（CSP）](https://www.bilibili.com/read/cv13278537)

（不知道为啥找不到解决CORS问题的插件，开个梯子直连完事）