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
