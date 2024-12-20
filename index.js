
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
// console.log(quiz1Data);




canvas.width = 1350;
canvas.height = 576;
// c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i));
}
console.log(collisionsMap);

const quiz1Map = [];
for (let i = 0; i < quiz1Data.length; i += 70) {
  quiz1Map.push(quiz1Data.slice(i, 70 + i));
}
console.log(quiz1Map);

const quiz2Map = [];
for (let i = 0; i < quiz2Data.length; i += 70) {
  quiz2Map.push(quiz2Data.slice(i, 70 + i));
}
console.log(quiz2Map);

const quiz3Map = [];
for (let i = 0; i < quiz3Data.length; i += 70) {
  quiz3Map.push(quiz3Data.slice(i, 70 + i));
}
console.log(quiz3Map);

const boundaries = [];
const offset = {
  x: 0,
  y: -650,
};

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const quiz1 = [];
quiz1Map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      quiz1.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});
console.log(quiz1);

const quiz2 = [];
quiz2Map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      quiz2.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});
console.log(quiz2);

const quiz3 = [];
quiz3Map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      quiz3.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});
console.log(quiz3);

const image = new Image();
image.src = "./img/Pellet Town.png";

const playerDownImage = new Image();
playerDownImage.src = "./img/playerDown.png";

const foregroundImage = new Image();
foregroundImage.src = "./img/foregroundObjects.png";

const playerUpImage = new Image();
playerUpImage.src = "./img/playerUp.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./img/playerLeft.png";

const playerRightImage = new Image();
playerRightImage.src = "./img/playerRight.png";

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2,
  },
  image: playerDownImage,
  frames: {
    max: 4,
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage,
  },
});

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImage,
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

// Add the style element for collision indicator
const style = document.createElement("style");
style.textContent = `
.collision-indicator {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  pointer-events: none;
  transform: translate(-50%, -100%);
  animation: float 1s infinite ease-in-out;
  z-index: 1000;
}

@keyframes float {
  0%, 100% { transform: translate(-50%, -100%); }
  50% { transform: translate(-50%, -110%); }
}
`;
document.head.appendChild(style);

// Add collision indicator variable
let collisionIndicators = {};

// Add the updatecollisionIndicators function
function updateCollisionIndicator(show, playerPosition, quizId) {
  if (show) {
    if (!collisionIndicators[quizId]) {
      collisionIndicators = document.createElement("div");
      collisionIndicators.className = "collision-indicator";
      collisionIndicators.textContent = "Press F";
      collisionIndicators.id = `collision-indicator-${quizId}`;
      document.body.appendChild(collisionIndicators);
      collisionIndicators[quizId] = collisionIndicators;
    }
    const canvasRect = canvas.getBoundingClientRect();
    collisionIndicators[quizId].style.left = `${
      canvasRect.left + playerPosition.x + player.width / 2
    }px`;
    collisionIndicators[quizId].style.top = `${
      canvasRect.top + playerPosition.y - 20
    }px`;
  } else if (collisionIndicators[quizId]) {
    collisionIndicators[quizId].remove();
    delete collisionIndicators[quizId];
  }
}
// In your main game file (index.js)
// Add this at the top with your other variables
let playerLastPosition = {
  x: offset.x,
  y: offset.y,
};


const activeListeners = {
  quiz1: null,
  quiz2: null,
  quiz3: null
};

// Modify the addKeyPressListener function
function addKeyPressListener(quizId, url) {
  if (activeListeners[quizId]) {
    document.removeEventListener("keydown", activeListeners[quizId]);
    activeListeners[quizId] = null;
  }
  const listener = (e) => {
    if (e.key === "f" || e.key === "F") {
      console.log(`Start Quiz ${quizId} triggered by F`);
      // Save the current position before navigating
      playerLastPosition = {
        x: background.position.x,
        y: background.position.y,
      };
      // Store position in localStorage
      localStorage.setItem(
        "playerLastPosition",
        JSON.stringify(playerLastPosition)
      );
      window.location.href = url;
      document.removeEventListener("keydown", listener);
    }
  };
  // Store the listener reference
  activeListeners[quizId] = listener;
  document.addEventListener("keydown", listener);
}

// Add this to your window.onload or at the start of your game code
window.onload = () => {
  const savedPosition = localStorage.getItem("playerLastPosition");
  if (savedPosition) {
    const position = JSON.parse(savedPosition);
    // Restore the position for all movable elements
    movables.forEach((movable) => {
      movable.position.x = movable.position.x + (position.x - offset.x);
      movable.position.y = movable.position.y + (position.y - offset.y);
    });
    // Clear the stored position
    localStorage.removeItem("playerLastPosition");
  }
};

