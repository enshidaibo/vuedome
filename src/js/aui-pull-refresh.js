/**
 * aui_pull_refresh.js
 * @author 流浪男
 * @todo more things to abstract, e.g. Loading css etc.
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function(window) {
	'use strict';
	/**
	 * Extend obj function
	 *
	 * This is an object extender function. It allows us to extend an object
	 * by passing in additional variables and overwriting the defaults.
	 */
	var auiPullToRefresh = function (params,callback) {
		this.extend(this.params, params);
		this._init(callback);
	}
	var touchYDelta;
	var Interval;
	var isLoading = false;
	var docElem = window.document.documentElement,
		loadWrapH,
		win = {width: window.innerWidth, height: window.innerHeight},
		winfactor= 0.2,
		translateVal,
		isMoved = false,
		firstTouchY, initialScroll;
	var htmlSize = window.getComputedStyle(document.getElementsByTagName('html')[0]).fontSize;
	var transSize = parseInt(htmlSize.replace('px','')*2.25 - 2);
	auiPullToRefresh.prototype = {
		params: {
            container: document.querySelector('.aui-refresh-content'),
			friction: 2.5,
			triggerDistance: 100,
			callback:false
        },
        _init : function(callback) {
			var self = this;
			var loadingHtml = '<div class="aui-refresh-load"><div class="aui-refresh-pull-arrow" id="aui-refresh-pull-arrow"></div></div>';
			self.params.container.insertAdjacentHTML('afterbegin', loadingHtml);
			self.params.container.addEventListener('touchstart', function(ev){
				self.touchStart(ev)
			});
			self.params.container.addEventListener('touchmove', function(ev){
				self.touchMove(ev)
			});
			self.params.container.addEventListener('touchend', function(ev){
				self.touchEnd(ev,callback);
			});
		},
		touchStart : function(ev) {
			// this.params.container.classList.remove("refreshing");
			if (isLoading) {
				return;
			}
			isMoved = false;
			document.querySelector(".aui-refresh-pull-arrow").style.webkitTransitionDuration = document.querySelector(".aui-refresh-pull-arrow").style.transitionDuration = '0ms';
			this.params.container.style.webkitTransitionDuration = this.params.container.style.transitionDuration = '0ms';
			touchYDelta = '';
			var touchobj = ev.changedTouches[0];
			// register first touch "y"
			firstTouchY = parseInt(touchobj.clientY);
			initialScroll = this.scrollY();
		},
		touchMove : function (ev) {
			if (isLoading) {
				ev.preventDefault();
				return;
			}
			var self = this;
			var moving = function() {
				var touchobj = ev.changedTouches[0], // reference first touch point for this event
					touchY = parseInt(touchobj.clientY);
					touchYDelta = touchY - firstTouchY;
				if ( self.scrollY() === 0 && touchYDelta > 0  ) {
					ev.preventDefault();
				}
				if ( initialScroll > 0 || self.scrollY() > 0 || self.scrollY() === 0 && touchYDelta < 0 ) {
					firstTouchY = touchY;
					return;
				}
				self.params.container.classList.remove("aui-refreshing-complete");
				translateVal = Math.pow(touchYDelta, 0.85);
				var xxx = translateVal/45;
				if (xxx>1) {
					xxx = 1;
				}
				self.params.container.style.webkitTransform = self.params.container.style.transform = 'translate3d(0, ' + translateVal + 'px, 0)';
				document.querySelector(".aui-refresh-pull-arrow").style.transform = 'scale('+xxx+','+xxx+')';
				isMoved = true;
				if(touchYDelta > self.params.triggerDistance){
					self.params.container.classList.add("aui-refresh-pull-up");
					self.params.container.classList.remove("aui-refresh-pull-down");
				}else{
					self.params.container.classList.add("aui-refresh-pull-down");
					self.params.container.classList.remove("aui-refresh-pull-up");
				}
			};
			this.throttle(moving(), 20);
		},
		touchEnd : function (ev,callback) {
			var self =this;
			self.params.container.classList.remove("aui-refreshing-complete");
			if (isLoading|| !isMoved) {
				isMoved = false;
				return;
			}
			// 根据下拉高度判断是否加载
			if( touchYDelta >= this.params.triggerDistance) {
				var loadIcon = new Image();
				loadIcon.src = '../../static/refresh/pull_arrow_logdeing.gif?'+ (new Date()).getTime();
				loadIcon.onload = function() {
					isLoading = true; //正在加载中
					ev.preventDefault();
					self.params.container.style.webkitTransitionDuration = self.params.container.style.transitionDuration = '500ms';
					self.params.container.style.webkitTransform = self.params.container.style.transform = 'translate3d(0,'+transSize+'px,0)';
					document.querySelector(".aui-refresh-pull-arrow").style.webkitTransitionDuration = self.params.container.classList.add("aui-refreshing");
					document.querySelector(".aui-refresh-pull-arrow").appendChild(loadIcon);
					Interval = setInterval(function () {
						loadIcon.src = '../../static/refresh/pull_arrow_logdeing.gif?'+ (new Date()).getTime();
						document.getElementById("aui-refresh-pull-arrow").innerHTML = loadIcon;
					},3000);
					if(callback){
						callback({
							status:"success"
						});
					}
				}
			}else{
				document.querySelector(".aui-refresh-pull-arrow").style.webkitTransitionDuration = document.querySelector(".aui-refresh-pull-arrow").style.transitionDuration = '300ms';
				document.querySelector(".aui-refresh-pull-arrow").style.webkitTransform = document.querySelector(".aui-refresh-pull-arrow").style.transform = 'scale(0,0)';
				this.params.container.style.webkitTransitionDuration = this.params.container.style.transitionDuration = '300ms';
				this.params.container.style.webkitTransform = this.params.container.style.transform = 'translate3d(0,0,0)';
				if(callback){
					callback({
						status:"fail"
					});
				}
			}
			isMoved = false;
			return;
		},
		cancelLoading : function () {
			if (!isLoading) {
				return false;
			}
			var self =this;
			isLoading = false;
			clearInterval(Interval);
			self.params.container.classList.remove("aui-refreshing");
			document.getElementById("aui-refresh-pull-arrow").innerHTML = '';
			document.querySelector(".aui-refresh-pull-arrow").style.webkitTransitionDuration = document.querySelector(".aui-refresh-pull-arrow").style.transitionDuration = '300ms';
			self.params.container.classList.add("aui-refreshing-complete");
			document.querySelector(".aui-refresh-pull-arrow").style.webkitTransitionDuration = document.querySelector(".aui-refresh-pull-arrow").style.transitionDuration = '0ms';
			setTimeout(function() {
				self.params.container.style.webkitTransitionDuration = self.params.container.style.transitionDuration = '300ms';
				self.params.container.style.webkitTransform = self.params.container.style.transform = 'translate3d(0,0,0)';
				document.querySelector(".aui-refresh-pull-arrow").style.transform = 'scale(0,0)';
				self.params.container.classList.remove("aui-refreshing-complete");
				self.params.container.classList.remove("aui-refresh-pull-up");
				self.params.container.classList.add("aui-refresh-pull-down");
			}, 1500)
		return;
		},
		scrollY : function() {
			return window.pageYOffset || docElem.scrollTop;
		},
		throttle : function(fn, delay) {
			var allowSample = true;
			return function(e) {
				if (allowSample) {
					allowSample = false;
					setTimeout(function() { allowSample = true; }, delay);
					fn(e);
				}
			};
		},
		winresize : function () {
			var resize = function() {
				win = {width: window.innerWidth, height: window.innerHeight};
			};
			throttle(resize(), 10);
		},
		extend: function(a, b) {
			for (var key in b) {
			  	if (b.hasOwnProperty(key)) {
			  		a[key] = b[key];
			  	}
		  	}
		  	return a;
		 }
	}
	window.auiPullToRefresh = auiPullToRefresh;

})(window);
