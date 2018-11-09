<template>
<div>
    <Card style="width:400px;margin:10px;position:absolute">
        <Form :label-width="240">
          <FormItem label="circleOr：生成圆半径附加值,放大缩小圆可用（默认0）">
              <InputNumber v-model="circleOr"></InputNumber>
          </FormItem>
          <FormItem label="direc：所有item排布的区域（默认top）">
              <Select v-model="direc">
                <Option value="top">top</Option>
                <Option value="right">right</Option>
                <Option value="bottom">bottom</Option>
                <Option value="left">left</Option>
            </Select>
          </FormItem>
          <FormItem label="itemO：item原点位置（默认o）">
              <Select v-model="itemO">
                <Option value="top">top</Option>
                <Option value="right">right</Option>
                <Option value="bottom">bottom</Option>
                <Option value="left">left</Option>
                <Option value="o">o（中心）</Option>
            </Select>
          </FormItem>
          <FormItem label="completeCircle：是否为整圆（默认半圆）">
              <Select v-model="completeCircle">
                <Option value="1">1（整圆）</Option>
                <Option value="0.5">0.5（半圆）</Option>
                <Option value="0.25">0.25（1/4圆）</Option>
                <Option value="0.125">0.125（1/8圆）</Option>
            </Select>
          </FormItem>
          <FormItem label="duration：item执行时间 单位秒（默认0.5）">
              <InputNumber :step="0.1" v-model="duration" :min="0"></InputNumber>
          </FormItem>
          <FormItem label="delay：每个item之间的延迟时间 单位秒（默认0.01，每个item依次累加）">
              <InputNumber :step="0.01" v-model="delay" :min="0"></InputNumber>
          </FormItem>
          <FormItem label="点击空白区域收起（默认false）">
              <Select v-model="isClose">
                <Option value="1">是</Option>
                <Option value="0">否</Option>
            </Select>
          </FormItem>
        <span style="color:red;text-align:left">
          tip:参数变动后，重新点击开关即可<br/>
          如果遇到比如日历组件弹出内容被别的item元素遮挡，可通过<br/>
          .y-box-item>.item:nth-child(6){<br/>
              z-index: 555;<br/>
          }<br/>
          这种方式定制item格式
        </span>
      </Form>
  <Button @click="value4 = true" type="primary">查看代码</Button>
    </Card>
    <!-- <pre v-highlightjs><code class="javascript"> {{this.str}}</code></pre> -->
    <span class="hello" ref="code">
      <yCircleMenu 
          :columns='columns' 
          :circleOr='circleOr' 
          :direc='direc'
          :itemO='itemO'
          :completeCircle='completeCircle'
          :duration='duration'
          :delay='delay'
          :isClose='isClose==0?false:true'
          >
        <Button type="warning" slot="button" >开关</Button>
      </yCircleMenu>
  </span>
        <Drawer :closable="false" width="640" v-model="value4">
            <div class="demo-drawer-profile">
              <highlight-code lang="javascript" :code='code'>

              </highlight-code>
            <Divider />
            <Divider />
            </div>
        </Drawer>
</div>
</template>

