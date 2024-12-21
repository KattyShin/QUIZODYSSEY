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
  transform: translate(-60%, -100%);
  animation: float 1s infinite ease-in-out;
  z-index: 1000;
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

    // Handle 'T' key press for NPC dialog
    if (e.key === "t" || e.key === "T") {
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
        
        updateCollisionIndicator(true, player.position, id, "T");
      }
    }

    // Handle 'E' key press for chests
    if (e.key === "e" || e.key === "E") {
      console.log(`E key pressed to toggle ${divId}`);
      
      // Handle all chests
      const chestIds = ["chest1Div", "chest2Div", "chest3Div"];
      let isAnyChestOpen = false;

      chestIds.forEach(chestId => {
        const chestDiv = document.getElementById(chestId);
        if (chestDiv && chestId === divId) {
          const newDisplayState = chestDiv.style.display === "none" ? "block" : "none";
          chestDiv.style.display = newDisplayState;
          isAnyChestOpen = isAnyChestOpen || newDisplayState === "block";
          
          // Update collision indicator for specific chest
          updateCollisionIndicator(true, player.position, id, chestId.replace("Div", ""));
        }
      });

      // Reset movement keys if any chest is open
      if (isAnyChestOpen) {
        resetMovementKeys();
      }
    }
  };

  // Helper function to reset movement keys
  function resetMovementKeys() {
    keys.w.pressed = false;
    keys.a.pressed = false;
    keys.s.pressed = false;
    keys.d.pressed = false;
  }

  // Add the event listener and store it
  document.addEventListener("keydown", listener);
  activeListeners[id] = listener;
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

      addKeyPressListenerForNpC("chest1", "chest1Div");
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

      addKeyPressListenerForNpC("chest2", "chest2Div");
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
      addKeyPressListenerForNpC("chest3", "chest3Div");
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

  // Only process movement keys if dialog is not open
  if (!isDialogOpen) {
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

// let clicked = false;
// addKeyPressListener("click", () => {
//   if (!clicked) {
//     audio.Map.play();
//     clicked = true;
//   }
// });

//------------------------------------------------------------------------------------------

class Chatbot {
  constructor() {
    this.dialogOverlay = document.getElementById("npcHome1Bot");
    this.messagesContainer = document.getElementById("messagesContainer");
    this.chatInput = this.dialogOverlay.querySelector(".chat-input");
    this.sendButton = this.dialogOverlay.querySelector(".send-button");

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.sendButton.addEventListener("click", () => this.sendMessage());
    this.chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.sendMessage();
      }
    });
  }

  async sendMessage() {
    const message = this.chatInput.value.trim();
    if (!message) return;

    // Add user message
    this.appendMessage(message, "user");
    this.chatInput.value = "";

    try {
      // Make API call to Flask backend
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Display bot response
      this.appendMessage(data.response, "bot");
    } catch (error) {
      console.error("Error:", error);
      this.appendMessage(
        "Sorry, I encountered an error. Please try again.",
        "bot"
      );
    }
  }

  appendMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.classList.add(
      sender === "user" ? "user-message" : "bot-message"
    );
    messageDiv.textContent = text;

    this.messagesContainer.appendChild(messageDiv);
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }
}

// Initialize the chatbot when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const chatbot = new Chatbot();
});

// ------------------------------------------------------------------------------------------
// INDEX HTML EXIT GAME BUTTON
const exitGameBtn = document.querySelector(".exit-btn");
exitGameBtn.addEventListener("click", () => {
  window.location = "home.html";
});
function handleClaim() {
  const successMessage = document.querySelector(".success-message");
  const chestOverlay = document.getElementById("chest1Div");
  const chest2Overlay = document.getElementById("chest2Div");
  const chest3Overlay = document.getElementById("chest3Div");

  const claimButton = document.querySelector(".claim-pass1");

  chestOverlay.style.display = "none";
  chest2Overlay.style.display = "none";
  chest3Overlay.style.display = "none";

  // Disable the claim button
  claimButton.disabled = true;
  claimButton.style.backgroundColor = "#5D655E"; // Visual feedback for disabled state

  // Show success message
  successMessage.style.display = "block";

  // Add small delay before showing the success message animation
  setTimeout(() => {
    successMessage.classList.add("show");
  }, 50);

  // After 3 seconds, hide everything
  setTimeout(() => {
    // Hide success message
    successMessage.classList.remove("show");

    // Hide chest overlay
    chestOverlay.style.display = "none";
    chest2Overlay.style.display = "none";
    chest3Overlay.style.display = "none";

    // After animations complete, reset everything
    setTimeout(() => {
      successMessage.style.display = "none";
      chestOverlay.style.display = "none";
      chest2Overlay.style.display = "none";
      chest3Overlay.style.display = "none";

      // Reset button state
      claimButton.disabled = false;
      claimButton.style.backgroundColor = "#26C236";
    }, 300);
  }, 3000);
}




function handleClaim2() {
  const successMessage = document.querySelector(".success-message");
  const chest2Overlay = document.getElementById("chest2Div");
  const claimButton = document.querySelector(".claim-pass1");

  chest2Overlay.style.display = "none";

  // Disable the claim button
  claimButton.disabled = true;
  claimButton.style.backgroundColor = "#5D655E"; // Visual feedback for disabled state

  // Show success message
  successMessage.style.display = "block";

  // Add small delay before showing the success message animation
  setTimeout(() => {
    successMessage.classList.add("show");
  }, 50);

  // After 3 seconds, hide everything
  setTimeout(() => {
    // Hide success message
    successMessage.classList.remove("show");

    // Hide chest overlay
    chest2Overlay.style.display = "none";

    // After animations complete, reset everything
    setTimeout(() => {
      successMessage.style.display = "none";
      chest2Overlay.style.display = "none";

      // Reset button state
      claimButton.disabled = false;
      claimButton.style.backgroundColor = "#26C236";
    }, 300);
  }, 3000);
}


function handleClaim3() {
  const successMessage = document.querySelector(".success-message");
  const chest3Overlay = document.getElementById("chest3Div");

  const claimButton = document.querySelector(".claim-pass1");

  chest3Overlay.style.display = "none";

  // Disable the claim button
  claimButton.disabled = true;
  claimButton.style.backgroundColor = "#5D655E"; // Visual feedback for disabled state

  // Show success message
  successMessage.style.display = "block";

  // Add small delay before showing the success message animation
  setTimeout(() => {
    successMessage.classList.add("show");
  }, 50);

  // After 3 seconds, hide everything
  setTimeout(() => {
    // Hide success message
    successMessage.classList.remove("show");

    
    chest3Overlay.style.display = "none";

    // After animations complete, reset everything
    setTimeout(() => {
      successMessage.style.display = "none";

      chest3Overlay.style.display = "none";
      // Reset button state
      claimButton.disabled = false;
      claimButton.style.backgroundColor = "#26C236";
    }, 300);
  }, 3000);
}


