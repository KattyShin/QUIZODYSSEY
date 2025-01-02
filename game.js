const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c.fillRect(0, 0, canvas.width, canvas.height);
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  c.fillRect(0, 0, canvas.width, canvas.height);
}
window.addEventListener("resize", resizeCanvas);

const collisionsMap = [];

//-------GET COLLISION PART------------
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

const npcHome1Map = [];
for (let i = 0; i < npcHome1Data.length; i += 70) {
  npcHome1Map.push(npcHome1Data.slice(i, 70 + i));
}

const oceanSceneryMap = [];
for (let i = 0; i < oceanSceneryData.length; i += 70) {
  oceanSceneryMap.push(oceanSceneryData.slice(i, 70 + i));
}

const home3NearbyMap = [];
for (let i = 0; i < home3NearbyData.length; i += 70) {
  home3NearbyMap.push(home3NearbyData.slice(i, 70 + i));
}

const chestNearbyMap = [];
for (let i = 0; i < chestNearbyData.length; i += 70) {
  chestNearbyMap.push(chestNearbyData.slice(i, 70 + i));
}

const chest1Map = [];
for (let i = 0; i < chest1Data.length; i += 70) {
  chest1Map.push(chest1Data.slice(i, 70 + i));
}

const chest2Map = [];
for (let i = 0; i < chest2Data.length; i += 70) {
  chest2Map.push(chest2Data.slice(i, 70 + i));
}

const chest3Map = [];
for (let i = 0; i < chest3Data.length; i += 70) {
  chest3Map.push(chest3Data.slice(i, 70 + i));
}

// CHECK CLASSES.JS FOR CLASS CREATION
//--STOP THE PLAYUER IN COLLISON AREA----------------------------------------------------------------------------------------

const boundaries = [];
const offset = {
  x: 0,
  y: -595,
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

const npcHome1 = [];
npcHome1Map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      npcHome1.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const oceanScenery = [];
oceanSceneryMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      oceanScenery.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const home3Nearby = [];
home3NearbyMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      home3Nearby.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const chestNearby = [];
chestNearbyMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      chestNearby.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const chest1 = [];
chest1Map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      chest1.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});
const chest2 = [];
chest2Map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      chest2.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const chest3 = [];
chest3Map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      chest3.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

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

//------------------------------------------------------------------------------------------

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

// INDICATOR MODAL
const style = document.createElement("style");
style.textContent = `
.collision-indicator {
position: absolute;
background-color: rgba(0, 0, 0, 0.6);
color: white;
padding: 10px 10px;
border-radius: 5px;
font-size: 11px;
pointer-events: none;
animation: float 1s infinite ease-in-out;
z-index: 900;
}

@keyframes float {
0%, 100% { transform: translate(-50%, -100%); }
50% { transform: translate(-50%, -110%); }
}
`;
document.head.appendChild(style);

const collisionIndicators = {
  F: {},
  T: {},
  oceanScene: {},
  home3Nearby: {},
  chestNearby: {},
  chest1: {},
  chest2: {},
  chest3: {},
};

