// 리액트 런데링 함수가 담긴 '객체' 선언
const MyReact = {
  // 컴포넌트를 매개변수로 받는 렌더링 '함수' 선언
  render(Component) {
    //매개변수로 받은 컴포넌트 '실행'+객체 받음
    const Comp = Component();
    //반환된 객체 속의 render(key) 함수 실행
    Comp.render();
    //컴포넌트 반환(객체 반환)
    return Comp;
  },
};

export default MyReact;
