const quizData = [
  { question: "Who is the main character in Demon Slayer?", options: ["Tanjiro", "Inosuke", "Zenitsu", "Giyu"], correct: "Tanjiro" },
  { question: "What is Naruto’s favorite food?", options: ["Ramen", "Sushi", "Mochi", "Curry"], correct: "Ramen" },
  { question: "Who is the captain of the Straw Hat Pirates?", options: ["Zoro", "Luffy", "Sanji", "Shanks"], correct: "Luffy" },
  { question: "Which anime features a notebook that kills?", options: ["Death Note", "Bleach", "Jujutsu Kaisen", "Chainsaw Man"], correct: "Death Note" },
  { question: "What power does Lelouch have in Code Geass?", options: ["Sharingan", "Geass", "Bankai", "Nen"], correct: "Geass" },
  { question: "What is the name of Tanjiro's sword style?", options: ["Sun Breathing", "Moon Breathing", "Water Breathing", "Wind Breathing"], correct: "Water Breathing" },
  { question: "Who is the Hokage before Naruto?", options: ["Tsunade", "Kakashi", "Minato", "Jiraiya"], correct: "Kakashi" },
  { question: "What is Goku’s Saiyan name?", options: ["Raditz", "Kakarot", "Vegeta", "Goten"], correct: "Kakarot" },
  { question: "Which anime has a titan war?", options: ["Bleach", "Attack on Titan", "One Piece", "Tokyo Revengers"], correct: "Attack on Titan" },
  { question: "Which demon killed Tanjiro’s family?", options: ["Muzan", "Akaza", "Doma", "Rui"], correct: "Muzan" },
  { question: "What does Fullmetal Alchemist's Edward lose?", options: ["Leg", "Arm", "Both", "Eye"], correct: "Both" },
  { question: "What club does Light Yagami join?", options: ["He doesn’t", "Drama Club", "Kendo Club", "Debate Club"], correct: "He doesn’t" },
  { question: "Who is the Flame Hashira?", options: ["Rengoku", "Tengen", "Shinobu", "Sanemi"], correct: "Rengoku" },
  { question: "What anime features Nen as a power system?", options: ["Hunter x Hunter", "Bleach", "JJK", "Naruto"], correct: "Hunter x Hunter" },
  { question: "What's the name of Luffy's brother that died?", options: ["Sabo", "Zoro", "Ace", "Shanks"], correct: "Ace" }
];

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");

function getUsed() {
  return JSON.parse(localStorage.getItem("usedQuestions") || "[]");
}
function getScore() {
  return parseInt(localStorage.getItem("score") || "0", 10);
}
function setUsed(used) {
  localStorage.setItem("usedQuestions", JSON.stringify(used));
}
function setScore(score) {
  localStorage.setItem("score", score);
}
function resetAll() {
  localStorage.removeItem("usedQuestions");
  localStorage.removeItem("score");
}

function loadQuestion() {
  const nextBtn = document.getElementById("nextBtn");
  nextBtn.disabled = true;
  nextBtn.classList.add("opacity-50", "cursor-not-allowed");
  nextBtn.classList.remove("hover:scale-110", "hover:border-white", "cursor-pointer");

  // Ensure it's wired to loadQuestion
  nextBtn.onclick = loadQuestion;



  feedbackEl.classList.add("hidden");
  answersEl.innerHTML = "";

  const used = getUsed();
  const score = getScore();
  const unused = quizData.filter((_, index) => !used.includes(index));

  scoreEl.textContent = `🎯 Correct Answers: ${score} / ${quizData.length}`;

  if (unused.length === 0) {
    questionEl.textContent = "🎉 You've answered all questions!";
    scoreEl.textContent += " – Quiz complete!";
    const resetBtn = document.createElement("button");
    resetBtn.textContent = "🔄 Restart Quiz";
    resetBtn.className = "mt-4 bg-red-700 text-white px-3 py-1 rounded-md hover:bg-red-800";
    resetBtn.onclick = () => {
      resetAll();
      loadQuestion();
    };
    feedbackEl.innerHTML = "";
    feedbackEl.classList.remove("hidden");
    feedbackEl.appendChild(resetBtn);
    return;
  }

  const index = Math.floor(Math.random() * unused.length);
  const questionIndex = quizData.indexOf(unused[index]);
  const q = quizData[questionIndex];

  questionEl.textContent = q.question;

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className =
      "bg-gray-800 hover:bg-black text-white font-medium py-2 px-4 rounded transition duration-300 border border-gray-700 hover:border-red-500 hover:shadow-[0_0_15px_#ff0000]";

    btn.onclick = () => btn.onclick = () => {
  Array.from(answersEl.children).forEach(b => b.disabled = true);
  const isCorrect = opt === q.correct;

  if (isCorrect) {
    feedbackEl.textContent = "🎉 Correct!";
    setScore(score + 1);
    confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
    btn.classList.add("bg-green-600");
  } else {
    feedbackEl.textContent = `❌ Wrong! Correct: ${q.correct}`;
    btn.classList.add("bg-red-700");
  }

  feedbackEl.classList.remove("hidden");

  // Enable "Try Another" button
  nextBtn.disabled = false;
  nextBtn.classList.remove("opacity-50", "cursor-not-allowed");
  nextBtn.classList.add("hover:scale-110", "hover:border-white", "cursor-pointer");

  // Mark question as used
  const used = getUsed();
  used.push(questionIndex);
  setUsed(used);
};

    answersEl.appendChild(btn);
  });
}

document.addEventListener("DOMContentLoaded", loadQuestion);