//----IF COLIDE SHOW INDICATOR--------------------------------------------------------------------------------------
function updateCollisionIndicator(show, playerPosition, id, type) {
  if (show) {
    if (!collisionIndicators[type][id] && type == "F") {
      const indicator = document.createElement("div");
      indicator.className = "collision-indicator";
      indicator.textContent = ` Press  "${type}" to Enter`;
      indicator.id = `collision-indicator-${id}-${type}`;
      document.body.appendChild(indicator);
      collisionIndicators[type][id] = indicator;
    }

    if (!collisionIndicators[type][id] && type == "T") {
      const indicator = document.createElement("div");
      indicator.className = "collision-indicator";
      indicator.textContent = ` Press "${type}" to talk`;
      indicator.id = `collision-indicator-${id}-${type}`;
      document.body.appendChild(indicator);
      collisionIndicators[type][id] = indicator;
    }

    if (!collisionIndicators[type][id] && type == "oceanScene") {
      const indicator = document.createElement("div");
      indicator.className = "collision-indicator";
      indicator.textContent = `Wow, the ocean's beauty is absolutely breathtaking`;
      indicator.id = `collision-indicator-${id}-${type}`;
      document.body.appendChild(indicator);
      collisionIndicators[type][id] = indicator;
    }

    if (!collisionIndicators[type][id] && type == "home3Nearby") {
      const indicator = document.createElement("div");
      indicator.className = "collision-indicator";
      indicator.textContent = `On, Look....There's a House Nearby`;
      indicator.id = `collision-indicator-${id}-${type}`;
      document.body.appendChild(indicator);
      collisionIndicators[type][id] = indicator;
    }

    if (!collisionIndicators[type][id] && type == "chestNearby") {
      const indicator = document.createElement("div");
      indicator.className = "collision-indicator";
      indicator.textContent = `halah naay chest`;
      indicator.id = `collision-indicator-${id}-${type}`;
      document.body.appendChild(indicator);
      collisionIndicators[type][id] = indicator;
    }

    if (!collisionIndicators[type][id] && type == "chest1") {
      const indicator = document.createElement("div");
      indicator.className = "collision-indicator";
      indicator.textContent = `Press E`;
      indicator.id = `collision-indicator-${id}-${type}`;
      document.body.appendChild(indicator);
      collisionIndicators[type][id] = indicator;
    }
    if (!collisionIndicators[type][id] && type == "chest2") {
      const indicator = document.createElement("div");
      indicator.className = "collision-indicator";
      indicator.textContent = `Press E`;
      indicator.id = `collision-indicator-${id}-${type}`;
      document.body.appendChild(indicator);
      collisionIndicators[type][id] = indicator;
    }

    if (!collisionIndicators[type][id] && type == "chest3") {
      const indicator = document.createElement("div");
      indicator.className = "collision-indicator";
      indicator.textContent = `Press E`;
      indicator.id = `collision-indicator-${id}-${type}`;
      document.body.appendChild(indicator);
      collisionIndicators[type][id] = indicator;
    }

    if (collisionIndicators[type][id]) {
      const canvasRect = canvas.getBoundingClientRect();
      const indicator = collisionIndicators[type][id];
      indicator.style.left = `${
        canvasRect.left + playerPosition.x + player.width / 2
      }px`;
      indicator.style.top = `${canvasRect.top + playerPosition.y - 20}px`;
      indicator.style.display = "block";
    }
  } else {
    if (collisionIndicators[type][id]) {
      collisionIndicators[type][id].remove();
      delete collisionIndicators[type][id];
    }
  }
}

let playerLastPosition = {
  x: offset.x,
  y: offset.y,
};
let freePassCount = 0; // Global variable to store the number of Free Passes the player has

const activeListeners = {
  quiz1: null,
  quiz2: null,
  quiz3: null,
  npcHome1: null,
  oceanScenery: null,
  home3Nearby: null,
  chestNearby: null,
  chest1: null,
  chest2: null,
  chest3: null,
};

