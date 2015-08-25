# NAVER Tab Contents

## 기본 구현 정보

- 디바이스 : 웹(데스크탑)
- 브라우저 : 크롬, 파이어폭스, 오페라, 사파리, IE(8~11)
- 웹표준, 웹접근성 준수
- 데이터는 json 형식으로 받아온다.
- javaScript, jQuery로 구현

## UX

1. 탭메뉴를 노출한다.
2. 특정한 탭메뉴의 컨텐츠를 뿌려준다.
3. 다른 탭을 누르면 보여지던 컨텐츠는 사라지고 해당탭의 컨텐츠를 보여준다.

## Events

1. Load
	- Common Action> Tab Active, Content Show
2. Key Focus In
	- 활성화 되어 있던 Tab Menu : Common Action> Tab UnActive
	- Fouse된 Tab :  Common Action> Tab Active
3. Mouse Click & Key Enter 
	- 활성화 되어 있던 Tab Menu : Common Action> Tab UnActive
	- 보여지고 있던 Content : Common Action> Content Hide 
	- Click한 Tab :  Common Action> Tab Active
	- Click한 Tab의 Content :  Common Action> Content Show
4. Common Action
	- Tab Active : Tab 활성화
	- Tab UnActive : Tab 비활성화
	- Content Show : 특정 Tab 컨텐츠 Show
	- Content Hide : 특정 Tab 컨텐츠 Hide

## 과제 및 질문

