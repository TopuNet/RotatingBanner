# RotatingBanner JS插件 v1.0.1
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
        	var RotatingBanner_obj = {
        		autoPlay: null, // 自动播放：left/right/null，默认值：left
		        box_selector: null, // 外盒选择器，默认值：section.banner
		        pic_ul_selector: null, // 图片li的ul盒选择器，默认值：ul.pic_ul
		        point_ul_selector: null, // 圆点li的ul盒选择器，空字符串为无圆点。默认值：ul.point_ul。
		        duration: null, // 动画过渡时间，毫秒。默认500
		        delay: null // 动画间隔，毫秒。默认5000
        	};
	        RotatingBanner.init();
	    });