// ----KEY PRESS F
function addKeyPressListener(id, url) {
  if (activeListeners[id]) {
    document.removeEventListener("keydown", activeListeners[id]);
    activeListeners[id] = null;
  }
  const listener = (e) => {
    // Prevent redirection if the user is typing in an input or textarea
    const activeElement = document.activeElement;
    if (
      activeElement.tagName === "INPUT" ||
      activeElement.tagName === "TEXTAREA"
    ) {
      return;
    }

    if (e.key === "f" || e.key === "F") {
      console.log(`Start Quiz ${id} triggered by F`);
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
  activeListeners[id] = listener;
  document.addEventListener("keydown", listener);
}
let isDialogOpen = false;
const chestOpened = {
  chest1Div: false,
  chest2Div: false,
  chest3Div: false,
};
const chestClaimed = {};
function addKeyPressListenerForNpC(id, divId) {
  if (activeListeners[id]) {
    document.removeEventListener("keydown", activeListeners[id]);
    activeListeners[id] = null;
  }

  const listener = (e) => {
    const activeElement = document.activeElement;
    if (
      activeElement.tagName === "INPUT" ||
      activeElement.tagName === "TEXTAREA"
    ) {
      return;
    }

    if (e.key === "t" || e.key === "T") {
      handleNPCDialog(id, divId);
      
      return;
    }
  };

  document.addEventListener("keydown", listener);
  activeListeners[id] = listener;
}

function addKeyPressListenerChest(id, divId) {
  if (activeListeners[id]) {
    document.removeEventListener("keydown", activeListeners[id]);
    activeListeners[id] = null;
  }
  const listener = (e) => {
    if ((e.key === "e" || e.key === "E") && divId.startsWith("chest")) {
      e.preventDefault();
      handleChestInteraction(id, divId);
      resetMovementKeys();
      return;
    }
  };

  document.addEventListener("keydown", listener);
  activeListeners[id] = listener;
}

function isAnyChestOpen() {
  return Object.keys(chestOpened).some((chestId) => {
    const chest = document.getElementById(chestId);
    return chest && chest.style.display === "block";
  });
}

function handleChestInteraction(id, divId) {
  const chestDiv = document.getElementById(divId);
  if (!chestDiv) return;

  const isChestCurrentlyOpen = chestDiv.style.display === "block";

  if (!chestOpened[divId]) {
    const chestContent = getRandomChestContent(divId);
    chestDiv.querySelector(".chest-content").innerHTML = chestContent;
    chestOpened[divId] = true;
    chestDiv.style.display = "block";
    resetMovementKeys();
  } else if (isChestCurrentlyOpen) {
    chestDiv.style.display = "none";
  } else {
    chestDiv.style.display = "block";
    resetMovementKeys();
  }
}

function handleNPCDialog(id, divId) {
  const npcDialog = document.getElementById(divId);
  console.log(`T key pressed to toggle ${divId}`);
  const npcHome1Bot = document.getElementById(divId);
  if (npcHome1Bot) {
    const newDisplayState =
      npcHome1Bot.style.display === "none" ? "block" : "none";
    npcHome1Bot.style.display = newDisplayState;
    isDialogOpen = newDisplayState === "block";

    if (isDialogOpen) {
      resetMovementKeys();
    }

    // Clear input fields when dialog closes
    const inputElements = npcHome1Bot.querySelectorAll("input");
    inputElements.forEach((input) => {
      input.value = "";
    });
  }
}

function getRandomChestContent(chestId) {
  const contentOptions = [
    "You got a two Free Pass! Use it to skip a question.",
    "Owh, My bad it's a Bokya..Better Luck next time.",
    "I know you are looking for something ..you may look it to another chest"
  ];

  const randomContent =
    contentOptions[Math.floor(Math.random() * contentOptions.length)];

    if (randomContent.includes("Free Pass")) {
      if (chestClaimed[chestId]) {
        return `
          <h5>You have successfuly redeemed the Free Pass!</h5>
          <p>You can't claim it again.</p>
        `;
      } else {
        return `
          <div class="reward-container">
              <h5>Congratulations! You have earned 1 Free Pass!</h5>
              <p style="font-size: 10px;">Use this pass to skip a question and move to the next one.</p>
              <div class="claim-pass-con" style="display: flex; flex-direction: column; align-items: center; gap: 15px;">
                  <img class="chest-claim-img" src="img/chest.png" alt="" style="width: 150px; height: auto;">
                  <button class="claim-pass" 
                          onclick="handleClaim('${chestId}')"
                          style="padding: 10px 30px; 
                                 background-color: #4CAF50; 
                                 color: white; 
                                 border: none; 
                                 border-radius: 5px; 
                                 cursor: pointer;">
                      Claim
                  </button>
              </div>
          </div>
        `;
      }
    
  } else {
    return `
      <h5>${randomContent}</h5>
    `;
  }
}



function handleClaim(chestId) {
  console.log("Claiming chest:", chestId);
  const chestDiv = document.getElementById(chestId);
  if (!chestDiv) {
    console.error("Chest div not found for id:", chestId);
    return;
  }

  if (chestClaimed[chestId]) {
    alert("You've already claimed this Free Pass!");
    return;
  }

  chestClaimed[chestId] = true;
  chestDiv.querySelector(".chest-content").innerHTML = `
        <h5>You have already redeemed the Free Pass!</h5>
        <p>You can't claim it again.</p>
    `;

  // Increment the Free Pass count
  freePassCount++;

  // Store the Free Pass count in localStorage
  localStorage.setItem("freePassCount", freePassCount);

  updateFreePassDisplay()
  // Optionally, you can update the UI here if you want to show the current Free Pass count to the player
}


function updateFreePassDisplay() {
  const freePassDisplay = document.getElementById('freePassDisplay');
  if (freePassDisplay) {
      freePassDisplay.textContent = `Free Passes: ${freePassCount}`;
  }
}

// Call the function whenever the value of freePassCount changes
window.onload = function() {
  // Retrieve the stored Free Pass count from localStorage if available
  const storedFreePassCount = localStorage.getItem("freePassCount");
  if (storedFreePassCount) {
      freePassCount = parseInt(storedFreePassCount, 10);
  }
  updateFreePassDisplay(); // Update the display on page load
};

// Example: Increment freePassCount and update the display
function incrementFreePass() {
  freePassCount++;
  localStorage.setItem("freePassCount", freePassCount); // Save to localStorage
  updateFreePassDisplay(); // Update the display
}


function resetMovementKeys() {
  keys.w.pressed = false;
  keys.a.pressed = false;
  keys.s.pressed = false;
  keys.d.pressed = false;
}

//------STORE LAST POSITION OF THE PLAYER---------------------------------------
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


let collisionDetected = {
  quiz1: false,
  quiz2: false,
  quiz3: false,
  npcHome1: false,
  oceanScenery: false,
  home3Nearby: false,
  chestNearby: false,
  chest1: false,
  chest2: false,
  chest3: false,
};

const movables = [
  background,
  ...boundaries,
  foreground,
  ...quiz1,
  ...quiz2,
  ...quiz3,
  ...npcHome1,
  ...oceanScenery,
  ...home3Nearby,
  ...chestNearby,
  ...chest1,
  ...chest2,
  ...chest3,
];

// GET POSITION SA TILE------------------------------------------
function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width > rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}

// -------------------no-collision handlers----------------------------------
function updateNoCollisionHandlers() {
  if (!collisionDetected.quiz1) {
    updateCollisionIndicator(false, null, "quiz1", "F");
    if (activeListeners.quiz1) {
      document.removeEventListener("keydown", activeListeners.quiz1);
      activeListeners.quiz1 = null;
    }
  }

  if (!collisionDetected.quiz2) {
    updateCollisionIndicator(false, null, "quiz2", "F");
    if (activeListeners.quiz2) {
      document.removeEventListener("keydown", activeListeners.quiz2);
      activeListeners.quiz2 = null;
    }
  }

  if (!collisionDetected.quiz3) {
    updateCollisionIndicator(false, null, "quiz3", "F");
    if (activeListeners.quiz3) {
      document.removeEventListener("keydown", activeListeners.quiz3);
      activeListeners.quiz3 = null;
    }
  }

  if (!collisionDetected.npcHome1) {
    updateCollisionIndicator(false, null, "npcHome1", "T");
    if (activeListeners.npcHome1) {
      document.removeEventListener("keydown", activeListeners.npcHome1);
      activeListeners.npcHome1 = null;
    }
  }

  if (!collisionDetected.oceanScenery) {
    updateCollisionIndicator(false, null, "oceanScenery", "oceanScene");
    if (activeListeners.oceanScenery) {
      document.removeEventListener("keydown", activeListeners.oceanScenery);
      activeListeners.oceanScenery = null;
    }
  }
  if (!collisionDetected.home3Nearby) {
    updateCollisionIndicator(false, null, "home3Nearby", "home3Nearby");
    if (activeListeners.home3Nearby) {
      document.removeEventListener("keydown", activeListeners.home3Nearby);
      activeListeners.home3Nearby = null;
    }
  }
  if (!collisionDetected.chestNearby) {
    updateCollisionIndicator(false, null, "chestNearby", "chestNearby");
    if (activeListeners.chestNearby) {
      document.removeEventListener("keydown", activeListeners.chestNearby);
      activeListeners.chestNearby = null;
    }
  }
  if (!collisionDetected.chest1) {
    updateCollisionIndicator(false, null, "chest1", "chest1");
    if (activeListeners.chest1) {
      document.removeEventListener("keydown", activeListeners.chest1);
      activeListeners.chest1 = null;
    }
  }
  if (!collisionDetected.chest2) {
    updateCollisionIndicator(false, null, "chest2", "chest2");
    if (activeListeners.chest2) {
      document.removeEventListener("keydown", activeListeners.chest2);
      activeListeners.chest2 = null;
    }
  }
  if (!collisionDetected.chest3) {
    updateCollisionIndicator(false, null, "chest3", "chest3");
    if (activeListeners.chest3) {
      document.removeEventListener("keydown", activeListeners.chest3);
      activeListeners.chest3 = null;
    }
  }
}

//-----ANIMATE-------------------------------------------------------------------------------------

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
  npcHome1.forEach((npc1) => {
    npc1.draw();
  });
  oceanScenery.forEach((oceanScene) => {
    oceanScene.draw();
  });
  home3Nearby.forEach((home3Near) => {
    home3Near.draw();
  });
  chestNearby.forEach((chestNear) => {
    chestNear.draw();
  });
  chest1.forEach((chest) => {
    chest.draw();
  });
  chest2.forEach((chest) => {
    chest.draw();
  });

  chest3.forEach((chest) => {
    chest.draw();
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
        "quiz1",
        "F"
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
          y: canvas.height / 2 - 70 / 2,
        },
        "quiz2",
        "F"
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
        "quiz3",
        "F"
      );
      addKeyPressListener("quiz3", "quiz3.html");
    }
  });

  npcHome1.forEach((npc) => {
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...npc,
          position: {
            x: npc.position.x,
            y: npc.position.y + 3,
          },
        },
      })
    ) {
      collisionDetected.npcHome1 = true;
      updateCollisionIndicator(
        true,
        {
          x: canvas.width / 2 - 192 / 4 / 2,
          y: canvas.height / 2 - 68 / 2,
        },
        "npcHome1",
        "T" // Add this parameter to show "Press T"
      );

      addKeyPressListenerForNpC("npcHome1", "npcHome1Bot");
    }
  });

  oceanScenery.forEach((ocean) => {
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...ocean,
          position: {
            x: ocean.position.x,
            y: ocean.position.y + 3,
          },
        },
      })
    ) {
      collisionDetected.oceanScenery = true;
      updateCollisionIndicator(
        true,
        {
          x: canvas.width / 2 - 192 / 4 / 2,
          y: canvas.height / 2 - 68 / 2,
        },
        "oceanScenery",
        "oceanScene"
      );
    }
  });

  home3Nearby.forEach((home) => {
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...home,
          position: {
            x: home.position.x,
            y: home.position.y + 3,
          },
        },
      })
    ) {
      collisionDetected.home3Nearby = true;
      updateCollisionIndicator(
        true,
        {
          x: canvas.width / 2 - 192 / 4 / 2,
          y: canvas.height / 2 - 68 / 2,
        },
        "home3Nearby",
        "home3Nearby"
      );
    }
  });

  chestNearby.forEach((chestNear) => {
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...chestNear,
          position: {
            x: chestNear.position.x,
            y: chestNear.position.y + 3,
          },
        },
      })
    ) {
      collisionDetected.chestNearby = true;
      updateCollisionIndicator(
        true,
        {
          x: canvas.width / 2 - 192 / 4 / 2,
          y: canvas.height / 2 - 68 / 2,
        },
        "chestNearby",
        "chestNearby"
      );
    }
  });

  chest1.forEach((chest) => {
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...chest,
          position: {
            x: chest.position.x,
            y: chest.position.y + 3,
          },
        },
      })
    ) {
      collisionDetected.chest1 = true;
      updateCollisionIndicator(
        true,
        {
          x: canvas.width / 2 - 192 / 4 / 2,
          y: canvas.height / 2 - 68 / 2,
        },
        "chest1",
        "chest1" // Add this parameter to show "Press T"
      );

      addKeyPressListenerChest("chest1", "chest1Div");
    }
  });

  chest2.forEach((chest) => {
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...chest,
          position: {
            x: chest.position.x,
            y: chest.position.y + 3,
          },
        },
      })
    ) {
      collisionDetected.chest2 = true;
      updateCollisionIndicator(
        true,
        {
          x: canvas.width / 2 - 192 / 4 / 2,
          y: canvas.height / 2 - 68 / 2,
        },
        "chest2",
        "chest2" // Add this parameter to show "Press T"
      );

      addKeyPressListenerChest("chest2", "chest2Div");
    }
  });

  chest3.forEach((chest) => {
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...chest,
          position: {
            x: chest.position.x,
            y: chest.position.y + 3,
          },
        },
      })
    ) {
      collisionDetected.chest3 = true;
      updateCollisionIndicator(
        true,
        {
          x: canvas.width / 2 - 192 / 4 / 2,
          y: canvas.height / 2 - 68 / 2,
        },
        "chest3",
        "chest3" // Add this parameter to show "Press T"
      );
      // alert("Sdadds")
      addKeyPressListenerChest("chest3", "chest3Div");
    }
  });
  updateNoCollisionHandlers();

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

