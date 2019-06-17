class topshow{      //头部登录
    constructor(){
        this.yes = $('#J_userInfo2');   //有cookie
        this.no = $('#J_userInfo1');     //没cookie
        this.name = $('#J_userInfo2 .user .user-name .name');
    }

    show(){
        let cookie = $.cookie('UserName');
        // console.log(show);
        if(cookie){
            this.yes.show();
            this.no.hide();
            this.name.text(cookie);
        }else{
            this.yes.hide();
            this.no.show();
        }
    }
}

new topshow().show();

class del{  
    constructor(){
        this.delbutton = $('.del');
        this.alert = $('.fade');
        this.cancel = $('#J_alertCancel');
        this.Ok = $('#J_alertOk');
        this.x = $('.close');
    }

    deel(){
        let that = this;
        this.delbutton.on('click',function(){
            // console.log(this.alert);
            that.alert.show();
        })
        this.cancel.on('click',function(){
            // console.log(this.alert);
            that.alert.hide();
        })
        this.Ok.on('click',function(){
            // console.log(this.alert);
            that.alert.hide();
        })
        this.x.on('click',function(){
            // console.log(this.alert);
            that.alert.hide();
        })
    }

    
}

new del().deel()

class check {
    constructor(){
        this.checkbox = $('.icon-checkbox');
    }

    ck(){
        console.log(this.checkbox);
        let that = this;
        this.checkbox.on('click',function(){
            if(that.checkbox.attr('class').indexOf("icon-checkbox-selected") != -1){
                $(this).removeClass('icon-checkbox-selected');
            }else{
                $(this).addClass('icon-checkbox-selected');
            }
        })
    }
}

new check().ck()