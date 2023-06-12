window.addEventListener('load', () => {
    //1.search input过渡
    let transform = function () {
        let label = document.querySelector('.w .top .search label')
        let input = document.querySelector('.w .top .search input')
        label.addEventListener('click', function () {
            this.style.transition = `all .2s linear`
            this.style.top = `-0.1013rem`
            this.style.left = `0.25rem`
            this.style.fontSize = `0.1rem`
            let inp = setTimeout(() => {
                input.focus()
                clearTimeout(inp)
            }, 200);
        })
        input.addEventListener('focus', function () {
            label.style.transition = `all .2s linear`
            label.style.top = `-0.1013rem`
            label.style.left = `0.25rem`
            label.style.fontSize = `0.1rem`
            let inp = setTimeout(() => {
                input.focus()
                clearTimeout(inp)
            }, 200);
        })
        input.addEventListener('blur', function () {
            if (input.value == '') {
                label.style.top = `.0637rem`
                label.style.left = `0.375rem`
                label.style.fontSize = `.2075rem`
            }
        })
    }

    //2.当前时间显示模块
    let times = function () {
        let times = document.querySelector('.w .top .time')
        let date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const dates = date.getDate()
        const day = date.getDay()
        const h = date.getHours();
        const m = date.getMinutes();
        const s = date.getSeconds();
        const arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        times.innerHTML = `${year}年 ${month}月 ${dates}日 ${(h < 10 ? '0' + h : h)}时 ${(m < 10 ? '0' + m : m)}分 ${(s < 10 ? '0' + s : s)}秒 &nbsp&nbsp${arr[day]}`
    }

    //循环添加图片
    function imgs() {
        let imgs = document.querySelectorAll('#root .right ul li i')
        for (let i = 0; i < imgs.length; i++) {
            imgs[i].style.background = `url(/upload/z${i}.png) no-repeat 100% 100%`
        }
        // console.log(imgs);
    }

    //折叠侧边栏
    function fold() {
        let btn = document.getElementById('fold')
        let box_r = document.querySelector('.right')
        let spans = $('#root .right ul li a span')
        let is = $('#root .right ul li a img')
        let i = document.querySelector('#root .right ul #fold img')
        // console.log(i);
        // console.log(btn);
        let flag = true
        btn.addEventListener('click', function () {
            if (flag) {
                box_r.style.width = `${1.2}rem`
                spans.css({
                    "display": "none",
                })
                is.addClass("fold")
                i.src = "/upload/z00.png"
                flag = false
            }
            else{
                box_r.style.width = `${2.5}rem`
                spans.css({
                    "display": "inline-block",
                })
                is.removeClass("fold")
                // i.css("background","url(/upload/z0.png) no-repeat 100% 100%")
                i.src = "/upload/z0.png"
                flag = true
            }
        })
    }


    //执行函数
    transform()
    times()
    setInterval(() => {
        times()
    }, 500);
    imgs()
    fold()
})