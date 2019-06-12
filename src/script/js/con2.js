(function () {

    console.log($('.tabb'));
    $('.tabb li').on('mousemove', function () {
        let img = $('.look .brick-item .figure-img .exposure img');
        let title = $('.look .brick-item .title a');
        let desc = $('.look .brick-item .desc');
        let price = $('.look .brick-item .price>.num');
        let pricelater = $('.look .brick-item .price del .num');
        let pinlun = $('.look .brick-item .review-wrapper a .review');
        let fromm = $('.look .brick-item .review-wrapper a .author');
        // let imm = $('.look .brick-item');
        $.ajax({
            url: 'http://10.31.164.49/mistore/php/con2.php',
            success: function (d) {
                let a = JSON.parse(d);
                console.log(a);
                console.log(img,title,desc,price,pricelater,pinlun,fromm);
                for(let i = 0,j = -1,k = -1; i < a.length; i ++){
                    j ++;
                    k ++;
                    img[i].src = a[i].src;
                    title[i].innerText = a[i].title;

                    if(desc[i].innerText){
                        // console.log(pricelater[j]);
                        desc[k].innerText = a[i].desc;
                    }else{
                        k--;
                    }

                    price[i].innerText = a[i].price;
                    if(a[i].pricelater){
                        // console.log(pricelater[j]);
                        pricelater[j].innerText = a[i].pricelater;
                    }else{
                        j--;
                    }
                    pinlun[i].innerText = a[i].pinlun;
                    fromm[i].innerText = a[i].from;
                    // img[i] = a[i].src;
                }
            }




        })








    });














})()