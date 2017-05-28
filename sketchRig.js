var inputSpan,
  inputOffset,
  offsetRight,
  inputHeight,
  inputFixLeft,
  inputFixRight,
  inputAngle,
  buttonAngle,
  inputLoad,
  buttonLoad,
  myCanvas,
  button,
  pointX=300,
  pointY=300,
  pointYadder,
  lengthB = 0,
  lengthA = 0,
  scaleMultiplier,
  padding = 50,
  leftAngle,
  rightAngle,
  oldAngle,
  newLeft,
  forceA = 0,
  forceB = 0,
  boxWidth,
  boxHeight,
  numOffset,
  leftTenFt,
  leftFiveFt,
  leftLinks,
  newOffset;



  function setup() {

    angleMode(DEGREES);

    myCanvas = createCanvas(windowWidth, windowHeight - 200);

    myCanvas.parent('myCanvas');

    inputSpan = document.querySelector('#input-span');
    inputOffset = document.querySelector('#input-offset');
    inputHeight = document.querySelector('#input-height');
    inputFixLeft = document.querySelector('#fix-left-leg');
    inputFixRight = document.querySelector('#fix-right-leg');
    inputAngle = document.querySelector('#apex-angle');
    inputLoad = document.querySelector('#load');
    buttonAngle = document.querySelector('#apex-angle-label');

    inputSpan.addEventListener('change', calcLegs);
    inputOffset.addEventListener('change', calcLegs);
    inputHeight.addEventListener('change', calcLegs);


    calcLegs();

    noLoop();

  }

  function draw() {

    background('#fff');

    strokeWeight(5);

    // Offset Line
    stroke('#5cb85c');
    line(padding,45,pointX,45);

    // Width Line
    stroke('#d9534f');
    line(padding,50,width - padding, 50);

    // Height Line
    stroke('#337ab7');
    line(pointX,50,pointX,pointY);

    stroke('#31b0d5');

    // Left Leg
    line(padding,50,pointX,pointY);

    // Right Leg
    line(width - padding,50,pointX,pointY);

    // Set color for apex angle
    if (inputAngle.value < 110) {
      stroke('#79c95e');
      buttonAngle.setAttribute('style', 'background-color: #79c95e');
    } else if (inputAngle.value < 120) {
      stroke('#ea943e');
      buttonAngle.setAttribute('style', 'background-color: #ea943e');
    } else {
      stroke('#df4949');
      buttonAngle.setAttribute('style', 'background-color: #df4949');

    }

    // apex angle lines and arc
    line(pointX, pointY, pointX + (0.2 * inputHeight.value * scaleMultiplier * sin(rightAngle)), pointY - (0.2 * inputHeight.value * scaleMultiplier * sin(rightAngle) / tan(rightAngle)));
    line(pointX, pointY, pointX - (0.2 * inputHeight.value * scaleMultiplier * sin(leftAngle)), pointY - (0.2 * inputHeight.value * scaleMultiplier * sin(leftAngle) / tan(leftAngle)));
    noFill();
    strokeWeight(2);
    arc(pointX, pointY, 0.4 * inputHeight.value * scaleMultiplier, 0.4 * inputHeight.value * scaleMultiplier, 270 - leftAngle , 270 + rightAngle);

    stroke(155);
    strokeWeight(1);
    fill('#ffffff');

    if (width < 750) {
      textSize(12);
      boxWidth = 35;
      boxHeight = 20;
      numOffset = 12;
      pointYadder = 37;
    } else {
      textSize(20);
      boxWidth = 55;
      boxHeight = 25;
      numOffset = 23;
      pointYadder = 40;
    }

    // Left leg length line
    line(pointX, pointY, pointX - (20 * cos(leftAngle)), pointY + (20 * sin(leftAngle)));
    line(padding, 50, padding - (20 * cos(leftAngle)), 50 + (20 * sin(leftAngle)));
    line(padding - (10 * cos(leftAngle)), 50 + (10 * sin(leftAngle)), pointX - (10 * cos(leftAngle)), pointY + (10 * sin(leftAngle)));

    // Right Leg length line
    line(pointX, pointY, pointX + (20 * cos(rightAngle)), pointY + (20 * sin(rightAngle)));
    line(width - padding, 50, width - padding + (20 * cos(rightAngle)), 50 + (20 * sin(rightAngle)));
    line(width - padding + (10 * cos(rightAngle)), 50 + (10 * sin(rightAngle)), pointX + (10 * cos(rightAngle)), pointY + (10 * sin(rightAngle)));

    //line(padding, 50, padding, 10);
    //line(width - padding, 50, width - padding, 10);
    //line(padding, 20, width - padding, 20);
    //line(padding + inputOffset.value * scaleMultiplier, 45, padding + inputOffset.value * scaleMultiplier, 25);
    //line(padding, 35, padding + inputOffset.value * scaleMultiplier, 35);


    // Length and angle bubble rectangles
    rectMode(CENTER);
    rect(padding - 15 + inputFixLeft.value * scaleMultiplier * 0.3 * sin(leftAngle), 50 + inputFixLeft.value * scaleMultiplier * 0.3 * cos(leftAngle), boxWidth, boxHeight, 5);
    rect(width - padding + 15 - inputFixRight.value * scaleMultiplier * 0.3 * sin(rightAngle), 50 + inputFixRight.value * scaleMultiplier * 0.3 * cos(rightAngle), boxWidth, boxHeight, 5);
    rect( pointX, pointY + 30, boxWidth + 10, boxHeight, 5);
    //rect(padding + inputOffset.value * scaleMultiplier * 0.5, 35, boxWidth - 10, boxHeight - 8, 5);
    //rect(padding + inputOffset.value * scaleMultiplier + (inputSpan.value - inputOffset.value) * scaleMultiplier * 0.5, 20, boxWidth - 10, boxHeight - 8, 5);



    // Length and angle inside bubble rectangles
    fill(0);
    stroke(0);

    textAlign(CENTER, CENTER);
    text(lengthA, padding - 15 + inputFixLeft.value * scaleMultiplier * 0.3 * sin(leftAngle), 50 + inputFixLeft.value * scaleMultiplier * 0.3 * cos(leftAngle));
    text(lengthB, width - padding + 15 - inputFixRight.value * scaleMultiplier * 0.3 * sin(rightAngle), 50 + inputFixRight.value * scaleMultiplier * 0.3 * cos(rightAngle));
    text(inputAngle.value + String.fromCharCode(176), pointX, pointY + 30);
    text(inputOffset.value, padding + inputOffset.value * scaleMultiplier * 0.5, 32);
    text(inputSpan.value, padding + inputOffset.value * scaleMultiplier + (inputSpan.value - inputOffset.value) * scaleMultiplier * 0.2, 65);
    text(inputHeight.value, padding - 15 + inputOffset.value * scaleMultiplier, 50 + inputHeight.value * scaleMultiplier * 0.5);

    push();
    translate(padding,50);
    rotate(90 - leftAngle);
    text(forceA.toFixed(1), inputFixLeft.value * scaleMultiplier * 0.6,30);
    strokeWeight(2);
    fill('#b242d7');
    stroke('#b242d7');
    line(inputFixLeft.value * scaleMultiplier * 0.6 - 20,45, inputFixLeft.value * scaleMultiplier * 0.6 + 20,45);
    triangle(inputFixLeft.value * scaleMultiplier * 0.6 - 20, 45, inputFixLeft.value * scaleMultiplier * 0.6 - 12, 42, inputFixLeft.value * scaleMultiplier * 0.6 - 12, 48);
    triangle(inputFixLeft.value * scaleMultiplier * 0.6 + 20, 45, inputFixLeft.value * scaleMultiplier * 0.6 + 12, 42, inputFixLeft.value * scaleMultiplier * 0.6 + 12, 48);
    pop();

    push();
    translate(pointX, pointY);
    rotate(-(90 - rightAngle));
    text(forceB.toFixed(1),lengthB * scaleMultiplier * 0.4,30);
    strokeWeight(2);
    fill('#b242d7');
    stroke('#b242d7');
    line(inputFixRight.value * scaleMultiplier * 0.4 - 20,45, inputFixRight.value * scaleMultiplier * 0.4 + 20,45);
    triangle(inputFixRight.value * scaleMultiplier * 0.4 - 20, 45, inputFixRight.value * scaleMultiplier * 0.4 - 12, 42, inputFixRight.value * scaleMultiplier * 0.4 - 12, 48);
    triangle(inputFixRight.value * scaleMultiplier * 0.4 + 20, 45, inputFixRight.value * scaleMultiplier * 0.4 + 12, 42, inputFixRight.value * scaleMultiplier * 0.4 + 12, 48);
    pop();




  }


  // function keyPressed() {
  //     if (keyCode === ENTER) {
  //         calcLegs();
  //     } else if (keyCode === RIGHT_ARROW) {
  //         fixB();
  //     } else if (keyCode === LEFT_ARROW) {
  //         fixA();
  //     }
  // }

  function windowResized() {
    resizeCanvas(windowWidth, inputHeight.value * scaleMultiplier + 100);
    calcLegs();
  }

  function setScaleMultiplier() {
    if (inputSpan.value / windowWidth > inputHeight.value / (windowHeight * 0.6)) {
      padding = 50;
      scaleMultiplier = (windowWidth - (padding * 2)) / inputSpan.value;
    } else {
      scaleMultiplier = constrain( (windowHeight * 0.6 - 100) / inputHeight.value, 100 / inputHeight.value, 10000);
      padding = (windowWidth - (inputSpan.value * scaleMultiplier)) / 2;
      padding = constrain(padding, 50, windowWidth / 2);
    };

    resizeCanvas(windowWidth, inputHeight.value * scaleMultiplier + 100);

  }


  function calcLegs() {
    newOffset = constrain(inputOffset.valueAsNumber, 0, inputSpan.valueAsNumber);

    inputOffset.value = newOffset;

    setScaleMultiplier();
    pointX = (inputOffset.value * scaleMultiplier) + padding
    pointY = (inputHeight.value * scaleMultiplier) + 50;
    lengthB = dist(width - padding, 50, pointX, pointY) / scaleMultiplier;
    lengthA = dist(padding, 50, pointX, pointY) / scaleMultiplier;
    lengthA = lengthA.toFixed(1);
    lengthB = lengthB.toFixed(1);
    inputFixLeft.value = lengthA;
    inputFixRight.value = lengthB;

    var steel = document.querySelectorAll('.steel');

    steel.forEach(segment => {
      segment.value= 52 / segment.dataset.lengths;
      console.log(segment);

    });

    // leftTenFt.html(floor(lengthA / 10));
    // leftFiveFt.html(floor((lengthA % 10) / 5));
    // leftTwoFt.html(floor((lengthA - leftTenFt.html() * 10 - leftFiveFt.html() * 5) / 2));
    // leftLinks.html(round(((lengthA - leftTenFt.html() * 10 - leftFiveFt.html() * 5 - leftTwoFt.html() * 2) * 12) / 3.75));
    // rightTenFt.html(floor(lengthB / 10));
    // rightFiveFt.html(floor((lengthB % 10) / 5));
    // rightTwoFt.html(floor((lengthB - rightTenFt.html() * 10 - rightFiveFt.html() * 5) / 2));
    // rightLinks.html(round(((lengthB - rightTenFt.html() * 10 - rightFiveFt.html() * 5 - rightTwoFt.html() * 2) * 12) / 3.75));
    calcAngle();
    fixLoad();
    redraw();
  }

  function calcAngle() {
    offsetRight = inputSpan.value - inputOffset.value;
    leftAngle = atan(inputOffset.value / inputHeight.value);
    rightAngle = atan(offsetRight / inputHeight.value);
    inputAngle.value = (leftAngle + rightAngle).toFixed(1);
  }

  function fixA() {
    inputFixLeft.value = constrain(inputFixLeft.value, inputOffset.value, 999);
    inputHeight.value = (sqrt(sq(inputFixLeft.value) - sq(inputOffset.value)).toFixed(1));
    calcLegs();
  }

  function fixB() {
    offsetRight = inputSpan.value - inputOffset.value;
    inputFixRight.value = (constrain(inputFixRight.value, offsetRight, 999));
    inputHeight.value = (sqrt(sq(inputFixRight.value) - sq(offsetRight)).toFixed(1));
    calcLegs();
  }

  function fixAngle() {
    //newLeft = inputAngle.value * leftAngle / (leftAngle + rightAngle);
    //console.log(newLeft);
    //console.log(leftAngle + rightAngle);
    //inputHeight.value(inputOffset.value * sin(90 - newLeft) / sin(newLeft));
    //console.log(inputHeight.value);
    //calcLegs();



  }

  function fixLoad() {
    offsetRight = inputSpan.value - inputOffset.value;
    forceA = offsetRight/inputSpan.value * inputLoad.value * (lengthA / inputHeight.value);
    forceB = inputOffset.value / inputSpan.value * inputLoad.value * ( lengthB / inputHeight.value);
    redraw();
  }
