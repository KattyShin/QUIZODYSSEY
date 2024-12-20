
// START QUIZ
let bubbleActive = false;
function showBubbleMessage() {
  if (bubbleActive) return;

  bubbleActive = true;

  keys.w.pressed = false;
  keys.a.pressed = false;
  keys.s.pressed = false;
  keys.d.pressed = false;

  const bubble = document.createElement("div");
  bubble.id = "bubbleMessage";
  bubble.style.position = "absolute";
  bubble.style.top = "50%";
  bubble.style.left = "50%";
  bubble.style.transform = "translate(-50%, -50%)";
  bubble.style.padding = "20px";
  bubble.style.background = "rgba(255, 255, 255, 0.9)";
  bubble.style.border = "1px solid black";
  bubble.style.borderRadius = "10px";
  bubble.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
  bubble.style.zIndex = "1000";
  bubble.innerHTML = `
    <p>Level 1: Start Quiz</p>
    <button id="startQuiz">Start Quiz</button>
    <button id="closeBubble">Close</button>
  `;

  const overlay = document.createElement("div");
  overlay.id = "gameOverlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(177, 30, 30, 0.3)";
  overlay.style.zIndex = "999";

  document.body.appendChild(overlay);
  document.body.appendChild(bubble);

  document.getElementById("startQuiz").addEventListener("click", () => {
    window.location.href = "quiz-form.html";
  });

  document.getElementById("closeBubble").addEventListener("click", () => {
    const bubble = document.getElementById("bubbleMessage");
    const overlay = document.getElementById("gameOverlay");

    if (bubble) bubble.remove();
    if (overlay) overlay.remove();

    bubbleActive = false;

    keys.w.pressed = false;
    keys.a.pressed = false;
    keys.s.pressed = false;
    keys.d.pressed = false;
    lastKey = "";

    canvas.focus();
  });

  document.addEventListener("keydown", function escapeHandler(e) {
    if (e.key === "Escape" && bubbleActive) {
      document.getElementById("closeBubble").click();
      document.removeEventListener("keydown", escapeHandler);
    }
  });
}
