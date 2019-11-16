function dai1() {
    let inp = document.getElementById('inp');
    let ary = ['电子琴', '怡宝矿泉水', '外置光驱', '蓝牙鼠标', '微单相机'];
    let n1 = 0;
    setInterval(() => {
        n1 > 1 ? n1 = 0 : n1++
        inp.placeholder = ary[n1]
    }, 1000)

}
dai1()


function sheng() {
    let hua = document.getElementsByClassName('hua')[0];
    let m1 = 0;
    setInterval(() => {
        m1++;
        if (m1 > 2) m1 = 0;
        hua.style.left = -m1 * 70 + 'px'
    }, 1000)


}

sheng()


function hua2() {
    let btList = document.getElementsByClassName('b19');
    console.log(btList);

    let bx = document.querySelectorAll('.left11 .d1');
    console.log(bx);


    for (let i = 0; i < btList.length; i++) {
        btList[i].onmouseenter = function () {
            clear4(bx)
            bx[i].style.display = 'block';
        }
        btList[i].onmouseleave = function () {
            bx[i].style.display = 'none';
        }


    }
    function clear4(ary4) {
        for (let i = 0; i < ary4.length; i++) {
            ary4[i].style.display = 'none';
        }
    }
}
hua2()

function lun() {
    var banner = (function () {
        let idSelector = '';
        let $box = null,
            $ul = null,
            $lis = null,
            $tipBox = null,
            $tips = null,
            $leftBtn = null,
            $rightBtn = null;
        var n = 0, timer = null; // n 控制了全局图片对应的索引  
        function throttle(fn, wait = 500) {
            let flag = true;
            return function () {
                if (!flag) return;
                flag = false;
                setTimeout(() => {
                    flag = true;
                    fn.apply(this, arguments)
                }, wait)
            }
        }
        function initEle() {
            $box = $(idSelector);
            $ul = $box.find('.imgbox ul'),
                $lis = $box.find('.imgbox ul li'),
                $tipBox = $box.find('.tipbox'),
                $tips = $tipBox.children('.tip'),
                $leftBtn = $box.find('.leftbtn'),
                $rightBtn = $box.find('.rightbtn');

            $lis.eq(0).show().siblings().hide();
        }
        function getData() {
            $.ajax({
                url: './data.json',
                success: function (data) {
                    //
                    render(data);
                    initEle();
                    autoMove(n);
                    eventBind();
                    autoFocus()
                },
                error: function () {
                    alert('失败')
                }
            })
        }
        function render(data) {
            let str = '', tipStr = '';
            data.forEach((item, index) => {
                str += `<li>
                    <img src="${item.img}" alt="">
                </li>`;
                tipStr += (index == 0 ? `<span class="tip current"></span> ` : `<span class="tip"></span> `)
            })
            $ul.html(str)
            $tipBox.html(tipStr);
        }
        function move() {
            n++;
            if (n >= $lis.length) {
                n = 0;
            }
            $lis.eq(n).css({ opacity: 0 }).show().animate({ opacity: 1 }, 300).siblings().animate({ opacity: 0 }, 300, function () {
                $lis.eq(n).siblings().hide();
            })
            autoFocus(n)
        }
        function autoMove() {
            timer = setInterval(() => {
                move();
            }, 2000)
        }
        function autoFocus(n) {
            $tips.eq(n).addClass('current').siblings().removeClass('current');
        }

        function eventBind() {
            $box.on('mouseenter', function () {
                clearInterval(timer)
            })
            $box.on('mouseleave', function () {
                autoMove()
            })
            $leftBtn.on('click', throttle(function () {
                n--;
                if (n <= 0) {
                    n = $lis.length - 1;
                }
                n--;
                move()
                autoFocus(n)
            }))
            $rightBtn.on('click', throttle(function () {
                move()
            }))
            $tips.on('click', function () {
                let index = $(this).index();
                n = index;

                n--;
                move();
                autoFocus(n)
            })

        }
        return {
            init(id) {
                idSelector = id;
                getData();
                initEle();
            }
        }
    })()
    banner.init('#box');

}
lun()


