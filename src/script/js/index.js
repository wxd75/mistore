class jianbian {
    constructor() {
        this.Div = $('.ui-wrapper');
        this.Ul = $('.slide');  //整个li  
        this.pA = $('.ui-pager-link');   //小点
        this.Before = $('.ui-prev');   //前一张
        this.Next = $('.ui-next');       //后一张
        this.num = 0;
    }

    bian() {
        let that = this;
        let timer = setInterval(function () {
            if (that.num == 4) {
                that.num = -1;
            }
            that.num++;
            $(that.Ul[that.num]).stop(true, true).animate({
                'z-index': 50,
                'opacity': 1
            }).siblings().stop(true, true).animate({
                'z-index': 0,
                'opacity': 0
            });
            $(that.pA[that.num]).addClass('active').parent().siblings().children(".active").removeClass('active');
        }, 3000);
        this.Div.on('mouseover', function () {
            clearInterval(timer);
            that.Before.show();
            that.Next.show();
        });
        this.Div.on('mouseout', function () {
            timer = setInterval(function () {
                if (that.num == 4) {
                    that.num = -1;
                }
                that.num++;
                $(that.Ul[that.num]).stop(true, true).animate({
                    'z-index': 50,
                    'opacity': 1
                }).siblings().stop(true, true).animate({
                    'z-index': 0,
                    'opacity': 0
                });
                $(that.pA[that.num]).addClass('active').parent().siblings().children(".active").removeClass('active');
            }, 3000)
            that.Before.hide();
            that.Next.hide();
        })
        this.Next.on('click', function () {
            if (that.num == 4) {
                that.num = -1;
            }
            that.num++;
            $(that.Ul[that.num]).stop(true, true).animate({
                'z-index': 50,
                'opacity': 1
            }).siblings().stop(true, true).animate({
                'z-index': 0,
                'opacity': 0
            });
            $(that.pA[that.num]).addClass('active').parent().siblings().children(".active").removeClass('active');
        });
        this.Before.on('click', function () {
            if (that.num == 0) {
                that.num = 5;
            }
            that.num--;
            $(that.Ul[that.num]).stop(true, true).animate({
                'z-index': 50,
                'opacity': 1
            }).siblings().stop(true, true).animate({
                'z-index': 0,
                'opacity': 0
            });
            $(that.pA[that.num]).addClass('active').parent().siblings().children(".active").removeClass('active');
        });
    }

}
new jianbian().bian();


class tab {
    constructor() {
        this.tt = $('.category-item');
        this.bb = $('.J_brickTabSwitch').children('li');
        this.aa = $('.tab-content');
    }

    all() {
        let that = this;
        for (let i = 0; i < this.tt.length; i++) {
            $(this.tt[i]).on('mouseover', function () {
                $(this).addClass('category-item-active');
            })

            $(this.tt[i]).on('mouseout', function () {
                $(this).removeClass('category-item-active');
            })
        }

        for (let i = 0; i < this.bb.length; i++) {
            $(this.bb[i]).on('mouseover', function () {
                console.log(that.bb);
                $(this).addClass('tab-active').siblings().removeClass('tab-active');
                $(that.aa).eq($(this).index()).css('display', 'block').addClass('look').siblings().css('display', 'none').removeClass('look');
            })
        }
    }
}

new tab().all();

class sheng {
    constructor() {
        this.brick = $('.brick-item');
    }

    go() {
        for (let i = 0; i < this.brick.length; i++) {
            $(this.brick[i]).on('mouseover', function () {
                $(this).addClass('brick-item-active');
            })

            $(this.brick[i]).on('mouseout', function () {
                $(this).removeClass('brick-item-active');
            })
        }

    }
}
new sheng().go();


$('.bar-totop').on('click', function () {
    console.log('asd');
    $('html,body').stop(true, true).animate({        // 以动画的形式回到顶部  
        scrollTop: 0            // 即  scrollTop为0
    });
})


// var search = document.querySelector('input');
// var ul = document.querySelector('ul');

// function taobao(data) {
//     var li = document.querySelectorAll('li');
//     for (var i = 0; i < li.length; i++) {
//         ul.removeChild(li[i]);
//     }
//     console.log(data.result);//获取的数据
//     for (var i = 0; i < data.result.length; i++) {
//         var li = document.createElement('li');
//         li.innerHTML = data.result[i][0];
//         ul.appendChild(li);
//     }
// }
// search.oninput = function () {

//     var cs = document.createElement('script');
//     cs.src = 'https://suggest.taobao.com/sug?code=utf-8&q=' + search.value + '&_ksTS=1559009682637_1461&callback=taobao';
//     document.body.appendChild(cs);
// }

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

//taobao({"result":[]})


class zhuan {
    constructor() {
        this.con1 = $('.brick-item-m-2');
        this.a = $('.brick-item-m-2 a')
    }

    tiao() {
        // let that = this;
        for (let i = 0; i < this.a.length/2; i++) {
            this.a[2*i].href += i+1;
            this.a[2*i+1].href += i+1;
        }

        
    }
}
new zhuan().tiao()