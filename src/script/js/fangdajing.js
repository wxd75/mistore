
    //需求分析 ： 对应放大  放大的刚好是小块的内容   移入出现  移除消失；
    //创建class 
    class Fdj {
        constructor() { // 初始的值   获取页面上的各各目标
            this.spic = document.getElementsByClassName('spic')[0];  // 初始显示的div
            this.sf = document.getElementsByClassName('sf')[0];  // 小透明块
            this.xpic = document.getElementsByClassName('xpic')[0];  //小图片
            this.bf = document.getElementsByClassName('bf')[0];  // 放大显示区的div
            this.bpic = document.getElementsByClassName('bpic')[0];  // 放大显示的图片 

            this.ul = document.querySelector('#list ul');
            this.tabpic = document.querySelectorAll('#list ul li img'); //tab切换小图 
            this.qian = document.querySelector('.qian');  // 向前进一
            this.hou = document.querySelector('.hou');     //向后进一
            this.yi = 65;
            this.num = 0;
        }

        fdj() {  // 放大镜效果的写入
            var that = this;
            this.spic.onmouseover = function () {
                that.over();
            }
            for (let i = 0; i < this.tabpic.length; i++) {
                this.tabpic[i].onclick = function () {
                    let address = that.tabpic[i].src;
                    that.bpic.setAttribute('src', address);
                    that.xpic.setAttribute('src', address);
                }
            }
            this.qian.onclick = function () {
                if (that.num > 0) {
                    that.num--;
                    let weiyi = -that.num * that.yi + 'px';
                    that.ul.style.left = weiyi;
                }
                console.log(that.num);
            }
            this.hou.onclick = function () {
                if (that.num < 7) {
                    that.num++;
                    let weiyi = -that.num * that.yi + 'px';
                    that.ul.style.left = weiyi;
                }
                console.log(that.num);
            }
        }

        over(ev) {   //移入显示小块  和大图
            // console.log('1');
            var that = this;
            var l = 1;
            var t = 1;
            this.sf.style.visibility = 'visible';
            this.bf.style.visibility = 'visible';
            // 因为要对应 所以小块的大小不能定死  大小为图片大小的35% / 35% 
            this.sf.style.width = this.spic.offsetWidth * 0.35 + 'px';
            this.sf.style.height = this.spic.offsetHeight * 0.35 + 'px';
            
            this.spic.onmousemove = function (ev) {
                
                var ev = ev || window.event;
                that.move(ev);
            }
            this.spic.onmouseout = function () {
                that.out();
            }
        }

        move(ev) { // 跟着鼠标移动
            
            //获取鼠标位置
            var mouseX = ev.pageX;
            var mouseY = ev.pageY;
            //限制在区域内； 要放在上面 为了好写定义两个变量储存一下
            var l = mouseX - this.spic.offsetLeft - this.sf.offsetWidth / 2;
            var t = mouseY - this.spic.offsetTop - this.sf.offsetHeight / 2;
            // console.log(this.spic.offsetLeft,this.spic.offsetTop);
            // console.log(l,t);
            //设置滑块的位置   减去自身一半 减去margin
            if (l <= 0) {
                l = 0;
            } else if (l >= this.spic.offsetWidth - this.sf.offsetWidth) {
                l = this.spic.offsetWidth - this.sf.offsetWidth - 2;
            }
            if (t <= 0) {
                t = 0;
            } else if (t >= this.spic.offsetHeight - this.sf.offsetHeight) {
                t = this.spic.offsetHeight - this.sf.offsetHeight - 2;
            }
            this.sf.style.left = l + 'px';
            this.sf.style.top = t + 'px';
            //限制在区域内； 要放在上面 为了好写定义两个变量储存一下
            //设置大图的大小  可视区域 除 以小滑块的占比
            this.bpic.style.width = (this.bf.offsetWidth - 2) / 0.35 + 'px';
            this.bpic.style.height = (this.bf.offsetHeight - 2) / 0.35 + 'px';
            //设置大图片的位移值 （是负数）
            //首先需要求出小滑块移动的占比  移动值 / 可移动区域
            var biliX = l / (this.spic.offsetWidth - this.sf.offsetWidth - 2);
            var biliY = t / (this.spic.offsetHeight - this.sf.offsetHeight - 2);
            this.bpic.style.left = - biliX * (this.bpic.offsetWidth - this.bf.offsetWidth) + 'px';
            this.bpic.style.top = - biliY * (this.bpic.offsetHeight - this.bf.offsetHeight) + 'px';
        }

        out() {
            this.sf.style.visibility = 'hidden';
            this.bf.style.visibility = 'hidden';
            // console.log('1');
        }



    }


    new Fdj().fdj();


