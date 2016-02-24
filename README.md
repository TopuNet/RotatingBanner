# RotatingBanner JS插件 v1.2.1
###轮播Banner（不含样式）

文件结构：
-------------
1. RotatingBanner.js 放入项目文件夹jq中

页面引用：
-------------
1. 在页面中布局轮播图样式，可参考demo
2. 页面底端引用最新版 /inc/Jquery.min.js#1.x.x
3. Jquery后引用 /jq/RotatingBanner.js

功能配置及启用：
--------------
页面底部调用初始化方法并传参：

		$(function() {
			// Banner1
        	var RotatingBanner_obj = {
		        autoPlay: null, // 自动播放：left/right/null，默认值：null
		        box_selector: null, // 外盒选择器，默认值：section.banner
		        pic_ul_selector: null, // 图片li的ul盒选择器，此盒必须存在于box_selector中，且值中不用包含box_selector。默认值：ul.pic_ul
		        point_ul_selector: null, // 圆点li的ul盒选择器，空字符串为无圆点。此盒不必存在于box_selector中。默认值：section.banner ul.point_ul。
		        point_li_selected_className: null, // 圆点高亮li的className，默认值：selected
		        arrow_left_selector: null, // 左箭头的盒选择器，此盒不必存在于box_selector中。null为无左箭头。默认值：null
		        arrow_right_selector: null, // 右箭头的盒选择器，此盒不必存在于box_selector中。null为无右箭头。默认值：null
		        duration: null, // 动画过渡时间，毫秒。默认500
		        delay: null // 动画间隔，毫秒。默认5000
        	};
	        var RotatingBanner_1 = RotatingBanner.clone(RotatingBanner);
	        RotatingBanner_1.init(RotatingBanner_obj);

	        // Banner2
	        RotatingBanner_obj = { };
	        var RotatingBanner_2 = RotatingBanner.clone(RotatingBanner);
	        RotatingBanner_2.init(RotatingBanner_obj);
	    });

更新历史：
--------------
v1.2.1：

1. 修改参数 pic_ul_selector和point_ul_selector注释。
2. 圆点li的选择器，不再固定于box_selector内，方便调用时灵活放置圆点（比如可以小缩略图的形式展现大图，点击则切换到相应大图）。
3. 上一个版本中的demo在demo.html页传参测试忘复原了，已复原。
4. 同一页面支持多个轮播。相应的，修改功能配置及启用代码。
5. 增加左右箭头，点击时滚动一屏。
6. 修改demo

v1.1.1：
增加参数：圆点高亮li的样式名