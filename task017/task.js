/**
 * Created by DrugsZ on 2017/4/3.
 */
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-03-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

    var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};
function addHandler(ele,event,handler){
    if(ele.attachEvent){
        ele.attachEvent("on"+event,handler)
    }else  if(ele.addEventListener){
        ele.addEventListener(event,handler,false)
    }else{
        ele["on"+event]=handler
    }
}

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
};

/**
 * 渲染图表
 */
//主栏目采用flex布局，计算单个div宽度
function getWidth(width,len){
    var value=Math.floor(width/(2*len));
    return value;
}
//根据高度的不同返回颜色，本来想法挺好，但是这个一个色域没找好，而且我发现貌似没多大关系，可是应该是有的，难道是我眼神有问题？
function getColor(seed){
    var number=12133217+seed*100;
    var value=number.toString(16);
    return value;
}
//渲染表格主程序
function renderChart() {
    var innerHTML="";
    var warpper=document.getElementById("aqi-chart-wrap");
    var width=warpper.clientWidth;
    var tempArr=chartData[pageState.nowGraTime][pageState.nowSelectCity];
    var len=Object.keys(tempArr).length-1;
    var singleWidth=getWidth(width,len);
    for(var key in tempArr)
    {
        innerHTML+="<div style='height:"+tempArr[key]+";width:"+singleWidth+";background-color:#"+getColor(tempArr[key])+";'title="+key+"></div>";
    }
    warpper.innerHTML=innerHTML;
    getTitle();
}
//给没一个div添加移入移出效果，显示当前日期及空气质量指数
function getTitle(){
    var warpper=document.getElementById('aqi-chart-wrap');
    var oDiv=warpper.getElementsByTagName('div');
    var title=document.getElementById('title');
    var len=oDiv.length;
    for(var i=0;i<len;i++){
        addHandler(oDiv[i],'mouseover',function(){
            title.innerHTML=pageState.nowSelectCity+"市"+this.title+"空气质量指数为:"+this.offsetHeight;
        });
        addHandler(oDiv[i],'mouseout',function(){
            title.innerHTML=pageState.nowSelectCity+"市空气质量指数";
        })
    }
}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(radio) {
    // 确定是否选项发生了变化
    var value=radio.value;
    // 设置对应数据
    var item=radio.parentElement;
    var items=document.getElementsByName('gra-time');
    for(var i=0;i<items.length;i++){
        items[i].parentElement.className='';
    }
    item.className+=" selected";
    if(value!=pageState.nowGraTime){
        pageState.nowGraTime=value;
        renderChart();
    }
    // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    // 设置对应数据
    // 调用图表渲染函数
    var city=this.value;
    if(city!==pageState.nowSelectCity){
        pageState.nowSelectCity=city;
        renderChart()
        var title=document.getElementById('title');
        title.innerHTML=pageState.nowSelectCity+"市空气质量指数"
    }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var date=document.getElementsByName("gra-time");
    var len=date.length;
    for(var i=0;i<len;i++){
        (
            function(e){
                addHandler(date[e],'click',function(){
                    graTimeChange(date[e]);
                })
            }
        )(i)
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var select=document.getElementById("city-select");
    var cityArr=Object.getOwnPropertyNames(aqiSourceData);
    var htmlArr=cityArr.map(function(item){
        return "<option>"+item+"</option>";
    });
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    select.innerHTML=htmlArr.join("");
    pageState.nowSelectCity=cityArr[0];
    addHandler(select,'change',citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    var count= 0, mcount= 0,singleWeek={},
        singleMonth={}, week={}, month={};
   for (var key in aqiSourceData){
       var tempCity=aqiSourceData[key];
       var dateArr=Object.getOwnPropertyNames(tempCity);
       var tempMonth=dateArr[0].slice(5,7);
       var weekInit=new Date(dateArr[0]).getDate(), weekCount=0;
       var len=dateArr.length;
       for(var i=0;i<len;i++,weekInit++){
            count+=tempCity[dateArr[i]];
            mcount+=tempCity[dateArr[i]];
           weekCount++;
           if((weekInit+1)%7==0 || i == len-1 || dateArr[i+1].slice(5,7)!==tempMonth){
               var tempKey=dateArr[i].slice(0,7)+"月第"+(Math.floor(weekInit/7)+1)+"周";
               singleWeek[tempKey]=Math.ceil(count/weekCount);

               if(i!==len-1&& dateArr[i+1].slice(5,7)!= tempMonth){
                   weekCount=weekCount%7;
               }
               count=0;
               weekCount=0;

               if(i==len-1||dateArr[i+1].slice(5,7)!==tempMonth){
                   tempMonth=(i==len-1)?dateArr.slice(5,7):dateArr[i+1].slice(5,7);
                   var tempMKey=dateArr[i].slice(5,7)+"月";
                   var tempDay=dateArr[i].slice(-2);
                   singleMonth[tempMKey]=Math.ceil(mcount/tempDay);
                   mcount=0;
               }
           }
       }
       week[key]=singleWeek;
       month[key]=singleMonth;
       singleWeek={};
       singleMonth={};
   }
    // 处理好的数据存到 chartData 中
    chartData.week=week;
    chartData.month=month;
    chartData.day=aqiSourceData;
    renderChart();
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();