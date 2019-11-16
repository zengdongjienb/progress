
~function () {
    let inp = document.getElementsByTagName('input')[0];

    let ary = ['费列罗巧克力', '金龙鱼大米', 'aoc显示器', '保温杯', '扫描仪'];

    let i = 0;
    setInterval(() => {
        inp.placeholder = ary[i]
        i > 3 ? i = 0 : i++;
    }, 2000)
}()

/*  轮播图  */

let $img = $('.bx_centerT .bx_centerT_img'),
    $imgs = $('.bx_centerT .bx_centerT_img img'),
    $bx_centerT = $('.bx_centerT'),
    $desc = $('.bx_centerT .desc'),
    $descs = $('.bx_centerT .desc div'),
    $btnLeft = $('.btn .btn_left'),
    $btnRight = $('.btn .btn_right');

function getData() {
    $.ajax({
        url: './index.json',
        success: function (data) {
            render(data)
            init()
            clickDesc()
        }
    })
}
getData()

function render(data) {
    let str = '';
    let descStr = '';
    data.forEach((item, index) => {

        str += `<img src="${item.img}" alt="">`;
        descStr += (index == 0 ? `<div class="desc_x"></div>` : `<div></div>`);
    })
    $img.html(str);
    $desc.html(descStr);
}

function init() {
    $imgs = $('.bx_centerT .bx_centerT_img img');
    $descs = $('.bx_centerT .desc div');
    $imgs.eq(0).siblings().hide();
    autouMove()

}

let n = 0, timer = null;
function autouMove() {
    timer = setInterval(() => {
        move();
    }, 3000);
}
function move() {
    n++;
    if (n >= $imgs.length) {
        n = 0;
    }
    autouDescs()
    $imgs.eq(n).show().css({ opacity: 0 }).animate({ opacity: 1 }, 1000).siblings('img').animate({ opacity: 0 }, 1000, function () {
        $imgs.eq(n).siblings('img').hide();
    })
}
$bx_centerT.on('mouseenter', function () {
    clearInterval(timer)
})
$bx_centerT.on('mouseleave', function () {
    autouMove()
})

function autouDescs() {
    $descs.eq(n).addClass('desc_x').siblings().removeClass('desc_x')
}
function clickDesc() {
    for (let i = 0; i < $descs.length; i++) {
        $descs.eq(i).on('mouseenter', function () {
            n = i;
            $descs.eq(i).addClass('desc_x').siblings().removeClass('desc_x');
            $imgs.eq(i).show().css({ opacity: 0 }).animate({ opacity: 1 }, 200).siblings('img').animate({ opacity: 0 }, 200, function () {
                $imgs.eq(i).siblings('img').hide();
            })

        })
    }

}

$btnLeft.on('click', _.throttle(function () {
    n--;
    if (n < 0) {
        n = $imgs.length - 1;
    }
    n--;
    move()
}, 700))
$btnRight.on('click', _.throttle(function () {
    move();
}, 700))


/*  轮播图2  */

~function () {
    let n1 = 0;
    let timer1 = null;
    let $ul = $('.bx_centerR ul'),
        $leftBtn = $('.bx_centerR .left1'),
        $rightBtn = $('.bx_centerR .right1'),
        $bx_centerR = $('.bx_centerR');
    console.log($bx_centerR)
    $ul.eq(0).siblings().hide();


    timer1 = setInterval(() => {
        move()

    }, 6000);

    function move() {
        n1++;
        if (n1 == 3) {
            n1 = 0;
        }
        $ul.eq(n1).show().css({ opacity: 0 }).animate({ opacity: 1 }, 1000).siblings('ul').animate({ opacity: 0 }, 1000, function () {
            $ul.eq(n1).siblings('ul').hide();
        })
    }
    $leftBtn.on('click', function () {
        n1--;
        if (n1 < 0) {
            n1 = $ul.length - 1;
        }
        n1--;
        move()
    })
    $rightBtn.on('click', function () {
        move();
    })
    $bx_centerR.on('mouseenter', function () {
        clearInterval(timer1);
    })
    $bx_centerR.on('mouseleave', function () {
        timer1 = setInterval(() => {
            move()
        }, 2000);
    })

}()

