// 1.0.1
var RotatingBanner = {
    Timeout_id: null, // 记录定时器ID，清除时用
    Rotating: false, // 记录当前是否在轮播
    banner_count: null, // banner数量
    banner_now: 0, // 当前显示banner
    box_width_px: null, // 外盒宽度，后续程序中获得
    // 参数集
    paras: {
        autoPlay: null, // 自动播放：left/right/null，默认值：null
        box_selector: null, // 外盒选择器，默认值：section.banner
        pic_ul_selector: null, // 图片li的ul盒选择器，此盒必须存在于box_selector中，且值中不用包含box_selector。默认值：ul.pic_ul
        point_ul_selector: null, // 圆点li的ul盒选择器，空字符串为无圆点。此盒不必存在于box_selector中。默认值：section.banner ul.point_ul。
        point_li_selected_className: null, // 圆点高亮li的className，默认值：selected
        arrow_left_selector: null, // 左箭头的盒选择器，此盒不必存在于box_selector中。null为无左箭头。默认值：null
        arrow_right_selector: null, // 右箭头的盒选择器，此盒不必存在于box_selector中。null为无右箭头。默认值：null
        duration: null, // 动画过渡时间，毫秒。默认500
        delay: null // 动画间隔，毫秒。默认5000
    },
    init: function(_paras) {

        var paras_default = {
            autoPlay: null,
            box_selector: "section.banner",
            pic_ul_selector: "ul.pic_ul",
            point_ul_selector: "section.banner ul.point_ul",
            point_li_selected_className: "selected",
            arrow_left_selector: null,
            arrow_right_selector: null,
            duration: 500,
            delay: 5000
        };
        this.paras = $.extend(paras_default, _paras);
        _paras = this.clone(this.paras);

        this.banner_count = $(_paras.box_selector + " " + _paras.pic_ul_selector + " li").length;

        this.resize(this);

        // 监听圆点
        if (_paras.point_ul_selector != "")
            this.PointListener(this);

        // 监听左箭头
        if (_paras.arrow_left_selector)
            this.arrowLeftListener(this);

        // 监听右箭头
        if (_paras.arrow_right_selector)
            this.arrowRightListener(this);

        // 轮播
        if (_paras.autoPlay)
            this.preRotating(this, _paras.autoPlay.toLowerCase(this));

    },

    // 克隆对象。用于一个页面中有多个轮播图时
    clone: function(myObj) {
        if (typeof(myObj) != 'object') return myObj;
        if (myObj == null) return myObj;

        var myNewObj = new Object();

        for (var i in myObj)
            myNewObj[i] = this.clone(myObj[i]);

        return myNewObj;
    },

    // 重定义盒尺寸
    resize: function(this_obj) {
        var n = 0; // 解决某些浏览器resize执行两遍的bug

        $(window).resize(function() {
            if (++n % 2 == 0)
                return;
            resize_do();
        });

        var resize_do = function() {

            var _paras = this_obj.clone(this_obj.paras);
            var box_obj = $(_paras.box_selector); // 盒对象
            var box_width_px = this_obj.box_width_px = box_obj.css("width").replace("px", "");
            var box_height_px = box_obj.css("height").replace("px", "");

            setTimeout(function() {

                var pic_li_obj = $(box_obj.find("ul.pic_ul li")); // 图片li对象

                if (pic_li_obj.length <= 1) // 没有li则不往下执行
                    return;
                pic_li_obj.css("width", box_width_px + "px");
                pic_li_obj.css("height", box_height_px + "px");

                var pic_ul_obj = $(box_obj.find("ul.pic_ul")); // 图片ul对象
                var ul_width_px = box_width_px * pic_li_obj.length;
                pic_ul_obj.css("width", ul_width_px + "px");

                n = 0;

            }, 0);

        };

        resize_do(this_obj);
    },

    // 轮播准备
    // direct：left/right
    preRotating: function(this_obj, direct) {
        clearTimeout(this_obj.Timeout_id);
        switch (direct.toLowerCase()) {
            case "left":
            default:
                this_obj.Timeout_id = setTimeout(function() {
                    this_obj.scrollToLeft(this_obj);
                }, this_obj.paras.delay);
                break;
            case "right":
                this_obj.Timeout_id = setTimeout(function() {
                    this_obj.scrollToRight(this_obj)
                }, this_obj.paras.delay);
                break;
        }
    },

    // 向左滚X屏
    scrollToLeft: function(this_obj, X) {
        if (this_obj.Rotating)
            return;
        this_obj.Rotating = true;

        if (!X)
            X = 1;

        var _paras = this_obj.clone(this_obj.paras);
        var ul_obj = $(_paras.box_selector + " " + _paras.pic_ul_selector);

        // 计算滚动后的left值
        var ul_left_px_new = parseFloat(ul_obj.css("left").replace("px", "")) - X * this_obj.box_width_px;

        // 执行滚动
        ul_obj.animate({
            "left": ul_left_px_new
        }, _paras.duration, function() {
            var li_obj = $(ul_obj.find("li"));
            var i = 0;
            for (; i < X; i++)
                $(li_obj[0]).appendTo(ul_obj);
            ul_obj.css("left", 0);

            // 切换banner_now
            this_obj.banner_now += X;
            if (this_obj.banner_now >= this_obj.banner_count)
                this_obj.banner_now = 0;

            // 切换圆点
            this_obj.changePoint(this_obj);

            this_obj.Rotating = false;

            // 再次执行滚动（如autoPlay不为null）
            if (_paras.autoPlay)
                this_obj.preRotating(this_obj, _paras.autoPlay.toLowerCase());
        });
    },

    // 向右滚X屏
    scrollToRight: function(this_obj, X) {
        if (this_obj.Rotating)
            return;
        this_obj.Rotating = true;

        if (!X)
            X = 1;
        var _paras = this_obj.clone(this_obj.paras);
        var ul_obj = $(_paras.box_selector + " " + _paras.pic_ul_selector);

        var li_obj = $(ul_obj.find("li"));
        var li_obj_len = li_obj.length;

        var i = 0;
        for (; i < X; i++)
            $(li_obj[li_obj_len - 1]).prependTo(ul_obj);
        ul_obj.css("left", -X * this_obj.box_width_px);

        ul_obj.animate({
            "left": 0
        }, _paras.duration, function() {

            // 切换banner_now
            this_obj.banner_now -= X;
            if (this_obj.banner_now < 0)
                this_obj.banner_now = this_obj.banner_count - 1;

            // 切换圆点
            this_obj.changePoint(this_obj);

            this_obj.Rotating = false;

            // 再次执行滚动（如autoPlay不为null）
            if (_paras.autoPlay)
                this_obj.preRotating(this_obj, _paras.autoPlay.toLowerCase());
        });
    },

    // 切换圆点高亮
    changePoint: function(this_obj) {
        var _paras = this_obj.clone(this_obj.paras);
        var obj = $(_paras.point_ul_selector + " li");
        obj.siblings("." + _paras.point_li_selected_className).removeClass(_paras.point_li_selected_className);
        $(obj[this_obj.banner_now]).addClass(_paras.point_li_selected_className);
    },

    // 监听圆点
    PointListener: function(this_obj) {
        var _paras = this.clone(this_obj.paras);
        var obj = $(_paras.point_ul_selector + " li");
        $(obj[0]).addClass(_paras.point_li_selected_className);
        obj.on("touchstart mousedown", function(event) {
            event.preventDefault();
            var n = $(this).index();
            if (n == this_obj.banner_now)
                return;
            // clearTimeout();
            if (n < this_obj.banner_now)
                this_obj.scrollToRight(this_obj, this_obj.banner_now - n);
            if (n > this_obj.banner_now)
                this_obj.scrollToLeft(this_obj, n - this_obj.banner_now);
        });
    },

    // 监听左箭头
    arrowLeftListener: function(this_obj) {
        var _paras = this_obj.clone(this_obj.paras);
        $(_paras.arrow_left_selector).on("touchstart mousedown", function(event) {
            event.preventDefault();
            this_obj.scrollToRight(this_obj);
        });
    },

    // 监听右箭头
    arrowRightListener: function(this_obj) {
        var _paras = this_obj.clone(this_obj.paras);
        $(_paras.arrow_right_selector).on("touchstart mousedown", function(event) {
            event.preventDefault();
            this_obj.scrollToLeft(this_obj);
        });
    }
}
