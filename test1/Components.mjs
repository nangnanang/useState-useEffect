import MyReact from "./React.mjs";
import useState from "./useState.mjs";

// 컴포넌트 선언
function ExampleComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("foo");
  //객체 반환
  return {
    // MyReact에서 실행할 render 함수 선언
    render: () => console.log("render", { count, text }),
    // 상태값에 변화를 주는 함수 선언
    click: () => setCount(count + 1),
    type: (text) => setText(text),
    noop: () => setCount(count),
  };
}

//ExampleComponent 컴포넌트를 인자로 받아서
//MyReact 객체의 render함수 실행
let App = MyReact.render(ExampleComponent); // 초기 렌더링
// render { count: 0, text: 'foo' }

// 두 번 실행했으나 값은 한 번만 변화
// count 값만 변화시키려고 했으나 text 값도 '1'로 변화
App.click();
App.click();
App = MyReact.render(ExampleComponent); // render { count: 1, text: 1 }

// text 값을 변화 시키면 count 값도 'bar'로 변화
App.type("bar");
App = MyReact.render(ExampleComponent); // render { count: 'bar', text: 'bar' }

// count와 text가 같은 값을 참조하고 있기 때문에 생긴 일!!!

// render { count: 0, text: 'foo' }
// render { count: 1, text: 1 }
// render { count: 'bar', text: 'bar' }
