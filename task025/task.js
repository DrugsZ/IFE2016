/**
 * Created by DrugsZ on 2017/4/18.
 */
function TreeNode(obj){
    this.childs=obj.childs||[];
    this.parent=obj.parent;
    this.selfElement=obj.selfElement;
    this.data=obj.data||'';
    this.selfElement.TreeNode=this;
}
TreeNode.prototype.constructor=TreeNode;
TreeNode.prototype= {
    //渲染函数
    render: function (arrow, visibility) {
        if (arrow) {
            if (this.isLeaf()) {
                this.selfElement.getElementsByClassName('arrow')[0].className = "arrow"
            } else if (this.isFolded()) {
                this.selfElement.getElementsByClassName('arrow')[0].className = "arrow right_arrow";
            } else {
                this.selfElement.getElementsByClassName('arrow')[0].className = "arrow down_arrow";
            }
        }
        if (visibility) {
            if (this.selfElement.className.indexOf("toShow")!=-1) {
                this.selfElement.className=this.selfElement.className.replace("toShow", "toHidden");
            } else {
                this.selfElement.className=this.selfElement.className.replace("toHidden", 'toShow');
            }
        }
    },
    //节点显示隐藏
    toggleFold: function () {
        if (this.isLeaf()) {
            return;
        }
        for(var i=0;i<this.childs.length;i++){
            this.childs[i].render(false,true);
        }
        this.render(true,false);
    },
    //添加节点
    addChild: function (value) {
        reColor();
        var nodeChild = document.createElement('div');
        nodeChild.className = "nodeChild toShow";
        var nodeHeader = document.createElement("label");
        nodeHeader.className = "nodeHeader";
        var newArrow = document.createElement('span');
        newArrow.className = "arrow";
        var newTitle = document.createElement('span');
        newTitle.innerHTML = value;
        newTitle.className = 'title';
        var newAddIcon = document.createElement('span');
        newAddIcon.innerHTML = "添加";
        newAddIcon.className = "addIcon";
        var newDelIcon = document.createElement('span');
        newDelIcon.innerHTML = "删除";
        newDelIcon.className = "delIcon";
        nodeHeader.appendChild(newArrow);
        nodeHeader.appendChild(newTitle);
        nodeHeader.appendChild(newAddIcon);
        nodeHeader.appendChild(newDelIcon);
        nodeChild.appendChild(nodeHeader);
        if (this.isLeaf()) {
            this.selfElement.append(nodeChild);
            this.childs.push(new TreeNode({parent: this, data: value, child: [], selfElement: nodeChild}));
            this.render(true, false);
        }else if(this.isFolded()){
            this.toggleFold();
            this.selfElement.append(nodeChild);
            this.childs.push(new TreeNode({parent: this, data: value, child: [], selfElement: nodeChild}));
        }else{
            this.selfElement.append(nodeChild);
            this.childs.push(new TreeNode({parent: this, data: value, child: [], selfElement: nodeChild}));
        }
    },
    isLeaf:function(){
        return this.childs.length==0;
    },
    isFolded:function(){
        return this.childs[0].selfElement.className.indexOf("toShow")==-1;
    }
};
//创建根节点
var root=new TreeNode({parent:null,data:"JavaScript",childs:[],selfElement:document.getElementsByClassName('nodeChild')[0]});
//广度优先搜索获取匹配元素对应js对象
function getData(value){
    var text=value;
    if(text==null){
        return ;
    }else if(text==''){
        alert('请输入查询字符');
        return ;
    }
    var dataArray=[];
    var tempArray=[];
    tempArray.push(root);
    while (tempArray.length>0){
        var tempKey=tempArray.shift();
        if(tempKey.data==text){
            dataArray.push(tempKey);
        }
        if(tempKey.childs.length>0){
            for(var i=0;i<tempKey.childs.length;i++){
                tempArray.push(tempKey.childs[i]);
            }
        }
    }
    if(dataArray.length<1){
        alert('未搜索到指定内容，请确认后重新搜索')
        return ;
    }
    return dataArray;
}
function changeColor(array){
    for(var i=0;i<array.length;i++){
        var tempNode=array[i];
        while (tempNode.parent!=null){
            if(tempNode.parent.isFolded()){
                tempNode.parent.toggleFold();
            }
            tempNode=tempNode.parent;
        }
        array[i].selfElement.getElementsByTagName('span')[1].style.color="red";
    }
}
var dataArray=[];
function search(value){
    reColor();
    dataArray=getData(value);
    changeColor(dataArray);
    $('#query').value='';
}
function reColor(){
    var tempData=dataArray;
    for(var i=0;i<tempData.length;i++){
        tempData[i].selfElement.getElementsByTagName('span')[1].style.color='#000';
    }
}
//跨浏览器绑定事件
function addEventHandler(ele,event,handler){
    if(ele.attachEvent){
        ele.attachEvent("on"+event,handler)
    }else if(ele.addEventListener){
        ele.addEventListener("click",handler,false);
    }else{
        ele["on"+event]=handler;
    }
}
//类jq选择器
function $(node){
    return document.querySelector(node);
}
//为所有的案件添加事件委托
addEventHandler(root.selfElement,"click",function(e){
    var target=e.target;
    var tempNode=target;
    while (tempNode.className.indexOf('nodeChild')==-1)
    {
        tempNode=tempNode.parentNode;
    }
    var selfElement=tempNode.TreeNode;
    if(target.className.indexOf('arrow')!=-1||target.className.indexOf('title')!=-1){
        selfElement.toggleFold();
    }else if(target.className.indexOf('addIcon')!=-1){
        selfElement.addChild(prompt());
    }else if(target.className.indexOf('delIcon')!=-1){
        selfElement.parent.selfElement.removeChild(selfElement.selfElement);
        for(var i=0;i<selfElement.parent.childs.length;i++){
            if(selfElement.parent.childs[i]==selfElement){
                selfElement.parent.childs.slice(i,1);
            }
        }
    }
});
addEventHandler($('#search_button'),'click',function(){
    search($('#query').value);
});