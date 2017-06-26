/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by DrugsZ on 2017/6/8.
 */
var init = __webpack_require__(1);
var command=__webpack_require__(2);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * Created by DrugsZ on 2017/6/7.
 */
var init = function () {
    var sec = document.querySelector('section');
    var oTable = document.createElement('table');
    for (var i = 0; i < 21; i++) {
        var oTr = document.createElement('tr');
        for (var j = 0; j < 21; j++) {
            var oTd = document.createElement('td');
            oTr.appendChild(oTd);
        }
        oTable.appendChild(oTr);
    }
    sec.appendChild(oTable);
    var oTr = oTable.querySelectorAll('tr');
    for (var k = 1; k < oTr.length; k++) {
        oTr[0].querySelectorAll('td')[k].innerHTML = k;
        oTr[k].querySelector('td').innerHTML = k;
    }
    var oExecute = document.createElement('input');
    oExecute.type = 'button';
    oExecute.id = 'execute';
    oExecute.value='执行';
    var oRefresh= document.createElement('input');
    oRefresh.type = 'button';
    oRefresh.id = 'refresh';
    oRefresh.value='refresh';
    sec.appendChild(oExecute);
    sec.appendChild(oRefresh);
    var oWrapperRight=document.createElement('div');
    oWrapperRight.className='right';
    var oDiv=document.createElement('div');
    oDiv.className='rowlist';
    var oWrapper=document.createElement('div');
    oWrapper.className='wrapper';
    oDiv.appendChild(oWrapper);
    var oText = document.createElement('textarea');
    oWrapperRight.appendChild(oDiv);
    oWrapperRight.appendChild(oText);
    sec.appendChild(oWrapperRight);
};
init();


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by DrugsZ on 2017/6/10.
 */
