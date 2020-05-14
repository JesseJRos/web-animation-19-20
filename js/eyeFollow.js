let eyeBall = document.querySelector(".eyeball"),
    pupil = document.querySelector(".pupil"),
    eyeArea = eyeBall.getBoundingClientRect(),
    pupilArea = pupil.getBoundingClientRect(),
    R = eyeArea.width/20,
    r = pupilArea.width/20,
    centerX = eyeArea.left,
    centerY = eyeArea.top;

document.addEventListener("mousemove", (e)=>{
  let x = e.clientX - centerX,
      y = e.clientY - centerY,
      theta = Math.atan2(y,x),
      angle = theta*180/Math.PI + 360;
      pupil.style.transform = `translateX(${R - r +"px"}) rotate(${angle + "deg"})`;
      pupil.style.transformOrigin = `${r +"px"} center`;
});

