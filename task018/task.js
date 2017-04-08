var inner=document.getElementById('inner');
var getData=[];
var wrapper=document.getElementById('wrapper');
var add_btn_left=document.getElementById('add_btn_left');
var add_btn_right=document.getElementById('add_btn_right');
var remove_btn_left=document.getElementById('remove_btn_left');
var remove_btn_right=document.getElementById('remove_btn_right');
//兼容浏览器添加事件
function addHandler(ele,event,handler){
    if(ele.attachEvent){
        ele.attachEvent("on"+event,handler);
    }else if(ele.addEventListener){
        ele.addEventListener(event,handler,false);
    }else{
        ele[on+"event"]=handler;
    }
}
//渲染数组中的元素
function renderData(){
    var htmlArr='';
    var len=getData.length;
    for(var i=0;i<len;i++){
        htmlArr+="<div class='item'>"+getData[i]+"</div>";
    }
    wrapper.innerHTML=htmlArr;
    remove();
}
//对各按钮进行事件注册
addHandler(add_btn_left,'click',function(){
    if(!isNaN(inner.value)){
    getData.unshift(inner.value);
    renderData();
    }else{
        alert("暂时只可输入数字，请确认后进行操作")
    }
});
addHandler(add_btn_right,'click',function(){
    if(!isNaN(inner.value)){
        getData.push(inner.value);
        renderData();
    }else{
        alert("暂时只可输入数字，请确认后进行操作")
    }
});
addHandler(remove_btn_left,'click',function(){
    if(getData.length!==0){
        var tempKey=null;
        tempKey=getData.shift();
        renderData();
        alert("您当前删除元素为"+tempKey);
    }else{
        alert('当前队列为空，请检查后进行操作')
    }
});
addHandler(remove_btn_right,'click',function(){
    if(getData.length!==0){
        var tempKey=null;
        tempKey=getData.pop();
        renderData();
        alert("您当前删除元素为"+tempKey);
    }else{
        alert('当前队列为空，请检查后进行操作')
    }
});
//对个元素进行事件注册
function remove(){
    for(var i=0;i<wrapper.childNodes.length;i++){
        addHandler(wrapper.childNodes[i],"click",function(i){
            return function(){
                return getData.splice(i,1),renderData();
            }
        }(i));
    }
}