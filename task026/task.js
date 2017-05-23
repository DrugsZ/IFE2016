/**
 * Created by DrugsZ on 2017/5/17.
 */
//飞船控制部分，只提供飞行控制API，实际上地梁控制也可以直接隐藏
function SpaceShip(id) {
    this.id = id;
    this.deg = 0;
    this.power = 100;
    this.state = 'stop';
    this.timer = null;
    this.flySpeed = 1;
    this.powerChargeSpeed = 0.3;
    this.powerDischargeSpeed = 0.2;
    this.Element = creatShip(id);

    function creatShip(id) {
        var shipPath = document.createElement('div');
        shipPath.className = 'spaceShipPath';
        var ship = document.createElement('div');
        ship.className = 'spaceShip';
        var powerValue = document.createElement('span');
        powerValue.className = 'powerValue';
        powerValue.innerHTML = '100';
        var powerColor = document.createElement('div');
        powerColor.className = 'powerColor';
        ship.appendChild(powerColor);
        ship.appendChild(powerValue);
        shipPath.appendChild(ship);
        document.querySelector('.path_' + id).appendChild(shipPath);

        return shipPath;
    }

}

SpaceShip.prototype.dynamicManager = function () {
    var self = this;
    var fly = function () {
        self.timer = setInterval(
            function () {
                if (self.deg >= 360) {
                    self.deg = 0;
                }
                self.deg += self.flySpeed;
                self.Element.style.transform = 'rotate(' + self.deg + 'deg)';
            }, 50
        )
    };

    var stop = function () {
        clearInterval(self.timer);
    };
    return {
        fly: fly,
        stop: stop
    }
};

SpaceShip.prototype.powerManager = function () {
    var self = this;
    var charge = function () {
        var timer = setInterval(
            function () {
                if (self.state === 'fly' || self.state === 'destroy') {
                    clearInterval(timer);
                }
                self.power += self.powerChargeSpeed;
                if (self.power >= 100) {
                    self.power = 100;
                    self.Element.querySelector('span').innerHTML = Math.ceil(self.power).toString();
                    self.Element.querySelector('.powerColor').style.height = self.power + '%';
                    clearInterval(timer);
                    return false;
                }
                self.Element.querySelector('span').innerHTML = Math.ceil(self.power).toString();
                self.Element.querySelector('.powerColor').style.height = self.power + '%';
            }, 20
        )
    };

    var discharge = function () {
        var speed = self.powerDischargeSpeed;
        var timer = setInterval(
            function () {
                if (self.state == 'destroy' || self.state == 'stop') {
                    clearInterval(self.timer);
                }
                if (self.power <= 0) {
                    clearInterval(timer);
                    self.power = 0;
                    self.changeState().stop();
                    return false;
                }
                self.power -= speed;
                self.Element.querySelector('span').innerHTML = Math.ceil(self.power).toString();
                ;
                self.Element.querySelector('.powerColor').style.height = self.power + '%';
            }, 50
        )
    };

    return {
        charge: charge,
        discharge: discharge
    }
};
//状态管理，也是当前唯一需要提供的飞行控制api
SpaceShip.prototype.changeState = function () {
    var self = this;
    var states = {
        fly: function () {
            self.state = 'fly';
            self.dynamicManager().fly();
            self.powerManager().discharge();
        },
        stop: function () {
            self.state = 'stop';
            self.dynamicManager().stop();
            self.powerManager().charge();
        },
        delShip: function () {
            self.mediator.delShip(self.id);
            self.Element.parentNode.removeChild(self.Element);
        }
    };
    return states;
};
//飞船接收器，接受控制消息
SpaceShip.prototype.receiver = function (msg) {
    var self = this;
    if (msg.id === self.id && self.state !== msg.cmd) {
        self.changeState()[msg.cmd]();
    }
};
//管理员创建一个单例
var Commander = function () {
    this.id = 'zhao';
    this.send = function (msg) {
        this.mediator.send(msg);
    };
};

var Msg = function (id, cmd) {
    this.id = id;
    this.cmd = cmd;
};
function Mediator() {
    var spaceShips = {};
    this.commander = null;

    var create = function (msg) {
        var self = this;

        function isRepet(msg) {
            var tempKey = Object.keys(spaceShips);
            return Array.prototype.indexOf.call(tempKey, msg.id.toString());
        }

        if (isRepet(msg) === -1) {
            var tempShip = new SpaceShip(msg.id);
            self.register(tempShip);
        }
    };

    var send = function (msg) {
        var self = this;
        setTimeout(function () {
                var sccess = Math.random() >= .3 ? true : false;
                if (sccess) {
                    if (msg.cmd === 'create') {
                        self.create(msg);
                    } else {
                        for (var k = 0; k <= 4; k++) {
                            if (spaceShips[k] !== undefined) {
                                spaceShips[k].receiver(msg);
                            }
                        }
                    }
                } else {
                    alert('执行失败');
                }
            }, 1000
        )
    };
    var delShip = function (id) {
        spaceShips[id] = null;
    };
    var register = function (obj) {
        if (obj instanceof Commander) {
            this.commander = obj;
            obj.mediator = this;
        }
        if (obj instanceof SpaceShip) {
            spaceShips[obj.id] = obj;
            obj.mediator = this;
        }
    };
    return {
        register: register,
        send: send,
        create: create,
        delShip: delShip
    }
}

function buttonChange(e) {
    if (e.target.nodeName === 'INPUT') {
        var tempNode = e.target.parentNode;
        var tempArray = tempNode.querySelectorAll('input');
        for (var i = 0; i < tempArray.length; i++) {
            tempArray[i].className = '';
        }
        e.target.classList = 'select';
        var id = e.target.parentNode.index + 1;
        var cmd = e.target.value;
        commander.send(new Msg(id, cmd));
    }
}
function setIndex() {
    var oUl = document.querySelector('ul');
    var oLi = oUl.querySelectorAll('li');
    for (var i = 0; i < oLi.length; i++) {
        oLi[i].index = i;
    }
}
function init() {
    var obj = document.querySelector('.control');
    obj.addEventListener('click', buttonChange, false);
    setIndex();
    var mediator = new Mediator();
    commander = new Commander();
    mediator.register(commander);
}
init();