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
        }
    }

    CreateCar.constructor = CreateCar;
    CreateCar.prototype.getDirevtion = function () {
        var deg = this.deg % 360;
        if (deg === 0) {
            this.direction = 'TOP'
        } else if (deg === 90) {
            self.direction = 'RIG';
        } else if (deg === 180) {
            self.direction = 'BAC';
        } else if (deg === 270) {
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
    CreateCar.prototype.receive = function (command) {
        var direction = self.getDirevtion();
        if(command.dir==null){
            command.dir=direction;
        }
        if (self.seat.x + self.status[command.dir].x * command.num> self.count-1 || self.seat.x + self.status[command.dir].x * command.num < 0 || self.seat.y + self.status[command.dir].y * command.num > self.count-1 || self.seat.y + self.status[command.dir].y * command.num< 0) {
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
