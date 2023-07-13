//Building together the levels ==> init() function onload by moving further levels
const timeLeft = document.querySelector('#time-left');
let countDownTimerId = null;
let currentTime = null;
let timerId = null;
let Mlevel = 1;
let numBalls = null;
let MnumBalls = [18, 28, 40, 56, 74, 80];
let McurrentTime = [30, 60, 120, 180, 220, 250];
let Mcolors = [ "#2AA7FF", "#ff5050", "#ff9900", "#7a00cc", "#ffa31a", "#00e6b8"];
function GenerateLevel (level) {
    return {
        pLevel : level,
        pNumBalls : MnumBalls[level-1],
        pPushColor: Mcolors.slice(0, level),
        pCurrentTime : McurrentTime[level-1],
    };
}

// Interaction logic ==> MatchColours
function matchColor(ball1, ball2) {
    if (ball1.style.background === ball2.style.background && ball1.id !== ball2.id) {
        ball1.remove();
        ball2.remove();
        numBalls = numBalls-2;
        console.log(`BallsLenght: ${numBalls}`);
    } else if (ball1.style.borderRadius === ball2.style.borderRadius &&
          ball1.style.background === ball2.style.background && 
          ball1.id !== ball2.id) {
          // Remove four balls
          ball1.remove();
          ball2.remove();
          removeRandomBall();
          removeRandomBall();
          numBalls -= 4;
              console.log(`ball.borderRadius: ${ball1.style.borderRadius}`);
              console.log(`ball.color: ${ball1.style.background}`);
              console.log(`ball.borderRadius: ${ball2.style.borderRadius}`);
              console.log(`ball.color: ${ball2.style.background}`);
              console.log(`BallsLength: ${numBalls}`);
    } else if (ball1.classList.contains('fish') &&  ///// hogyan mondomm neki hogyha a halra kattint
              (fish.style.background === "#2AA7FF")) {
        const targetColor = colors[Math.floor(Math.random() * colors.length)];
        const matchingBalls = balls.filter(ball => ball.style.background === targetColor);
        matchingBalls.forEach(ball => {
            ball.remove();
            numBalls--;
        });
        console.log(`Fish clicked. Color: ${targetColor}`);
        console.log(`Removed ${matchingBalls.length} balls. BallsLength: ${numBalls}`);
    }
    if (numBalls <= 0) {
        clearInterval(countDown);
        if (Mlevel === 6) {
          alert('You won!!! You are the best!');
          return; // Stop the game progression
        }
        alert('Congratulations! You can move to level ' + (Mlevel + 1) + '!');
        Mlevel = Mlevel + 1;
        let levelObject = GenerateLevel(Mlevel);
        init(levelObject.pNumBalls, levelObject.pPushColor, levelObject.pCurrentTime, levelObject.pLevel);
      }    
}

// Function to display the modal popup
function displayModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "block"; // diplay modal
    // Add an event listener to the modal button
    const startButton = document.getElementById("start-button");
    startButton.addEventListener("click", () => {
        // Hide the modal and start the game
        modal.style.display = "none";
        countDown();
        const levelObject = GenerateLevel(Mlevel);
        init(
            levelObject.pNumBalls,
            levelObject.pPushColor,
            levelObject.pCurrentTime,
            levelObject.pLevel
        ); // ==> onload init
    });
} 

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;
    
    if (currentTime == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        alert('Game over');
        window.location.reload(); // reload page
    }
}  

