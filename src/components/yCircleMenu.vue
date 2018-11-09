<template>
    <div class="y-box">
        <input ref="input"  v-if="isClose" class="input"  type="text" @blur="close">
        <div class="y-box-own" @mousedown="showItemF" ref="switch">
            <slot class="button" name="button" ></slot>
        </div>
        <ul ref='ul' class="y-box-item"  :class="showItem?'open':'close'" @mousedown="ulmousedown">
            <li class="item" v-for="item in columns" :key="item.key">
                <Expand :name='item.name' :render='item.render'></Expand>
            </li>
        </ul>
    </div>
</template>
<script>
import  Expand  from "./expand.js";
export default {
    name:'yCircleMenu',
    components:{
        Expand
    },
    data(){
        return {
            showHead:true,
            showItem:false,
            // item最大宽度
            itemMaxWidth:0,
            // item最大高度
            itemMaxHeight:0,
            // 默认圆的半径附加值，在自动生成的圆的半径基础上加上这个值
            defaultOr:50,
            // 圆半径
            or:0,
            // 第二象限xy轴高度
            oYX:{},
            // 每个点的位置数组
            itemPoint:[],
            spacing:20,
            // 每个item宽高
            itemWH:[],
            effective:true,
        }
    },
    props:{
        columns:{
            type:Array,
            default:function () {
                return []
            }
        },
        direc:{
            type:String,
            default:'top'
        },
        // 圆半径附加值
        circleOr:{
            type:[Number,String],
            default:0
        },
        // item原点位置
        itemO:{
            type:[String],
            default:'o'
        },
        // 是否为整圆
        completeCircle:{
            type:[Number,String],
            default:0.5
        },
        // 每个item动画执行的时间,单位秒
        duration:{
            type:[Number],
            default:.5
        },
        // 每个item的延迟时间,单位秒
        delay:{
            type:Number,
            default:0.01
        },
        // 点击空白区域关闭
        isClose:{
            type:[Boolean,String],
            default:false,
        }
    },
    computed:{
        allAtems(){
            return this.$refs.ul.children
        },
        // 获取半圆夹角
        Angle(){
            let i=this.deg===360?0:1
            return this.deg/(this.allAtems.length+i);
        },
        deg(){
            return 360*this.completeCircle;
        },
        // 在以开关为坐标轴的第二象限元素数量
        // 如果有.5的情况则为中间元素落到x轴上
        twoQuadrant(){
            return this.allAtems.length/2
        },
        switchDom(){
            return this.$refs.switch
        },
        switchWH(){
            let w=this.switchDom.getBoundingClientRect().width;
            let h=this.switchDom.getBoundingClientRect().height;
            return {
                width:w,
                height:h
            }
        },
    },
    beforeUpdate(){
        this.init()
    },
    mounted(){
        let a=this.itemsWH
        if(this.$slots.header===undefined){
            this.showHead=false
        }else{
            this.showHead=true
        }
        this.init()
    },
    methods:{
        init(){
            this.getY();
            this.getOr()
            this.setItemXY()
        },
        // 点击li不收起圆
        ulmousedown(e){
            if(e.target&&this.isClose){
                this.effective=false;
            }else{
                this.effective=true;
            }
            if(this.isClose){
            this.$refs.input.focus()
            }
        },
        // 获取每个子元素宽高
        itemsWH(i){
            return {
                width:this.allAtems[i].getBoundingClientRect().width,
                height:this.allAtems[i].getBoundingClientRect().height
            }
        },
        // 获得xy轴高度
        getY(){
            let width=0,height=0;
            for(let i =0,length=this.allAtems.length;i<length;i++){
                const o=this.itemsWH(i);
                width+=o.width
                height+=o.height
                this.itemWH.push({
                    w:o.width,
                    h:o.height
                })
            }
            // 如果是正圆,则一二、三四象限item的数量为总数量的一半，所以半径为半圆的一半
            let i=this.deg==360?2:1
            let oYX={
                x:width/i,
                y:height/i
            }
            this.oYX=oYX
        },
        // 获得圆半径,根据item 数量的一半获取，x值必须根据半径获得
        getOr(){
            let {x,y}=this.oYX;
            x=x/2;
            y=y/2;
            this.or=x+Number(this.circleOr)
        },
        // 设定所有item中最大宽度和最大高度
        setItemMax(){
            let ul=this.$refs.ul;
            let childrens=ul.childrens;
            let widthArr=[],heightArr=[];;
            childrens.forEach((v,i)=>{
                itemObj=this.itemsWH(i);
                widthArr.push(itemObj.width) 
                heightArr.push(itemObj.height) 
            })
            this.itemMaxWidth= Math.max(...widthArr)
            this.itemMaxHeight= Math.max(...widthArr)
        },
        close(event){ 
            if(!this.effective) {
                this.effective=true;
                this.$refs.input.focus() 
                return;
            }
            if(!this.showItem)return;
            this.showItem=false;
        },
        showItemF(event){
            this.showItem=!this.showItem
        },
        animateItem(){
            if(this.isClose)this.$refs.input.focus();
            [...this.allAtems].forEach((v,i)=>{
                v.style.transform=`translate(${this.itemPoint[i].x}px,${this.itemPoint[i].y}px)`;
                v.style.transition=`all ${this.duration}s ${i*this.delay}s`;
            })
        },
        reset(){
            [...this.allAtems].forEach(v=>{
                v.style.transform=`translate(0,0)`;
            })
        },
        // 设置每一个元素的x,y值
        setItemXY(){
            let xd=this.setdirec().xd
            let yd=this.setdirec().yd
            let switchB=this.switchWH;
            this.itemPoint=[...this.allAtems].map((v,i)=>{
                let x=xd*this.or*Math.sin(this.Angle*(i+1)*2*Math.PI/360);
                let y=yd*this.or*Math.cos(this.Angle*(i+1)*2*Math.PI/360);
                // 将圆心定位在开关中心
                let ox=switchB.width/2
                let oy=switchB.height/2
                if(this.direc=='top' || this.direc=='bottom' ){
                    // 上下分布
                    [x,y]=[y,x]
                }
                x=x+ox;
                y=y+oy
                const h=this.itemsWH(i).height
                const w=this.itemsWH(i).width
                return {
                    y:this.calculateItemO(y,h,'y'),
                    x:this.calculateItemO(x,w,'x'),
                }
            })
        },
        // 所有item排布方式
        setdirec(){
            switch (this.direc) {
                case 'left':
                    return {
                        xd:-1,
                        yd:1
                    }
                    break;
                case 'right':
                    return {
                        xd:1,
                        yd:-1
                    }
                    break;
                case 'bottom':
                    return {
                        xd:1,
                        yd:1
                    }
                    break;
                case 'top':
                    return {
                        xd:-1,
                        yd:-1
                    }
                    break;
                default:
                    console.error('direc参数有误')
                    break;
            }
        },
        // item的原点位置
        // type:x/y
        calculateItemO(itemXorY,wh,type){
            const o=itemXorY>0?1:-1;
            itemXorY=Math.abs(itemXorY)
            if(type=='x'){
                switch (this.itemO) {
                    case 'top':
                        return o*itemXorY
                        break;
                    case 'right':
                        if(o<0){
                            return o*(itemXorY+wh)
                        }else{
                            return o*(itemXorY-wh)
                        }
                        break;
                    case 'bottom':
                        if(o<0){
                            // 二三想象
                            return o*(itemXorY+wh)
                        }else{
                            // 一四象限
                            return o*(itemXorY-wh)
                        }
                        break;
                    case 'left':
                        return o*itemXorY
                        break;
                    case 'o':
                        if(o<0){
                            // 二三象限
                            return o*(itemXorY+wh/2)
                        }else{
                            // 一四象限
                            return o*(itemXorY-wh/2)
                        }
                        break;
                    default:
                        return o
                        break;
                }
            }else{
                // Y轴
                switch (this.itemO) {
                    case 'top':
                        return o*itemXorY
                        break;
                    case 'right':
                        return o*itemXorY
                        break;
                    case 'bottom':
                        // 三四象限
                        if(o>0){
                            return o*(itemXorY-wh)
                        }else{
                        // 一二象限
                            return o*(itemXorY+wh)
                        }
                        break;
                    case 'left':
                        if(o<0){
                            return o*(itemXorY+wh)
                        }else{
                            return o*(itemXorY-wh)
                        }
                        break;
                    case 'o':
                        if(o>0){
                            return o*(itemXorY-wh/2)
                        }else{
                        // 一二象限
                            return o*(itemXorY+wh/2)
                        }
                        break;
                    default:
                        return o;
                        break;
                }
            }
        }
    },
    watch:{
        showItem:function(newD,oldD){
            this.showItem?this.animateItem():this.reset()
        }
    }
}
</script>

<style scoped>
ul.y-box-item{
    list-style: none;
}
.y-box-item{
    position: absolute;
    top: 0;
    left: 0;
}
.y-box-item{
    z-index: -1;
}
.y-box{
    position: relative;
    display: inline-block;
    z-index: 66;
}
.y-box>.mask{
    position: fixed;
    z-index: 9999;
    top:0;
    left:0;
    bottom:0;
    right:0;
}
.y-box>.input{
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    overflow: hidden;
}
.y-box-item>.item{
    position: absolute;
    transition:all 0.5s;
}
.close.y-box-item>.item{
    opacity: 0;
    overflow: hidden;
}
</style>


