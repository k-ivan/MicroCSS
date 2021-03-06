export const timingFunction = {
  // no easing, no acceleration
  linear: function (t) { return t },
  // accelerating from zero velocity
  easeInQuad: function (t) { return t*t },
  // decelerating to zero velocity
  easeOutQuad: function (t) { return t*(2-t) },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
  // accelerating from zero velocity
  easeInCubic: function (t) { return t*t*t },
  // decelerating to zero velocity
  easeOutCubic: function (t) { return (--t)*t*t+1 },
  // acceleration until halfway, then deceleration
  easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
  // accelerating from zero velocity
  easeInQuart: function (t) { return t*t*t*t },
  // decelerating to zero velocity
  easeOutQuart: function (t) { return 1-(--t)*t*t*t },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
  // accelerating from zero velocity
  easeInQuint: function (t) { return t*t*t*t*t },
  // decelerating to zero velocity
  easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
  // acceleration until halfway, then deceleration
  easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
}

export const windowScroll = function(posY, duration = 300, easing = 'easeInOutCubic', callback) {
  const start = Date.now();
  const from = window.pageYOffset;

  if(from === posY) {
      callback();
      return;
  }

  function min(a,b) {
    return (a < b) ? a : b;
  }

  function scroll(timestamp) {
    const currentTime = Date.now();
    const time = min(1, ((currentTime - start) / duration));
    const ease = timingFunction[easing](time);

    window.scrollTo(0, (ease * (posY - from)) + from);

    if(time < 1) {
      requestAnimationFrame(scroll);
    }
    else {
      callback && callback();
    }
  }

  requestAnimationFrame(scroll)
}
