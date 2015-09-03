"use strict";
var UI = {
	load : function(){
		this.jsOn();
		this.tabCtrl();
	}
	, jsOn : function(){
		var html = document.querySelectorAll('html')[0];
		UTIL.removeClass(html, 'no-js');
		UTIL.addClass(html, 'js');
	}
	, tabCtrl : function(){
		//선택자 선언
		var doc = document,
			tabCnts = doc.querySelectorAll('.tab-container')[0],
			tabNavs = doc.querySelectorAll('.tab-nav-a');
		
		// 클래스명 
		var cnActive = 'active',
			cnShow = 'show';
		
		// 변수 선언
		var focusedItem = 'music'; //초기 카테고리

		// 함수
		var init = function(){
			if(focusedItem) {
				focusedItem = doc.querySelectorAll('.tab-nav-' + focusedItem)[0];
				drawItem(focusedItem);
				tabActive(focusedItem);
			}
		}
		var drawItem = function(obj){
			var dummy = [];
			var dataCategory;
			var _tplLi, _tplPlay, _tplBadge;
			var templet = '{tplLi}<a href="{url}" class="item-a"><span class="area-thumb"><img src="{imgUrl}" class="img-thumb"><span class="mask-thumb"></span>{tplBadge}</span>{tplPlay}<p class="title-lst">{title}</p></a><p class="stxt-lst">{text}</p></li>';
			dummy.push('<ul class="lst-thumb">');

			//선택한 탭에 따라 category 분류하여 DATA 받아옴
			if(UTIL.hasClass(obj, 'tab-nav-music')) {
				dataCategory = DATA.MUSIC;
			} else if(UTIL.hasClass(obj, 'tab-nav-tv')){
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
			UTIL.getNextSibling(obj).innerHTML = dummy.join('');
		}
		var tabActive = function(e){
			UTIL.addClass(e, cnActive);
			UTIL.addClass(UTIL.getNextSibling(e), cnShow);
		}
		var tabUnActive = function(e){
			UTIL.removeClass(e, cnActive);
			UTIL.removeClass(UTIL.getNextSibling(e), cnShow);
		}
		
		// 이벤트	
		for(var i=0; i<tabNavs.length; i++) {
			tabNavs[i].onclick = function(){

				if(!UTIL.hasClass(this, 'tab-nav-a')) return;

				if(focusedItem) tabUnActive(focusedItem);
				tabActive(this.parentNode);
				focusedItem = this.parentNode;
				
				//클릭한 탭메뉴의 컨텐츠가 없으면 불러온다.
				if(!UTIL.getNextSibling(focusedItem).querySelectorAll('.lst-thumb').length) { 
					drawItem(focusedItem);
				}
			}
		}
		/*tabCnts.onclick = function(e){
			var target = e.srcElement || e.target;
			if(!UTIL.hasClass(target, 'tab-nav-a')) return;
			if(focusedItem) tabUnActive(focusedItem);
			tabActive(target.parentNode);
			focusedItem = target.parentNode;

			//클릭한 탭메뉴의 컨텐츠가 없으면 컨텐츠를 불러온다.
			if(!UTIL.getNextSibling(focusedItem).querySelectorAll('.lst-thumb').length) {
				drawItem(focusedItem);
			}
		}*/
		
		init();
	
	}
}

var UTIL = {
	addClass : function(e, clsName){
		var cn = e.className;
		if(cn.indexOf(clsName) != -1) return;
		if(cn != '') clsName = ' ' + clsName;
		e.className  = cn + clsName;
	}
	, removeClass : function(e, clsName){
		var cn = e.className;
	    var rxp = new RegExp( "\\s?\\b"+clsName+"\\b", "g" );
	    cn = cn.replace( rxp, '' );
	    e.className = cn;
	}
	, hasClass : function(target, clsName) {
	    return new RegExp('(\\s|^)' + clsName + '(\\s|$)').test(target.className);
	}
	, getNextSibling : function(e)  {
		var x = e.nextSibling;
		while(x.nodeType != 1) {
			x = x.nextSibling;
		}
		return x;
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

UI.load();
