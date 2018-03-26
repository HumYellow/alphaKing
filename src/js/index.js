(function(){
	var hash = location.hash;
})();
(function(doc, win){
	var docEl = doc.documentElement,
	resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	recalc = function () {
	  var clientWidth = docEl.clientWidth;
	  if (!clientWidth) return;
	  var fontSize = 20 * (clientWidth / 320);
	  if(fontSize > 90)fontSize = 90
	  docEl.style.fontSize = fontSize + 'px';
	};
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

var isPlayerPage = false;
var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('video', {
        height         : '110%',
        width          : '100%',
        videoId        : '6_NUWyg8OMw',
        frameBorder    : 0,
        allowFullScreen: 1,
        playerVars     : {
            mute    : 1,
            modestbranding:1,
            showinfo: 0,
            rel     : 0,
            controls: 0,
            playlist: '6_NUWyg8OMw',
            loop    : 1
        },
        events:{
	      'onReady': function(){
	      	if(isPlayerPage){
				player.setPlaybackQuality('HD1080');
				player.playVideo();
				
	      	}
	      }

       	}
    });
  }
var alpha = {
	init : function(){
		this.fullpage();
		this.phoneMenuBootstrap();
		this.logoSlick();
		this.leaderSlick();
		this.memberList();
		this.contactUs();
		this.news(this);
		$("body").on('touchmove',function(event){
		  event.preventDefault();
		});
	},
	fullpage:function(){
		$('#fullPage').fullpage({
	        anchors: ['home', 'about', 'meet', 'our','projects','news'],
	        menu: '#menu',
	        css3:true,
	        autoScrolling:true,//使用浏览器滚动条，如果选true，在移动端弹窗会有bug
	        onLeave:function(index,nextIndex,direction){
	        	var i = nextIndex - 1;
	        	var el = $('.pageCenter')[i];
	        	$('.pageCenter').removeClass('pageFlash')
	        	if(nextIndex != 2)$(el).addClass('pageFlash')
	        	/*use global variable Initialization video*/
				nextIndex === 2?isPlayerPage = true:isPlayerPage = false;
		        try{
					isPlayerPage?player.playVideo():player.pauseVideo();
		        }catch(err){
		        	console.info('maybe the video is not loaded')
		        }
		        /*close phone menu after fullpage switch*/
		        if($('.phoneMenuBtn').css('display')!='none' && $('#navbarBtn').attr('aria-expanded') == 'true')$('#navbarBtn').click();
	        },
	    	afterLoad:function(aLink,index){
	    		/*if(index === 5 && $(window).width() > 720){
					var videoLong = $('#videoScroll')[0].duration;
					var scrollRange = 0.12;
					$.fn.fullpage.setAllowScrolling(false,'down')
					$.fn.fullpage.setAllowScrolling(false,'up')
					$('#page_5').mousewheel(function(event, delta, deltaX, deltaY) {
						var currentTimeAfter = $('#videoScroll')[0].currentTime;
						var targetValue = 0;
						if(delta < 0){
							targetValue = currentTimeAfter + scrollRange
						}else if(delta > 0){
							targetValue = currentTimeAfter - scrollRange
						}
						targetValue = targetValue.toFixed(2);
						$('#videoScroll')[0].currentTime = targetValue;
						if(targetValue <= 0){
							$.fn.fullpage.setAllowScrolling(true,'up')
						}else if(targetValue >= videoLong){
							$.fn.fullpage.setAllowScrolling(true,'down')
						}
					});
	    		}else{
	    			$.fn.fullpage.setAllowScrolling(true,'down')
	    			$.fn.fullpage.setAllowScrolling(true,'up')
	    		}*/
	    		if($(window).width() > 720)$('#videoScroll')[0].controls=false;
	    		if(index === 5){
	    			$('#videoScroll')[0].play();

	    		}else{
	    			$('#videoScroll')[0].pause();
	    		}
	    	}
	    });
	},
	phoneMenuBootstrap:function(){
		$('#navBox').on('show.bs.collapse', function () {
		  $('#menu').removeClass('in');
		});
		$('#navBox').on('hidden.bs.collapse', function () {
		  $('#menu').addClass('in');
		})
	},
	leaderSlick:function(){
		var num = 4;
		if($(window).width() < 1200) num = 3;
		if($(window).width() < 980) num = 2;
		if($(window).width() < 520) num = 1;
		this.slickFn($('.leaderList'),num);
	},
	logoSlick:function(){
		var num = 4;
		if($(window).width() < 720) num = 2;
		this.slickFn($('.partnersLogo') ,num)
	},
	slickFn:function(el ,num){
		$(el).slick({
			infinite:true,
			slidesToShow:num,
			slidesToScroll:num,
			touchMove:false
		})
	},
	news:function(that){
		var newsAjax = {
			alpha:that,
			data:{},
			isSlick:false,
			haveTextDay:{},
			haveTextMouth:{},
			ajax:function(){
				var that = this;
				$.ajax({
					type:'get',
					url:"http://test.alphakingvn.com/alphaking/openapi/v1/news/getEveryDayNewsDataList",
					/*url:"http://10.101.0.226:8033/alphaking/openapi/v1/news/getEveryDayNewsDataList",*/
					data:{},
					dataType:'json',
					success:function(result){
						that.dataUse(result.data);
				    },
				    error:function(a,b,c){
				    	console.info(a.readyState)
				    }
				})
				/*this.dataUse(this.testData.data);*/
			},
			weekTrans:function(week){//英文转换
				week = week.toLowerCase();
				var weekTransList = {
					monday:1,
					tuesday:2,
					wednesday:3,
					thursday:4,
					friday:5,
					saturday:6,
					sunday:7
				}
				return weekTransList[week]
			},
			mouthTrans:function(mouth){
				mouth = mouth.toLowerCase();
				var mouthTransList = {
					1:'january',
					2:'february',
					3:'march',
					4:'april',
					5:'may',
					6:'june',
					7:'july',
					8:'august',
					9:'september',
					10:'october',
					11:'november',
					12:'december'
				}
				return mouthTransList[mouth]
			},
			dataUse:function(data){//组件初始化时，直接获取当月
		        this.data = data;
		        var that = this;
		        var newsListData = [];
		        for(var i in data){
		        	if(data[i].count != 0){
		        		this.haveTextMouth[i-1] = true
		        	}
		        };
		        $('#calendarMonthList span').each(function(e,a){
		        	if(that.haveTextMouth[e])$(this).addClass('haveTextMouth')
		        })
		        this.useMouthClick();
		        for(var i in data){
		        	if(data[i].isLast){//获取当前月份所有数据
		        		this.getNewMouth(i);
		        		$('#calendarMonthList span').eq(i-1).addClass('select'); 
		        		break;
					}
		        }
			},
			getNewMouth:function(n){//get想要展示月份的所有数据，统一处理日历和滚动条
				var thisMouthDay = this.data[n].day;
				var thisMouthText = [];
				this.haveTextDay = {};
				$('#calendarMonth').html(this.mouthTrans(n));
				for(var i in thisMouthDay){//循环展示月所有数据
					if(thisMouthDay[i].newsList.length != 0){//判断每天是否有文章
						thisMouthText = thisMouthText.concat(thisMouthDay[i].newsList)
						this.haveTextDay[i] = true;
			        };
				}
				thisMouthText.reverse();
			    this.dateList(thisMouthDay);
				this.newsList(thisMouthText);
			},
			newsList:function(thisMouthText){
				var html ="",that = this;
				$.each(thisMouthText,function(index,value){
					html +=  "<div class='newBox' data-id='"+value.id+"' data-day='"+value.day+"'>";
					html +=   '<img width="100%" src="'+value.img+'" />';
					html +=   '<div class="textBox">';
					html +=     '<p class="textDate">'+value.publishTime+'</p>';
					html +=     '<h5>'+value.title+'</h5>';
					html +=     '<p>'+value.summary+'</p>';
					html +=     '<span class="readMore">Read more&nbsp;&gt;&gt;</span>';
					html +=   '</div>';
					html +=  '</div>';
				});
				if(this.isSlick){
					$('#newsList').slick('unslick');
				};
				$("#newsList").replaceWith("<div id='newsList'>"+html+"</div>")
				$('#newsList').slick({
					infinite:true,
					slidesToShow:1,
					slidesToScroll:1,
					arrows:false
				})
				that.useDaySelect($('#newsList .newBox').eq(1).attr('data-day'))
				$('#newsList').on('afterChange',function(event, slick, currentSlide,next){
					var thisDay = $(slick.$slides[currentSlide]).attr('data-day');
					that.useDaySelect(thisDay);
				})
				$('#newsList').on('beforChange',function(event, slick, currentSlide,next){
					$.fn.fullpage.stop();
				})
				$('.newBox').on('click',function(event){
					that.textDetail($(this).attr('data-id'))
				})
				this.isSlick = true;
			},
			dateList:function(thisMouthDay){
				var that = this;
				var firstDay = this.weekTrans(thisMouthDay[1].week),z = 1,length = Object.keys(thisMouthDay).length;
				$('#calendarDayBody em').removeClass('haveTextDay select');
				$('#calendarDayBody em').each(function(e,a){
					if(e>=firstDay && z <= length){
						if(that.haveTextDay[z])$(a).addClass('haveTextDay')
						$(a).html(z);
						z++
					}else{
						$(a).html('');
					}
				})
		        this.useDayClick();
			},
			useMouthClick:function(){
				var that = this;
				$('.haveTextMouth').on('click',function(){
					that.getNewMouth($(this).attr('data-m'));
					$('#calendarMonthList span').removeClass('select');
					$(this).addClass('select');
				})
			},
			useDayClick:function(){
				$('#calendarDayBody').on('click',function(event,a){
					var clickThis = event.target;
					var num = $(clickThis).html();
					$('.newBox').each(function(e,a){
						if($(this).attr('data-day') == num){
							$('#newsList').slick('slickGoTo',e-1)//为了配合slick插件
							return false
						}
					})
				})
			},
			useDaySelect:function(day){
				$('.haveTextDay').removeClass('select')
				$('.haveTextDay').each(function(e,a){
					var html = $(a).html();
					if(html == day)$(a).addClass('select')
				})
			},
			textDetail:function(id){
				var alpha = this.alpha;
				$.ajax({
					type:'get',
					url:"http://test.alphakingvn.com/alphaking/openapi/v1/news/getNewsDetailData",
					/*url:"http://10.101.0.226:8033/alphaking/openapi/v1/news/getNewsDetailData",*/
					data:{
						"id":id
					},
					dataType:'json',
					success:function(result){
						$('#textDetail .textDetailBody header img').attr('src',result.data.img)
						$('#textDetail .textDetailBody h2').html(result.data.title)
						$('#textDetail .textDetailBody .textDetailContent').html(result.data.content)
						alpha.memberPopup.popop($('#textDetail'),$('#page_6'));
						$('#textDetailBody').scrollTop(0)
						$("body").off('touchmove');
						$.fn.fullpage.setAllowScrolling(false, 'up');
						$.fn.fullpage.setAllowScrolling(false, 'down');
						$('#textDetailClose').on('click',function(){
							alpha.memberPopup.closePop();
							$("body").on('touchmove',function(event){
							  event.preventDefault();
							});
						});
					},
				    error:function(a,b,c){
				    	console.info(a.readyState)
				    }
				})
			},
			init:function(){
				this.ajax();
			},
			testData:{"errcode":"0000","msg":null,"data":{"1":{"isLast":false,"count":22,"day":{"1":{"newsList":[{"summary":"内容1","publishTime":"January 01.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"81","title":"标题1","day":"1"},{"summary":"内容2","publishTime":"January 01.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"152","title":"标题2","day":"1"}],"week":"MONDAY","isLast":false},"2":{"newsList":[{"summary":"内容1","publishTime":"January 02.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"66","title":"标题1","day":"2"},{"summary":"内容2","publishTime":"January 02.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"19","title":"标题2","day":"2"}],"week":"TUESDAY","isLast":false},"3":{"newsList":[{"summary":"内容1","publishTime":"January 03.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"8","title":"标题1","day":"3"},{"summary":"内容2","publishTime":"January 03.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"86","title":"标题2","day":"3"}],"week":"WEDNESDAY","isLast":false},"4":{"newsList":[],"week":"THURSDAY","isLast":false},"5":{"newsList":[],"week":"FRIDAY","isLast":false},"6":{"newsList":[],"week":"SATURDAY","isLast":false},"7":{"newsList":[],"week":"SUNDAY","isLast":false},"8":{"newsList":[{"summary":"内容1","publishTime":"January 08.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"112","title":"标题1","day":"8"}],"week":"MONDAY","isLast":false},"9":{"newsList":[],"week":"TUESDAY","isLast":false},"10":{"newsList":[{"summary":"内容1","publishTime":"January 10.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"45","title":"标题1","day":"10"},{"summary":"内容2","publishTime":"January 10.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"2","title":"标题2","day":"10"}],"week":"WEDNESDAY","isLast":false},"11":{"newsList":[],"week":"THURSDAY","isLast":false},"12":{"newsList":[],"week":"FRIDAY","isLast":false},"13":{"newsList":[{"summary":"内容1","publishTime":"January 13.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"84","title":"标题1","day":"13"}],"week":"SATURDAY","isLast":false},"14":{"newsList":[],"week":"SUNDAY","isLast":false},"15":{"newsList":[{"summary":"内容1","publishTime":"January 15.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"90","title":"标题1","day":"15"},{"summary":"内容2","publishTime":"January 15.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"66","title":"标题2","day":"15"}],"week":"MONDAY","isLast":false},"16":{"newsList":[{"summary":"内容1","publishTime":"January 16.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"65","title":"标题1","day":"16"},{"summary":"内容2","publishTime":"January 16.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"179","title":"标题2","day":"16"}],"week":"TUESDAY","isLast":false},"17":{"newsList":[{"summary":"内容1","publishTime":"January 17.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"6","title":"标题1","day":"17"},{"summary":"内容2","publishTime":"January 17.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"99","title":"标题2","day":"17"}],"week":"WEDNESDAY","isLast":false},"18":{"newsList":[],"week":"THURSDAY","isLast":false},"19":{"newsList":[{"summary":"内容1","publishTime":"January 19.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"70","title":"标题1","day":"19"}],"week":"FRIDAY","isLast":false},"20":{"newsList":[{"summary":"内容1","publishTime":"January 20.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"138","title":"标题1","day":"20"},{"summary":"内容2","publishTime":"January 20.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"137","title":"标题2","day":"20"}],"week":"SATURDAY","isLast":false},"21":{"newsList":[{"summary":"内容1","publishTime":"January 21.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"46","title":"标题1","day":"21"}],"week":"SUNDAY","isLast":false},"22":{"newsList":[],"week":"MONDAY","isLast":false},"23":{"newsList":[],"week":"TUESDAY","isLast":false},"24":{"newsList":[],"week":"WEDNESDAY","isLast":false},"25":{"newsList":[],"week":"THURSDAY","isLast":false},"26":{"newsList":[],"week":"FRIDAY","isLast":false},"27":{"newsList":[{"summary":"内容1","publishTime":"January 27.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"181","title":"标题1","day":"27"}],"week":"SATURDAY","isLast":false},"28":{"newsList":[],"week":"SUNDAY","isLast":false},"29":{"newsList":[{"summary":"内容1","publishTime":"January 29.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"140","title":"标题1","day":"29"}],"week":"MONDAY","isLast":false},"30":{"newsList":[],"week":"TUESDAY","isLast":false},"31":{"newsList":[],"week":"WEDNESDAY","isLast":false}}},"2":{"isLast":false,"count":26,"day":{"1":{"newsList":[],"week":"THURSDAY","isLast":false},"2":{"newsList":[{"summary":"内容1","publishTime":"February 02.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"133","title":"标题1","day":"2"},{"summary":"内容2","publishTime":"February 02.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"115","title":"标题2","day":"2"}],"week":"FRIDAY","isLast":false},"3":{"newsList":[{"summary":"内容1","publishTime":"February 03.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"157","title":"标题1","day":"3"},{"summary":"内容2","publishTime":"February 03.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"164","title":"标题2","day":"3"}],"week":"SATURDAY","isLast":false},"4":{"newsList":[{"summary":"内容1","publishTime":"February 04.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"35","title":"标题1","day":"4"},{"summary":"内容2","publishTime":"February 04.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"184","title":"标题2","day":"4"}],"week":"SUNDAY","isLast":false},"5":{"newsList":[{"summary":"内容1","publishTime":"February 05.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"37","title":"标题1","day":"5"},{"summary":"内容2","publishTime":"February 05.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"140","title":"标题2","day":"5"}],"week":"MONDAY","isLast":false},"6":{"newsList":[{"summary":"内容1","publishTime":"February 06.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"174","title":"标题1","day":"6"}],"week":"TUESDAY","isLast":false},"7":{"newsList":[],"week":"WEDNESDAY","isLast":false},"8":{"newsList":[],"week":"THURSDAY","isLast":false},"9":{"newsList":[],"week":"FRIDAY","isLast":false},"10":{"newsList":[{"summary":"内容1","publishTime":"February 10.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"23","title":"标题1","day":"10"}],"week":"SATURDAY","isLast":false},"11":{"newsList":[{"summary":"内容1","publishTime":"February 11.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"77","title":"标题1","day":"11"},{"summary":"内容2","publishTime":"February 11.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"102","title":"标题2","day":"11"}],"week":"SUNDAY","isLast":false},"12":{"newsList":[],"week":"MONDAY","isLast":false},"13":{"newsList":[{"summary":"内容1","publishTime":"February 13.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"191","title":"标题1","day":"13"}],"week":"TUESDAY","isLast":false},"14":{"newsList":[{"summary":"内容1","publishTime":"February 14.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"47","title":"标题1","day":"14"},{"summary":"内容2","publishTime":"February 14.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"171","title":"标题2","day":"14"}],"week":"WEDNESDAY","isLast":false},"15":{"newsList":[{"summary":"内容1","publishTime":"February 15.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"129","title":"标题1","day":"15"}],"week":"THURSDAY","isLast":false},"16":{"newsList":[{"summary":"内容1","publishTime":"February 16.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"106","title":"标题1","day":"16"}],"week":"FRIDAY","isLast":false},"17":{"newsList":[{"summary":"内容1","publishTime":"February 17.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"87","title":"标题1","day":"17"},{"summary":"内容2","publishTime":"February 17.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"81","title":"标题2","day":"17"}],"week":"SATURDAY","isLast":false},"18":{"newsList":[],"week":"SUNDAY","isLast":false},"19":{"newsList":[{"summary":"内容1","publishTime":"February 19.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"174","title":"标题1","day":"19"}],"week":"MONDAY","isLast":false},"20":{"newsList":[{"summary":"内容1","publishTime":"February 20.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"197","title":"标题1","day":"20"}],"week":"TUESDAY","isLast":false},"21":{"newsList":[{"summary":"内容1","publishTime":"February 21.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"31","title":"标题1","day":"21"}],"week":"WEDNESDAY","isLast":false},"22":{"newsList":[],"week":"THURSDAY","isLast":false},"23":{"newsList":[{"summary":"内容1","publishTime":"February 23.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"23","title":"标题1","day":"23"}],"week":"FRIDAY","isLast":false},"24":{"newsList":[{"summary":"内容1","publishTime":"February 24.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"32","title":"标题1","day":"24"}],"week":"SATURDAY","isLast":false},"25":{"newsList":[{"summary":"内容1","publishTime":"February 25.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"72","title":"标题1","day":"25"}],"week":"SUNDAY","isLast":false},"26":{"newsList":[{"summary":"内容1","publishTime":"February 26.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"194","title":"标题1","day":"26"}],"week":"MONDAY","isLast":false},"27":{"newsList":[],"week":"TUESDAY","isLast":false},"28":{"newsList":[],"week":"WEDNESDAY","isLast":false}}},"3":{"isLast":true,"count":2,"day":{"1":{"newsList":[{"summary":"内容1","publishTime":"March 01.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"17","title":"标题1","day":"1"},{"summary":"内容2","publishTime":"March 01.2018","img":"http://img6.gewara.com/cw120h160/images/drama/weipiaoer/201712/DSkdQGnczMt8U8p3h2tSWJgbgEFf.jpg","id":"26","title":"标题2","day":"1"}],"week":"THURSDAY","isLast":true},"2":{"newsList":[],"week":"FRIDAY","isLast":false},"3":{"newsList":[],"week":"SATURDAY","isLast":false},"4":{"newsList":[],"week":"SUNDAY","isLast":false},"5":{"newsList":[],"week":"MONDAY","isLast":false},"6":{"newsList":[],"week":"TUESDAY","isLast":false},"7":{"newsList":[],"week":"WEDNESDAY","isLast":false},"8":{"newsList":[],"week":"THURSDAY","isLast":false},"9":{"newsList":[],"week":"FRIDAY","isLast":false},"10":{"newsList":[],"week":"SATURDAY","isLast":false},"11":{"newsList":[],"week":"SUNDAY","isLast":false},"12":{"newsList":[],"week":"MONDAY","isLast":false},"13":{"newsList":[],"week":"TUESDAY","isLast":false},"14":{"newsList":[],"week":"WEDNESDAY","isLast":false},"15":{"newsList":[],"week":"THURSDAY","isLast":false},"16":{"newsList":[],"week":"FRIDAY","isLast":false},"17":{"newsList":[],"week":"SATURDAY","isLast":false},"18":{"newsList":[],"week":"SUNDAY","isLast":false},"19":{"newsList":[],"week":"MONDAY","isLast":false},"20":{"newsList":[],"week":"TUESDAY","isLast":false},"21":{"newsList":[],"week":"WEDNESDAY","isLast":false},"22":{"newsList":[],"week":"THURSDAY","isLast":false},"23":{"newsList":[],"week":"FRIDAY","isLast":false},"24":{"newsList":[],"week":"SATURDAY","isLast":false},"25":{"newsList":[],"week":"SUNDAY","isLast":false},"26":{"newsList":[],"week":"MONDAY","isLast":false},"27":{"newsList":[],"week":"TUESDAY","isLast":false},"28":{"newsList":[],"week":"WEDNESDAY","isLast":false},"29":{"newsList":[],"week":"THURSDAY","isLast":false},"30":{"newsList":[],"week":"FRIDAY","isLast":false},"31":{"newsList":[],"week":"SATURDAY","isLast":false}}},"4":{"isLast":false,"count":0,"day":{"1":{"newsList":[],"week":"SUNDAY","isLast":false},"2":{"newsList":[],"week":"MONDAY","isLast":false},"3":{"newsList":[],"week":"TUESDAY","isLast":false},"4":{"newsList":[],"week":"WEDNESDAY","isLast":false},"5":{"newsList":[],"week":"THURSDAY","isLast":false},"6":{"newsList":[],"week":"FRIDAY","isLast":false},"7":{"newsList":[],"week":"SATURDAY","isLast":false},"8":{"newsList":[],"week":"SUNDAY","isLast":false},"9":{"newsList":[],"week":"MONDAY","isLast":false},"10":{"newsList":[],"week":"TUESDAY","isLast":false},"11":{"newsList":[],"week":"WEDNESDAY","isLast":false},"12":{"newsList":[],"week":"THURSDAY","isLast":false},"13":{"newsList":[],"week":"FRIDAY","isLast":false},"14":{"newsList":[],"week":"SATURDAY","isLast":false},"15":{"newsList":[],"week":"SUNDAY","isLast":false},"16":{"newsList":[],"week":"MONDAY","isLast":false},"17":{"newsList":[],"week":"TUESDAY","isLast":false},"18":{"newsList":[],"week":"WEDNESDAY","isLast":false},"19":{"newsList":[],"week":"THURSDAY","isLast":false},"20":{"newsList":[],"week":"FRIDAY","isLast":false},"21":{"newsList":[],"week":"SATURDAY","isLast":false},"22":{"newsList":[],"week":"SUNDAY","isLast":false},"23":{"newsList":[],"week":"MONDAY","isLast":false},"24":{"newsList":[],"week":"TUESDAY","isLast":false},"25":{"newsList":[],"week":"WEDNESDAY","isLast":false},"26":{"newsList":[],"week":"THURSDAY","isLast":false},"27":{"newsList":[],"week":"FRIDAY","isLast":false},"28":{"newsList":[],"week":"SATURDAY","isLast":false},"29":{"newsList":[],"week":"SUNDAY","isLast":false},"30":{"newsList":[],"week":"MONDAY","isLast":false}}},"5":{"isLast":false,"count":0,"day":{"1":{"newsList":[],"week":"TUESDAY","isLast":false},"2":{"newsList":[],"week":"WEDNESDAY","isLast":false},"3":{"newsList":[],"week":"THURSDAY","isLast":false},"4":{"newsList":[],"week":"FRIDAY","isLast":false},"5":{"newsList":[],"week":"SATURDAY","isLast":false},"6":{"newsList":[],"week":"SUNDAY","isLast":false},"7":{"newsList":[],"week":"MONDAY","isLast":false},"8":{"newsList":[],"week":"TUESDAY","isLast":false},"9":{"newsList":[],"week":"WEDNESDAY","isLast":false},"10":{"newsList":[],"week":"THURSDAY","isLast":false},"11":{"newsList":[],"week":"FRIDAY","isLast":false},"12":{"newsList":[],"week":"SATURDAY","isLast":false},"13":{"newsList":[],"week":"SUNDAY","isLast":false},"14":{"newsList":[],"week":"MONDAY","isLast":false},"15":{"newsList":[],"week":"TUESDAY","isLast":false},"16":{"newsList":[],"week":"WEDNESDAY","isLast":false},"17":{"newsList":[],"week":"THURSDAY","isLast":false},"18":{"newsList":[],"week":"FRIDAY","isLast":false},"19":{"newsList":[],"week":"SATURDAY","isLast":false},"20":{"newsList":[],"week":"SUNDAY","isLast":false},"21":{"newsList":[],"week":"MONDAY","isLast":false},"22":{"newsList":[],"week":"TUESDAY","isLast":false},"23":{"newsList":[],"week":"WEDNESDAY","isLast":false},"24":{"newsList":[],"week":"THURSDAY","isLast":false},"25":{"newsList":[],"week":"FRIDAY","isLast":false},"26":{"newsList":[],"week":"SATURDAY","isLast":false},"27":{"newsList":[],"week":"SUNDAY","isLast":false},"28":{"newsList":[],"week":"MONDAY","isLast":false},"29":{"newsList":[],"week":"TUESDAY","isLast":false},"30":{"newsList":[],"week":"WEDNESDAY","isLast":false},"31":{"newsList":[],"week":"THURSDAY","isLast":false}}},"6":{"isLast":false,"count":0,"day":{"1":{"newsList":[],"week":"FRIDAY","isLast":false},"2":{"newsList":[],"week":"SATURDAY","isLast":false},"3":{"newsList":[],"week":"SUNDAY","isLast":false},"4":{"newsList":[],"week":"MONDAY","isLast":false},"5":{"newsList":[],"week":"TUESDAY","isLast":false},"6":{"newsList":[],"week":"WEDNESDAY","isLast":false},"7":{"newsList":[],"week":"THURSDAY","isLast":false},"8":{"newsList":[],"week":"FRIDAY","isLast":false},"9":{"newsList":[],"week":"SATURDAY","isLast":false},"10":{"newsList":[],"week":"SUNDAY","isLast":false},"11":{"newsList":[],"week":"MONDAY","isLast":false},"12":{"newsList":[],"week":"TUESDAY","isLast":false},"13":{"newsList":[],"week":"WEDNESDAY","isLast":false},"14":{"newsList":[],"week":"THURSDAY","isLast":false},"15":{"newsList":[],"week":"FRIDAY","isLast":false},"16":{"newsList":[],"week":"SATURDAY","isLast":false},"17":{"newsList":[],"week":"SUNDAY","isLast":false},"18":{"newsList":[],"week":"MONDAY","isLast":false},"19":{"newsList":[],"week":"TUESDAY","isLast":false},"20":{"newsList":[],"week":"WEDNESDAY","isLast":false},"21":{"newsList":[],"week":"THURSDAY","isLast":false},"22":{"newsList":[],"week":"FRIDAY","isLast":false},"23":{"newsList":[],"week":"SATURDAY","isLast":false},"24":{"newsList":[],"week":"SUNDAY","isLast":false},"25":{"newsList":[],"week":"MONDAY","isLast":false},"26":{"newsList":[],"week":"TUESDAY","isLast":false},"27":{"newsList":[],"week":"WEDNESDAY","isLast":false},"28":{"newsList":[],"week":"THURSDAY","isLast":false},"29":{"newsList":[],"week":"FRIDAY","isLast":false},"30":{"newsList":[],"week":"SATURDAY","isLast":false}}},"7":{"isLast":false,"count":0,"day":{"1":{"newsList":[],"week":"SUNDAY","isLast":false},"2":{"newsList":[],"week":"MONDAY","isLast":false},"3":{"newsList":[],"week":"TUESDAY","isLast":false},"4":{"newsList":[],"week":"WEDNESDAY","isLast":false},"5":{"newsList":[],"week":"THURSDAY","isLast":false},"6":{"newsList":[],"week":"FRIDAY","isLast":false},"7":{"newsList":[],"week":"SATURDAY","isLast":false},"8":{"newsList":[],"week":"SUNDAY","isLast":false},"9":{"newsList":[],"week":"MONDAY","isLast":false},"10":{"newsList":[],"week":"TUESDAY","isLast":false},"11":{"newsList":[],"week":"WEDNESDAY","isLast":false},"12":{"newsList":[],"week":"THURSDAY","isLast":false},"13":{"newsList":[],"week":"FRIDAY","isLast":false},"14":{"newsList":[],"week":"SATURDAY","isLast":false},"15":{"newsList":[],"week":"SUNDAY","isLast":false},"16":{"newsList":[],"week":"MONDAY","isLast":false},"17":{"newsList":[],"week":"TUESDAY","isLast":false},"18":{"newsList":[],"week":"WEDNESDAY","isLast":false},"19":{"newsList":[],"week":"THURSDAY","isLast":false},"20":{"newsList":[],"week":"FRIDAY","isLast":false},"21":{"newsList":[],"week":"SATURDAY","isLast":false},"22":{"newsList":[],"week":"SUNDAY","isLast":false},"23":{"newsList":[],"week":"MONDAY","isLast":false},"24":{"newsList":[],"week":"TUESDAY","isLast":false},"25":{"newsList":[],"week":"WEDNESDAY","isLast":false},"26":{"newsList":[],"week":"THURSDAY","isLast":false},"27":{"newsList":[],"week":"FRIDAY","isLast":false},"28":{"newsList":[],"week":"SATURDAY","isLast":false},"29":{"newsList":[],"week":"SUNDAY","isLast":false},"30":{"newsList":[],"week":"MONDAY","isLast":false},"31":{"newsList":[],"week":"TUESDAY","isLast":false}}},"8":{"isLast":false,"count":0,"day":{"1":{"newsList":[],"week":"WEDNESDAY","isLast":false},"2":{"newsList":[],"week":"THURSDAY","isLast":false},"3":{"newsList":[],"week":"FRIDAY","isLast":false},"4":{"newsList":[],"week":"SATURDAY","isLast":false},"5":{"newsList":[],"week":"SUNDAY","isLast":false},"6":{"newsList":[],"week":"MONDAY","isLast":false},"7":{"newsList":[],"week":"TUESDAY","isLast":false},"8":{"newsList":[],"week":"WEDNESDAY","isLast":false},"9":{"newsList":[],"week":"THURSDAY","isLast":false},"10":{"newsList":[],"week":"FRIDAY","isLast":false},"11":{"newsList":[],"week":"SATURDAY","isLast":false},"12":{"newsList":[],"week":"SUNDAY","isLast":false},"13":{"newsList":[],"week":"MONDAY","isLast":false},"14":{"newsList":[],"week":"TUESDAY","isLast":false},"15":{"newsList":[],"week":"WEDNESDAY","isLast":false},"16":{"newsList":[],"week":"THURSDAY","isLast":false},"17":{"newsList":[],"week":"FRIDAY","isLast":false},"18":{"newsList":[],"week":"SATURDAY","isLast":false},"19":{"newsList":[],"week":"SUNDAY","isLast":false},"20":{"newsList":[],"week":"MONDAY","isLast":false},"21":{"newsList":[],"week":"TUESDAY","isLast":false},"22":{"newsList":[],"week":"WEDNESDAY","isLast":false},"23":{"newsList":[],"week":"THURSDAY","isLast":false},"24":{"newsList":[],"week":"FRIDAY","isLast":false},"25":{"newsList":[],"week":"SATURDAY","isLast":false},"26":{"newsList":[],"week":"SUNDAY","isLast":false},"27":{"newsList":[],"week":"MONDAY","isLast":false},"28":{"newsList":[],"week":"TUESDAY","isLast":false},"29":{"newsList":[],"week":"WEDNESDAY","isLast":false},"30":{"newsList":[],"week":"THURSDAY","isLast":false},"31":{"newsList":[],"week":"FRIDAY","isLast":false}}},"9":{"isLast":false,"count":0,"day":{"1":{"newsList":[],"week":"SATURDAY","isLast":false},"2":{"newsList":[],"week":"SUNDAY","isLast":false},"3":{"newsList":[],"week":"MONDAY","isLast":false},"4":{"newsList":[],"week":"TUESDAY","isLast":false},"5":{"newsList":[],"week":"WEDNESDAY","isLast":false},"6":{"newsList":[],"week":"THURSDAY","isLast":false},"7":{"newsList":[],"week":"FRIDAY","isLast":false},"8":{"newsList":[],"week":"SATURDAY","isLast":false},"9":{"newsList":[],"week":"SUNDAY","isLast":false},"10":{"newsList":[],"week":"MONDAY","isLast":false},"11":{"newsList":[],"week":"TUESDAY","isLast":false},"12":{"newsList":[],"week":"WEDNESDAY","isLast":false},"13":{"newsList":[],"week":"THURSDAY","isLast":false},"14":{"newsList":[],"week":"FRIDAY","isLast":false},"15":{"newsList":[],"week":"SATURDAY","isLast":false},"16":{"newsList":[],"week":"SUNDAY","isLast":false},"17":{"newsList":[],"week":"MONDAY","isLast":false},"18":{"newsList":[],"week":"TUESDAY","isLast":false},"19":{"newsList":[],"week":"WEDNESDAY","isLast":false},"20":{"newsList":[],"week":"THURSDAY","isLast":false},"21":{"newsList":[],"week":"FRIDAY","isLast":false},"22":{"newsList":[],"week":"SATURDAY","isLast":false},"23":{"newsList":[],"week":"SUNDAY","isLast":false},"24":{"newsList":[],"week":"MONDAY","isLast":false},"25":{"newsList":[],"week":"TUESDAY","isLast":false},"26":{"newsList":[],"week":"WEDNESDAY","isLast":false},"27":{"newsList":[],"week":"THURSDAY","isLast":false},"28":{"newsList":[],"week":"FRIDAY","isLast":false},"29":{"newsList":[],"week":"SATURDAY","isLast":false},"30":{"newsList":[],"week":"SUNDAY","isLast":false}}},"10":{"isLast":false,"count":0,"day":{"1":{"newsList":[],"week":"MONDAY","isLast":false},"2":{"newsList":[],"week":"TUESDAY","isLast":false},"3":{"newsList":[],"week":"WEDNESDAY","isLast":false},"4":{"newsList":[],"week":"THURSDAY","isLast":false},"5":{"newsList":[],"week":"FRIDAY","isLast":false},"6":{"newsList":[],"week":"SATURDAY","isLast":false},"7":{"newsList":[],"week":"SUNDAY","isLast":false},"8":{"newsList":[],"week":"MONDAY","isLast":false},"9":{"newsList":[],"week":"TUESDAY","isLast":false},"10":{"newsList":[],"week":"WEDNESDAY","isLast":false},"11":{"newsList":[],"week":"THURSDAY","isLast":false},"12":{"newsList":[],"week":"FRIDAY","isLast":false},"13":{"newsList":[],"week":"SATURDAY","isLast":false},"14":{"newsList":[],"week":"SUNDAY","isLast":false},"15":{"newsList":[],"week":"MONDAY","isLast":false},"16":{"newsList":[],"week":"TUESDAY","isLast":false},"17":{"newsList":[],"week":"WEDNESDAY","isLast":false},"18":{"newsList":[],"week":"THURSDAY","isLast":false},"19":{"newsList":[],"week":"FRIDAY","isLast":false},"20":{"newsList":[],"week":"SATURDAY","isLast":false},"21":{"newsList":[],"week":"SUNDAY","isLast":false},"22":{"newsList":[],"week":"MONDAY","isLast":false},"23":{"newsList":[],"week":"TUESDAY","isLast":false},"24":{"newsList":[],"week":"WEDNESDAY","isLast":false},"25":{"newsList":[],"week":"THURSDAY","isLast":false},"26":{"newsList":[],"week":"FRIDAY","isLast":false},"27":{"newsList":[],"week":"SATURDAY","isLast":false},"28":{"newsList":[],"week":"SUNDAY","isLast":false},"29":{"newsList":[],"week":"MONDAY","isLast":false},"30":{"newsList":[],"week":"TUESDAY","isLast":false},"31":{"newsList":[],"week":"WEDNESDAY","isLast":false}}},"11":{"isLast":false,"count":0,"day":{"1":{"newsList":[],"week":"THURSDAY","isLast":false},"2":{"newsList":[],"week":"FRIDAY","isLast":false},"3":{"newsList":[],"week":"SATURDAY","isLast":false},"4":{"newsList":[],"week":"SUNDAY","isLast":false},"5":{"newsList":[],"week":"MONDAY","isLast":false},"6":{"newsList":[],"week":"TUESDAY","isLast":false},"7":{"newsList":[],"week":"WEDNESDAY","isLast":false},"8":{"newsList":[],"week":"THURSDAY","isLast":false},"9":{"newsList":[],"week":"FRIDAY","isLast":false},"10":{"newsList":[],"week":"SATURDAY","isLast":false},"11":{"newsList":[],"week":"SUNDAY","isLast":false},"12":{"newsList":[],"week":"MONDAY","isLast":false},"13":{"newsList":[],"week":"TUESDAY","isLast":false},"14":{"newsList":[],"week":"WEDNESDAY","isLast":false},"15":{"newsList":[],"week":"THURSDAY","isLast":false},"16":{"newsList":[],"week":"FRIDAY","isLast":false},"17":{"newsList":[],"week":"SATURDAY","isLast":false},"18":{"newsList":[],"week":"SUNDAY","isLast":false},"19":{"newsList":[],"week":"MONDAY","isLast":false},"20":{"newsList":[],"week":"TUESDAY","isLast":false},"21":{"newsList":[],"week":"WEDNESDAY","isLast":false},"22":{"newsList":[],"week":"THURSDAY","isLast":false},"23":{"newsList":[],"week":"FRIDAY","isLast":false},"24":{"newsList":[],"week":"SATURDAY","isLast":false},"25":{"newsList":[],"week":"SUNDAY","isLast":false},"26":{"newsList":[],"week":"MONDAY","isLast":false},"27":{"newsList":[],"week":"TUESDAY","isLast":false},"28":{"newsList":[],"week":"WEDNESDAY","isLast":false},"29":{"newsList":[],"week":"THURSDAY","isLast":false},"30":{"newsList":[],"week":"FRIDAY","isLast":false}}},"12":{"isLast":false,"count":0,"day":{"1":{"newsList":[],"week":"SATURDAY","isLast":false},"2":{"newsList":[],"week":"SUNDAY","isLast":false},"3":{"newsList":[],"week":"MONDAY","isLast":false},"4":{"newsList":[],"week":"TUESDAY","isLast":false},"5":{"newsList":[],"week":"WEDNESDAY","isLast":false},"6":{"newsList":[],"week":"THURSDAY","isLast":false},"7":{"newsList":[],"week":"FRIDAY","isLast":false},"8":{"newsList":[],"week":"SATURDAY","isLast":false},"9":{"newsList":[],"week":"SUNDAY","isLast":false},"10":{"newsList":[],"week":"MONDAY","isLast":false},"11":{"newsList":[],"week":"TUESDAY","isLast":false},"12":{"newsList":[],"week":"WEDNESDAY","isLast":false},"13":{"newsList":[],"week":"THURSDAY","isLast":false},"14":{"newsList":[],"week":"FRIDAY","isLast":false},"15":{"newsList":[],"week":"SATURDAY","isLast":false},"16":{"newsList":[],"week":"SUNDAY","isLast":false},"17":{"newsList":[],"week":"MONDAY","isLast":false},"18":{"newsList":[],"week":"TUESDAY","isLast":false},"19":{"newsList":[],"week":"WEDNESDAY","isLast":false},"20":{"newsList":[],"week":"THURSDAY","isLast":false},"21":{"newsList":[],"week":"FRIDAY","isLast":false},"22":{"newsList":[],"week":"SATURDAY","isLast":false},"23":{"newsList":[],"week":"SUNDAY","isLast":false},"24":{"newsList":[],"week":"MONDAY","isLast":false},"25":{"newsList":[],"week":"TUESDAY","isLast":false},"26":{"newsList":[],"week":"WEDNESDAY","isLast":false},"27":{"newsList":[],"week":"THURSDAY","isLast":false},"28":{"newsList":[],"week":"FRIDAY","isLast":false},"29":{"newsList":[],"week":"SATURDAY","isLast":false},"30":{"newsList":[],"week":"SUNDAY","isLast":false},"31":{"newsList":[],"week":"MONDAY","isLast":false}}}},"success":true,"exception":null}
		}
		newsAjax.init();
	},
	memberList:function(){
		var that = this
		var memberJson = {
			Jimmy:{
				name:'Jimmy Chan',
				title: 'CEO',
				detail:'As a man who laid the foundation of Shanghai Disneyland and the Peninsula Shanghai, Jimmy Chan brings more than 35 years of experience to Alpha King. His spirit is unstoppable and his vision is powerful. Thanks to that, he inspires the team to unlock all their energy and potential, creating the forces that will put the name Alpha King in the history books.'
			},
			Graham:{
				name:'Graham Goldman',
				title:'COO',
				detail:'As one of the industries most experienced Major Contractors in Australia for over 35 years, Graham Goldman has successfully delivered complex and major projects in Australia, Canada, Fiji. At Alpha King Vietnam, his abundant knowledge and strong effective leadership will ensure our projects will be delivered to the highest quality and within the project timelines.'
			},
			EricChan:{
				name:'Eric Chan',
				title:'CFO',
				detail:'Taking on the role of CFO from Novaland and Masan Corporation, Eric Chan is a financial expert who honed his skills through 15 years in Cash management and Financial strategy. Each decision he makes regarding investment requires high precision and accurate forecasting, which keeps us stable, moving us forward into an emerging era with the ability to make great things happen.'
			},
			NicholasTan:{
				name:'Nicholas Tan',
				title:'Managing Director',
				detail:'Nicholas Tan is known as the man of big progress, which empowered him to sit on the board of directors at CapitaLand Management Company & JVs in Vietnam and Indonesia. Spending over 2 decades in the industry, including 8 years in Vietnam, he knows exactly what people expect from his property projects. With a competitive mindset, he will lead Alpha King to sustainable growth and offer high-end experiences to our clients.'
			},
			Marice:{
				name:'Marice Verna',
				title:'Principle Director',
				detail:'Based in Australia, Maurice Verna is a registered Architect who dedicated over 37 years for Real Estate across Asia Pacific. Prior to joining Alpha King, he served as Managing Director of TVS Architect for the last 20 years.With a deep understanding about the commercial fundamentals associated with design sensibilities, he embraces the aesthetic standard of our projects.'
			},
			Lauren:{
				name:'Lauren Atkins',
				title:'Commercial & Contract Director',
				detail:'Graduated with honors from QUT University Australia, Lauren Atkins is a member of the Australian Institute of Quantity Surveyor (AIQS). Aside from her journey at Eastview Queensland, she brings vast experiences in Property cost and Project management to Alpha King. A well-organized and disciplined person, she is definitely our “security guard”, who assures each project completed to the highest of standards.'
			},
			Kevin:{
				name:'Kevin Xu',
				title:'Project Integration Solutions Director',
				detail:'A member of Shanghai Government Expert Group, Kevin Xu established the standards of Building Information Modelling (BIM), which was widely applied to renowned projects, such as Shanghai Disneyland. By his specialty of BIM integration, he leads the team to bring outstanding and innovative projects to the Vietnamese market.'
			},
			An:{
				name:'An Ngo',
				title:'Business Development Director',
				detail:'Well-equipped with logically analytic thinking built throughout 15 years in Real Estate management and engineering, An Ngo participated in various large-scale mixed-use projects. Little talk but with a lot more results, his comprehensive savvy and adaptability enforces him to draw out a holistic view on all issues, which engages quick movement towards business development.'
			},
			Raymond:{
				name:'Raymond Yang',
				title:'Business Relations Director',
				detail:'Raymond Yang is an expert in Theme Park operation who has over 30 years experience working for international major contractors and leisure developers. As an outdoorsman at large, his spirit of hospitality and passion is infectious, guiding him to build a friendly environment where people enjoy living, working and having quality time together.'
			},
			Hien:{
				name:'Hien Do',
				title:'Marketing Director',
				detail:'Head of Marketing at INGO KOTO and Director at Canadian Chamber of Commerce in her former life, Hien Do has decided to embark on a career in the Construction industry. Aiming to do things differently, she provides a clear strategic vision which shapes Alpha King as a leading customer-centric brand in the local & international Real Estate market.'
			},
			Jenny:{
				name:'Jenny Nguyen',
				title:'Sales Director',
				detail:'Jenny Nguyen has succeeded in engaging herself in the Sales field for over a decade at an international Real Estate developers. With a can-do attitude, this award-winner utilizes every single minute to figure out the best solution in tough situations, completing our targets and gaining trust from clients.'
			},
			Samson:{
				name:'Samson Ngov',
				title:'Design Management Director',
				detail:'Former Design Lead at Walt Disney Imagineering, Samson Ngov, a full rounded designer with more than a decade of global construction experience, who has participated in the success of numerous luxurious hotels and resorts around the world. Never settling for ordinary thinking, he devotes his creativeness to guarantee our projects are formed in compliance with best practice.'
			},
			Edward:{
				name:'Edward Coleman',
				title:'Program & QC Director',
				detail:'Dedicating over 3 decades in Real Estate construction before arriving at Alpha King, Edward Coleman has performed as a proficient cost engineer, whose lunchtime usually consisted of sitting around meetings with international contractors. A generous guider with good will, he desires to settle a well-qualified team, who assist him delivering the best to both clients and investors.'
			},
			Aurelio:{
				name:'Aurelio Doetsch',
				title:'Project Director',
				detail:'An expert in the luxury market segment, Aurelio Doetsch possesses more than 30 years of Operational leadership and Project management from 4 different countries. As a progress-focused and result-oriented professional, he efficiently smoothens complex process and keeps Alpha King’s finger on the pulse of Real Estate market in Vietnam.'
			},
			Hang:{
				name:'Hang Nguyen',
				title:'Asset Management & Strategic Planning Director',
				detail:'Having previously working as Project General Director at Gaw Capital, Hang Nguyen has directed her experiences towards Operation management and Financial modeling. Thanks to her excellent work ethic and robust analytical aptitude, she provides strategic levers of reliability and reputation for our projects.'
			},
			Tzuyin:{
				name:'Tzu-Yin Lu',
				title:'Interior Design Director',
				detail:'Arriving from Walt Disney Imagineering, Tzu-Yin Lu takes pride in the success and achievement of diversified projects, including Shanghai Disneyland. With over many years of inspirational design works, she looks forward to playing a part in the city’s growth and its changing skyline. A genuine artist with a beautiful soul in modern times, she’s open to new trend and styles with her piece of paper and a pencil that she brings along with her.'
			},
			William:{
				name:'Will Hoc Nhan',
				title:'Commercial Assets Director',
				detail:'Prior to joining Alpha King, Will Hoc Nhan, CFA (Vietnamese native) was consultant from McKinsey’s Office in Vietnam with over 9 years of experience in Real Estate and Investment Banking. Some of his previous notable projects including developing Real Estate strategy for one of the largest retail players in Vietnam to achieve US$1bil NAV valuation in 5 years; analyzing key success factors and feasibility study for mega entertainment complex project in Vietnam with total investment of US$2.2 billion. As an enthusiastic & visionary person, Will Nhan has strong desire in building properties that changes the way people experience their life and work.'
			},
			Eric:{
				name:'Eric Niborg',
				title:'Principal Design Director',
				detail:'Eric Niborg brings over 37 years in the design and construction of major capital projects, including international mixed-use and high-rise office, retail, residential, five-star hospitality and medical facilities. Here at Alpha King, his strength in management and leadership reinforces the production cycle of project formulation, procurement, design, and construction; advancing our quality and establishing our reputation.'
			},
			maybe:{
				name:'',
				title:'',
				detail:''
			}

		}
		$('.flip-container').on('click',function(){
			var name = $(this).attr('flip-name');
			var json = memberJson[name];
			var src = './images/'+name+'.png'
			$('#page_3 .memberPic').attr('src',src)
			$('#page_3 .memberName').html(json.name)
			$('#page_3 .memberTitle').html(json.title)
			$('#page_3 .memberDetail').html(json.detail)
			that.memberPopup.popop($('#memberBox'),$('#page_3'))
		})
	},
	memberPopup:{
		popop:function(el,fel){
			this.el = el;
			var that = this;
			$(this.bg).on('click',function(){
				that.closePop()
			})
			$(fel).append($(this.bg));
			$(el).css('z-index','10000')
			$(el).fadeIn();
		},
		bg:$('<div style="width:100%;height:100%;background:rgba(0,0,0,.5);z-index:9999;position:absolute;left:0;right:0;top:0;bottom:0;"></div>'),
		closePop:function(){
			$(this.el).hide();
			$(this.bg).remove();
			$.fn.fullpage.setAllowScrolling(true, 'up');
			$.fn.fullpage.setAllowScrolling(true, 'down');
		},
	},
	contactUs:function(el){
		var that = this;
		$('#explore').on('click',function(){
			that.memberPopup.popop($('#contactUs'),$('#page_4'))
		})
		$('#sendContact').on('click',function(){
			var data = {},isNot = true;
			$('#contactUs .fillIn').each(function(e,a){
				if($(a).val() == ''){
					alert('The content can not be empty, please fill in')
					return false
				}
				data[$(a).attr('data-type')] = $(a).val();
			})
			if(!isNot)return
			$.ajax({
				type:'post',
				url:"http://test.alphakingvn.com/alphaking/openapi/v1/information/saveInformationData",
				data:data,
				dataType:'json',
				success:function(result){
					alert('Your message has been received')
					that.memberPopup.closePop()
				},
			    error:function(a,b,c){
			    	console.info(a.readyState)
			    }
			})
		})
	}
}
