class load {
    constructor() {

    }

    init() {
        let sid = [];
        let num = [];
        let that = this;
        if ($.cookie('goodsid') && $.cookie('goodsidnum')) {
            sid = $.cookie('goodsid').split(',');
            num = $.cookie('goodsidnum').split(',');
        }
        $.each(sid, function (i, v) {
            // console.log(sid,num)
            that.looo(i, v, num);
        })
    }

    looo(i, val, num) {
        $.ajax({
            url: "http://localhost/mistore/php/chuan.php",
            data: {
                sid: i + 1
            },
            async: false,  //同步的
            dataType: "json"
        }).done(function (d) {
            // console.log(d);
            $('#J_cartListBody').removeClass('hide');
            let $clone = $('#J_cartListBody').clone(true, true);
            $clone.attr('id', '#J_cartListBody' + val);
            $clone.find('.col-img a img').attr('src', d.img);
            $clone.find('.col-name h3 a').text(d.title);
            $clone.find('.col-price .oneprice').text(d.price);
            $clone.find('.col-num .change-goods-num input').val(num[i]);
            $('.cart-goods-list').append($clone);
            $('#J_cartListBody').addClass('hide');
        });

    }
}

new load().init();


class topshow {      //头部登录
    constructor() {
        this.yes = $('#J_userInfo2');   //有cookie
        this.no = $('#J_userInfo1');     //没cookie
        this.name = $('#J_userInfo2 .user .user-name .name');
    }

    show() {
        let cookie = $.cookie('UserName');
        // console.log(show);
        if (cookie) {
            this.yes.show();
            this.no.hide();
            this.name.text(cookie);
        } else {
            this.yes.hide();
            this.no.show();
        }
    }
}

new topshow().show();

class del {  //删除商品
    constructor() {
        this.delbutton = $('.del');
        this.alert = $('.fade');
        this.cancel = $('#J_alertCancel');
        this.Ok = $('#J_alertOk');
        this.x = $('.close');
        this.index = 0;
        this.bodyList = $('.list-body');
    }

    deel() {
        let that = this;
        this.delbutton.on('click', function () {
            // console.log(this.alert);
            that.index = that.delbutton.index($(this));
            that.alert.show();
        })
        this.cancel.on('click', function () {
            // console.log(this.alert);
            that.alert.hide();
        })
        this.Ok.on('click', function () {
            // console.log(this.alert);
            that.alert.hide();
            that.remove();
        })
        this.x.on('click', function () {
            // console.log(this.alert);
            that.alert.hide();
        })

    }

    remove() {
        console.log(this.index);
        console.log($('.list-body'));
        this.bodyList.eq(this.index).remove();

    }


}

new del().deel();

class check {  //选择
    constructor() {
        this.checkbox = $('.icon-checkbox');
        this.checkboxAll = $('#J_selectAll');
    }

    ck() {
        // console.log(this.checkbox);

        let that = this;

        this.checkbox.on('click', function () {


            if ($(this)[0] == that.checkboxAll[0]) {   //点击对象为全选
                // console.log($(this).attr('class'));
                if ($(this).attr('class').indexOf("icon-checkbox-selected") != -1) { //有选中状态
                    that.checkbox.removeClass('icon-checkbox-selected');   //全删
                    that.add();
                } else {
                    that.checkbox.addClass('icon-checkbox-selected');       //全加
                    that.add();
                }
            } else {
                if ($(this).attr('class').indexOf("icon-checkbox-selected") != -1) {  //有选中状态
                    $(this).not('#J_selectAll').removeClass('icon-checkbox-selected');   //单个删
                    that.add();
                } else {
                    $(this).not('#J_selectAll').addClass('icon-checkbox-selected');     //单个加
                    that.add();
                }
                // console.log(that.checkbox.not('#J_selectAll').length);
                // console.log($('.icon-checkbox-selected').length);
                if ($('.icon-checkbox-selected').not('#J_selectAll').length == that.checkbox.not('#J_selectAll').length) {  //如果选了的。l ==  checkbox.l - 1
                    that.checkboxAll.addClass('icon-checkbox-selected');
                    that.add();
                } else {
                    that.checkboxAll.removeClass('icon-checkbox-selected');
                    that.add();
                }
            }


        })
    }
    add() {
        let act = $('.icon-checkbox-selected:visible').parent().siblings('.col-total').children('.listprice');
        console.log(act);
        let sumAll = 0;
        for (let i = 0; i < act.length; i++) {
            sumAll += Number(act.eq(i).text());
        }
        $('#J_cartTotalPrice').text(sumAll);
    }
}

new check().ck();

class bodi {  //主体显示的内容
    constructor() {
        this.bodinone = $('#J_cartEmpty');
        this.bodilist = $('#J_cartBox');
        this.sid = $.cookie('goodsid') || [];
    }

    see() {
        let cookie = this.sid.length;
        if (cookie > 0) {
            this.bodinone.hide();
            this.bodilist.show();
        } else {
            this.bodinone.show();
            this.bodilist.hide();
        }
    }
}

new bodi().see();

class miniadd {
    constructor() {
        this.dec = $('.list-body:visible .col-num .J_minus');  //+
        this.add = $('.list-body:visible .col-num .J_plus');   //-
        this.num = $('.list-body:visible .col-num input');   //num
        this.price = $('.list-body:visible .col-total .listprice');   //price
        this.priceAll = $('#J_cartTotalPrice');
        this.priceOne = $('.list-body:visible .col-price .oneprice');
    }

    math() {
        let that = this;
        // console.log(this.dec,this.add,this.num,this.price,this.priceOne);
        $.each($('.list-body:visible'), function (i, v) {
            that.panduan(i);
        });

        
        this.num.change(function () {
            that.panduan(that.num.index($(this)));
        });
        this.add.on('click', function () {
            let index = that.add.index($(this));
            let num = that.num.eq(index).val();
            num++;
            that.num.eq(index).val(num);
            that.panduan(index);
        })
        this.dec.on('click', function () {
            let index = that.dec.index($(this));
            let num = that.num.eq(index).val();
            num--;
            that.num.eq(index).val(num);
            that.panduan(index);
        })

    }

    panduan(i) {
        if (this.num.eq(i).val() < 1) {
            -
                this.num.eq(i).val(1);
        } else if (this.num.eq(i).val() > 99) {
            this.num.eq(i).val(99);
        }
        this.suan(i);
    }

    suan(index) {
        // console.log(this.priceOne.eq(index).text());
        let sum = this.priceOne.eq(index).text() * this.num.eq(index).val();
        this.price.eq(index).text(sum);

    }
}

new miniadd().math();
