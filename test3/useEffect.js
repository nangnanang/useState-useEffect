let _deps = [];

const useEffect = (callback, depArray) => {
  // 의존성 배열에 값이 없을 경우
  const hasNoDeps = !depArray;
  // 의존성 배열에 값이 있을 경우
  const hasChangedDeps = _deps
    ? // 기존값이 있고, 값이 의존성 배열과 일치하면(값이 변화하지 않았으면) false를 반환함
      // 값이 의존성 배열과 일치하지 않으면(값이 변화했으면) 'true'를 반환
      !depArray.every((el, i) => el === _deps[i])
    : // 기존 값이 존재하지 않으면 'true'를 반환함
      true;
  // 의존성 배열에 값이 없거나
  // 의존성 배열에 값이 있고 기존값과 일치하지 않으면
  // callback 함수를 실행하고 의존성 배열을 기존값에 저장함
  if (hasNoDeps || hasChangedDeps) {
    callback();
    _deps = depArray;
  }
};
