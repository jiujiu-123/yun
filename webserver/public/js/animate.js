    //缓慢动画
    //给不同元素指定不同的定时器
    function animate(obj,target,callback) {  
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
        //步长值写到定时器里面
        //把我们的步长值改为整数 正值向大取整 负值向小取整
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - obj.offsetLeft) / 10;
        // step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if(obj.offsetLeft == target ){
        }
        //把每次加1的步长值改为一个慢慢变小的值 步长公式 ：（目标值 - 现在的位置) / 10
        obj.style.left = obj.offsetLeft + step + 'px';
        //停止动画 本质是停止定时器
        // clearInterval(obj.timer);
        
        //回调函数写在定时器结束里面
        callback&&callback()
        
    },15)
    }