function init(pNumBalls, pPushColor, pCurrentTime, pLevel){
    numBalls = pNumBalls;
    currentTime = pCurrentTime;
    level = pLevel;
    let colors = ["#3CC157", "#2AA7FF"];
    console.log(`pPushColor: ${pPushColor}`);
    if (pPushColor !== undefined && pPushColor !== null) {
        // Add this line to create the pPushColor array with one color
        colors.push(...pPushColor);
    }
    
    let clickCount = 0;
    let ballPrevious = null;
    const balls = [];
    
    //create my balls
    for (let i = 0; i < numBalls; i++) {
        //Create x amount of elements from which even amount of element get the same background color
        const colorIndex = Math.floor(i / 2) % colors.length;
        const color = colors[colorIndex];
        let ball = document.createElement("div");
        ball.classList.add("ball");
        // Add individual ID to each ball, so it will be identificable at clicking
        ball.id =`ball-${i + 1}`;
        ball.style.background = color;
        // vw = viewer point witdh & vh = viewer point height 
        ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
        ball.style.bottom = `${Math.floor(Math.random() * 100)}vh`;
        ball.style.transform = `scale(${Math.random()})`;
        //To manipulate the size of the balls, Random number between max=10 and min=3 --> Math.random() * (max - min + 1) + min
        ball.style.width = `${Math.random()*(10-3+1)+3}em`;
        ball.style.height = ball.style.width;
        ball.style.borderRadius = "100%";      // remove css border radious
        if (pLevel > 4) {
            ball.style.opacity = Math.random() < 0.2 ? "0.2" : "0.99";  //aproximetly 1/3 of balls get more opacity
        } else {
            ball.style.opacity = "0.95";
        }
        
        balls.push(ball);
        document.body.append(ball);
    }

    if ( pLevel<3 ) {
        // Keyframes
        balls.forEach((elem, i, ra) => {
            elem.id = `ball-${i + 1}`;
        
            let to = {
                x: Math.random() * (i % 2 === 0 ? -12 : 12),
                y: Math.random() * 10
            };
        
            let anim = elem.animate(
                [
                { transform: "translate(0, 0)" },
                { transform: `translate(${to.x}rem, ${to.y}rem)` }
                ],
                {
                duration: (Math.random() + 1) * 2000, // random duration
                direction: "alternate",
                fill: "both",
                iterations: Infinity,
                easing: "ease-in-out"
                }
            );
        
            let katt = elem.addEventListener("click", () => {
            clickCount++;
            console.log(`Click count: ${clickCount}`);
            
            if (clickCount%2 === 0){
                console.log('EvenClick');
                matchColor(ballPrevious,elem);
            }
            ballPrevious = elem;
            console.log(`Clicked ball ID: ${elem.id}`);
            });
            });
    } else {
    // Keyframes
        balls.forEach((elem, i, ra) => {
        elem.id = `ball-${i + 1}`;

        let to = {
            x: Math.random() * (i % 2 === 0 ? -12 : 12),
            y: Math.random() * 10
        };

        //Add disappear effect ==> Start to play with Opacity
        const originalOpacity = 0.95;
        const alternateOpacity = 0.08;
        let isAlternateOpacity = false;

        function toggleOpacity() {
        balls.forEach((ball) => {
            ball.style.opacity = isAlternateOpacity ? alternateOpacity : originalOpacity;
            });
        isAlternateOpacity = !isAlternateOpacity;
        }
        function animateOpacityChange(duration, alternateDuration) {
            toggleOpacity();
            setInterval(toggleOpacity, duration + alternateDuration);
        } // ------ End of Opacity ------------
    
        // Function to generate a random color
        const getRandomColor = (ball) => {
            return colors[Math.floor(Math.random() * colors.length)];
        };

        // Random borderRadius from LEVEL 3 //
        if ( pLevel > 2 ){
            function changeBorderRadius(ball) {
                const borderRadius = Math.random() < 0.5 ? "100%" : "0";
                 ball.style.borderRadius = borderRadius;
            } 
            setInterval(() => changeBorderRadius(elem), Math.random() * 3000 + 1000);
        }
        // ---- Random Opacity from LEVEL 4 -------//
        if ( pLevel > 3 ){animateOpacityChange(10000, 40);}
        // Fish.js from level 5 ------------//
        if ( pLevel > 4) {
            // Create a <script> element for adding fish.js
            var script = document.createElement('script');
            script.src = 'JS/fish.js';
            document.body.appendChild(script);
        }
        // ---- Random Colour changes from LEVEL 6 -------//
        if ( pLevel > 5 ){
            setInterval(() => {
                balls.forEach((ball) => {
                    ball.style.background = getRandomColor();
                });
            }, 3000); // Change colors every 3 second 
        }
       
        // colors[x] chosen color for faster movement ===> From level 2
        const fasterColor = elem.style.background === colors[2];

        let anim = elem.animate(
            [
            { transform: "translate( 0, 5)" },
            { transform: `translate(${to.x}rem, ${to.y}rem)` }
            ],
            {
            duration: fasterColor ? (Math.random() + 1) * 5000 : (Math.random() + 1) * 2000, // random duration for fast or regular movement
            direction: "alternate",
            fill: "both",
            iterations: Infinity,
            easing: "ease-in-out"
            }
        );

        let katt = elem.addEventListener("click", () => {
        clickCount++;
        console.log(`Click count: ${clickCount}`);
        
        if (clickCount%2 === 0){
            console.log('EvenClick');
            matchColor(ballPrevious,elem);
        }
        ballPrevious = elem;
        console.log(`Clicked ball ID: ${elem.id}`);
        });
        });
    }

    countDownTimerId = setInterval(countDown, 1000);
}


document.addEventListener("DOMContentLoaded", () => {
    displayModal();  // Display the modal when the page is loaded
});