function lun2() {
    var timer2 = null;
    var n2 = 0;
    var timer3 = null;
    var n3 = 0;
    var timer4 = null;
    var n4 = 0;

    let $box1 = $('#box1');
    let $imgbox1 = $box1.find('.imgbox1');
    let $imgbox2 = $box1.find('.imgbox2');
    let $imgbox3 = $box1.find('.imgbox3');
    let $ul1 = $imgbox1.children('ul');
    let $ul2 = $imgbox2.children('ul');
    let $ul3 = $imgbox3.children('ul');
    let $lis1 = $ul1.children('li');
    let $lis2 = $ul2.children('li');
    let $lis3 = $ul3.children('li');
    let $left1Btn = $box1.find('.left1btn')
    let $right1Btn = $box1.find('.right1btn')


    $lis1.eq(0).show().siblings().hide();
    $lis2.eq(0).show().siblings().hide();
    $lis3.eq(0).show().siblings().hide();




    function move1() {

        n2++;
        if (n2 > $lis1.length) {
            n2 = 0;
        }
        $lis1.eq(n2).css({ opacity: 0 }).show().animate({ opacity: 1 }, 300).siblings().animate({ opacity: 0 }, 300, function () {
            $lis1.eq(n2).siblings().hide();

        })
    }
    function move2() {

        n3++;
        if (n3 > $lis2.length) {
            n3 = 0;
        }
        $lis2.eq(n3).css({ opacity: 0 }).show().animate({ opacity: 1 }, 300).siblings().animate({ opacity: 0 }, 300, function () {
            $lis2.eq(n3).siblings().hide();

        })
    }
    function move3() {

        n4++;
        if (n4 > $lis3.length) {
            n4 = 0;
        }
        $lis3.eq(n4).css({ opacity: 0 }).show().animate({ opacity: 1 }, 300).siblings().animate({ opacity: 0 }, 300, function () {
            $lis3.eq(n4).siblings().hide();

        })
    }





    function autoMove1() {
        timer2 = setInterval(() => {
            move1()
        }, 1000)
    }
    autoMove1()
    function autoMove2() {
        timer3 = setInterval(() => {
            move2()
        }, 1000)
    }
    autoMove2()
    function autoMove3() {
        timer4 = setInterval(() => {
            move3()
        }, 1000)
    }
    autoMove3()









    function eventBind1() {
        $imgbox1.on('mouseenter', function () {
            clearInterval(timer2)
            clearInterval(timer3)
            clearInterval(timer4)
        })
        $imgbox1.on('mouseleave', function () {
            autoMove1()
            autoMove2()
            autoMove3()
        })
        $left1Btn.on('click', throttle1(function () {
            n2--;
            if (n2 <= 0) {
                n2 = $lis1.length - 1;

            }
            n2--;
            move1()
        }))
        $right1Btn.on('click', throttle1(function () {
            move1()
        }))
    }
    eventBind1()

    function eventBind2() {
        $imgbox2.on('mouseenter', function () {
            clearInterval(timer3)
            clearInterval(timer2)
            clearInterval(timer4)
        })
        $imgbox2.on('mouseleave', function () {
            autoMove2()
            autoMove1()
            autoMove3()
        })
        $left1Btn.on('click', throttle1(function () {
            n3--;
            if (n3 <= 0) {
                n3 = $lis2.length - 1;

            }
            n3--;
            move2()
        }))
        $right1Btn.on('click', throttle1(function () {
            move2()
        }))
    }

    eventBind2()


    function eventBind3() {
        $imgbox3.on('mouseenter', function () {
            clearInterval(timer4)
            clearInterval(timer2)
            clearInterval(timer3)
        })
        $imgbox3.on('mouseleave', function () {
            autoMove3()
            autoMove1()
            autoMove2()
        })
        $left1Btn.on('click', throttle1(function () {
            n4--;
            if (n4 <= 0) {
                n4 = $lis3.length - 1;

            }
            n4--;
            move3()
        }))
        $right1Btn.on('click', throttle1(function () {
            move3()
        }))
    }

    eventBind3()









    function throttle1(fn, wait = 500) {
        let flag = true;
        return function () {
            if (!flag) return;
            flag = false;
            setTimeout(() => {
                flag = true;
                fn.apply(this, arguments)
            }, wait)
        }
    }

}
lun2()


function xun() {
    let pc5 = document.getElementsByClassName('pc5');
    let pc1 = document.getElementsByClassName('pc1');



    for (let i = 0; i < pc5.length; i++) {

        pc5[i].onmouseenter = function () {
            clear(pc1);
            pc1[i].style.display = 'block';


        }

    }
    function clear(ary) {
        for (let i = 0; i < ary.length; i++) {
            ary[i].style.display = 'none';
        }
    }


    let h1 = document.getElementsByClassName('h1');
    let h5 = document.getElementsByClassName('h5');

    for (let j = 0; j < h1.length; j++) {
        h1[j].onmouseenter = function () {
            clear1(h5)
            h5[j].style.display = 'block';

        }
    }

    function clear1(ary1) {
        for (let j = 0; j < ary1.length; j++) {
            ary1[j].style.display = 'none'
        }
    }


    let e1 = document.getElementsByClassName('e1');
    let e5 = document.getElementsByClassName('e5');

    for (let j = 0; j < e1.length; j++) {
        e1[j].onmouseenter = function () {
            clear2(e5)
            e5[j].style.display = 'block';

        }
    }

    function clear2(ary2) {
        for (let j = 0; j < ary2.length; j++) {
            ary2[j].style.display = 'none'
        }
    }






    let f1 = document.getElementsByClassName('f1');
    let f4 = document.getElementsByClassName('f4');

    for (let j = 0; j < f1.length; j++) {
        f1[j].onmouseenter = function () {
            clear3(f4)
            f4[j].style.display = 'block';

        }
    }

    function clear3(ary3) {
        for (let j = 0; j < ary3.length; j++) {
            ary3[j].style.display = 'none'
        }
    }









}
xun()

