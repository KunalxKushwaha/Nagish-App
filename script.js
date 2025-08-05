// Text to Speech
function speakText() {
  const text = document.getElementById("textInput").value;
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

// Speech to Text
function startListening() {
  const output = document.getElementById("outputText");

  if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
    alert("Your browser does not support Speech Recognition.");
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    output.textContent = transcript;
  };

  recognition.onerror = function (event) {
    output.textContent = "Error: " + event.error;
  };
}

function toggleTheme() {
  const html = document.documentElement;
  const sun = document.getElementById("sunIcon");
  const moon = document.getElementById("moonIcon");

  html.classList.toggle("dark");

  // Icon Transition
  const isDark = html.classList.contains("dark");
  sun.style.opacity = isDark ? "0" : "1";
  moon.style.opacity = isDark ? "1" : "0";

  // Save Preference
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

window.addEventListener("DOMContentLoaded", () => {
  const sun = document.getElementById("sunIcon");
  const moon = document.getElementById("moonIcon");
  const isDark = localStorage.getItem("theme") === "dark";

  document.documentElement.classList.toggle("dark", isDark);
  sun.style.opacity = isDark ? "0" : "1";
  moon.style.opacity = isDark ? "1" : "0";
});
