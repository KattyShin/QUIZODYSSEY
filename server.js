// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
  
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB6k4C7cjGFck7RK7jZhp8gs6bxQeg6Ftw",
    authDomain: "quizodyssey-38041.firebaseapp.com",
    projectId: "quizodyssey-38041",
    storageBucket: "quizodyssey-38041.firebasestorage.app",
    messagingSenderId: "841753791601",
    appId: "1:841753791601:web:65c64b049dcdb28aa0dfd0"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


  const database = getDatabase(app);
  document.getElementById('save-items').addEventListener('click', function(e){
    set(ref(database, 'quiz/' + document.getElementById('quiztitle').value),
    {
        quiztitle: document.getElementById('quiztitle').value,
        quizdescription: document.getElementById('quizdescription').value,
        question: document.getElementById('question').value,
        answer: document.getElementById('answer').value

    });
    alert("Quiz Saved!")
  })