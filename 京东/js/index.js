class Banner {
    constructor(idSelector, url) {
        this.url = url;
        this.box = document.querySelector(idSelector);
        this.ul = this.box.querySelector('.img_box ul');
        this.tipBox = this.box.querySelector('.tip_box');
        this.tips = this.box.getElementsByClassName('tip');
        this.leftBtn = this.box.querySelector('.left');
        this.rightBtn = this.box.querySelector('.right');
        this.n = 0;
        this.timer = null;
        this.getData();
    }
    getData() {
        var xhr = new XMLHttpRequest();
        var _this = this;
        xhr.open('get', this.url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && /200|304/.test(xhr.status)) {
                let data = JSON.parse(xhr.response);

                _this.render(data);
                _this.move();
                _this.tipClick();
                _this.bindEvent();
            }
        }
        xhr.send();
    }
    render(data) {
        data = data || [];
        let str = '';
        let tipStr = '';
        data.push(data[0]);
        data.forEach((item, index) => {
            let { img } = item;
            str += `<li>
                    <img src="${img}" alt="">
                </li>`;
            if (index !== data.length - 1) {
                if (index == 0) {
                    tipStr += `<span class="tip current"></span>\n`
                } else {
                    tipStr += `<span class="tip"></span>\n`
                }
            }
        })
        this.tipBox.innerHTML = tipStr;
        this.ul.innerHTML = str;
        this.ul.style.width = data.length * 590 + 'px';
    }
    move() {
        this.timer = setInterval(() => {
            this.change();
        }, 2000);
    }
    change() {
        this.n++;
        if (this.n == (this.tips.length + 1)) {
            this.ul.style.transition = 'none';
            this.ul.style.left = 0;
            this.n = 1
        }
        this.tipClass(this.n);
        setTimeout(() => {
            this.ul.style.transition = 'left 0.5s ease-in';
            this.ul.style.left = -590 * this.n + 'px';
        }, 20);

    }
    tipClass(m) {
        m = m >= this.tips.length ? 0 : m;
        for (let i = 0; i < this.tips.length; i++) {
            this.tips[i].className = 'tip'
        }
        this.tips[m].className = 'tip current';
    }
    bindEvent() {
        this.box.onmouseenter = () => {
            clearInterval(this.timer);
        }
        this.box.onmouseleave = () => {
            this.move();
        }
        this.rightBtn.onclick = this.debounce(() => {
            this.change()
        })
        this.leftBtn.onclick = () => {
            this.n--;
            if (this.n < 0) {
                this.ul.style.transition = 'none';
                this.ul.style.left = -590 * (this.tips.length) + 'px';
                this.n = this.tips.length - 1;
            }
            this.tipClass(this.n);
            setTimeout(() => {
                this.ul.style.transition = 'left 0.5s ease-in';
                this.ul.style.left = -590 * this.n + 'px';
            }, 10);
        }
    }
    tipClick() {
        for (let i = 0; i < this.tips.length; i++) {
            this.tips[i].onclick = () => {
                this.n = i;
                this.tipClass(this.n);
                this.ul.style.transition = 'left 0.5s ease-in';
                this.ul.style.left = -590 * this.n + 'px';
            }
        }
    }
    debounce(fn, wait = 200) {
        var timer = null;
        return function () {
            if (timer == null) {
                fn.apply(this, arguments);
                timer = 0;
                return;
            }
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(this, arguments);
                timer = null;
            }, wait);
        }
    }

}

new Banner('.center_box', './data.json')



//跑马灯
let box = document.querySelector('.horse .right')
let ul = document.querySelector('.horse .right ul')
ul.style.width = 1980 + 'px';
ul.innerHTML += ul.innerHTML
setInterval(() => {
    if (box.scrollLeft >= 980) {
        box.scrollLeft = 0
    }
    box.scrollLeft += 1
}, 10);


//回到顶部
let por = document.querySelector('.por')
let btnqqq1 = por.querySelector('.btnqqq')
por.style.display = 'none';
let H = document.documentElement.clientHeight || document.body.clientHeight;
window.onscroll = function () {
    let s = document.documentElement.scrollTop;
    if (s > H) {
        por.style.display = 'block'
    } else {
        por.style.display = 'none'
    }

}
let t = null
btnqqq1.onclick = function () {
    t = window.setInterval(() => {
        if (document.documentElement.scrollTop == 0) {
            clearInterval(t)
            return;
        }
        document.documentElement.scrollTop--
    }, 1000);
}

// 找相似
function f(){
    let $ul =$('.bottom5')
    let $olis = $('.bottom5 li')
    let $mas = $('.mas')
    let $cha = $('.cha')
    $olis.mouseenter(function(e){
        let n = $(this).index()
        $mas.eq(n).addClass('mass').siblings().removeClass('mass');
        $cha.click(function(){
            $mas.eq(n).removeClass('mass')
        })
    })
    $olis.mouseleave(function(e){  
        let n = $(this).index()
        $mas.eq(n).removeClass('mass').siblings().addClass('mass')
    })
}
f()
//倒计时
function deathtime() {
    let H = document.querySelector('.H'),
        M = document.querySelector('.M'),
        S = document.querySelector('.S');
    let now = new Date()//当前时间
    let tar = new Date('2019/11/18 00:00:00')//目标时间
    let spantime = tar - now;
    let h = parseInt(spantime / (1000 * 60 * 60))
    spantime = spantime - (h * 1000 * 60 * 60)
    let m = parseInt(spantime / (1000 * 60))
    spantime = spantime - (m * 1000 * 60)
    let s = parseInt(spantime / 1000)
    H.innerHTML = `${h < 10 ? '0' + h : h}`
    M.innerHTML = `${m < 10 ? '0' + m : m}`
    S.innerHTML = `${s < 10 ? '0' + s : s}`
}
setInterval(() => {
    deathtime()
}, 1000);


