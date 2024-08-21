import useState, { MyReact } from "./useState.mjs";

// 컴포넌트 선언
function ExampleComponent() {
  const [count, setCount] = useState(0); // hooks[0]에 count값 저장
  const [text, setText] = useState("foo"); // hooks[1]에 text값 저장
  //객체 반환
  return {
    // MyReact에서 실행할 render 함수 선언
    render: () => console.log("render", { count, text }),
    // 상태값에 변화를 주는 함수 선언
    click: () => setCount(count + 1),
    type: (text) => setText(text),
    noop: () =>
      setCount((e) => {
        return e + 4;
      }),
  };
}

//ExampleComponent 컴포넌트를 인자로 받아서
//MyReact 객체의 render함수 실행
let App = MyReact.render(ExampleComponent); // 초기 렌더링
// render { count: 0, text: 'foo' }

// 두 번 실행했으나 값은 한 번만 변화
// 리렌더링 될 때마다 count 값만 변화함
App.click();
App.click();
App = MyReact.render(ExampleComponent); // render { count: 1, text: 'foo' }
App.click();
App = MyReact.render(ExampleComponent); // render { count: 2, text: 'foo' }

// 렌더링될 때마다 text 값만 변화함
App.type("bar");
App = MyReact.render(ExampleComponent); // render { count: 2, text: 'bar' }

// 함수를 넘겼을 때도 작동함
App.noop();
App = MyReact.render(ExampleComponent); //render { count: 6, text: 'bar' }

// render { count: 0, text: 'foo' }
// render { count: 1, text: 'foo' }
// render { count: 2, text: 'foo' }
// render { count: 2, text: 'bar' }
// render { count: 6, text: 'bar' }
