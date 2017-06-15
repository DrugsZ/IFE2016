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
    for (var i = 0; i < 11; i++) {
        var oTr = document.createElement('tr');
        for (var j = 0; j < 11; j++) {
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
var rowList=document.querySelector('.rowlist');
var value=textarea.value;
var arr=value.split('\n');
var execBtn=document.querySelector('#execute');
var refreshBtn=document.querySelector('#refresh');
refreshBtn.addEventListener('click',function(){
    textarea.value='';
    setRowList(0);
},false);
execBtn.addEventListener('click',function(){
    execute();
},false);
textarea.addEventListener('keydown',function(){
    getData();
},false);
var commandTest= {
    GO: /^go(\s+)?(\d+)?$/i,
    TRA: /^tra\s+(bac|lef|top|rig)(\s+)?(\w+)?$/i,
    MOV: /^mov\s+(bac|lef|top|rig)(\s+)?(\w+)?$/i
};

function execute(){
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
    var msg=msg.toUpperCase();
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
    }else {
        command=null;
    }
    if(command==null){
        console.log('指令有误，请确认后重新操作');
        clearInterval(timer);
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
    var rowlist=document.querySelector('.rowlist');
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
function setColor(type,num){
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
        }
    }

    CreateCar.constructor = CreateCar;
    CreateCar.prototype.getDirevtion = function () {
        var deg = this.deg ;
        if (deg === 0) {
            this.direction = 'TOP'
        } else if (deg === 90) {
            self.direction = 'RIG';
        } else if (deg === 180) {
            self.direction = 'BAC';
        } else if (deg === -90) {
            self.direction = 'LEF'
        }
        return this.direction;
    };
    CreateCar.prototype.GO = function (dir, n) {
        var offtop = self.Element.offsetTop;
        var offleft = self.Element.offsetLeft;
        var left = offleft;
        var top = offtop;
        function go(dir) {
            var a = this;
            self.seat.x += self.status[dir].x;
            self.seat.y += self.status[dir].y;
            left = left + self.status[dir].x * 40;
            top = top + self.status[dir].y * 40;
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
    CreateCar.prototype.receive = function (command) {
        var direction = self.getDirevtion();
        if(command.dir==null){
            command.dir=direction;
        }
        if (self.seat.x + self.status[command.dir].x * command.num> 9 || self.seat.x + self.status[command.dir].x * command.num < 0 || self.seat.y + self.status[command.dir].y * command.num > 9 || self.seat.y + self.status[command.dir].y * command.num< 0) {
            console.log('无法移动到指定位置，请确认无误 ')
            return false;
        } else {
            switch (command.way) {
                case 'GO':
                    self.GO(direction, command.num);
                    break;
                case 'TRA':
                    self.GO(command.dir, command.num);
                    break;
                case 'MOV':
                    self.turn(command.dir);
                    self.GO(command.dir, command.num)
            }
            return true;
        }
    };
    var Car=new CreateCar();
    module.exports.CreateNewCar=Car.CreateNewCar;
    module.exports.receive=Car.receive;


/***/ })
/******/ ]);