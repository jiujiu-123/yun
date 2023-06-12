window.addEventListener('load', () => {


    //轮播图
    // 获取轮播图容器
    let ul_img = document.querySelector('.lunbo ul')

    // 获取轮播图片总数
    let lis = ul_img.querySelectorAll('.lunbo ul li ')

    // 获取圆点图标容器
    let ul_dot = document.querySelector('.list-tu ul')

    //获取按钮
    let li = document.querySelectorAll('.list-tu ul li')


    //获取轮播区域盒子宽度
    let focusWidth = `7.54`


    let num = 0
    let circle = 0
    let flag = true

    // ul_img.addEventListener("mouseenter", function () {
    //     clearInterval(timer);
    //     timer = null
    // })
    // ul_img.addEventListener("mouseleave", function () {
    //     timer = setInterval(function () {
    //         // 手动调用点击事件arrow_r.click()
    //         btns[1].click()
    //     }, 2000)
    // })

    //动态生成底部圆点
    for (let i = 0; i < lis.length; i++) {
        li[i].addEventListener('click', function () {
            for (let j = 0; j < ul_dot.children.length; j++) {
                ul_dot.children[j].className = ''
            }
            li[i].setAttribute('index', i);
            this.className = 'actives'
            //点击小圆圈 移动图片 移动的是ul
            //ul的移动距离是 小圆圈的索引号 * 图片宽度 注意是负值
            //当我们点击了某个li 就拿到了当前li的索引号
            let index = this.getAttribute('index');
            // 当我们点击了某个li 就要把这个li 的索引号给 num 和 circle
            num = circle = index;

            // animate(ul_img,-index * focusWidth);
            ul_img.style.left = -index * focusWidth + `rem`
            

        })
    }

    ul_dot.children[0].className = "actives"



    function circleChange() {
        //先清除其他小圆圈的类名
        for (let i = 0; i < ul_dot.children.length; i++) {
            ul_dot.children[i].className = "";
        }
        //留下当前的小圆圈的类名
        ul_dot.children[circle].className = "actives";

    }
    let timer = setInterval(function () {
        if (flag) {
            flag = false
            if (num == ul_img.children.length - 1) {
                num = 0
                ul_img.style.left = `${num}rem`
                circle++
                if (circle == ul_dot.children.length) {
                    circle = 0;
                }
                circleChange()
                let timer = setInterval(function () {
                    clearInterval(timer)
                    flag = true
                }, 600)
                return
            }
            num++

            ul_img.style.left = -num * focusWidth + `rem`
            circle++
            if (circle == ul_dot.children.length) {
                circle = 0;
            }
            circleChange()
            let timer = setInterval(function () {
                clearInterval(timer)
                flag = true
            }, 600)

        }
    }, 2000)





})