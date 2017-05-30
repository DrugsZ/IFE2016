/**
 * Created by DrugsZ on 2017/5/29.
 */
function $(obj) {
    var $ = document.querySelector(obj);
    return $;
}
function distinct(arr) {
    var i;
    var len;
    var obj = {};
    if (Array.isArray(arr) && arr.length > 0) {
        var len = arr.length;
        for (i = 0; i < len; i++) {
            obj[arr[i]] = arr[i];
        }
        return Object.keys(obj);
    }
    return [];
}
function waterfall(oParent, box) {
    this.imageCount = 0;
    this.oParent = $(oParent);

    this.create = function () {
        var self = this;
        var oCol = self.oParent.querySelectorAll('.col');
        for (var i = 0; i < oCol.length; i++) {
            for (var j = 1; j < 4; j++) {
                self.imageCount++;
                var oBox = document.createElement('div');
                oBox.className = 'box';
                var oImg = document.createElement('img');
                oImg.src = 'image/img%20(' + self.imageCount + ').jpg';
                oImg.title = self.imageCount;
                oImg.style = 'opacity:1';
                oBox.appendChild(oImg);
                oCol[i].appendChild(oBox);
            }
        }
    };
}
waterfall.constructor = waterfall;
waterfall.prototype.addBox = function () {
    var self = this;
    if (self.imageCount >= 247) {
        var oFooter = document.querySelector('.footer');
        oFooter.style.display = 'block';
        return false;
    }
    self.imageCount++;
    var oBox = document.createElement('div');
    oBox.className = 'box';
    var oImg = document.createElement('img');
    oImg.src = 'image/img%20(' + self.imageCount + ').jpg';
    oImg.title = self.imageCount;
    oImg.onload = function () {
        oImg.style = 'opacity:1';
    };
    oBox.appendChild(oImg);
    return oBox;
};
waterfall.prototype.render = function () {
    var oBox = this.addBox();
    var oCol = this.getMinCol();
    oCol.appendChild(oBox);
};
waterfall.prototype.getMinCol = function () {
    var oCols = this.oParent.querySelectorAll('.col');
    var minHeight = oCols[0];
    for (var i = 0; i < oCols.length; i++) {
        if (minHeight.offsetHeight > oCols[i].offsetHeight) {
            minHeight = oCols[i];
        }
    }
    return minHeight;
};
function isScroll() {
    var oScrollHeight = document.documentElement.scrollHeight;
    var oScrollTop = document.body.scrollTop;
    var oClientHeight = document.documentElement.clientHeight;
    if (oScrollHeight - oScrollTop - oClientHeight < 20) {
        return true;
    }
}
function init() {
    var waterfall_1 = new waterfall('.wrap');
    waterfall_1.create();
    window.addEventListener('scroll', function () {
        if (isScroll()) {
            waterfall_1.render();
        }
    }, false);
    window.addEventListener('click', function (e) {
        getMaxPic(e)
    }, false);
    //loadImg();
}
init();
function getMaxPic(e) {
    if (e.target.nodeName == 'IMG') {
        var MaxPic = document.querySelector('.MaxPic');
        if (MaxPic || e.target.parentNode.classList.contains('inner') || e.target.parentNode.classList.contains('footer')) {
            return false;
        }
        var oDiv = document.createElement('div');
        oDiv.className = 'MaxPic';
        document.documentElement.appendChild(oDiv);
        oDiv.addEventListener('click', function (e) {
            if (e.target.classList.contains('MaxPic')) {
                e.target.parentNode.removeChild(e.target);
            }
        }, false);
        var oImg = document.createElement('img');
        oImg.src = e.target.src;
        oDiv.appendChild(oImg);
    }
}
//function loadImg(){
//    var a=[];
//    for(var i=0;i<125;i++){
//        var oImg=new Image();
//        oImg.src='image/img%20('+i+').jpg';
//        a.push(oImg);
//    }
//}