/**
 * Created by DrugsZ on 2017/4/16.
 */
var data=[];
var parseTree_button=$("#parseTree_button");
var parseTree_button_search=$("#parseTree_button_search");
 var timer=null;
var levelOrderTraversal_button=$("#levelOrderTraversal_button");
var levelOrderTraversal_button_search=$("#levelOrderTraversal_button_search");
//类jq选择器
function $(id){
    return document.querySelector(id);
}
//跨浏览器绑定事件
function addEventHandler(ele,event,handler){
    if(ele.attachEvent){
        ele.attachEvent("on"+event,handler)
    }else if(ele.addEventListener){
        ele.addEventListener(event,handler,false)
    }else{
        ele["on"+event]=handler;
    }
}
//深度优先遍历
function parseTree(e){
    if(!e){
        return;
    }
    data.push(e);
    for(var i=0;i<e.children.length;i++){
        var item=e.children[i];
        if(item||item.children.length>0){
            arguments.callee(item);
        }
    }
}
//广度优先遍历
function levelOrderTraversal(e){
    if(!e){
        return;
    }
     var tempArray=[];
    tempArray.push(e);
    while (tempArray.length!==0){
        node=tempArray.shift();
        data.push(node);
        if(node.children.length>-1){
            for(var i=0;i<node.children.length;i++){
                var tempKey=node.children[i];
                tempArray.push(tempKey);
            }
        }
    }
}
//颜色修改函数
//传入一个参数遍历，传入两个参数搜索
function colorChange(data,key){
    for(var k=0;k<data.length;k++){
        data[k].style.backgroundColor="#fff";
    }
    var i = 0;
    if(!key) {
        data[i].style.backgroundColor = 'pink';
    }else{
        var len=key.length;
        if(data[i].textContent.slice(0,len)==key){
            clearInterval(timer);
            data[i].style.backgroundColor="blue";
            return true;
        }
    }
    timer = setInterval(function () {
        i++;
        if(!key){
            if (i < data.length) {
                data[i-1].style.backgroundColor = '#fff';
                data[i].style.backgroundColor = 'pink';
            } else {
                clearInterval(timer);
                data[data.length-1].style.backgroundColor = '#fff';
            }
        }else{
            var len=key.length;
            if (i < data.length) {
                if(data[i].textContent.slice(0,len)==key)
                {
                    clearInterval(timer);
                    data[i].style.backgroundColor="blue";
                    data[i-1].style.backgroundColor="#fff";
                }else {
                    data[i - 1].style.backgroundColor = '#fff';
                    data[i].style.backgroundColor = 'pink';
                }
            } else {
                clearInterval(timer);
                data[data.length-1].style.backgroundColor = '#fff';
                alert("未搜索到指定内容，请更换关键词重试！")
            }
        }
    },500)
}
//初始化函数
function init(event){
    var wrapper=$("#wrapper");
    clearInterval(timer);
    data=[];
    var key=$("#input").value.trim();
    if(event.target.id=="parseTree_button") {
        parseTree(wrapper);
        colorChange(data);
    }else if(event.target.id=="levelOrderTraversal_button"){
        levelOrderTraversal(wrapper);
        colorChange(data);
    }else if(event.target.id=="parseTree_button_search")
    {
        parseTree(wrapper);
        colorChange(data,key);
    }else{
        levelOrderTraversal(wrapper);
        colorChange(data,key);
    }

}
//绑定事件
addEventHandler(parseTree_button,'click',init);
addEventHandler(levelOrderTraversal_button,"click",init);
addEventHandler(parseTree_button_search,'click',init);
addEventHandler(levelOrderTraversal_button_search,"click",init);