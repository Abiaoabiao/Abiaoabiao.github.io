// 加载 shortcut 模块中的内容
$('.shortcut .w').load('../components/shortcut.html');

// 加载 header 模块内容
$('.header .w').load('../components/header.html');

// 加载 menu 内容
$('.fs-1').load('../components/menu.html');


// 加载轮播图
$('.sliderWrapper').load('../components/sliderWrapper.html', function(){
    $(this).swiper({
        contentList : $(this).find('.focus-item__core'),
        type : 'animate',
        width : 590,
        height : 470,
        spotPosition : 'left',
        spotSize : 10,
        spotColor : '#fff'
    })
})

// 加载轮播图
$('.sliderBanner').load('../components/sliderBanner.html', function(){
    $(this).swiper({
        contentList : $(this).find('.focus-item__recommend'),
        type : 'fade',
        width : 190,
        height : 470,
        showSpots : false,
    })
})

// 轮播图右侧
$('.fs-3 .user').load('../components/user.html');
$('.fs-3 .news').load('../components/news.html');
$('.fs-3 .service').load('../components/service.html');

// 秒杀区域
$('.seckill').load('../components/seckill.html');