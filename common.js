/*
根据id属性的值，返回对应的标签元素
@param id id属性的值 string类型
@return {Element}元素对象
*/
function my$(id){
  return document.getElementById(id);
}

//根据标签name属性值获取元素
function $name(name){
  return document.getElementsByName(name);
}

//根据标签名获取页面元素 拿到的是伪数组
function $Tn(name){
  return document.getElementsByTagName(name);
}

//根据class获取页面元素 拿到的是数组对象
function $Cls(cname){
  return document.getElementsByClassName(cname);
}

//下面两个是H5新增的，有的浏览器不支持
//根据选择器获取元素返回来的是一个元素对象
function $Em(elem){
  return document.querySelector(elem);
}

//根据选择获取元素，返回的是伪数组，保存多个DOM对象
function $All(elem){
  return document.querySelectorAll(elem);
}

//获取任意个父级元素的第一个子级元素
function $Fe(element){
  if(element.firstElementChild){//true-->支持
    return element.firstElementChild;
  }else{//针对IE8浏览器
    return element.firstChild;
    var node=element.firstChild;//第一个节点
    while(node&&node.nodeType!=1){
      node=node.nextSibling;
    }
    return node;
  }
}

//获取任意一个父级元素的最后一个子级元素
function $Le(element){
 if(element.lastElementChild){//true-->支持
   return element.lastElementChild;
 }else{//针对IE8浏览器
   var node=element.lastChild;
   while(node&&node.nodeType!=1){
     node=node.previousSibling;
   }
   return node;
 }
}

//创建页面中的元素
function $Elem(elem){
  return document.createElement(elem);
 }

//为任意元素.绑定任意的事件, 任意的元素,事件的类型,事件处理函数
function $add(element,type,fn) {
  //判断浏览器是否支持这个方法
  if(element.addEventListener){
      element.addEventListener(type,fn,false);
  }else if(element.attachEvent){
      element.attachEvent("on"+type,fn);
  }else{
      element["on"+type]=fn;
  }
}

/*
* element---任意的元素
* attr---属性
* */
function getAttrValue(element,attr) {
  return element.currentStyle?element.currentStyle[attr] : window.getComputedStyle(element,null)[attr]||0;
}
/* 终极版本的动画函数---有bug
*
* */
function animate(element,json,fn) {
  clearInterval(element.timeId);
  element.timeId=setInterval(function () {
      var flag=true;//假设都达到了目标
      for(var attr in json){
          if(attr=="opacity"){//判断属性是不是opacity
              var current= getAttrValue(element,attr)*100;
              //每次移动多少步
              var target=json[attr]*100;//直接赋值给一个变量,后面的代码都不用改
              var step=(target-current)/10;//(目标-当前)/10
              step=step>0?Math.ceil(step):Math.floor(step);
              current=current+step;
              element.style[attr]=current/100;
          }else if(attr=="zIndex"){//判断属性是不是zIndex
              element.style[attr]=json[attr];
          }else{//普通的属性
              //获取当前的位置----getAttrValue(element,attr)获取的是字符串类型
              var current= parseInt(getAttrValue(element,attr))||0;
              //每次移动多少步
              var target=json[attr];//直接赋值给一个变量,后面的代码都不用改
              var step=(target-current)/10;//(目标-当前)/10
              step=step>0?Math.ceil(step):Math.floor(step);
              current=current+step;
              element.style[attr]=current+"px";
          }
          if(current!=target){
              flag=false;//如果没到目标结果就为false
          }
      }
      if(flag){//结果为true
          clearInterval(element.timeId);
          if(fn){//如果用户传入了回调的函数
              fn(); //就直接的调用,
          }
      }
    //  console.log("target:"+target+"current:"+current+"step:"+step);
  },10);
}

//设置滚动条监听
function getScroll(){
  return {
    left:window.pageXOffset || document.documentElement.scrollLeft||document.body.scrollLeft,
    top:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0
  };
}
window.onscroll = function () {
 //console.log(getScroll().top)
}

  //解绑事件的内容
  //为任意的一个元素，解绑对应的事件
  function $remove(elem,type,fnName){
   if(elem,addEventListener){
     elem.removeEventListener(type,fnName,false);
   }else if(elem.attachEvent){
     elem.attachEvent("on"+type,fn)
   }else{
     elem["on"+type] = fn;
   }
 }

//判断浏览器是否支持这个方法
function getStyle(elemnt,attr){
  return window.getComputedStyle?window.getComputedStyle(elemnt,null)[attr]:elemnt.getComputedStyle[attr];
} 

//设置兼容代码
//设置任意的标签中间的任意文本内容
function setText(element,text){
  //判断浏览器是否支持这个属性
  if(typeof element.textContent == "undefined"){//不支持
      element.innerText = text;
  }else{//支持这个属性
      element.textContent = text;
  }
}

//获取任意标签中间的文本内容
function getText(element){
  if(typeof element.textContent=="undefined"){
    return element.innerText;
  }else{
    return element.textContent;
  }
}

//创建异步对象
//定义一个创建异步对象的函数，函数体内判断浏览器是否支持标准创建，如果支持返回标准创建，否则返回IE8以下的异步对象
function createXhr(){
  var xhr=null;
  if(window.XMLHttpRequest){
    xhr=new XMLHttpRequest()
  }else{
	xhr=new ActiveXObject("Microsoft.XMLHttp");
}
	return xhr;
}


//点击按钮，改变div多个样式属性值
 function ChangeStyle(btnObj,dvObj,json) {
  this.btnObj = btnObj;
  this.dvObj = dvObj;
  this.json = json;
}
ChangeStyle.prototype.init = function () {

  var that = this;
  this.btnObj.onclick = function () {
    for(var key in that.json){
      that.dvObj.style[key] = that.json[key]
    }
  }
}
//实例化对象
var json = {"width":"500px","height":"500px","background":"yellow","opacity":"0.2"};
var cs = new ChangeStyle(my$("btn"),my$("dv"),json);

//翻转字符串
String.prototype.myReverse = function () {
  for(var i=this.length-1;i>=0;i--){
    console.log(this[i]);
  }
}

//产生随机数
// (function(window){
//   function Random(){}
//   Random.prototype.getRandom = function () {
//     return Math.floor(Math.random()*5)
//   }
//   window.Random = Random;
// })(window)
// var rm = new Random();