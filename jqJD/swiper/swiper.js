// 思考：如何给 jQuery 扩展内容或者说方法？
// 扩展提问：$.extend 和 $.fn.extend 区别？
// $.extend : 给 jQuery 类本身扩展方法
// $.fn.extend : 给 jQuery 实例对象扩展方法


$.fn.extend({
    // options 是一个配置对象，由使用插件的用户传递过来的
    // this 代表的轮播图容器节点
    swiper: function (options) {
        var obj = new Swiper(options, this); // 实例化 Swiper 对象
        obj.init();
    }
})

/**
 * 
 * @param {配置对象} options 
 * @param {轮播图容器节点对象，是一个 jQuery 对象} wrap 
 */
function Swiper(options, wrap) {
    // 首先第一步，我们对对象进行一个初始化
    this.wrap = wrap; // 保存轮播图的外层容器节点
    this.contentList = options.contentList || []; // 轮播的内容列表
    this.autoChangeTime = options.autoChangeTime || 5000; // 自动播放时间
    this.type = options.type || 'fade'; // 播放的方式
    this.isAuto = options.isAuto === undefined ? true : !!options.isAuto;// 是否自动轮播
    // 左右按钮的显示状态，共有 3 种 
    // 1. always 代表一支显示   2. hide 代表隐藏    3. hover 移入显示
    this.showChangeBtn = options.showChangeBtn || 'always';
    // 是否显示小圆点
    this.showSpots = options.showSpots == undefined ? true : !!options.showSpots;
    // 小圆点的大小
    this.spotSize = options.spotSize || 5;
    // 小圆点的位置，可选值有 3 个 
    // 1. left 2. center 3. right
    this.spotPosition = options.spotPosition || 'center';
    // 小圆点的背景颜色
    this.spotColor = options.spotColor || "rgba(255,255,255,.4)";
    // 当前图片的小圆点的颜色
    this.curSpotColor = options.curSpotColor || "red";
    this.width = options.width || $(wrap).width(); // 轮播图容器的宽度
    this.height = options.height || $(wrap).height(); // 轮播图容器的高度


    // 除开上面用户传递的属性，我们保存在了 Swiper 实例对象上面
    // 还有一些属性，这些是用户没有传递
    this.len = this.contentList.length; // 轮播图项目的长度
    this.nowIndex = 0; // 当前轮播的索引值
    this.timer = null; // 自动轮播的计时器
    this.lock = false; // 是否执行切换动画
}

// 初始化轮播图的方法
Swiper.prototype.init = function () {
    // 主要要做的事情有 3 个
    // 1. 创建轮播图结构（这个结构才是最终渲染到浏览器的 DOM 结构）
    this.createElement();

    // 2. 初始化轮播图的样式
    this.initStyle();

    // 3. 绑定功能
    this.bindEvent();

    // 4. 自动轮播
    if(this.isAuto){
        this.autoChange();
    }

}

