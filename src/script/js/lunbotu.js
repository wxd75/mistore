(function () {
    let img = $('.brick-item-m-2 .figure-img .exposure img');
    let title = $('.brick-item-m-2 .title a');
    let desc = $('.brick-item-m-2 .desc');
    let price = $('.brick-item-m-2 .price>.num');
    let pricelater = $('.brick-item-m-2 .price del .num');
    // let imm = $('.brick-item-m-2');
    // console.log(title,img,desc,price,pricelater);
    $.ajax({
        url: 'http://10.31.164.49/mistore/php/lunbotu.php',
        success: function (d) {
            // var telobj = eval('(' + d + ')');
            // console.log(telobj);
            // oP.innerHTML = telobj.catName;
            // console.log(img);
            // img.attr('src' , '1')

            let a = JSON.parse(d);
            // console.log(a);

            for(let i = 0,j = -1; i < a.length; i ++){
                j++;
                img[i].src = a[i].src;
                title[i].innerText = a[i].title;
                desc[i].innerText = a[i].desc;
                price[i].innerText = a[i].price;
                if(a[i].pricelater){
                    // console.log(pricelater[j]);
                    pricelater[j].innerText = a[i].pricelater;
                }else{
                    j--;
                }
            }

            // img[2].src = a[0].src;
            // title[2].innerText = a[0].title;
            // desc[2].innerText = a[0].desc;
            // price[2].innerText = a[0].price;

            // console.log(a[0].src);
            // console.log(img);
            // console.log(img[2]);
            // img[2].src = 1;
            // console.log(img[2].src);
        }
    });
})();