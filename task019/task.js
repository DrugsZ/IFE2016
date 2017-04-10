/**
 * Created by DrugsZ on 2017/4/10.
 */
var inner=$('inner');
var input=document.querySelectorAll("input");
var queue=$('queue');
function $(id){
    return document.getElementById(id);
}
//初始化
function init(){
    var queue=$('queue');
    var htmlStr='';
    for(var i=0;i<10;i++){
        htmlStr+="<li style='height:"+parseInt(Math.round(Math.random()*90)+10)+"px'></li>"
    }
    queue.innerHTML=htmlStr;
    del();
}init();
//跨浏览器绑定事件
function addHandler(ele,event,hanler){
    if(ele.attachEvent){
        ele.attachEvent("on"+event,hanler);
    }else if(ele.addEventListener){
        ele.addEventListener(event,hanler,false);
    }else{
        ele["on"+event]=hanler;
    }
}
//判断队列内项目是否超过限制
function isFull(num){
    var len=$('queue').querySelectorAll('li');
    if(len.length<=num){
        return true;
    }else{
        return  false;
    }
}
//对添加 删除按钮绑定事件
addHandler(input[1],"click",leftPush);
addHandler(input[2],"click",rightPush);
addHandler(input[3],"click",leftPop);
addHandler(input[4],"click",rightPop);
addHandler(input[5],"click",init);
addHandler(input[6],"click",bubbleSort);
function leftPush(){
    var firstChild=$('queue').querySelectorAll('li')[0];
    var value=parseInt(inner.value);
    var newChild=document.createElement('li');
    newChild.style.height=value+'px';
    if(isNaN(value)||value>100||value<10){
        alert("请输入10-100的整数")
    }else if(isFull(60)){
        if(firstChild){
            queue.insertBefore(newChild,firstChild);
            inner.value="";
        }else{
            queue.appendChild(newChild);
            inner.value="";
            del();
        }
    }else{
        alert("队列已满，请删除元素后进行操作");
    }
}
function rightPush(){
    var value=parseInt(inner.value);
    var newChild=document.createElement('li');
    newChild.style.height=value+'px';
    if(isNaN(value)||value>100||value<10)
    {
        alert("请输入10-100的整数");
    }else if(isFull(60)){
       queue.appendChild(newChild);
       inner.value="";
       del();
   }else{
       alert("队列已满，请删除元素后进行操作");
   }
}
function leftPop(){
    var item=queue.querySelectorAll('li');
    var len=item.length;
    if(len==0){
        alert("队列已空，请确认后进行操作")
    }else{
        queue.removeChild(item[0]);
    }
}
function rightPop(){
    var item=queue.querySelectorAll('li');
    var len=item.length;
    if(len==0){
        alert("队列已空，请确认后进行操作")
    }else{
        queue.removeChild(item[len-1]);
    }
}
function del(){
    var item=queue.querySelectorAll('li');
    var len=item.length;
    for(var i=0;i<len;i++){
        item[i].index=i;
        addHandler(item[i],"click",function(i){
            queue.removeChild(i.target);
        })
    }
}
function swap(ele1, ele2) {
    var temp = ele1.offsetHeight;

    ele1.offsetHeight = ele2.offsetHeight;
    ele1.style.height = ele2.offsetHeight + "px";
    ele2.offsetHeight = temp;
    ele2.style.height = temp + "px";

    // 如果只是相邻元素swap，可以使用下面这个方法直接交换dom元素
    // 但是考虑到非冒泡排序算法使用swap时不一定是交换相邻元素(比
    // 如插入排序)，所以使用交换高度的方法。注意ele.style.height
    // 和ele.offsetHeight都需要互换

    // ele1.parentNode.insertBefore(ele2, ele1);
};

function bubbleSort() {
    var eles = queue.querySelectorAll("li"),
        len  = eles.length, i, j = 0, delay = 150, timer;

    i = len - 1;
    timer = setInterval(function() {
        if(i < 1) {
            clearInterval(timer);
        }
        if(j == i) {
            --i;
            j = 0;
        }
        if (eles[j].offsetHeight > eles[j+1].offsetHeight) {
            swap(eles[j], eles[j+1]);
        }
        ++j;
    }, delay);
};