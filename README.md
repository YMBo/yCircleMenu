# y-circle-menu


[DEMO](https://ymbo.github.io/yCircleMenu/preview/index.html "yCircleMenu")

## Install
>npm install  y-circle-menu

## Usage
```javascript
<template>
	<yCircleMenu 
          :columns='columns' 
          :circleOr='circleOr' 
          :direc='direc'
          :itemO='itemO'
          :completeCircle='completeCircle'
          :duration='duration'
          :delay='delay'
          :isClose='isClose==0?false:true'
          :offset=offset
          >
        <Button type="warning" slot="button" >开关</Button>
	</yCircleMenu>
</template>

<script>
	import yCircleMenu from 'y-circle-menu'
	import  'y-circle-menu/dist/yCircleMenu.min.css'
...
</script>
```

## configuration

[在线配置](https://ymbo.github.io/yCircleMenu/preview/index.html "y-circle-menu")

![说明](https://github.com/YMBo/yCircleMenu/blob/master/static/img/dic.png)  

| 配置项 | 描述 | 参数 | 默认 | 类型
| ------ | ------ |------- | ------ |-------|
| circleOr | 生成圆半径附加值,放大缩小圆可用| 任意数值 | 0 | Number
| direc   | 所有item排布的区域 | top/right/bottom/left | top | String
| itemO  |item原点位置  | o/top/right/bottom/left | o(中心) | String 
| itemO  |item原点位置  | o/top/right/bottom/left | o | String 
| completeCircle | 是否为整圆,比较自由,1表示整圆 |1/0.5/0.25....|0.5(半圆) |  Number/String
| duration| item执行时间单位秒| 任意大于0的数字 | 0.5 |Number/String
| delay| 每个item之间的延迟时间，每个item依次累加 单位秒|任意大于0的数字 | 0.01|Number
|isClose| 自动收起| ture/false|false| Boolean 
|offset| 生成圆整体的偏移量（px）| 格式{x:0,y:0} | {x:0,y:0} | Object 
