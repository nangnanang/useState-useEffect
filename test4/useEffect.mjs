// 상태값을 배열로 선언
let hooks = [];
// 상태값 배열의 '인덱스 선언'
let currentHook = 0;

// 호출순서
const useState = (initialValue) => {
  //초기값 설정
  hooks[currentHook] = hooks[currentHook] || initialValue;
  const hookIndex = currentHook;
  //setState 함수 선언
  const setState = (newState) => {
    if (typeof newState === "function") {
      hooks[hookIndex] = newState(hooks[hookIndex]);
    } else {
      hooks[hookIndex] = newState;
    }
  };
  //useState 기능을 사용할 수 있는 값과 함수를 배열로 반환하여 순서를 맞추면 이름이 바뀌어도 같은 기능을 하도록 함
  return [hooks[currentHook++], setState];
};

const useEffect = (callback, depArray) => {
  //의존성배열이 없는 경우
  const hasNoDeps = !depArray;
  //이전 값이 존재하면 이전 값들을 prev~행태로 저장
  //이전 값이 존재하지 않으면 undefined 반환
  // 하단을 보면 알 수 있듯이 deps는 의존성배열이고 cleanUp은 콜백함수이다.
  const prevDeps = hooks[currentHook] ? hooks[currentHook].deps : undefined;
  const prevCleanUp = hooks[currentHook]
    ? hooks[currentHook].cleanUp
    : undefined;

  //값이 바뀐 경우
  const hasChangedDeps = prevDeps
    ? !depArray.every((el, i) => el === prevDeps[i])
    : true;

  //값이 없거나 값이 바뀐 경우
  if (hasNoDeps || hasChangedDeps) {
    // 이전 callback함수가 존재하면 이전 함수를 실행
    if (prevCleanUp) prevCleanUp();
    // 이번의 callback함수를 실행
    const cleanUp = callback();
    //객체 배열 형태로 값 저장
    hooks[currentHook] = { deps: depArray, cleanUp: cleanUp };
  }
  currentHook++;
};

const MyReact = {
  render(Component) {
    const instance = Component();
    instance.render();
    currentHook = 0;
    return instance;
  },
};

MyReact.useState = useState;
MyReact.useEffect = useEffect;

export { useState, useEffect };
export default MyReact;