function hua() {
    let li3 = document.getElementsByClassName('li3')[0];
    let t14 = document.getElementsByClassName('t14');
    console.log(t14);

    let li4 = document.getElementsByClassName('li4')[0];
    let pc5 = document.getElementsByClassName('pc5');
    let pc1 = document.getElementsByClassName('pc1');
    let li5 = document.getElementsByClassName('li5')[0];
    for (let i = 0; i < t14.length; i++) {
        t14[i].onmouseenter = function () {
            li4.style.display = 'block';
            block()
            pc1[i].style.display = 'block';
            li3.style.display = 'none';

        }
        li5.onclick = function () {
            li3.style.display = 'block';
            li4.style.display = 'none';
            pc5[i].style.display = 'none';
            pc1[i].style.display = 'none';

        }
        function block() {
            for (let i = 0; i < pc5.length; i++) {
                pc5[i].style.display = 'block';

            }
        }

    }
}
hua()



window.onload = function () {
    showTime()
    function showTime() {
        let time = new Date('2019 11 11 22:00:00')
        let now = new Date();
        let t = Math.floor((time - now) / 1000);
        let day = Math.floor(t / 86400)
        t %= 86400;
        let h = Math.floor(t / 3600)
        t %= 3600;
        let min = Math.floor(t / 60)
        t %= 60;
        document.getElementById('hour').innerHTML = h;
        document.getElementById('min').innerHTML = min;
        document.getElementById('s').innerHTML = t;
        setTimeout(showTime, 1000)
        console.log(h)
    }

}

function lun3() {
    let $box5 = $('.chang');
    let $ul = $box5.find('.lu1')
    let $left2Btn = $box5.find('.left2btn');
    let $right2Btn = $box5.find('.right2btn');
    let $lis = $box5.find('li')
    var timer5 = null;
    let n5 = 0;

    function move() {
        n5++;
        if (n5 >= $lis.length) {
            $ul.css('left', 0);
            n5 = 1;
        }
        $ul.animate({ left: -800 * n5 }, 300);//最终位置 总时间
    }

    $left2Btn.on('click', function () {
        n5--;
        if (n5 < 0) {
            $ul.css({ left: -($lis.length - 1) * 800 })//闪到最后一张
            n5 = $lis.length - 2;

        }
        n5--
        move()

    })
    $right2Btn.on('click', function () {
        move();
    })
}
lun3()

function lun4() {
    let $box = $('.duan');
    let $ul = $box.find('.lu2');
    let $lis = $box.find('li');
    let $tipbox = $box.find('.tipbox111');
    let $tips = $box.find('.tip');
    console.log()
    var timer = null;
    let n = 0;

    function move() {
        n++;
        if (n > $tips.length) {
            $ul.css('left', 0);
            n = 1;


        }

        $ul.animate({ left: -190 * n }, 300)
        autoFocus(n)
    }
    function autoMove() {
        setInterval(() => {
            move()

        }, 1000)
    }
    autoMove()

    function autoFocus(n) {
        if (n >= $tips.length) {
            n = 0
        }
        $tips.eq(n).addClass('current').siblings().removeClass('current');
    }


}
lun4()

function hua3() {
    let btns = document.getElementsByClassName('qqq');
    let box = document.querySelectorAll('.xuuu .bottom')
    console.log(box);
    console.log(btns)
    for (let i = 0; i < btns.length; i++) {
        btns[i].onmouseenter = function () {
            clear(box)
            box[i].style.display = 'block';
        }

    }
    function clear(ary) {
        for (let i = 0; i < ary.length; i++) {
            ary[i].style.display = 'none'
        }
    }
}
hua3()

function zou() {
    let box = document.getElementsByClassName('paoyou')[0];
    console.log(box)
    let ul = document.getElementsByClassName('zxz')[0];
    console.log(ul)
    ul.innerHTML += ul.innerHTML;
    ul.style.width = '1980px';
    let timer = null;

    timer = setInterval(() => {
        if (box.scrollLeft >= 990) {
            box.scrollLeft = 0;
        }
        box.scrollLeft += 1
    }, 10)


    box.onmouseenter = function () {
        clearInterval(timer)
    }
    box.onmouseleave = function () {
        timer = setInterval(() => {
            if (box.scrollLeft >= 990) {
                box.scrollLeft = 0;
            }
            box.scrollLeft += 1
        }, 10)
    }
}
zou()




function lun5() {
    let $box = $('.box222');
    let $ul = $box.find('.ace');
    let $lis = $box.find('li');
    let $tips = $('.ccc');
    console.log($tips)
    let $leftBtn = $('.xax')
    let $rightBtn = $('.xay')
    let n = 0;
    let timer = null;
    function move() {
        n++;
        if (n > 3) {
            $ul.css('left', 0)
            n = 1;

        }
        $ul.animate({ left: -260 * n }, 300)
        autoFocus(n)
    }

   


    function autoMove() {
        timer = setInterval(() => {
            move()
        }, 2000)
    }
    autoMove()

     function autoFocus(n){
         if(n>=$tips.length){
         n=0;

         }
         $tips.eq(n).addClass('current').siblings().removeClass('current');

     }



}
lun5()