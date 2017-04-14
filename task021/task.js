function addHandler(ele,event,handler){
    if(ele.addEventListener){
        ele.addEventListener(event,handler,false)
    }else if(ele.attachEvent){
        ele.attachEvent("on"+event,handler)
    }else{
        ele["on"+event]=handler;
    }
}
function $(id){
    return document.getElementById(id);
}
function AddTag(input,output,button){
    var number=null;
    this.input=$(input);
    this.output=$(output);
    this.button=$(button);
    this.type=this.button?'buttonEvent':'keyEvent';
    this.setNumber=function(newNumber){
        number=newNumber;
    };
    this.getNumber=function(){
        return number;
    };
    this.setNumber(0);
}
AddTag.prototype.constructor=AddTag;
AddTag.prototype={
    renderBtnDel:function(){
        var that=this;
        for(let i=0;i<this.output.childNodes.length;i++){
            addHandler(that.output.childNodes[i],'click',function(event){
                that.output.removeChild(event.target);
            });
            //兼容浏览器的方法虽然很好用，但是貌似会有一个重复添加事件的bug，我目前也找不到好的解决办法
            that.output.childNodes[i].onmouseover=function(event){
                event.target.innerHTML="删除："+event.target.innerHTML;
            };
            addHandler(that.output.childNodes[i],'mouseout',function(event){
                event.target.innerHTML=event.target.innerHTML.replace(/删除：/,'');
            });
        }
    },
    render:function(data){
    //var htmlArr=this.output;
        for(var a=0;a<data.length;a++){
            for(var j=0;j<this.output.childNodes.length;j++){
                if(data[a]===this.output.childNodes[j].innerHTML){
                    data.splice(a,1);
                }
            }
        }
        for(var i=0;i<data.length;i++){
            if(this.getNumber()>=10){
                this.output.removeChild(this.output.firstChild);
            }
            if(data.length==0||data[i]==''){
                return ;
            }else{
                var tempDiv=document.createElement('div');
                tempDiv.innerHTML=data[i];
                this.output.appendChild(tempDiv);
                this.setNumber(this.output.childNodes.length);
            }
        }
        this.input.value='';
        this.renderBtnDel();
    },

    unique1:function(array){
      var n=[];
        for(let i=0;i<array.length;i++){
            if(n.indexOf(array[i])==-1){
                n.push(array[i]);
            }
        }
        return n;
    },
    getData:function(){
        var dataArr=[];
        switch(this.type){
            case 'keyEvent':
                dataArr.push(this.input.value.match(/(^[^,|，|\s]*)/)[0]);
                break;
            case 'buttonEvent':
                dataArr=this.input.value.trim().split(/,|，|、|\s|\n|\r|\t| /);
                break;
        }
            dataArr=this.unique1(dataArr);
        return dataArr;
    },
    init:function(){
        var that=this;
        switch (this.type){
            case 'buttonEvent':
                addHandler(that.button,'click',function(){
                    that.render(that.getData());
                });
                break;
            case 'keyEvent':
                addHandler(that.input,'keyup',function(event){
                    if((/(,| |，)/.test(that.input.value))||event.keyCode===13){
                        that.render(that.getData())
                    }
                })
        }
    },
}
var tag=new AddTag('tag','tag_queue');
tag.init();
var hobby=new AddTag('hobby','hobby_queue','hobby_Btn');
hobby.init();