// 상태값을 배열로 선언
let hooks = [];
// 상태값 배열의 '인덱스 선언'
let currentHook = 0;

export const MyReact = {
  render(Component) {
    const Comp = Component();
    Comp.render();
    //상태값 배열의 '인덱스 초기화'
    //렌더링 될 때마다 hook의 인덱스를 초기화해서 다시금 useState의 값이 hook[0]부터 저장되도록 함
    //값들은 각각 hook[0], hook[1]에 저장되어야 하는데 이렇게 인덱스를 초기화하지 않으면
    //hook[2], hook[3]에 값이 저장되며 이러한 값들을 불러올 수 없음
    currentHook = 0;
    return Comp;
  },
};

const useState = (initialValue) => {
  //초기값 설정
  hooks[currentHook] = hooks[currentHook] || initialValue;
  //상태 값의 인덱스 저장
  //뒤쪽의 currentHook++로 인해 currentHook은 변화함
  const hookIndex = currentHook;
  //상태값 저장 함수
  //함수를 인자로 받으면 함수를 실행, 값을 인자로 받으면 값을 저장
  function setState(newState) {
    if (typeof newState === "function") {
      //값을 저장할 때 함수가 사용되면 함수의 인자로 hook[0]과 같은 이전의 상태값을 주고
      //이전의 상태값을 모종의 방법으로 변환한 값을 현재값으로 저장한다.
      hooks[hookIndex] = newState(hooks[hookIndex]);
    } else {
      hooks[hookIndex] = newState;
    }
  }
  //상태값과 상태값 저장 함수 반환
  // currentHook++를 함으로써 useState를 선언할 때마다 각기 다른 배열요소에 값이 할당됨
  // hooks[0]=count   hooks[1]=text
  return [hooks[currentHook++], setState];
};
export default useState;
