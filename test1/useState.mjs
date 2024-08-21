let _val;
const useState = (initialValue) => {
  //초기값 설정
  if (!_val) {
    _val = initialValue;
  }
  //상태값 저장 함수
  function setState(newVal) {
    _val = newVal;
  }
  //상태값과 상태값 저장 함수 반환
  return [_val, setState];
};
export default useState;
