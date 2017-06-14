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
