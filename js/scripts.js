// array with text to type in typewriter
var dataText = [
  "I am God.",
  "I am progression.",
  "I am health. Wealth. Liberty.",
  "I am success. Power. Endless wisdom.",
  "I am great.",
];

// typewriter speed
// set delay time between each character typing time
var CharDelay = 200;

// pause time between each completed word (delay before next word starts)
var WordPause = 1000;

// set initial word in dataText array
var WordOffset = 0;

// set sequence restart interval N [ms]
var RestartInterval = 3000;

// type one text in the typewriter
// keeps calling itself until complete word is printed
function typeWriter(text, i, fnCallback) {
  // check if word isn't finished yet
  if (i < text.length) {
    // add next character to html
    document.querySelector("#typewriter").innerHTML =
      text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

    // wait for a while and call this function again for next character
    setTimeout(function () {
      typeWriter(text, i + 1, fnCallback);
    }, CharDelay);
  }

  // text finished, call callback if there is a callback function
  else if (typeof fnCallback == "function") {
    // call callback after timeout
    setTimeout(fnCallback, WordPause);
  }
}

// start a typewriter animation in the dataText array
// @param int j = dataText array word index
function StartTextAnimation(j) {
  //console.log(j);
  //console.log(dataText.length);
  // restart animation after N seconds
  if (typeof dataText[j] == "undefined" || j == dataText.length) {
    setTimeout(function () {
      StartTextAnimation(WordOffset);
    }, RestartInterval);
  }

  // check if dataText[j] exists
  else if (j < dataText[j].length) {
    // text exists! start typewriter animation
    typeWriter(dataText[j], 0, function () {
      // after callback (and whole text has been animated), start next word
      StartTextAnimation(j + 1);
    });
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  // start text animation
  StartTextAnimation(WordOffset);
});
