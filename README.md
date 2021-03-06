## 产品说明
本作品是由LimCong个人自主研发，采用React全家桶 + Antd组件库 + NodeJS.express + MysqlHelper + webpack 等相关技术搭建而成，属于开源作品，后续将持续更新。

## 关于后台
后台已移植成一套框架，详情请访问我的github仓库。

## 关于MysqlHelper
是由LimCong个人开发的简易Mysql连接辅助，支持基础的增删改查。

## 相应头错误状态码一览
* 400：数据处理进行时异常
* 500：未找到该数据
* 404：未找到请求头数据

## Available Scripts

In the project directory, you can run:

"build": "react-app-rewired build",

"test": "react-app-rewired start",

"faster":"node host",

"lastest":"yarn build && node host",

"start":"git pull && yarn build && node host"

### `yarn test`

通过测试环境打开lemon-space<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn faster`

使用本操作时请确保您的项目在最新版本时已经build过了
Open [http://localhost](http://localhost) to view it in the browser.

### `yarn format`

一个正式的启动方式。
Open [http://localhost](http://localhost) to view it in the browser.

### `yarn start`

先保持最新版本后，build，启动。
Open [http://localhost](http://localhost) to view it in the browser.

### 端口被占用的解决方案

#### Windows

netstat -ano |findstr "443"  // 找到进程id

taskkill /f /t /im "找到的端口号"

#### Linux / Mac

lsof -i:443 // 找到进程id

kill -9 进程id