//-----MOVEMENTS-------------------------------------------------------------------------------------

let lastKey = "";
// Modify the window keydown event listener
window.addEventListener("keydown", (e) => {
  const activeElement = document.activeElement;
  if (
    activeElement.tagName === "TEXTAREA" ||
    activeElement.tagName === "INPUT"
  ) {
    return;
  }

  // Prevent movement if any chest is open or dialog is open
  if (!isDialogOpen && !isAnyChestOpen()) {
    switch (e.key) {
      case "w":
      case "W":
        keys.w.pressed = true;
        lastKey = "w";
        break;
      case "a":
      case "A":
        keys.a.pressed = true;
        lastKey = "a";
        break;
      case "s":
      case "S":
        keys.s.pressed = true;
        lastKey = "s";
        break;
      case "d":
      case "D":
        keys.d.pressed = true;
        lastKey = "d";
        break;
    }
  } else {
    // Prevent movement entirely if chest or dialog is open
    e.preventDefault();
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
    case "W":
      keys.w.pressed = false;
      break;
    case "a":
    case "A":
      keys.a.pressed = false;
      break;
    case "s":
    case "S":
      keys.s.pressed = false;
      break;
    case "d":
    case "D":
      keys.d.pressed = false;
      break;
  }
});

// Redirect to 'home.html' on browser refresh
window.onload = function () {
  // Check if the page is being refreshed
  if (performance.navigation.type === 1) {
      // Redirect to 'home.html'
      window.location.href = "home.html";
  }
};
