/**
 * Created by DrugsZ on 2017/5/21.
 */
function getParent(e) {
    var oParent;
    if (e.target.classList.contains('card_rear')) {
        oParent = e.target.parentNode;
    } else if (e.target.classList.contains('card_bg')) {
        oParent = e.target.parentNode.parentNode;
    }
    return oParent;
}
function changeClass(oParent) {
    if (oParent) {
        var card_front = oParent.querySelector('.card_front')
        var card_rear = oParent.querySelector('.card_rear');
        card_front.className = 'card_front_click';
        card_rear.className = 'card_rear_click';
    }
}
function CreateMsg() {
    var tempArray = [];

    this.getArray = function () {
        return tempArray;
    };
    this.addMsg = function (title, state, imgId) {
        var a = {};
        a.dataTitle = title;
        a.state = state;
        a.imgId = imgId ? imgId : Math.round(Math.random() * 11);
        tempArray.push(a);
    }
}
function CreateCard(msg) {
    this.Element = null;
    this.wrapper = document.querySelector('.wrapper');

    var oCard = document.createElement('div');
    oCard.className = 'card';
    var oCard_front = document.createElement('div');
    oCard_front.className = 'card_front';
    var oCard_rear = document.createElement('div');
    oCard_rear.className = 'card_rear';
    oCard_front.style = 'transition:4s ease';
    oCard_rear.style = 'transition:4s ease';
    var oImg = document.createElement('img');
    oImg.src = 'image/timg%20(' + msg.imgId + ').gif';
    oImg.className = 'frontImg';
    var oContent = document.createElement('p');
    oContent.className = 'content';
    var oTitle = document.createElement('span');
    oTitle.className = 'title';
    oTitle.innerHTML = msg.dataTitle;
    var oState = document.createElement('span');
    oState.className = 'state';
    oState.innerHTML = msg.state;
    var oCard_bg = document.createElement('div');
    oCard_bg.className = 'card_bg';
    oContent.appendChild(oTitle);
    oContent.appendChild(oState);
    oCard_front.appendChild(oImg);
    oCard_front.appendChild(oContent);
    oCard_rear.appendChild(oCard_bg);
    oCard.appendChild(oCard_front);
    oCard.appendChild(oCard_rear);
    this.Element = oCard;
    this.Element.dataTitle = msg.dataTitle;
    this.wrapper.appendChild(oCard);
};
var Message = (function message() {
    var queue = document.querySelector('.queue');

    var show = function (obj) {
        var oDiv = document.createElement('div');
        oDiv.className = 'msg';
        var oMsgTitle = document.createElement('p');
        oMsgTitle.className = 'msgTitle';
        oMsgTitle.innerHTML = '系统提示';
        var oMsgContent = document.createElement('p');
        oMsgContent.className = 'msgContent';
        oMsgContent.innerHTML = '您获得了' + obj;
        oDiv.appendChild(oMsgTitle);
        oDiv.appendChild(oMsgContent);
        queue.appendChild(oDiv);
    };
    return {
        show: show
    }
})();
function clickHandler(e) {
    var oParent = getParent(e);
    changeClass(oParent);
    setTimeout(function () {
        Message.show(oParent.dataTitle)
    }, 4000);
}
function init() {
    var oMsg = new CreateMsg();
    oMsg.addMsg('闭嘴卡', '男朋友无条件闭嘴', 13);
    oMsg.addMsg('背我回家卡', '男朋友背媳妇回家', 0);
    oMsg.addMsg('反转卡', '老婆可以反转给老公完成老公让老婆完成的任何一件事', 10);
    oMsg.addMsg('一票否决卡', '对任何事情，老婆有一次一票否决的权利', 5);
    oMsg.addMsg('不生气卡', '使用该卡，老公不准生气', 9);
    oMsg.addMsg('陪伴卡', '无条件陪吃，陪玩，陪睡', 8);
    oMsg.addMsg('复制卡', '可复制所有卡片中任意一张', 6);
    oMsg.addMsg('跑腿卡', '可以指示老公到地球任意一个地方', 2);
    oMsg.addMsg('吃大餐卡', '老公带老婆吃大餐一次', 3);
    oMsg.addMsg('做饭卡', '老公做饭一次', 6);
    oMsg.addMsg('停止冷战卡', '老公老婆必须停止冷战', 4);
    oMsg.addMsg('啪啪啪卡', '你懂的~~~~', 1);
    var msgArray = oMsg.getArray();
    var tempArray = [];
    for (var i = 0; i < 6; i++) {
        var tempElement = msgArray.splice(Math.round(Math.random() * msgArray.length - 1), 1)[0];
        tempArray.push(tempElement);
    }
    for (var k = 0; k < tempArray.length; k++) {
        CreateCard(tempArray[k]);
    }
}
init();
var wrapper = document.querySelector('.wrapper');
wrapper.addEventListener('click', function (e) {
    clickHandler(e);
}, false);