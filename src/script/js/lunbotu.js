(function () {
    let img = $('.brick-item-m-2 .figure-img .exposure img');
    let title = $('.brick-item-m-2 .title a');
    let desc = $('.brick-item-m-2 .desc');
    let price = $('.brick-item-m-2 .price>.num');
    let pricelater = $('.brick-item-m-2 .price del .num');
    let j = -1;
    // let imm = $('.brick-item-m-2');
    // console.log(title,img,desc,price,pricelater);
    $.ajax({
        url: 'http://localhost/mistore/php/lunbotu.php',
        success: function (d) {
            // var telobj = eval('(' + d + ')');
            // console.log(telobj);
            // oP.innerHTML = telobj.catName;
            // console.log(img);
            // img.attr('src' , '1')

            let a = JSON.parse(d);
            // console.log(a);

            $.each(a,function(i,n){
                j++;
                img[i].src = n.src;
                title[i].innerText = n.title;
                desc[i].innerText = n.desc;
                price[i].innerText = n.price;
                if(n.pricelater){
                    // console.log(pricelater[j]);
                    pricelater[j].innerText = n.pricelater;
                }else{
                    j--;
                }
            })

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