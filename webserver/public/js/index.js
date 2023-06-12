window.addEventListener("load", () => {
    function getId() {
        let url = decodeURIComponent(location.search); //获取地址后面的字符串
        console.log(url); // ?user=王哈哈
        const index = url.indexOf('?');
        let num = url.slice(6);
        console.log(num);// 1

        return num;
    }
    let str = getId()
    if (str !="") {
        document.getElementById("usernames").innerHTML = `${getId()},你好`
        document.getElementById("usernames").style.color = "green"
    }else{
        document.getElementById("usernames").innerHTML = `未登录`
    }

})