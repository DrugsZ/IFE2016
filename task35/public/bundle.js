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
var CreateCar=__webpack_require__(2);

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
    var oText = document.createElement('textarea');
    oWrapperRight.appendChild(oDiv);
    oWrapperRight.appendChild(oText);
    sec.appendChild(oWrapperRight);
};
init();


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
 * Created by DrugsZ on 2017/6/7.
 */
function CreateCar(){
    this.direction='top';
    this.deg=0;
    this.Element=null;
    this.seat={
        x:0,
        y:0
    };
    this.status={
        top: {x: 0, y: -1},
        right: {x: 1, y: 0},
        under: {x: 0, y: 1},
        left: {x: -1, y: 0}
    }
}
CreateCar.constructor=CreateCar;
CreateCar.prototype.getDirevtion=function(){
    var deg = this.deg % 360;
    if (deg === 0) {
        this.direction = 'top'
    } else if (deg === 90) {
        this.direction = 'right'
    } else if (deg === 180) {
        this.direction = 'under';
    } else if (deg === 270) {
        this.direction = 'left'
    }
    return this.direction;
};
CreateCar.prototype.GO=function(obj,n){
    var self=this;
    if(this.seat.x+obj.x*n>9||this.seat.x+obj.x*n<0||this.seat.y+obj.y*n>9||this.seat.y+obj.y*n<0){
        return false;
    }else{
        loopGO(obj,n);
    }
    function go(obj){
        var a=this;
        var top = self.Element.offsetTop;
        var left = self.Element.offsetLeft;
        self.seat.x+=obj.x;
        self.seat.y+=obj.y;
        left=left+obj*40;
        top=top+obj.y*40;
        self.Element.style.left=left+'px';
        self.Element.style.top=top+'px';
    }
    function loopGO(obj,n){
        for(var i=0;i<n;i++){
            go(obj);
        }
    }
};
CreateCar.prototype.CreateNewCar=function(){
    var sec=document.querySelector('section');
    var oDiv=document.createElement('div');
    oDiv.className='car';
    var oImg=document.createElement('img');
    oImg.src='bot.png';
    oDiv.appendChild(oImg);
    sec.appendChild(oDiv);
    this.Element=oDiv;
}
var Car= new CreateCar();
Car.CreateNewCar();

/***/ })
/******/ ]);