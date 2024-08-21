import MyReact, { useEffect, useState } from "./useEffect.mjs";

function ExampleComponent() {
  const [count, setCount] = useState(0); // hooks[0]에 count값 저장
  const [text, setText] = useState("foo"); // hooks[1]에 text값 저장

  useEffect(() => {
    console.log("effect", count, text);
    return () => {
      console.log("cleanup", count, text);
    };
  }, [count, text]); //hooks[2]에 객체 배열 형태로 값 저장

  return {
    click: () => setCount(count + 1),
    type: (text) => setText(text),
    noop: () =>
      setCount((e) => {
        return e + 4;
      }),
    render: () => console.log("render", { count, text }),
  };
}

//초기 렌더링
let App = MyReact.render(ExampleComponent);
// useEffect의 이번 함수 실행
// effect 0 foo <---이번 함수
// render { count: 0, text: 'foo' }

App.click();
App = MyReact.render(ExampleComponent);
// useEffect의 이전 함수와 이번 함수 실행
// cleanup 0 foo   <---이전 함수
// effect 1 foo   <---이번 함수
// render { count: 1, text: 'foo' }

App.type("bar");
App = MyReact.render(ExampleComponent);
// cleanup 1 foo
// effect 1 bar
// render { count: 1, text: 'bar' }

App.noop();
App = MyReact.render(ExampleComponent);
// cleanup 1 bar
// effect 5 bar
// render { count: 5, text: 'bar' }

App.click();
App = MyReact.render(ExampleComponent);
// cleanup 5 bar
// effect 6 bar
// render { count: 6, text: 'bar' }

App = MyReact.render(ExampleComponent);
// 의존성 배열의 값이 바뀌지 않았기 때문에 useEffect의 함수는 실행되지 않음
// render { count: 6, text: 'bar' }
