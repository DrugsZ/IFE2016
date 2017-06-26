/**
 * Created by DrugsZ on 2017/6/10.
 */
var CreateCar=require('./CreateCar.js');
CreateCar.CreateNewCar();
var textarea=document.querySelector('textarea');
var rowList=document.querySelector('.wrapper');
var value=textarea.value;
var timer=null;
var arr=value.split('\n');
var execBtn=document.querySelector('#execute');
var refreshBtn=document.querySelector('#refresh');
refreshBtn.addEventListener('click',function(){
    textarea.value='';
});
tTimer=setInterval(getData,500);
execBtn.addEventListener('click',function(){

    execute();
},false);
textarea.addEventListener('keydown',function(){
    getData();
},false);
textarea.addEventListener('scroll',function(){
    rowList.style.top=-textarea.scrollTop+'px';
},false);
var commandTest= {
    GO: /^go(\s+)?(\d+)?$/i,
    TRA: /^tra\s+(bac|lef|top|rig)(\s+)?(\w+)?$/i,
    MOV: /^mov\s+(bac|lef|top|rig)(\s+)?(\w+)?$/i,
    BUILD:/^build$/i,
    BRU:/^bru\s+(.*)$/i
};

function execute(){
    clearInterval(timer);
    var i=0;
    arr=getData();
    timer=setInterval(function(){
        if(i>=arr.length-1){
            clearInterval(timer);
        }
        run(arr[i],i);
        i++
    },1000)
}
function run(msg,i){
    var command=getCommand(msg,i);
    var msg=msg.trim();
    if(!command){
        return false;
    }
    var isFalse=CreateCar.receive(command);
    setColor('select',i);
    if(!isFalse){
        clearInterval(timer);
        setColor('error',i);
        return false;
    }
}
function getCommand(msg,i){
    var arr=[];
    var command={};
    var msg=msg.toUpperCase().trim();
    if(msg.match(commandTest.GO)){
        arr=msg.match(commandTest.GO);
        arr.shift();
        if(!isNaN(arr[arr.length-1])) {
            command = CreateCommand('GO', arr[arr.length-1])
        }else{
            command=CreateCommand('GO',1)
        }
    }else if(msg.match(commandTest.TRA)){
        arr=msg.match(commandTest.TRA);
        arr.shift();
        if(!isNaN(arr[arr.length-1])) {
            command = CreateCommand('TRA',arr[0], arr[arr.length-1])
        }else{
            command=CreateCommand('TRA',arr[0],1)
        }
    }else  if(msg.match(commandTest.MOV)){
        arr=msg.match(commandTest.MOV);
        arr.shift();
        if(!isNaN(arr[arr.length-1])) {
            command = CreateCommand('MOV',arr[0], arr[arr.length-1])
        }else{
            command=CreateCommand('MOV',arr[0],1)
        }
    }else if(msg.match(commandTest.BUILD)){
        command.way='BUILD';
        command.num=1;
    }else if(msg.match(commandTest.BRU)) {
        arr=msg.match(commandTest.BRU);
        command.way='BRU';
        command.color=arr[1];
    }else{
            command=null
    }
    if(command==null){
        console.log('指令有误，请确认后重新操作');
        clearInterval(timer);
        setColor('error',i);
        return false;
    }else{
        return command;
    }
}
function CreateCommand(){
    var command={};
    if(arguments.length==2){
        command.way=arguments[0];
        command.num=arguments[1];
    }else if(arguments.length==3){
        command.way=arguments[0];
        command.dir=arguments[1];
        command.num=arguments[2];
    }
    return command;
}
function setRowList(num){
    var rowlist=document.querySelector('.wrapper');
    var i=rowlist.childNodes.length;
    var tempArr='';
    if(i==num){
        return false;
    }else{
        for(var j=0;j<num;j++){
            tempArr+='<div><span>'+(j+1)+'</span></div>';
        }
    }
    rowlist.innerHTML=tempArr;
}
function getData(){
        value=document.querySelector('textarea').value;
        arr=value.split('\n');
        setRowList(arr.length);
         return arr;
}
//type:select,error
function setColor(type,num){
    if(num>27&&rowList.childNodes.length-num>27){
        rowList.style.top=-rowList.childNodes[0].clientHeight*num+'px';
        textarea.scrollTop=-(rowList.offsetTop);
    }
    var arr=rowList.childNodes;
    for(var i=0;i<arr.length;i++){
        arr[i].className='';
    }
    if(type=='select'){
        arr[num].className='selectIndex';
    }else if(type=='error'){
        arr[num].className='error';
    }
}
