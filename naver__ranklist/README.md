ISSUE

1. 접근성 지원
  1. onfocus, onblur 사용
  2. firefox에서 onfocus 되더라도 .rankpop 이 제대로 표현되지 않는 문제가 있음 thegi
  3. <del>kimdh이 작업한 setRwd()가 제대로 동작되지 않음.</del>



해결/완료 

1.3 

document.width 프로퍼티가 크롬에서 동작하지 않음. <br>
html Element의 'clientWidth'의 값을 이용하여 구현. 