// Check If There's Local Storage Color Option
let mainColors = localStorage.getItem("color_option");

//console.log(mainColors);

if (mainColors !== null) {
  // console.log('Local Storage Is Not Empty You Can Set It On Root Now');
  // console.log(mainColors);
  document.documentElement.style.setProperty('--main-color', mainColors);

  // Remove Active Class From All Color List Item
  document.querySelectorAll(".colors-list li").forEach(element => {

    element.classList.remove("active");

    // Add "active" Class On Element with Data-Colors === Local Storage Item
    if (element.dataset.color === mainColors) {

      element.classList.add("active");

    }

  });

}

//----------------------------------------------------------------------------------------------------

// Random Background Option
let backgroundOption = true;

// Variable To Control The Background Interval
let backgroundInterval;

// Check If There's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

// Check If Random Background Local Storage Is Not Empty
if (backgroundLocalItem !== null) {
  // Note: backgroundLocalItem is String not Bloolen

  backgroundLocalItem === 'true'? 
    (backgroundOption = true,
     document.querySelector(".random-backgrounds .yes").classList.add("active")) : 
    (backgroundOption = false,
     document.querySelector(".random-backgrounds .no").classList.add("active"));

  // Remove Active Class From All spans
  document.querySelectorAll(".random-backgrounds span").forEach(element => {

    element.classList.remove("active");

  });

}

//----------------------------------------------------------------------------------------------------
// Toggle Spin Class On Icon
document.querySelector(".gear").onclick = function () {

  // Toggle class "fa-spin" for rotation on self
  this.classList.toggle("fa-spin");

  // Toggle class "open" on main settings box
  document.querySelector(".settings-box").classList.toggle("open");

};
//----------------------------------------------------------------------------------------------------
// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

// Loop On All List Items
colorsLi.forEach(li => {

  // Click On Every List Items
  li.addEventListener("click", (e) => {

    // Set Color On Root
    document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

    // Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);
    //******************************************************
    handelActive(e); // Remove Active Class From All Childrens & Add Active Class On the span we choice
    // show "Handle Active state" Down below
    //******************************************************

  });

});

//----------------------------------------------------------------------------------------------------
// Switch Random Background Options
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// Loop On All Spans
randomBackEl.forEach(span => {

  // Click On Every span
  span.addEventListener("click", (e) => {

    handelActive(e); // Remove Active Class From All Childrens & Add Active Class On the span we choice
    // show "Handle Active state" Down below

      if (e.target.dataset.background === 'yes') {

        backgroundOption = true;

        randomizeImgs();

        localStorage.setItem("background_option", true);

      } else {

        backgroundOption = false;

        clearInterval(backgroundInterval);

        localStorage.setItem("background_option", false);

      }

    });

  });


//----------------------------------------------------------------------------------------------------
// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array of Images
let imgsArray = ["b2.jpg", "b3.jpg", "b5.jpg", "b6.jpg", "b7.jpg", "b8.jpg", "b10.jpg", "b12.jpg"];

// function to Randomize Imgs
function randomizeImgs() {

  if (backgroundOption === true) {

    backgroundInterval = setInterval(() => {

      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
    
      // Change Background Image url 
      landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + '")';
    
    }, 10000);

  }

}

randomizeImgs();

//----------------------------------------------------------------------------------------------------
// Select Skills Selector

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Window Height
  let windowHeight = this.innerHeight;

  // window ScrollTop
  let windowScrollTop = this.pageYOffset;

  if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

    let allskills = document.querySelectorAll(".skill-box .skill-progress span");

    allskills.forEach(skill => {

      skill.style.width = skill.dataset.progress;

    });

  }

}

//----------------------------------------------------------------------------------------------------
// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

  img.addEventListener('click', (e) => {

    // Create Overlay Element
    let overlay = document.createElement("div");

    // Add Class To Overlay
    overlay.className = 'popup-overlay';

    // Append Overlay To The Body
    document.body.appendChild(overlay);

    // Create The Popup Box
    let popupbox = document.createElement("div");

    // Add Class To The Popup Box
    popupbox.className = 'popup-box';

    if (img.alt !== null) {

      // Create Heading 
      let imgHeading = document.createElement("h3");

      // Create text for Heading
      let imgText = document.createTextNode(img.alt);

      // Append The Text To The Heading
      imgHeading.appendChild(imgText);

      // Append The Heading To The Popup Box
      popupbox.appendChild(imgHeading);


    }

    // Create The Image
    let popupImage = document.createElement("img");

    // Set Image Source
    popupImage.src = img.src;

    // Add Image To Popup Box
    popupbox.appendChild(popupImage);

    // Append the Popup Box To Body
    document.body.appendChild(popupbox);

    // Create The Close Span
    let closeButton = document.createElement("span");

    // Create The Close Button Text
    let closeButtonText = document.createTextNode("X");

    // Append Text To Close Button
    closeButton.appendChild(closeButtonText);

    // Add Class To Close Button
    closeButton.className = 'close-button';

    // Add Close Button To The Popup Box
    popupbox.appendChild(closeButton);


  });

});

// Close Popup
document.addEventListener("click", function (e) {

  if (e.target.className == 'close-button') {

    // Remove The Current Popup
    e.target.parentNode.remove();

    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});


//----------------------------------------------------------------------------------------------------
// Select All Bullets & Select All Links
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
 
const allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements) {
  elements.forEach(ele => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth", // not work smoothly in Google
      });
    });
  });
}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

//----------------------------------------------------------------------------------------------------
// Handle Active state
function handelActive(ev) {
   // Remove Active Class From All Childrens
  ev.target.parentElement.querySelectorAll(".active").forEach(element => {

    element.classList.remove("active");
  });
  // Add Active Class On self
  ev.target.classList.add("active");

}


//----------------------------------------------------------------------------------------------------
// show Bullets local storage
let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {

  bulletsSpan.forEach(span => {

    span.classList.remove("active");

  });

  if (bulletLocalItem === 'block') {

    bulletsContainer.style.display = 'block';

    document.querySelector(".bullets-option .yes").classList.add("active");

  } else {

    bulletsContainer.style.display = 'none';

    document.querySelector(".bullets-option .no").classList.add("active");

  }

}

bulletsSpan.forEach(span => {

  span.addEventListener("click", (e) => {

    if (span.dataset.display === 'show') {

      bulletsContainer.style.display = 'block';

      localStorage.setItem("bullets_option", 'block');

    } else {

      bulletsContainer.style.display = 'none';

      localStorage.setItem("bullets_option", 'none');

    }

    handelActive(e);

  });

});

//----------------------------------------------------------------------------------------------------
// Reset Button
document.querySelector(".reset-options").onclick = function () {

  // localStorage.clear(); will remove all localStorage in all site
  // we use removeItem to specify what we need to remove
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");

  // Reload window
  window.location.reload();
  
};
//----------------------------------------------------------------------------------------------------









 