<script>
import yCircleMenu from './yCircleMenu.vue'
let code=`
<yCircleMenu 
    :columns='columns' 
    :circleOr='circleOr' 
    :direc='direc'
    :itemO='itemO'
    :completeCircle='completeCircle'
    :duration='duration'
    :delay='delay'
    :isClose='isClose==0?false:true'
    >
<Button type="warning" slot="button" >开关</Button>
</yCircleMenu>
export default {
  name: 'HelloWorld',
  components:{
    yCircleMenu
  },
  data () {
    return {
      value4:false,
      isClose:'0',
      circleOr:0,
      direc:'top',
      itemO:'o',
      completeCircle:'0.5',
      duration:0.5,
      delay:0.01,
      columns: [{
          key:'aaa',
          render(h){
              return h('Button',{
                props:{
                  type:'success'
                }
              },'按钮1')
          }
      },{
          key:'age',
          render(h){
              return h('Button',{
                props:{
                  type:'success'
                }
              },'🐂')
          }
      },{
          key:'dd',
          render(h){
              return h('Icon',{
                props:{
                  type:'ios-apps-outline',
                  size:'32'
                }
              })
          }
      },{
          key:'ddvv',
          render(h){
              let container=[{name:'第一'},{name:'第二'},{name:'第三'}]
                const dom=container.map(v=>{
                    return (
                        h('Option',{
                            props:{
                                value:v.name
                            }
                        },v.name)
                    )
                })
                return h('Select',{
                    props:{
                        value:container[0].name
                    }
                },
                [...dom])
            }
      },{
          key:'xx',
          render(h){
              return h('Slider',{
                style:{
                  'width':'100px'
                },
                props:{
                  value:[20, 50]
                }
              },'🏃')
          }
      },{
          key:'x',
          render(h){
              return h('DatePicker',{
                props:{
                  type:'date',
                  placeholder:'Select date'
                },
                style:{
                  width:'100px'
                }
              })
          }
      },{
          key:'zxcv',
          render(h){
              return h('Button',{
                props:{
                  type:'success'
                }
              },'可以放')
          }
      },{
          key:'vse',
          render(h){
              return h('Button',{
                props:{
                  type:'success'
                }
              },'任何东西')
          }
      },{
          key:'qwe',
          render(h){
              return h('Button',{
                props:{
                  type:'success'
                }
              },'比如')
          }
      },{
          key:'asdf',
          render(h){
              return h('Button',{
                props:{
                  type:'success'
                }
              },'表格、按钮')
          }
      },{
          key:'zsdf',
          render(h){
              return h('Button',{
                props:{
                  type:'success'
                }
              },'图标')
          }
      },{
          key:'zzx',
          render(h){
              return h('Button',{
                props:{
                  type:'success'
                }
              },'✋')
          }
      }]
    }
  }
}
<\/script>
<style lang="less">
.hello{
  position: absolute;
  top: 50%;
  left: 60%;
  display: inline-block;
}
.y-box-item>.item:nth-child(6){
  z-index: 555;
}
</style>`
export default {
  name: 'HelloWorld',
  components:{
    yCircleMenu
  },
  data () {
    return {
      code:code,
      value4:false,
      isClose:'0',
      circleOr:0,
      direc:'top',
      itemO:'o',
      completeCircle:'0.5',
      duration:0.5,
      delay:0.01,
      columns: [{
          key:'aaa',
          render(h){
              return h('Button',{
                props:{
                  type:'success'
                }
              },'按钮1')
          }
      },{
          key:'age',
          render(h){
              return h('Button',{
                props:{
                  type:'success'
                }
              },'🐂')
          }
      },{
          key:'dd',
          render(h){
              return h('Icon',{
                props:{
                  type:'ios-apps-outline',
                  size:'32'
                }
              })
          }
      },{
          key:'ddvv',
          render(h){
              let container=[{name:'第一'},{name:'第二'},{name:'第三'}]
                const dom=container.map(v=>{
                    return (
                        h('Option',{
                            props:{
                                value:v.name
                            }
                        },v.name)
                    )
                })
                return h('Select',{
                    props:{
                        value:container[0].name
                    }
                },
                [...dom])
            }
      },{
          key:'xx',
          render(h){
              return h('Slider',{
                style:{
                  'width':'100px'
                },
                props:{
                  value:[20, 50]
                }
              },'🏃')
          }
      },{
          key:'x',
          render(h){
              return h('DatePicker',{
                props:{
                  type:'date',
                  placeholder:'Select date'
                },
                style:{
                  width:'100px'
                }
              })
          }
      },{
          key:'zxcv',
          render(h){
              return h('Button',{
                props:{
                  type:'success'
                }
              },'可以放')
          }
      },{
          key:'vse',
          render(h){
              return h('Button',{
                props:{
                  type:'success'
                }
              },'任何东西')
          }
      },{
          key:'qwe',
          render(h){
              return h('Button',{
                props:{
                  type:'success'
                }
              },'比如')
          }
      },{
          key:'asdf',
          render(h){
              return h('Button',{
                props:{
                  type:'success'
                }
              },'表格、按钮')
          }
      },{
          key:'zsdf',
          render(h){
              return h('Button',{
                props:{
                  type:'success'
                }
              },'图标')
          }
      },{
          key:'zzx',
          render(h){
              return h('Button',{
                props:{
                  type:'success'
                }
              },'✋')
          }
      }]
    }
  },
  methods:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.hello{
  position: absolute;
  top: 50%;
  left: 60%;
  display: inline-block;
}
.y-box-item>.item:nth-child(6){
  z-index: 555;
}
</style>