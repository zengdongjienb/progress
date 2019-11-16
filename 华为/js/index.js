let shouji = document.getElementById('shouji')
let weiBtn = document.getElementById('weibtn')
// 
let gouwuche = document.getElementById('gouwuche')
let gouwutu = document.getElementById('gouwutu')
// 
let eamli = document.getElementById('eamlibig')
let eamlidaoye = document.getElementById('emalidaoye')
// 
let diaonao = document.getElementById('diaonao_box')
let diaonaoBtn = document.getElementById('diaonao')
// 
let pingbansBtn = document.getElementById('pingbanes')
let pingbansBox = document.getElementById('pingbanes_box')
// 
let jiajuBtn = document.getElementById('jiaju')
let jiajuBox = document.getElementById('jiaju_box')
// 
let peijianBtn = document.getElementById('peijians')
let peijianBox = document.getElementById('peijians_box')
// 
let dao_hang = document.getElementById('dao_hang')
let wang_zhan = document.getElementById('wang_zhan')
// 1.
shouji.onmouseover = function(){
    weiBtn.style.display = "block"
}
shouji.onmouseleave = function(){
    weiBtn.style.display = "none"
}
// 2.
gouwuche.onmouseover = function(){
    gouwutu.style.display = "block"
}
gouwuche.onmouseleave = function(){
    gouwutu.style.display = "none"
}
// 3.
eamlidaoye.onmouseover = function(){
    eamli.style.display = 'block'
}
eamlidaoye.onmouseleave = function(){
    eamli.style.display = 'none'
}
// 4.
diaonaoBtn.onmouseover = function(){
    diaonao.style.display = 'block'
}
diaonaoBtn.onmouseleave = function(){
    diaonao.style.display = 'none'
}
// 5.
jiajuBtn.onmouseover = function(){
    jiajuBox.style.display = 'block'
}
jiajuBtn.onmouseleave = function(){
    jiajuBox.style.display = 'none'
}
// 6.
peijianBtn.onmouseover = function(){
    peijianBox.style.display = 'block'
}
peijianBtn.onmouseleave = function(){
    peijianBox.style.display = 'none'
}
// 
pingbansBtn.onmouseover = function(){
    pingbansBox.style.display = 'block'
}
pingbansBtn.onmouseleave = function(){
    pingbansBox.style.display = 'none'
}
// 
dao_hang.onmouseover = function(){
    wang_zhan.style.display = 'block'
}
dao_hang.onmouseleave = function(){
    wang_zhan.style.display = 'none'
}



/*
* II. 目标
*   1. 处理轮播图鼠标悬停时停止自动轮播，并展示左右切换按钮
*   2. 实现点击左右按钮切换轮播图
*   3. 实现点击焦点切换轮播图
* */
// 1. 获取元素对象
let $container = $('.container');
let $wrapper = $('.wrapper');
let $focus = $('.focus');
let $arrowLeft = $('.arrowLeft');
let $arrowRight = $('.arrowRight');
let $slideList = null;
let $focusList = null;

let stepIndex = 0; 
let autoTimer = null; 
let interval = 1000; 

$.ajax({
  url: './data.json',
  method: 'GET',
  async: false,
  dataType: 'json',
  success (data) {

    bindHTML(data);
  },
  error: function (err) {
    console.log(err);
  }
});

function bindHTML(data) {

  let slideStr = ``;
  let focusStr = ``;

  data.forEach((item, index) => {
    let { img, desc } = item;
    slideStr += `<div class="slide"><img src="${img}" alt="${desc}"></div>`
    focusStr += `<li class="${index === 0 ? 'active' : ''}"></li>`
  });

  slideStr += `<div class="slide"><img src="${data[0].img}" alt="${data[0].desc}"></div>`;

  $wrapper.html(slideStr);
  $focus.html(focusStr);

  $slideList = $('.slide');
  $focusList = $('.focus > li');

  $wrapper.css({
    width: $slideList.length * 2000
  })
}

function autoMove() {
  stepIndex++;
  if (stepIndex >= $slideList.length) {

    $wrapper.css({
      left: 0
    });
    stepIndex = 1;
  }

  $wrapper.stop().animate({
    left: -1 * stepIndex * 2000
  }, 200);
  changeFocus();
}

function changeFocus() {
  let tmpIndex = stepIndex; 
  if (tmpIndex === $slideList.length - 1) {
    tmpIndex = 0;
  }
  $focusList.eq(tmpIndex)
    .addClass('active')
    .siblings()
    .removeClass('active');

}

function handleContainer() {
  $container.on('mouseenter', function () {
    clearInterval(autoTimer);
    $arrowLeft.css({
      display: 'block'
    });
    $arrowRight.css({
      display: 'block'
    })
  }).on('mouseleave', function () {
    autoTimer = setInterval(autoMove, interval);
    $arrowLeft.css({
      display: 'none'
    });
    $arrowRight.css({
      display: 'none'
    })
  })
}
handleContainer();

function handleArrow() {
  $arrowRight.click(autoMove);

  $arrowLeft.click(function () {
    stepIndex--;

    if (stepIndex < 0) {
      stepIndex = $slideList.length - 2;
    }

    $wrapper.stop().animate({
      left: -1 * stepIndex * 2000
    }, 200);
    changeFocus();
  })
}
handleArrow();

function handleFocus() {
  $focusList.click(function () {
    let $index = $(this).index();
    stepIndex = $index;
    $wrapper.stop().animate({
      left: -1 * $index * 2000
    });
    changeFocus();
  })
}

handleFocus();

autoTimer = setInterval(autoMove, interval);