/* 选项卡 */

let xxkBox_top = document.querySelectorAll('.xxkBox_top div');
let xxkBox = document.getElementsByClassName('xxkBox')[0],
    xxkMaxin = xxkBox.querySelectorAll('.xxkMaxin div'),
    J_tab_headx = document.querySelectorAll('.J_tab_headx');

for (let i = 0; i < J_tab_headx.length; i++) {
    J_tab_headx[i].onmouseenter = function () {
        xxkBox.style.display = 'block';

    }

}

for (let i = 0; i < xxkBox_top.length; i++) {
    xxkBox_top[i].onmouseenter = function () {
        clear();
        xxkMaxin[i].style.display = 'block';

    }

}
function clear() {
    for (let i = 0; i < xxkMaxin.length; i++) {
        xxkMaxin[i].style.display = 'none'

    }
}

/*  倒计时  */
function time() {
    let timmer_s = document.querySelector('.timmer_s'),
        timmer_f = document.querySelector('.timmer_f'),
        timmer_m = document.querySelector('.timmer_m');
    let time = new Date('2019 12 10 14:55:00'); //未来时间
    let now = new Date();//当前时间
    let t = Math.floor((time - now) / 1000); //总秒数
    let min = Math.floor(t / 60 % 60);//分
    let se = Math.floor(t % 60);//秒
    let h = Math.floor(t / 3600);//时

    timmer_f.innerHTML = Math.floor(min);
    timmer_m.innerHTML = se;
}

setInterval(() => {
    // timmer_s.innerHTML = Math.floor(h%24);
    time()
}, 1000)


let seckill_centerBox = document.querySelectorAll('.seckill_centerBox'),
seckill_centerBBB = document.querySelector('.seckill_centerBBB'),
    seckillBtnRight = document.querySelector('.seckillBtnRight'),
    seckillBtnLeft = document.querySelector('.seckillBtnLeft');
    console.log(seckillBtnRight)
let i = 0;
function move1() {
    i++;
    if (i == seckill_centerBox.length) {
        seckill_centerBBB.style.transition =null;
        seckill_centerBBB.style.left = 0;
        i = 1;  
    }
    setTimeout(() => {
        seckill_centerBBB.style.transition ='left 0.5s ease-in';
        seckill_centerBBB.style.left = -800*i + 'px';
    }, 10);
   
    
    // animate(seckill_centerBBB,{left:},500)
}
seckillBtnRight.onclick = function(){
    move1()
}
seckillBtnLeft.onclick = function(){
   i--;
   if(i<0){
    seckill_centerBBB.style.transition =null;
       seckill_centerBBB.style.left = -800*(seckill_centerBox.length-1) + 'px';
       i = seckill_centerBox.length-2;
       let a = seckill_centerBBB.clientHeight;
   }
    seckill_centerBBB.style.transition ='left 0.5s ease-in';
    seckill_centerBBB.style.left = -800*i + 'px';

}

let ul = document.querySelector('.seckill_right ul'),
slider_indicators = document.querySelector('.slider_indicators'),
desc = slider_indicators.querySelectorAll('.aa');
let q = 0;
autoMove2();
function autoMove2(){
      setInterval(() => {
        move2()
      }, 1000);
}
function move2(){
    
   
    q++;
    if(q>2){
        ul.style.transition = null;
        ul.style.left = 0;
        q = 1;
        let b = ul.clientHeight;
    }
   console.log(q);
   
        ul.style.transition = 'left 0.5s '
        ul.style.left = -180*q+'px';
        Desc(q)
        
}
function Desc(q){
    for (let i = 0; i < desc.length; i++) {
        desc[i].className = 'aa';
    }   
    let n = q >= desc.length ? 0 : q;
    desc[n].className = 'aa desc'
}




