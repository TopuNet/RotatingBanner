require(["RotatingBanner", "/inc/jquery.min.js"], function(RotatingBanner) {

    $(function() {
        // 效果1
        var RotatingBanner_obj = {
            autoPlay: "left",
            distance: 1,
            point_autoCreate: true,
            delay: 2000
        };
        var RotatingBanner_1 = new RotatingBanner();
        RotatingBanner_1.init(RotatingBanner_obj);
        $("section.ul_button li").click(function() {
            var index = $(this).index();
            if (index == 0) {
                RotatingBanner_1.Pause();
            } else {
                RotatingBanner_1.reStart("right");
            }
        });

        // 效果2
        RotatingBanner_obj = {
            box_selector: "body.demo section.Effective div.banner_div", // 外盒选择器，默认值：section.banner
            point_ul_selector: "body.demo section.Effective ul.point_ul", // 圆点li的ul盒选择器，空字符串为无圆点。此盒不必存在于box_selector中。默认值：section.banner ul.point_ul。
            arrow_left_selector: "body.demo section.Effective div.arrow_left", // 左箭头的盒选择器，此盒不必存在于box_selector中。null为无左箭头。默认值：null
            arrow_right_selector: "body.demo section.Effective div.arrow_right" // 右箭头的盒选择器，此盒不必存在于box_selector中。null为无右箭头。默认值：null
        };
        var RotatingBanner_2 = new RotatingBanner();
        RotatingBanner_2.init(RotatingBanner_obj);

        // 效果3
        RotatingBanner_obj = {
            autoPlay: "left",
            box_selector: "body.demo section.list_3 div.banner_div", // 外盒选择器，默认值：section.banner
            point_ul_selector: "body.demo section.list_3 ul.point_ul", // 圆点li的ul盒选择器，空字符串为无圆点。此盒不必存在于box_selector中。默认值：section.banner ul.point_ul。
            arrow_left_selector: "body.demo section.list_3 div.arrow_left", // 左箭头的盒选择器，此盒不必存在于box_selector中。null为无左箭头。默认值：null
            arrow_right_selector: "body.demo section.list_3 div.arrow_right", // 右箭头的盒选择器，此盒不必存在于box_selector中。null为无右箭头。默认值：null
            resize_li: false, // 自动改变li的宽高为外盒的宽高，默认true
            distance: 1 // 自动轮播时，滚动距离：distance个li。默认为1
        };
        var RotatingBanner_3 = new RotatingBanner();
        RotatingBanner_3.init(RotatingBanner_obj);

        // 效果4
        RotatingBanner_obj = {
            autoPlay: "left",
            box_selector: "body.demo section.list_4 div.banner_div", // 外盒选择器，默认值：section.banner
            point_ul_selector: "body.demo section.list_4 ul.point_ul", // 圆点li的ul盒选择器，空字符串为无圆点。此盒不必存在于box_selector中。默认值：section.banner ul.point_ul。
            arrow_left_selector: "body.demo section.list_4 div.arrow_left", // 左箭头的盒选择器，此盒不必存在于box_selector中。null为无左箭头。默认值：null
            arrow_right_selector: "body.demo section.list_4 div.arrow_right", // 右箭头的盒选择器，此盒不必存在于box_selector中。null为无右箭头。默认值：null
            resize_li: false, // 自动改变li的宽高为外盒的宽高，默认true
            distance: 4 // 自动轮播时，滚动距离：distance个li。默认为1
        };
        var RotatingBanner_4 = new RotatingBanner();
        RotatingBanner_4.init(RotatingBanner_obj);
    });
});