// 创建轮播图结构方法
Swiper.prototype.createElement = function () {
    // 1. 创建对应的结构

    // 整个轮播图的包裹层
    var swiperWrapper = $('<div class="my-swiper-wrapper"></div>');
    // 轮播图的内容区
    var swiperItems = $('<ul class="my-swiper-items"></ul>');
    // 轮播图小圆点区域
    var spotsWrapper = $('<div class="my-swiper-spots"></div>')
    // 左右按钮
    var leftBtn = $('<div class="my-swiper-btn my-swiper-lbtn"><i class="iconfont">&#xe628;</i></div>')
    var rightBtn = $('<div class="my-swiper-btn my-swiper-rbtn"><i class="iconfont">&#xe625;</i></div>')

    // 接下来，我们需要将用户传递过来的具体轮播项目添加到轮播图的内容区
    for (var i = 0; i < this.len; i++) {
        // 往轮播图的内容区添加 li
        $("<li class='my-swiper-item'></li>").html(this.contentList[i]).appendTo(swiperItems);
        // 添加对应的小圆点
        $("<span></span>").appendTo(spotsWrapper)
    }


    // 2. 不是所有的结构都是一样的
    // 如果是从左到右的轮播，我们的 DOM 结构稍微有些不一样，需要做特殊处理
    if(this.type === 'animate'){
        // 进入此 if，说明用户选择的是从左到右的轮播
        // 那么我们要实现无缝轮播，所以最后要添加一个第一张图片
        swiperItems.append($("<li class='my-swiper-item'></li>").html($(this.contentList[0]).clone(true)));
    }


    // 3. 根据用户选择是否显示左右按钮，结构上还要做处理
    switch(this.showChangeBtn){
        case 'hide' : {
            leftBtn.hide();
            rightBtn.hide();
            break;
        }
        case 'hover' : {
            // 先把添加的按钮隐藏掉，再设置 hover 方法
            leftBtn.hide();
            rightBtn.hide();
            swiperWrapper.hover(function(){
                leftBtn.show();
                rightBtn.show();
            },function(){
                leftBtn.hide();
                rightBtn.hide();
            });
            break;
        }
        default : {
            // 默认 always
            break;
        }
    }

    // 4. 设置小圆点是否要显示
    if(!this.showSpots){
        // 进入此 if，说明用户不要显示小圆点
        spotsWrapper.hide();
    }

    swiperWrapper
        .append(swiperItems)
        .append(leftBtn)
        .append(rightBtn)
        .append(spotsWrapper)
        .appendTo(this.wrap)
        .addClass('my-swiper-wrapper_' + this.type);
        // 最后再根据轮播方式动态的添加一个样式
}

// 初始化轮播图样式的方法
Swiper.prototype.initStyle = function(){
    // 因为不是所有的样式都能在 swiper.css 里面写死
    // 有一部份样式需要根据用户传入的配置来进行更改
    // 所以需要这么一个方法

    // 1. 轮播内容区域的整体大小
    $(this.wrap)
        .find('.my-swiper-items')
        .css({
            width : this.type === 'animate' ? this.width * (this.len + 1) : this.width,
            height : this.height
        })
        .find('.my-swiper-item')
        .css({
            width : this.width,
            height : this.height
        })
    
    // 2. 根据轮播图的类型设置第一张轮播图
    if(this.type === 'fade'){
        // 淡入淡出，设置第一张图片显示
        $(this.wrap).find('.my-swiper-item').eq(this.nowIndex).show();
    } else {
        // 从左到右，设置 ul 的 left 值
        $(this.wrap).find('.my-swiper-items').css({
            left : -this.nowIndex * this.width
        })
    }

    // 3. 设置小圆点
    $(this.wrap)
        // 设置的是小圆点外层的容器 
        .find('.my-swiper-spots')
        .css({
            textAlign : this.spotPosition,
            display : this.showSpots ? 'block' : 'none'
        })
        // 设置小圆点里面的每一个圆点（span）
        .find('span')
        .css({
            width : this.spotSize,
            height : this.spotSize,
            backgroundColor : this.spotColor
        })
        // 这边取余是为了到最后一张的时候立马回到第一张
        .eq(this.nowIndex % this.len)
        .css({
            backgroundColor : this.curSpotColor
        })
}