let collisionDetected = { quiz1: false, quiz2: false, quiz3: false };

const movables = [
  background,
  ...boundaries,
  foreground,
  ...quiz1,
  ...quiz2,
  ...quiz3,
];

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width > rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}

// const dragleImage = new Image()
// dragleImage.src = "./img/draggleSprite.png"
// const dragle = new Sprite({
//   position: {
//     x: 850,
//     y: 120,
//   },
//   image: dragleImage,
//   frames: {
//     max: 1
//   }
// })

function animate() {
  window.requestAnimationFrame(animate);

  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  quiz1.forEach((quiz) => {
    quiz.draw();
  });
  quiz2.forEach((quiz) => {
    quiz.draw();
  });
  quiz3.forEach((quiz) => {
    quiz.draw();
  });
  
  // dragle.draw();
  
  player.draw();
  foreground.draw();

  Object.keys(collisionDetected).forEach(
    (key) => (collisionDetected[key] = false)
  );

  quiz1.forEach((quiz) => {
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...quiz,
          position: {
            x: quiz.position.x,
            y: quiz.position.y + 3,
          },
        },
      })
    ) {
      collisionDetected.quiz1 = true;
      updateCollisionIndicator(
        true,
        {
          x: canvas.width / 2 - 192 / 4 / 2,
          y: canvas.height / 2 - 68 / 2,
        },
        "quiz1"
      );
      addKeyPressListener("quiz1", "quiz1.html");
    }
  });

  quiz2.forEach((quiz) => {
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...quiz,
          position: {
            x: quiz.position.x,
            y: quiz.position.y + 3,
          },
        },
      })
    ) {
      collisionDetected.quiz2 = true;
      updateCollisionIndicator(
        true,
        {
          x: canvas.width / 2 - 192 / 4 / 2,
          y: canvas.height / 2 - 68 / 2,
        },
        "quiz2"
      );
      addKeyPressListener("quiz2", "quiz2.html");
    }
  });

  quiz3.forEach((quiz) => {
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...quiz,
          position: {
            x: quiz.position.x,
            y: quiz.position.y + 3,
          },
        },
      })
    ) {
      collisionDetected.quiz3 = true;
      updateCollisionIndicator(
        true,
        {
          x: canvas.width / 2 - 192 / 4 / 2,
          y: canvas.height / 2 - 68 / 2,
        },
        "quiz3"
      );
      addKeyPressListener("quiz3", "quiz3.html");
    }
  });

 // Update the no-collision handlers
if (!collisionDetected.quiz1) {
  updateCollisionIndicator(false, null, "quiz1");
  // Remove the listener when there's no collision
  if (activeListeners.quiz1) {
    document.removeEventListener("keydown", activeListeners.quiz1);
    activeListeners.quiz1 = null;
  }
}

  // Update the no-collision handlers
if (!collisionDetected.quiz2) {
  updateCollisionIndicator(false, null, "quiz2");
  // Remove the listener when there's no collision
  if (activeListeners.quiz2) {
    document.removeEventListener("keydown", activeListeners.quiz2);
    activeListeners.quiz2 = null;
  }
}

 // Update the no-collision handlers
if (!collisionDetected.quiz3) {
  updateCollisionIndicator(false, null, "quiz3");
  // Remove the listener when there's no collision
  if (activeListeners.quiz3) {
    document.removeEventListener("keydown", activeListeners.quiz3);
    activeListeners.quiz3 = null;
  }
}


  let moving = true;
  player.moving = false;
  // BOUNDARY
  if (keys.w.pressed && lastKey === "w") {
    player.moving = true;
    player.image = player.sprites.up;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 3;
      });
  } else if (keys.a.pressed && lastKey === "a") {
    player.moving = true;
    player.image = player.sprites.left;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3;
      });
  } else if (keys.s.pressed && lastKey === "s") {
    player.moving = true;
    player.image = player.sprites.down;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 3;
      });
  } else if (keys.d.pressed && lastKey === "d") {
    player.moving = true;
    player.image = player.sprites.right;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= 3;
      });
  }
}
animate();

let lastKey = "";
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});

let clicked = false
addKeyPressListener('click', ()=>{
  if(!clicked){
    audio.Map.play()
    clicked=true
  }
})