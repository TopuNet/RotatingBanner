// 1.0.1
var RotatingBanner = {
    Timeout_id: null, // 记录定时器ID，清除时用
    Rotating: false, // 记录当前是否在轮播
    banner_count: null, // banner数量
    banner_now: 0, // 当前显示banner
    box_width_px: null, // 外盒宽度，后续程序中获得
    // 参数集
    paras: {
        autoPlay: null, // 自动播放：left/right/null，默认值：left
        box_selector: null, // 外盒选择器，默认值：section.banner
        pic_ul_selector: null, // 图片li的ul盒选择器，默认值：ul.pic_ul
        point_ul_selector: null, // 圆点li的ul盒选择器，空字符串为无圆点。默认值：ul.point_ul。
        duration: null, // 动画过渡时间，毫秒。默认500
        delay: null // 动画间隔，毫秒。默认5000
    },
    init: function(paras) {

        var paras_default = {
            autoPlay: "left",
            box_selector: "section.banner",
            pic_ul_selector: "ul.pic_ul",
            point_ul_selector: "ul.point_ul",
            duration: 500,
            delay: 5000
        };
        RotatingBanner.paras = paras = $.extend(paras_default, paras);

        RotatingBanner.banner_count = $(paras.box_selector + " " + paras.pic_ul_selector + " li").length;

        RotatingBanner.resize();

        // 监听圆点
        if (paras.point_ul_selector != "")
            RotatingBanner.PointListener();

        if (paras.autoPlay)
            RotatingBanner.preRotating(paras.autoPlay.toLowerCase());

    },

    // 重定义盒尺寸
    resize: function() {
        var n = 0; // 解决某些浏览器resize执行两遍的bug

        $(window).resize(function() {
            if (++n % 2 == 0)
                return;
            resize_do();
        });

        var resize_do = function() {

            setTimeout(function() {

                var paras = RotatingBanner.paras;
                var box_obj = $(paras.box_selector); // 盒对象
                var box_width_px = RotatingBanner.box_width_px = box_obj.css("width").replace("px", "");
                var box_height_px = box_obj.css("height").replace("px", "");

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

        resize_do();
    },

    // 轮播准备
    // direct：left/right
    preRotating: function(direct) {
        clearTimeout(RotatingBanner.Timeout_id);
        switch (direct.toLowerCase()) {
            case "left":
            default:
                RotatingBanner.Timeout_id = setTimeout(RotatingBanner.scrollToLeft, RotatingBanner.paras.delay);
                break;
            case "right":
                RotatingBanner.Timeout_id = setTimeout(RotatingBanner.scrollToRight, RotatingBanner.paras.delay);
                break;
        }
    },

    // 向左滚X屏
    scrollToLeft: function(X) {
        if (RotatingBanner.Rotating)
            return;
        RotatingBanner.Rotating = true;

        if (!X)
            X = 1;

        var paras = RotatingBanner.paras;
        var ul_obj = $(paras.box_selector + " " + paras.pic_ul_selector);

        // 计算滚动后的left值
        var ul_left_px_new = parseFloat(ul_obj.css("left").replace("px", "")) - X * RotatingBanner.box_width_px;

        // 执行滚动
        ul_obj.animate({
            "left": ul_left_px_new
        }, paras.duration, function() {
            var li_obj = $(ul_obj.find("li"));
            var i = 0;
            for (; i < X; i++)
                $(li_obj[0]).appendTo(ul_obj);
            ul_obj.css("left", 0);

            // 切换banner_now
            RotatingBanner.banner_now += X;
            if (RotatingBanner.banner_now >= RotatingBanner.banner_count)
                RotatingBanner.banner_now = 0;

            // 切换圆点
            RotatingBanner.changePoint();

            RotatingBanner.Rotating = false;

            // 再次执行滚动（如autoPlay不为null）
            if (paras.autoPlay)
                RotatingBanner.preRotating(paras.autoPlay.toLowerCase());
        });
    },

    // 向右滚X屏
    scrollToRight: function(X) {
        if (RotatingBanner.Rotating)
            return;
        RotatingBanner.Rotating = true;

        if (!X)
            X = 1;
        var paras = RotatingBanner.paras;
        var ul_obj = $(paras.box_selector + " " + paras.pic_ul_selector);

        var li_obj = $(ul_obj.find("li"));
        var li_obj_len = li_obj.length;

        var i = 0;
        for (; i < X; i++)
            $(li_obj[li_obj_len - 1]).prependTo(ul_obj);
        ul_obj.css("left", -X * RotatingBanner.box_width_px);

        ul_obj.animate({
            "left": 0
        }, paras.duration, function() {

            // 切换banner_now
            RotatingBanner.banner_now -= X;
            if (RotatingBanner.banner_now < 0)
                RotatingBanner.banner_now = RotatingBanner.banner_count - 1;

            // 切换圆点
            RotatingBanner.changePoint();

            RotatingBanner.Rotating = false;

            // 再次执行滚动（如autoPlay不为null）
            if (paras.autoPlay)
                RotatingBanner.preRotating(paras.autoPlay.toLowerCase());
        });
    },

    // 切换圆点高亮
    changePoint: function() {
        var paras = RotatingBanner.paras;
        var obj = $(paras.box_selector + " " + paras.point_ul_selector + " li");
        obj.siblings(".selected").removeClass("selected");
        $(obj[RotatingBanner.banner_now]).addClass("selected");
    },

    // 监听圆点
    PointListener: function() {
        var paras = RotatingBanner.paras;
        var obj = $(paras.box_selector + " " + paras.point_ul_selector + " li");
        $(obj[0]).addClass("selected");
        obj.click(function() {
            var n = $(this).index();
            if (n == RotatingBanner.banner_now)
                return;
            // clearTimeout();
            if (n < RotatingBanner.banner_now)
                RotatingBanner.scrollToRight(RotatingBanner.banner_now - n);
            if (n > RotatingBanner.banner_now)
                RotatingBanner.scrollToLeft(n - RotatingBanner.banner_now);
        });
    }
}