// 绑定轮播图事件
Swiper.prototype.bindEvent = function(){

    // 保存 this 指向
    var self = this;

    // 思考：有哪些事件？

    // 1. 两边按钮绑定上一张下一张事件
    // 无论是上一张，还是下一张，还是后面的小圆点切换
    // 核心思想就是更新下标
    // 所以，这里要做的事情，就是判断下标，然后更新下标
    $(this.wrap)
        .find('.my-swiper-lbtn')
        .click(function(){
            // 这里有一个细节，用户点击按钮后，我们需要等待上一次切换完成之后
            // 才做这一次的切换，如果这一次的切换还没有完成，那么用户的这一次点击无效

            if(self.lock){
                // 进入此 if，说明当前处于两张图片切换当中，咱们直接 return，不做其他处理
                return;
            }

            self.lock = true;

            if(self.type === 'fade'){
                // 淡入淡出
                if(self.nowIndex === 0){
                    // 跳到最后一张
                    self.nowIndex = self.len - 1;
                } else {
                    self.nowIndex--;
                }
                self.change();
            } else {
                // 从左到右
                if(self.nowIndex === 0){
                    // 当前已经是第一张，要跳转最后一张
                    $(self.wrap)
                        .find('.my-swiper-items')
                        .css({
                            left : -self.len * self.width
                        })
                    self.nowIndex = self.len - 1;
                } else {
                    self.nowIndex--;
                }
                self.change();
            }
        })

    // 右边的按钮
    // 明白了左按钮的逻辑，右按钮就是一样
    $(this.wrap)
        .find('.my-swiper-rbtn')
        .click(function(){
            // 这里有一个细节，用户点击按钮后，我们需要等待上一次切换完成之后
            // 才做这一次的切换，如果这一次的切换还没有完成，那么用户的这一次点击无效

            if(self.lock){
                // 进入此 if，说明当前处于两张图片切换当中，咱们直接 return，不做其他处理
                return;
            }

            self.lock = true;

            if(self.type === 'fade'){
                // 淡入淡出
                if(self.nowIndex === self.len - 1){
                    // 跳到最后一张
                    self.nowIndex = 0;
                } else {
                    self.nowIndex++;
                }
                self.change();
            } else {
                // 从左到右
                if(self.nowIndex === self.len){
                    // 当前已经是第一张，要跳转最后一张
                    $(self.wrap)
                        .find('.my-swiper-items')
                        .css({
                            left : 0
                        })
                    self.nowIndex = 1
                } else {
                    self.nowIndex++;
                }
                self.change();
            }
        })

    // 2. 小圆点的事件
    // 需要做的事儿：鼠标点击对应小圆点的时候，更新 nowIndex，然后调用 change 方法即可
    $(this.wrap)
        .find('.my-swiper-spots')
        // 这里是事件委托
        .on('click', 'span', function(){
            if(self.lock){
                return;
            }
            self.lock = true;
            console.log(this,'this');
            self.nowIndex = $(this).index();
            self.change();
        })

    // 3. 鼠标移入移出
    $(this.wrap).mouseenter(function(){
        clearInterval(self.timer)
    }).mouseleave(function(){
        if(self.isAuto){
            self.autoChange();
        }
    })
}

// 该方法根据当前的下标来更新图片
Swiper.prototype.change = function(){
    var self = this;

    // 1. 更新图片
    if(this.type === 'fade'){
        // 淡入淡出
        // 先把所有的图片都 fadeOut
        // 然后将当前的图片 fadeIn
        $(this.wrap)
            .find('.my-swiper-item')
            .fadeOut()
            .eq(this.nowIndex)
            .fadeIn(function(){
                self.lock = false; // 淡入淡出效果已经完成，关闭锁
            });
    } else {
        // 从左到右
        $(this.wrap)
            .find('.my-swiper-items')
            .animate({
                left : -this.nowIndex * this.width,
            },function(){
                self.lock = false; // 淡入淡出效果已经完成，关闭锁
            })
    }

    // 2. 更新小圆点
    $(this.wrap)
        .find('.my-swiper-spots>span')
        .css({
            backgroundColor : this.spotColor
        })
        .eq(this.nowIndex % this.len)
        .css({
            backgroundColor : this.curSpotColor
        })
}

// 自动播放
Swiper.prototype.autoChange = function(){
    var self = this;
    clearInterval(this.timer);
    self.timer = setInterval(function(){
        $(self.wrap).find('.my-swiper-rbtn').trigger('click');
    }, self.autoChangeTime);

}