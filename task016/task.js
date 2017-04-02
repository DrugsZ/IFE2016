/**
 * Created by DrugsZ on 2017/4/2.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city=document.getElementById("aqi-city-input").value.trim();
    var num=document.getElementById("aqi-value-input").value.trim();
    if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/))
    {
        alert("请输入正确的城市名称");
        return
    }
    if(!num.match(/^\d+$/)){
        alert("空气质量指数只能为整数");
        return;
    }
    aqiData[city]=num;
};

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var table=document.getElementById('aqi-table');
    table.innerHTML="";
    if(table.childNodes.length === 0){
        table.innerHTML="<td>城市</td><td>空气质量</td><td>操作</td>"
    }
    for(var city in aqiData){
        var tr=document.createElement("tr");
        var td1=document.createElement("td");
        td1.innerHTML=city;
        tr.appendChild(td1);
        var td2=document.createElement("td");
        td2.innerHTML=aqiData[city];
        tr.appendChild(td2);
        var td3=document.createElement("td");
        td3.innerHTML="<button>删除</button>";
        tr.appendChild(td3);
        table.appendChild(tr);
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
    // do sth.
    var tr=target.parentNode.parentNode;
    var city=tr.firstChild.innerText;
    delete aqiData[city];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    //给输入框添加事件，当在输入框回车同样可以触发addBtnHandle函数
        var addBtn=document.getElementById("add-btn");
        addBtn.addEventListener('click',addBtnHandle,false);
        var oCity=document.getElementById("aqi-city-input");
        var oNum=document.getElementById("aqi-value-input");
        oNum.addEventListener('keyup',function(e){
            if(e.keyCode==13)
            {
                addBtnHandle()
            }},false);
        oCity.addEventListener('keyup',function(e){
            if(e.keyCode==13)
            {
                addBtnHandle()
            }},false);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
        var table=document.getElementById("aqi-table");
    table.addEventListener("click", function(e) {
        if (e.target && e.target.nodeName === "BUTTON") {
            delBtnHandle(e.target);
        }
    })

}

init();