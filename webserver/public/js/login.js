$(function(){
    $(".userdata .floatbox .box-login").bind('click',function(){
        $('.userdata .floatbox').css({
            "left":"0",
            "transform":"translateX(0)"
        })
        $(".userdata .floatbox .box-img").css({
            'transform': 'translate(-50%, -50%) rotateY(0)'
        })
    })

    $(".userdata .floatbox .box-signin").bind('click',function(){
        $('.userdata .floatbox').css({
            "left":"100%",
            "transform":"translateX(-100%)",
        })
        $(".userdata .floatbox .box-img").css({
            'transform': 'translate(-50%, -50%) rotateY(180deg)',
        })
    })

    let num = getId()
    if(num == 1){
        $(".userdata .floatbox .box-img").css({
            'transform': 'translate(-50%, -50%) rotateY(180deg)',
        })
        $('.userdata .floatbox').css({
            "left":"51%",
            // "transform":"translateX(-100%)"
        })
        $(".userdata .floatbox .box-img").css({
            'transition': 'left .6s,transform .6s',
        })
    }else{
        $('.userdata .floatbox').css({
            'transition': 'left .6s,transform .6s',
        })
    }

    function getId(){
        let url = location.search//获取地址后面的字符串
        // console.log(url);//?id=1
        const index = url.indexOf('?')
        // console.log(index);//0
        let num = url.slice(4)
        // console.log(num);//1
        return num
    }

    //注册表单验证

    //手机号 11 位
    let phone = /^[0-9]{11}$/

    //密码
    let passwords = /^[a-zA-Z0-9_]{6,16}$/

    $('.userdata .signin .box #numbers').bind('blur',function(){
        if(this.value!=''){
            if(phone.test(this.value)){
                this.nextElementSibling.classList = "yes"
                this.nextElementSibling.innerHTML =  "格式正确"
                console.log(this.nextElementSibling);
                
            }else{
                // this.value = ""
                this.nextElementSibling.classList = "errs"
                this.nextElementSibling.innerHTML =  "手机号应为11位数字,请重新输入"
            }
        }
    })
    $('.userdata .signin .box #numbers').bind('focus',function(){
          if(this.value !="" ){
            this.nextElementSibling.classList = "focus"
          }      
    })
    let ps = $('.userdata .signin .box #setpassword')
    ps.bind('blur',function(){
        if(this.value!=''){
            if(passwords.test(this.value)){
                this.nextElementSibling.classList = "yes"
                this.nextElementSibling.innerHTML =  "格式正确"
                console.log(this.nextElementSibling);
                
            }else{
                // this.value = ""
                this.nextElementSibling.classList = "errs"
                this.nextElementSibling.innerHTML =  "密码应该包含数字或者字母,至少6位"
            }
        }
    })
    $('.userdata .signin .box #setpassword').bind('focus',function(){
        if(this.value !="" ){
          this.nextElementSibling.classList = "focus"
        }      
  })
    $('.userdata .signin .box #apassword').bind('blur',function(){
        const ps = document.querySelector('.userdata .signin .box #setpassword')
        if(this.value!='' && passwords.test(ps.value)){
            if(ps.value == this.value){
                this.nextElementSibling.classList = "yes"
                this.nextElementSibling.innerHTML =  "密码验证成功"
                console.log(this.nextElementSibling);
                
            }else{
                // this.value = ""
                this.nextElementSibling.classList = "errs"
                this.nextElementSibling.innerHTML =  "两次密码不一样,请重新输入"
            }
        }
    })
    $('.userdata .signin .box #apassword').bind('focus',function(){
        if(this.value !="" ){
          this.nextElementSibling.classList = "focus"
        }      
  })



})