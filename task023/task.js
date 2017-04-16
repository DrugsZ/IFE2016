/**
 * Created by DrugsZ on 2017/4/16.
 */
var data=[];
var search_button=$("#search");
function $(id){
    return document.querySelector(id);
}
function addEventHandler(ele,event,handler){
    if(ele.attachEvent){
        ele.attachEvent("on"+event,handler)
    }else if(ele.addEventListener){
        ele.addEventListener(event,handler,false)
    }else{
        ele["on"+event]=handler;
    }
}
function parseTree(e){
    if(!e){
        return;
    }
    for(var i=0;i<e.children.length;i++){
        var item=e.children[i];
        data.push(item);
        if(item||item.children.length>0){
            arguments.callee(item);
        }
    }
}
function colorChange(data){
    var i=0;
    data[i].style.backgroundColor="pink";
    timer=setInterval(
        function(){
            i++;
            if(i<data.length){
                data[i].style.backgroundColor="pink";
                data[i-1].style.backgroundColor="#ffffff";
            }else{
                clearInterval(timer);
                data[data.length-1].style.backgroundColor="#ffffff"
            }
        },500
    )
}
function init(){
    var wrapper=$("#wrapper")
    parseTree(wrapper);
    colorChange(data);
}
addEventHandler(search_button,'click',init);