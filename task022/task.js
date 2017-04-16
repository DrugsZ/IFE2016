/**
 * Created by DrugsZ on 2017/4/16.
 */
var pageStateChange={
    stateSelect:'前序遍历'
};
var button=$("#button");
var wrapper=$("#wrapper");
//获取元素
function $(type){
    return document.querySelector(type);
}
//跨浏览器添加事件
function addEventHandler(ele,event,handler){
    if(ele.attachEvent){
        ele.attachEvent("on"+event,handler);
    }else if(ele.addEventListener){
        ele.addEventListener(event,handler,false);
    }else{
        ele["on"+event]=handler;
    }
}
//确定遍历函数方式
function selectChange(){
    var select=$('#select');
    var value=select.value;
    if(pageStateChange.stateSelect!==value){
        pageStateChange.stateSelect=value;
    }
}
//线序遍历
function preOrder(ele){
        if(ele){
            data.push(ele);
            arguments.callee(ele.firstElementChild);
            arguments.callee(ele.lastElementChild);
        }
    }
function inOrder(ele){
        if(ele){
            arguments.callee(ele.firstElementChild);
            data.push(ele);
            arguments.callee(ele.lastElementChild);
        }
    }
function postOrder(ele){
        if(ele){
            arguments.callee(ele.firstElementChild);
            arguments.callee(ele.lastElementChild);
            data.push(ele);
        }
}
//修改颜色函数
function colorChange(data){
    var i = 0;
    data[i].style.backgroundColor = 'pink';
    timer = setInterval(function () {
        i++;
        if (i < data.length) {
            data[i-1].style.backgroundColor = '#fff';
            data[i].style.backgroundColor = 'pink';
        } else {
            clearInterval(timer);
            data[data.length-1].style.backgroundColor = '#fff';
        }
    },500)
}
function init(){
    data=[];
    selectChange();
    switch (pageStateChange.stateSelect){
        case "前序遍历":
            preOrder(wrapper);
            break;
        case "中序遍历":
            inOrder(wrapper);
            break;
        default:
            postOrder(wrapper);
            break;
    }
    colorChange(data);
}
addEventHandler(button,'click',init);
