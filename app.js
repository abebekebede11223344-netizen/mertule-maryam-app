// Splash Screen ለ 2 ሰከንድ
setTimeout(() => {
    document.getElementById('splash-screen').style.display = 'none';
    const isLogged = localStorage.getItem('logged_in');
    if (isLogged) {
        document.getElementById('main-dashboard').classList.remove('hidden');
    } else {
        document.getElementById('registration-page').classList.remove('hidden');
    }
}, 2000);

function toggleCodeInput() {
    const role = document.getElementById('role').value;
    document.getElementById('code-section').classList.toggle('hidden', role === 'student');
}

function handleRegister() {
    const role = document.getElementById('role').value;
    const code = document.getElementById('access-code').value;
    const phone = document.getElementById('phone').value;

    if (!phone.startsWith('09') && !phone.startsWith('07')) {
        alert("የኢትዮ ቴሌኮም ቁጥር ብቻ ይጠቀሙ!"); return;
    }
    if (role === 'teacher' && code !== '1221') { alert("ኮድ ስህተት ነው!"); return; }
    if (role === 'admin' && code !== '2127') { alert("ኮድ ስህተት ነው!"); return; }

    localStorage.setItem('logged_in', 'true');
    localStorage.setItem('user_role', role);
    document.getElementById('registration-page').classList.add('hidden');
    document.getElementById('main-dashboard').classList.remove('hidden');
}

// የክፍል ምርጫ እና የትምህርት አይነቶች
function selectGrade(grade) {
    const subjectArea = document.getElementById('subject-area');
    const subjectsList = document.getElementById('subjects-list');
    const title = document.getElementById('selected-title');
    
    document.getElementById('grade-selection').classList.add('hidden');
    subjectArea.classList.remove('hidden');
    title.innerText = grade + "ኛ ክፍል";

    let subjects = [];
    if (grade == 9 || grade == 10) {
        subjects = ['Maths', 'English', 'Biology', 'Chemistry', 'Physics', 'Geography', 'History'];
    } else {
        subjects = ['Social Stream', 'Natural Stream'];
    }

    subjectsList.innerHTML = '';
    subjects.forEach(sub => {
        const btn = document.createElement('button');
        btn.innerText = sub;
        btn.onclick = () => sub.includes('Stream') ? showStream(sub, grade) : openSubject(sub, grade);
        subjectsList.appendChild(btn);
    });

    // ለ 12ኛ ክፍል ብቻ የብሄራዊ ፈተና መለማመጃ መጨመር
    if (grade == 12) {
        const examBtn = document.createElement('button');
        examBtn.innerText = "የብሔራዊ ፈተና መለማመጃ 📝";
        examBtn.style.background = "#d97706";
        examBtn.onclick = () => startExam();
        subjectsList.appendChild(examBtn);
    }
}

// የብሄራዊ ፈተና መለማመጃ ሎጂክ (90 ሰከንድ ታይመር)
let timer;
function startExam() {
    let timeLeft = 90;
    alert("ፈተናው ተጀምሯል! ለእያንዳንዱ ጥያቄ 90 ሰከንድ አለዎት። መመለስ አይቻልም!");
    
    const subjectArea = document.getElementById('subject-area');
    subjectArea.innerHTML = `
        <h3>ብሔራዊ ፈተና መለማመጃ</h3>
        <div id="timer" style="font-size: 20px; color: red; font-weight: bold;">ጊዜ፡ 90s</div>
        <div id="question-box" style="margin-top: 20px;">
            <p>1. ከሚከተሉት ውስጥ የሴል (Cell) ግኝት ያደረገው ማን ነው?</p>
            <button onclick="nextQuestion(true)">A. Robert Hooke</button>
            <button onclick="nextQuestion(false)">B. Isaac Newton</button>
            <button onclick="nextQuestion(false)">C. Charles Darwin</button>
        </div>
    `;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = "ጊዜ፡ " + timeLeft + "s";
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("ጊዜዎ አልቋል!");
            location.reload();
        }
    }, 1000);
}

function nextQuestion(isCorrect) {
    clearInterval(timer);
    if (isCorrect) {
        alert("ትክክል! ውጤትዎ፡ 1/1");
    } else {
        alert("ተሳስተዋል! ውጤትዎ፡ 0/1");
    }
    location.reload(); // ለጊዜው ወደ ዋናው ይመልሳል
}

function goBack() {
    location.reload();
}
