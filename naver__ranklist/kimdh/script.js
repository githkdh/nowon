/* Data */ 

var dataset_rankc = [
	{value: 1, keyword: '첫번째', state: 'NEW', rank: '', url:''}, 
	{value: 2, keyword: '두번째', state: 'UP', rank: 117, url:''}, 
	{value: 3, keyword: '세번째', state: 'UP', rank: 486, url:''}, 
	{value: 4, keyword: '네번째', state: 'UP', rank: 204, url:''}, 
	{value: 5, keyword: '다섯번째', state: 'DOWN', rank: 129, url:''}, 
	{value: 6, keyword: '여섯번째', state: 'UP', rank: 69, url:''}, 
	{value: 7, keyword: '일곱번째', state: 'UP', rank: 117, url:''}, 
	{value: 8, keyword: '여덟번째', state: 'UP', rank: 66, url:''}, 
	{value: 9, keyword: '아홉번째', state: 'UP', rank: 81, url:''}, 
	{value: 10, keyword: '열번째', state: 'UP', rank: 69, url:''}
];







/* Templating */

var rankcObj = {
	dummy: [],
	text: '<li title="{value}"><a href="{url}"><span class="kw">{keyword}</span> <span class="rk">{rank}</span> <span class="{state} st">{state_text}</span></a></li>', 
	setStateText: function(string) {
		var txt; 
		switch(string) {
			case 'UP': 
				txt = '상승'; 
				break; 
			case 'DOWN': 
				txt = '하락';
				break; 
			case 'NEW':
				txt = '진입';
				break; 
			default: 
				break; 
		}
		return txt; 
	}
};

rankcObj.dummy.push('<ol>');
for(var i = 0; i < dataset_rankc.length; i++) {
	var x = dataset_rankc[i];
	var y = rankcObj.text; 
	y = y.replace("{value}", x.value)
		.replace("{url}", x.url)
		.replace("{keyword}", x.keyword)
		.replace("{rank}", x.rank)
		.replace("{state}", x.state)
		.replace("{state_text}", rankcObj.setStateText(x.state));

	rankcObj.dummy.push(y);
}
rankcObj.dummy.push('</ol>');







/* DOMScript */

var doc = document; 
var rankc = doc.getElementById('rankc');
var rankc_div = rankc.getElementsByTagName('DIV')[0];
var rankc_inner = doc.getElementById('rankc_inner');
var rankc_list = rankc.getElementsByTagName('LI');
var interval_rankc;
var rankc_limited = 10; 
var current_rank = 0;

rankc.onmouseover = function() {
	rankc_list[current_rank].className = 'on'; 
	this.className = 'rankc rankpop'; 
	clearInterval(interval_rankc); 
};

rankc.onmouseout = function() {
	rankc_list[current_rank].className = ''; 
	this.className = 'rankc ranklist'; 
	interval_rankc = setInterval(function() {
		rankc_util.setInterv(); 
	}, 1000); 
};

var rankc_util = {
	setInterv: function() {
		rankc_div.className = 'rankc_w current_idx_' + (++current_rank);

		if(current_rank === rankc_limited) {
			current_rank = 0; 
		}

		this.setRwd(); 	
	}, 
	setRwd: function() {
		/* document.width */
		if(html.clientWidth <= 400) {
			rwd = 'Small'; 
		} else {
			rwd = 'Big'; 
		}

		if(log.innerHTML === rwd) { return false; }
		if(body.className.indexOf('screen_') > -1) { bodyClassName.pop(); }

		log.innerHTML = rwd;
		bodyClassName.push('screen_'+rwd);
		body.className = bodyClassName.join(' '); 
	}
};










/* Log / Monitoring / RWD */

var log = doc.getElementById('log');
var html = doc.getElementsByTagName('HTML')[0];
var body = doc.getElementsByTagName('BODY')[0];
var bodyClassName = body.className.split(' '); 
var rwd;

setTimeout(function() { rankc_util.setRwd(); }, 100); 








/* Init */

interval_rankc = setInterval(function() {
	rankc_util.setInterv(); 
}, 1000); 

rankc_inner.innerHTML = rankcObj.dummy.join(''); 


