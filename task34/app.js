/**
 * Created by DrugsZ on 2017/6/4.
 */
function Car() {
    this.direction = 'left';
    this.deg = 0;
    this.Element = null;
    this.seat = {
        x: 0,
        y: 0
    };
    this.states = {
        top: {x: 0, y: -1},
        right: {x: 1, y: 0},
        under: {x: 0, y: 1},
        left: {x: -1, y: 0}
    };
}
Car.constructor = Car;
Car.prototype.getDirection = function () {
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
Car.prototype.Go = function (obj) {
    var top = this.Element.offsetTop;
    var left = this.Element.offsetLeft;
    var tempx = this.seat.x;
    var tempy = this.seat.y;
    this.seat.x += obj.x;
    this.seat.y += obj.y;
    if (this.seat.x < 0 || this.seat.y < 0 || this.seat.x > 9 || this.seat.y > 9) {
        this.seat.x = tempx;
        this.seat.y = tempy;
        return false;
    }
    left = left + obj.x * 40;
    top = top + obj.y * 40;
    this.Element.style.left = left + 'px';
    this.Element.style.top = top + 'px';
};
Car.prototype.init = function () {
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
    var oMsg = document.createElement('input');
    oMsg.type = 'text';
    oMsg.id = 'msg';
    var oGetMsg = document.createElement('input');
    oGetMsg.value = '执行';
    oGetMsg.type = 'button';
    oGetMsg.id = 'getmsg';
    sec.appendChild(oMsg);
    sec.appendChild(oGetMsg);
    var oDiv = document.createElement('div');
    oDiv.className = 'car';
    var oSpan = document.createElement('span');
    oDiv.appendChild(oSpan);
    sec.appendChild(oDiv);
    this.Element = oDiv;
};
Car.prototype.turn = function (msg) {
    var direction = this.getDirection();
    switch (msg) {
        case 'MOV LEF':
            this.deg = 270;
            direction = this.getDirection();
            this.Go(this.states[direction]);
            break;
        case 'MOV RIG':
            this.deg = 90;
            direction = this.getDirection();
            this.Go(this.states[direction]);
            break;
        case 'MOV TOP':
            this.deg = 0;
            direction = this.getDirection();
            this.Go(this.states[direction]);
            break;
        case 'MOV BOT':
            this.deg = 180;
            direction = this.getDirection();
            this.Go(this.states[direction]);
            break;
        case 'TRA LEF':
            this.Go(this.states.left);
            break;
        case 'TRA RIG':
            this.Go(this.states.right);
            break;
        case 'TRA TOP':
            this.Go(this.states.top);
            break;
        case 'TRA BAC':
            this.Go(this.states.under);
            break;
        default:
            alert('非法指令');
    }
    this.Element.style.transform = 'rotate(' + this.deg + 'deg)';
};
function addHandler(ele, event, fn) {
    if (ele.addEventListener) {
        ele.addEventListener(event, fn, false)
    } else if (ele.attachEvent) {
        ele.attachEvent(event, fn)
    } else {
        ele[on + "event"] = fn;
    }
}
function init() {
    var car = new Car();
    car.init();
    var oMsg = document.querySelector('#msg');
    var oGetMsg = document.querySelector('#getmsg');
    addHandler(oGetMsg, 'click', function () {
        var value = oMsg.value.trim();
        car.turn(value);
    })
}
init();