var CreateCar=__webpack_require__(3);
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
    BRU:/^bru\s+(.*)$/i,
    TUN:/^tun\s+(lef|bac|rig|top)$/i
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
    }else if(msg.match(commandTest.TUN)){
        var arr=msg.match(commandTest.TUN)
        command.way='TUN';
        command.dir=arr[arr.length-1];
        command.num=1;
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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * Created by DrugsZ on 2017/6/7.
 */
    function CreateCar() {
        this.count=20;
        self = this;
        this.direction = 'TOP';
        this.deg = 0;
        this.Element = null;
        this.seat = {
            x: 0,
            y: 0
        };
        this.status = {
            TOP: {x: 0, y: -1},
            RIG: {x: 1, y: 0},
            BAC: {x: 0, y: 1},
            LEF: {x: -1, y: 0}
        };
    this.closeArr=[];
    }

    CreateCar.constructor = CreateCar;
    CreateCar.prototype.GO = function (dir, n) {
        var x=self.seat.x+self.status[dir].x*n+1;
        var y=self.seat.y+self.status[dir].y*n+1;
        if(self.hasPane(x,y)){
            console.log('前方有墙，无法通过');
            return false;
        }
        var offtop = self.Element.offsetTop;
        var offleft = self.Element.offsetLeft;
        var left = offleft;
        var top = offtop;
        function go(dir) {
            self.seat.x += self.status[dir].x;
            self.seat.y += self.status[dir].y;
            left = left + self.status[dir].x * self.cH;
            top = top + self.status[dir].y * self.cH;
            self.Element.style.left = left + 'px';
            self.Element.style.top = top + 'px';
        }

        function loopGO(dir, n) {
            for (var i = 0; i < n; i++) {
                go(dir);
            }
        }loopGO(dir,n);
    };
    CreateCar.prototype.getDirection = function () {
        var deg = this.deg ;
        if (deg === 0) {
            self.direction = 'TOP'
        } else if (deg === 90) {
            self.direction = 'RIG'
        } else if (deg === 180) {
            self.direction = 'BAC';
        } else if (deg === -90) {
            self.direction = 'LEF'
        }
        return self.direction;
    };
    CreateCar.prototype.CreateNewCar = function () {
        var sec = document.querySelector('section');
        var oDiv = document.createElement('div');
        oDiv.style.transition = '1s';
        oDiv.className = 'car';
        var oImg = document.createElement('img');
        oImg.src = 'bot.png';
        oImg.style.transform='rotate('+180+'deg)';
        oDiv.appendChild(oImg);
        sec.appendChild(oDiv);
        self.Element = oDiv;
        self.cH=self.Element.clientHeight;
    };
    CreateCar.prototype.turn = function (dir) {
        switch (dir) {
            case 'LEF':
                self.deg = -90;
                break;
            case 'RIG':
                self.deg = 90;
                break;
            case 'BAC':
                self.deg = 180;
                break;
            case 'TOP':
                self.deg = 0;
                break;
        }
        self.Element.style.transform = 'rotate(' +self.deg + 'deg)' ;
        //this.Element.style.transform = 'rotate(' + this.deg + 'deg)';
    };
CreateCar.prototype.build=function(){
    var dir=self.getDirection();
    var x=self.seat.x+self.status[dir].x;
    var y=self.seat.y+self.status[dir].y;
    if(x+1>self.count||y+1>self.count){
        console.log('命令位置超出边界，请确认后重新执行命令');
        return false;
    }
    var oTd=document.querySelector('table').querySelectorAll('tr')[y+1].querySelectorAll('td')[x+1];
    var oDiv=document.createElement('div');
    oDiv.className='pane';
    oDiv.seat={};
    oDiv.seat.x=x+1;
    oDiv.seat.y=y+1;
    self.closeArr.push(oDiv);
    oTd.appendChild(oDiv);
};
CreateCar.prototype.bru=function(color){
    var color=color;
    var dir=self.getDirection();
    var x=self.seat.x+self.status[dir].x+1;
    var y=self.seat.y+self.status[dir].y+1;
    if(x+1>self.count||y+1>self.count){
        console.log('命令位置超出边界，请确认后重新执行命令');
        return false;
    }
    if(self.hasPane(x,y)){
        var oDiv=document.querySelector('table').querySelectorAll('tr')[y].querySelectorAll('td')[x].querySelector('div');
        oDiv.style.backgroundColor=color;
    }
}
    CreateCar.prototype.receive = function (command) {
        var direction = self.getDirection();
        if(command.dir==null){
            command.dir=direction;
        }
        if((command.way=='GO'||command.way=='MOV'||command.way=='TRA')&&(self.seat.x + self.status[command.dir].x * command.num> self.count-1 || self.seat.x + self.status[command.dir].x * command.num < 0 || self.seat.y + self.status[command.dir].y * command.num > self.count-1 || self.seat.y + self.status[command.dir].y * command.num< 0)){
                console.log('无法移动到指定位置，请确认无误 ')
                return false;
        }else {
            switch (command.way) {
                case 'GO':
                    if(self.hasPane(self.seat.x + self.status[command.dir].x * command.num,self.seat.y + self.status[command.dir].y * command.num)){
                        console.log('无法移动到指定位置，请确认道路无误');
                        return false;
                    }
                    var isTure=self.GO(direction, command.num);
                    if(!isTure){
                        return false;
                    }
                    break;
                case 'TRA':
                    self.GO(command.dir, command.num);
                    break;
                case 'MOV':
                    self.turn(command.dir);
                    self.GO(command.dir, command.num)
                    break;
                case 'BUILD':
                    if(self.hasPane(self.seat.x + self.status[command.dir].x * command.num,self.seat.y + self.status[command.dir].y * command.num)){
                        console.log('当前所选位置已存在方块，请重新确认命令！');
                        return false;
                    }
                    self.build();
                    break;
                case 'BRU':
                    self.bru(command.color);
                    break;
                case 'TUN':
                    self.turn(command.dir);
            }
            return true;
        }
    };
CreateCar.prototype.hasPane=function(x,y){
    for(var i=0;i<self.closeArr.length;i++){
        if(x==self.closeArr[i].seat.x&& y ==self.closeArr[i].seat.y){
            return true;
        }
    }
    return false;
}
    var Car=new CreateCar();
    module.exports.CreateNewCar=Car.CreateNewCar;
    module.exports.receive=Car.receive;


/***/ })
/******/ ]);