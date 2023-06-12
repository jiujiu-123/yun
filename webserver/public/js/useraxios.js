
window.addEventListener("load", () => {
    const btn1 = document.querySelector("#login ul .btn")
    const btn2 = document.querySelector("#regist ul .btns")
    // console.log(btn2);

    const popup = document.getElementById("popup")
    // 获取弹窗元素和关闭按钮元素
    const closeBtn = document.getElementById('close-btn');
    // 获取p标签
    const p1 = document.querySelector("#popup .popup-content .info")
    const p2 = document.querySelector("#popup .popup-content .user")

    // 打开弹窗
    function openPopup() {
        popup.style.display = 'block';
    }

    // 关闭弹窗
    function closePopup() {
        popup.style.display = 'none';
    }


    //向index页面传递的用户名
    var _user = ""



    //登录验证
    btn1.addEventListener("click", (event) => {
        event.preventDefault();  // 阻止默认行为
        const phone = document.querySelector("#user")
        const pwd = document.querySelector("#password")
        const login = axios({
            method: "post",
            url: "/login",
            data: {
                userphone: phone.value,
                userpassword: pwd.value,
            }
        })
        login.then((response) => {
            console.log(response.data);
            if (response.data.code == 200) {
                // window.location.href = './index.html'; // 跳转到首页页面
                // alert(`恭喜你登录成功,尊敬的${response.data.data.username}`)
                //打开弹窗
                openPopup()
                p1.innerHTML = `恭喜你登录成功`
                p2.innerHTML = `尊敬的${response.data.data.username}`
                _user = response.data.data.username
                _user = encodeURIComponent(String(_user));
                console.log(_user);
                // 监听关闭按钮的点击事件
                closeBtn.addEventListener('click', () => {
                    closePopup()
                    window.location.href = `./index.html?user=${_user}`; // 跳转到首页页面
                });

            } else {
                // window.location.href = './login.html?id=1';
                // alert(`用户名或者密码错误,请重新输入`)
                openPopup()
                closeBtn.innerHTML = `返回`
                p1.innerHTML = `登陆失败`
                p2.innerHTML = `用户名或者密码不正确,请重新输入`
                // 监听关闭按钮的点击事件
                closeBtn.addEventListener('click', () => {
                    closePopup()
                });
            }
        })
        login.catch((err) => {
            window.location.href = './login.html?id=1';
            alert(`用户名或者密码错误,请重新输入`)
            // userinp.value = ""
            // pwdrinp.value = ""

        })
    })
    //注册验证
    btn2.addEventListener("click", (event) => {
        event.preventDefault();  // 阻止默认行为
        const numbers = document.getElementById("numbers")
        const users = document.getElementById("users")
        const setpassword = document.getElementById("setpassword")
        console.log(numbers.value, users.value, setpassword.value);
        if (!numbers.value && !users.value && !setpassword.value) {
            alert("表单不能为空")
            return 0
        } else {
            console.log(numbers, users, setpassword);

            const regist = axios({
                method: "post",
                url: "/regist",
                data: {
                    userphone: numbers.value,
                    userpassword: setpassword.value,
                    username: users.value
                }
            })
            regist.then((response) => {
                console.log(response);
                if (response.data.code == 200) {
                    //打开弹窗
                    openPopup()
                    p1.innerHTML = `恭喜你注册成功`
                    p2.innerHTML = `尊敬的${response.data.data.username}`
                    userr = response.data.data.username
                    closeBtn.innerHTML = `去登陆`
                    // 监听关闭按钮的点击事件
                    closeBtn.addEventListener('click', () => {
                        closePopup()
                        window.location.href = './login.html?id=1'; // 跳转到登录页面
                    });
                } else {
                    if (response.data) {
                        //打开弹窗
                        openPopup()
                        p1.innerHTML = `该手机号已被其他用户使用,请换一个手机号`
                        p2.innerHTML = ``
                        closeBtn.innerHTML = `返回`
                        // 监听关闭按钮的点击事件
                        closeBtn.addEventListener('click', () => {
                            closePopup()
                        });
                    } else {
                        closeBtn.innerHTML = `返回`
                    }
                }
            })
        }

    })
    
})



