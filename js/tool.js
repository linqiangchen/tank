function addZero(num,len){//传入位数,自动补零
    len = len || 2;
    len = len-num.toString().length
    for(var i = 0; i<len;i++){
        num = '0' + num
    }
    return num
}
function change(arr,fir,sec){//交换数组中的两个值的位置
    var temp = arr[fir];
    arr[fir] = arr[sec];
    arr[sec]= temp;
}
function randomInt(min, max) {//产生[min,max]范围内的整数
    return Math.round(Math.random() * (max - min)) + min
}
function randomColor() {//产生随机的颜色
    var map = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
    var str = '#'
    for (var i = 0; i < 6; i++) {
        var index = randomInt(0, 15);
        str += map[index];
    }
    return str
}

//动画函数
function animate(dom, obj, callback) {
    for (var attr in obj) {
        if (attr === 'opacity') {
            var current = parseInt(getComputedStyle(dom, null)[attr] * 100);
            var target = obj[attr] * 100;
        } else if(attr.indexOf('scroll') !== -1){
            var current = dom[attr];
            var target = obj[attr];
        } else {
            var current = parseInt(getComputedStyle(dom, null)[attr]);
            var target = obj[attr];
        }
        obj[attr] = {
            current: current,
            target: target
        }
    }

    dom.timer = setInterval(function () {
        for (var key in obj) {
            var current = parseInt(obj[key].current);
            var target = obj[key].target;
            var speed = (target - current)/10 >= 0 ? Math.ceil((target - current) / 10) : Math.floor((target - current) / 10);  
            if (Math.abs(target - current) <= Math.abs(speed)) {
                if (key === 'opacity') {
                    dom.style[key] = target / 100;
                } else if(attr.indexOf('scroll') !== -1){
                    dom[key] = target ; 
                } else {      
                    dom.style[key] = target + 'px'; 
                }
                delete obj[key];
                for (var item in obj) {
                    return
                }
                console.log(22222)
                typeof callback === 'function' ? callback() : '';
                clearInterval(dom.timer)
            } else {   
                obj[key].current += speed;
                if (key === 'opacity') {
                    dom.style[key] = current / 100;
                }else if(attr.indexOf('scroll') !== -1){
                    dom[key] = current ;             
                }  else {
                    dom.style[key] = current + 'px';
                }
            }
        } 
    }, 20)
}
var Ajax = {
    get: function(url,fn){
        // XMLHttpRequest对象用于在后台与服务器交换数据
        var xhr=new XMLHttpRequest();
        xhr.open('GET',url,false);
        xhr.onreadystatechange=function(){
            // readyState == 4说明请求已完成
            if(xhr.readyState==4){
                if(xhr.status==200 || xhr.status==304){
               
                    fn.call(null,xhr.responseText);
                }
            }
        }
        xhr.send();
    },

    // data应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
    post: function(url,data,fn){
        var xhr=new XMLHttpRequest();
        xhr.open('POST',url,false);
        // 添加http头，发送信息至服务器时内容编码类型
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.onreadystatechange=function(){
            if (xhr.readyState==4){
                if (xhr.status==200 || xhr.status==304){
                    // console.log(xhr.responseText);
                    fn.call(xhr.responseText);
                }
            }
        }
        xhr.send(data);
    }
}