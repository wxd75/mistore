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