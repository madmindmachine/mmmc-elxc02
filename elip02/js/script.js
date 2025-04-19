// Scrollbar.init(mainElem, {
//   damping: 0.11,
//   renderByPixels: true, // 픽셀 단위 렌더링 유지
//   plugins: {
//     overscroll: {
//       enable: true,
//       effect: "glow",
//       damping: 0.11,
//       maxOverscroll: 100, // overscroll 크기 확인 및 수정
//       glowColor: "#fff",
//     },
//   },
// });

// 요소 참조
const background = document.querySelector(".background");
const background2 = document.querySelector(".background2");
const backgroundFilter = document.querySelector(".background_filter");
const filterTransition = document.querySelector(".filter_transition");
const scrollWrap = document.querySelector(".scroll_wrap");

document.addEventListener("scroll", () => {
  const transitionRect = filterTransition.getBoundingClientRect();
  const scrollWrapRect = scrollWrap.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // filter_transition 내부에서의 스크롤 비율 계산 (0 ~ 1)
  let transitionProgress = Math.min(
    Math.max((windowHeight - transitionRect.top) / transitionRect.height, 0),
    1
  );

  // scroll_wrap 내부에서는 background2 고정
  if (scrollWrapRect.top <= windowHeight && scrollWrapRect.bottom >= 0) {
    background2.style.opacity = 1;
    background.style.opacity = 0;
    backgroundFilter.style.backdropFilter = `brightness(50%) saturate(80%)`; // 최종 brightness 유지
    return;
  }

  // filter_transition 내부에서만 효과 적용
  if (transitionProgress > 0 && transitionProgress <= 1) {
    // background2 opacity 변경
    background2.style.opacity = transitionProgress;

    // background opacity 반대로 줄이기
    background.style.opacity = 1 - transitionProgress;

    // brightness 변경
    const brightnessValue = 90 - 40 * transitionProgress; // 90% -> 50%
    backgroundFilter.style.backdropFilter = `brightness(${brightnessValue}%) saturate(80%)`;
  } else {
    // 초기화: 영역 밖으로 나갔을 때
    if (transitionRect.bottom <= 0 || transitionRect.top >= windowHeight) {
      background2.style.opacity = 0;
      background.style.opacity = 1;
      backgroundFilter.style.backdropFilter = `brightness(90%) saturate(80%)`;
    }
  }
});
