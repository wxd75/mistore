class headerblock {
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


class sousuo {
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
function xmsearch(data) {
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

class load {
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
            url: "http://10.31.164.49/mistore/php/chuan.php",
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

