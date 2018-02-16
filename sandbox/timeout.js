let animationClasses = ['', '', '']
let timeout = undefined
let nextIndex = undefined

function animateEllipses(index){
  console.log('animating!');
  console.log(index);
  return animationClasses.map(animationIndex => {
    if (animationIndex === index) {
      return '--ellipseAnimate'
    }
    return ''
  })
}

function step(prevTime, lastIndex) {
  console.log(`prevTime is: ${prevTime}`);
  let curTime = Date.now()
  let progress = curTime - prevTime;
  console.log(`progress: since last call: ${progress}`);
  console.log('(should have increased)');
  if (progress < 1000) {
    console.log('progress is less than 1000ms, therefore waiting');
    timeout = window.requestAnimationFrame(() => step(prevTime, lastIndex));
  } else {
    console.log('progress is > 1000ms, animating');
    if (lastIndex === animationClasses.length - 1) {
      nextIndex = 0
    } else {
      nextIndex = lastIndex += 1
    }
    console.log('animating');
    animateEllipses(lastIndex)
    timeout = window.requestAnimationFrame(() => step(curTime, nextIndex));
  }
}

timeout = window.requestAnimationFrame(() => step(Date.now(), 0));
