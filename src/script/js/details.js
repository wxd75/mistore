function xmsearch(data) {    // 搜索框的
    let ul = document.querySelector('#J_keywordList');
    let li = document.querySelectorAll('#J_keywordList li');
    for (let i = 0; i < li.length; i++) {
        ul.removeChild(li[i]);
    }
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        let li = document.createElement('li');
        li.innerHTML = `${data[i].Key}`;
        $('#J_keywordList').append(li);
    }
}

class headerblock {            // 头部2级导航
    constructor() {
        this.all = $('#J_navCategory');
        this.onecd = $('.site-category');
        this.doucd = $('.title1');
        this.doucon = $('.children-col-4');
    }

    init() {
        let that = this;

        this.all.hover(function () {
            that.onecd.show();
        }, function () {
            that.onecd.hide();
        });

        this.doucd.hover(function () {
            that.doucon.show();
        }, function () {
            that.doucon.hide();
        });
    }
}
new headerblock().init();


class sousuo {       //搜索框
    constructor() {
        this.kuang = $('.search-text');
        this.ul = $('#J_keywordList');
        this.hot = $('.search-hot-words');
    }

    sou() {
        let that = this;
        // console.log(1);

        this.kuang.on('input', function () {
            that.get();
        });
        this.kuang.blur(function () {
            that.ul.hide();
            if ($(that.kuang).val() != '') {

            } else {
                that.hot.show();
            }

        });
        this.kuang.focus(function () {
            that.ul.show();
            that.hot.hide();
        });
        // if(this.kuang.val())
    }

    get() {
        let cs = document.createElement('script');
        cs.src = 'https://search.mi.com/search/expand?keyword=' + this.kuang.val() + '&jsonpcallback=xmsearch';
        document.body.appendChild(cs);
    }


}
new sousuo().sou();


class load {        //渲染
    constructor() {
        this.picid = location.search.substring(1).split('=')[1];
        this.head = $('.J_navSwitch .J_proName');
        this.headtitle = $('.J_navSwitch .con .left a');
        this.title = $('.pro-choose-main .pro-info .pro-title .name');
        this.jj = $('.pro-choose-main .pro-info .sale-desc span');
        this.price = $('.pro-choose-main .pro-info .J_main .pro-price .price b');
        this.bottomtitle = $('.pro-choose-main .pro-info .J_main .pro-list ul li:first b');
        this.bottomprice = $('.pro-choose-main .pro-info .J_main .pro-list ul li:first span b');
        this.sumprice = $('.pro-choose-main .pro-info .J_main .pro-list ul .totlePrice b');

        this.viewimg = $('.pro-choose-main .pro-view .tab .spic img');
        this.bigimg = $('.pro-choose-main .pro-view .bf img');
    }

    lo() {
        // console.log(this.sumprice);
        let that = this;
        $.ajax({
            url: "http://localhost/mistore/php/chuan.php",
            data: {
                sid: this.picid
            },
            dataType: "json"
        }).done(function (d) {
            console.log(d);
            that.head[0].innerText = d.head;
            that.headtitle[0].innerText = d.title;
            that.title[0].innerText = d.title;
            that.jj[0].innerText = d.jj;
            that.price[0].innerText = d.price;
            that.bottomtitle[0].innerText = d.title;
            that.bottomprice[0].innerText = d.price;
            that.sumprice[0].innerText = d.price;
            that.viewimg[0].src = d.img;
            that.bigimg[0].src = d.img;
        })
    }
}

new load().lo();

class addcart {      //加购
    constructor() {
        this.addcart = $('.J_proBuyBtn');
        this.picid = location.search.split('=')[1];
    }

    add() {
        let _this = this;

        this.addcart.on('click', function () {
            let sid =  [];
            let num =  [];
            if ($.cookie('goodsid') && $.cookie('goodsidnum')) {
                sid = $.cookie('goodsid').split(',');
                num = $.cookie('goodsidnum').split(',');
            }
            //点击往cookie加当前页面上id的
            // console.log(_this.picid);
            // let id = ''; //放商品id
            // let num = $.cookie('goodsidnum');
            let cookie = $.cookie('goodsid');
            if (cookie) {  //存在 就不是第一次
                // let id = [$.cookie('goodsid')]; //放商品id
                if (sid.indexOf(_this.picid) != -1) {// 如果有 查询当前id的cookie位置 然后用这个位置找到num的位置再把这个位置的值加 1 再返回
                    let a = Number(num[sid.indexOf(_this.picid)]);
                    console.log(a);
                    num[sid.indexOf(_this.picid)] = a + 1;
                    $.cookie('goodsidnum', num.toString(), { expires: 1 });
                } else {//如果没有
                    sid.push(_this.picid);
                    num.push('1');
                    $.cookie('goodsid', sid.toString(), { expires: 1 });
                    $.cookie('goodsidnum', num.toString(), { expires: 1 });
                }
            } else {   //真正的第一次 
                sid.push(_this.picid);
                num.push('1');
                $.cookie('goodsid', sid.toString(), { expires: 1 });
                $.cookie('goodsidnum', num.toString(), { expires: 1 });
            }
            alert('添加成功');
        })
    }


}

new addcart().add();


class turelogin {  // 头部的登录状态的改变
    constructor() {
        this.hidea = $('.topbar-info .link');
        this.hidespan = $('.topbar-info .sep');
        this.show = $('.topbar-info .loginture');
        this.message = $('.topbar-info .message');
        this.exit = $('.topbar-info .exit');
    }

    fuk() {
        // alert(getCookie('UserName'));
        let that = this;
        if ($.cookie('UserName')) {    // 判断有没有UserName 的cookie
            this.hidea.hide();
            this.hidespan.hide();
            this.show.show();
            this.message.css('float', 'inherit');
            this.show.children('.username').html($.cookie('UserName'));
            this.exit.show();
        }

        this.exit.on('click', function () {
            that.exiti();
        })
    }

    exiti() {
        // let baga = $.cookie('UserName');
        $.cookie('UserName', '', { expires: -1 });  //删除
        history.go(0);
    }


}

new turelogin().fuk()