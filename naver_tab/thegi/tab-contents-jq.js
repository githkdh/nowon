"use strict";
(function($){
	var UI = {
		load : function(){
			this.jsOn();
			this.tabCtrl();
		}
		, jsOn : function(){
			$('html').removeClass('no-js').addClass('js');
		}
		, tabCtrl : function(){
			//선택자 선언
			var tabNavs = $('.tab-nav-a');
			
			// 클래스명 
			var cnActive = 'active',
				cnShow = 'show';
			
			// 변수 선언
			var focusedItem = 'music'; //초기 카테고리

			// 함수
			var init = function(){				
				focusedItem = $('.tab-nav-' + focusedItem);
				drawItem(focusedItem);
				tabActive(focusedItem);				
			}
			var drawItem = function(obj){
				var dummy = [];
				var dataCategory;
				var _tplLi, _tplPlay, _tplBadge;
				var templet = '{tplLi}<a href="{url}" class="item-a"><span class="area-thumb"><img src="{imgUrl}" class="img-thumb"><span class="mask-thumb"></span>{tplBadge}</span>{tplPlay}<p class="title-lst">{title}</p></a><p class="stxt-lst">{text}</p></li>';
				dummy.push('<ul class="lst-thumb">');

				//선택한 탭에 따라 category 분류하여 DATA 받아옴
				if(obj.hasClass('tab-nav-music')) {
					dataCategory = DATA.MUSIC;
				} else if(obj.hasClass('tab-nav-tv')){
					dataCategory = DATA.TV;
				}

				for(var i=0; i<dataCategory.length ; i++){
					var data = dataCategory[i];
					var tpl = templet;
					_tplLi = i==0 ? '<li class="item item-promotion">' : '<li class="item">';
					_tplPlay = data.play ? '<p class="icon-play">영상 <span class="blind">컨텐츠</span></p>' : '';
					_tplBadge = data.badge ? '<span class="badge-thumb"><em class="badge-text">'+ data.badge + '</em><span class="badge-bg"></span></span>' : '';
					tpl = tpl.replace('{tplLi}', _tplLi)
								.replace("{url}", data.url)
								.replace("{imgUrl}", data.imgUrl)
								.replace("{tplPlay}", _tplPlay)
								.replace("{tplBadge}", _tplBadge)
								.replace("{title}", data.title)
								.replace("{text}", data.text);
					dummy.push(tpl);					
				}

				dummy.push('</ul>');
				obj.next().html(dummy.join(''));
			}
			var tabActive = function(e){
				e.addClass(cnActive);
				e.next().addClass(cnShow);
			}
			var tabUnActive = function(e){
				e.removeClass(cnActive);
				e.next().removeClass(cnShow);
			}
			
			// 이벤트				
			tabNavs.each(function(){
				$(this).click(function(){
					var target = $(this);
					if(!target.hasClass('tab-nav-a')) return;

					if(focusedItem) tabUnActive(focusedItem);
					tabActive(target.parent());
					focusedItem = target.parent();
					
					//클릭한 탭메뉴의 컨텐츠가 없으면 불러온다.
					if(!focusedItem.next().find('.lst-thumb').length) { 
						drawItem(focusedItem);
					}
				})
			});				

			init();
		
		}
	}

	var DATA = {
		TV : [
			{value:1, play: false,  title : '"만능 엄친딸" 한승연, 독보적 영어 발음!', text : '학교 다녀오겠습니다 ', url :'#href', imgUrl : 'http://img.naver.net/static/www/mobile/edit/2015/0902/mobile_070826640907.jpg'},
			{value:2, play: true, title : '1박2일 어게인! 유쾌한 제작발표회', text : '신서유기 | 4일(금) 첫 방송', url :'#href', imgUrl : 'http://img.naver.net/static/www/mobile/edit/2015/0902/mobile_085100808298.jpg', badge : '다시보기'},
			{value:3, play: true, title : '생존을 위한 인류의 변신, 흰 피부', text : '넥스트 휴먼 | 3일(목) 23시', url :'#href', imgUrl : 'http://img.naver.net/static/www/mobile/edit/2015/0901/mobile_182046608149.png', badge : 'D-1'},
			{value:4, play: false, title : '국내에 이런 음악하는 팀 없어요', text : 'NP유니온 인터뷰', url :'#href', imgUrl : 'http://img.naver.net/static/www/mobile/edit/2015/0901/mobile_232952612123.JPG', badge : '뮤지션리그'},
			{value:5, play: false, title : '가을에는 이런 페스티벌이 딱', text : '폴인어쿠스틱 페스티벌', url :'#href', imgUrl : 'http://img.naver.net/static/www/mobile/edit/2015/0901/mobile_231420894557.JPG', badge : '공연초대'},
			{value:6, play: true, title : '타블로 X 조이 배드애스 콜라보!', text : '서울편 티저도 공개', url :'#href', imgUrl : 'http://img.naver.net/static/www/mobile/edit/2015/0902/mobile_110208465848.JPG'},
			{value:7, play: false, title : '이런 라인업이면 당연히 가야죠', text : '글로벌 게더링 라인업공개', url :'#href', imgUrl : 'http://img.naver.net/static/www/mobile/edit/2015/0901/mobile_22580151510.JPG'},
			{value:8, play: false, title : '유희열도 "유재하경연대회"" 출신!', text : '26번째 유재하를 찾습니다', url :'#href', imgUrl : 'http://img.naver.net/static/www/mobile/edit/2015/0901/mobile_123032540940.JPG'},
			{value:9, play: false, title : '카니예, 美 대선 캠페인 이미 시작?', text : '백악관 반응은?', url :'#href', imgUrl : 'http://img.naver.net/static/www/mobile/edit/2015/0901/mobile_123253605208.JPG'},
			{value:10, play: false, title : '데미안 라이스, 11월 내한 공연 확정', text : '11월 22일,24일 공연', url :'#href', imgUrl : 'http://img.naver.net/static/www/mobile/edit/2015/0901/mobile_112344624225.JPG'},
			{value:11, play: false, title : '가을엔 당연히 "가을방학"" 입니다', text : '가을방학 앨범 작업기', url :'#href', imgUrl : 'http://img.naver.net/static/www/mobile/edit/2015/0831/mobile_163648519290.JPG'}
		], 
		MUSIC : [
			{value:1, play: false,  title : '이진아 X 박진영 "공항 가는 길" 공개!', text : '', url :'#href', imgUrl : 'http://img.naver.net/static/www/mobile/edit/2015/0901/mobile_114127499219.JPG'},
			{value:2, play: true, title : 'JYP 최초 6인조 남성밴드 데뷔', text : 'DAY6 데뷔 티저공개', url :'#href', imgUrl : 'http://img.naver.net/static/www/mobile/edit/2015/0902/mobile_111414191809.JPG'},
			{value:3, play: false, title : '임재범 30주년 "헌정 앨범"" 나온다', text : '새 앨범과 동시 진행중', url :'#href', imgUrl : 'http://img.naver.net/static/www/mobile/edit/2015/0902/mobile_110536239155.JPG'},
			{value:4, play: false, title : '가을에는 이런 페스티벌이 딱', text : '폴인어쿠스틱 페스티벌', url :'#href', imgUrl : 'http://img.naver.net/static/www/mobile/edit/2015/0901/mobile_231420894557.JPG', badge : '공연초대'},
			{value:5, play: false, title : '국내에 이런 음악하는 팀 없어요', text : 'NP유니온 인터뷰', url :'#href', imgUrl : 'http://img.naver.net/static/www/mobile/edit/2015/0901/mobile_232952612123.JPG', badge : '뮤지션리그'},
			{value:6, play: false, title : '이런 라인업이면 당연히 가야죠', text : '글로벌 게더링 라인업공개', url :'#href', imgUrl : 'http://img.naver.net/static/www/mobile/edit/2015/0901/mobile_22580151510.JPG'},
			{value:7, play: true, title : '타블로 X 조이 배드애스 콜라보!', text : '서울편 티저도 공개', url :'#href', imgUrl : 'http://img.naver.net/static/www/mobile/edit/2015/0902/mobile_110208465848.JPG'},
			{value:8, play: false, title : '카니예, 美 대선 캠페인 이미 시작?', text : '백악관 반응은?', url :'#href', imgUrl : 'http://img.naver.net/static/www/mobile/edit/2015/0901/mobile_123253605208.JPG'},
			{value:9, play: false, title : '유희열도 "유재하경연대회"" 출신!', text : '26번째 유재하를 찾습니다', url :'#href', imgUrl : 'http://img.naver.net/static/www/mobile/edit/2015/0901/mobile_123032540940.JPG'},
			{value:10, play: false, title : '가을엔 당연히 "가을방학"" 입니다', text : '가을방학 앨범 작업기', url :'#href', imgUrl : 'http://img.naver.net/static/www/mobile/edit/2015/0831/mobile_163648519290.JPG'},
			{value:11, play: false, title : '데미안 라이스, 11월 내한 공연 확정', text : '11월 22일,24일 공연', url :'#href', imgUrl : 'http://img.naver.net/static/www/mobile/edit/2015/0901/mobile_112344624225.JPG'}
		]
	}

	$(function(){
		UI.load();	
	});//ready	
})(jQuery);
