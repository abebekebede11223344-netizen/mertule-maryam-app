// 1. Splash Screen & Login Logic
setTimeout(() => {
    document.getElementById('splash-screen').classList.add('hidden');
    const isLogged = localStorage.getItem('isLogged');
    if (isLogged) {
        showDashboard();
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
    if (role === 'teacher' && code !== '1221') { alert("የመምህር ኮድ ስህተት ነው!"); return; }
    if (role === 'admin' && code !== '2127') { alert("የአስተዳደር ኮድ ስህተት ነው!"); return; }

    localStorage.setItem('isLogged', 'true');
    localStorage.setItem('userRole', role);
    showDashboard();
}

// 2. Dashboard & Grade Selection
function showDashboard() {
    document.getElementById('registration-page').classList.add('hidden');
    document.getElementById('main-dashboard').classList.remove('hidden');
    
    const role = localStorage.getItem('userRole');
    if (role === 'admin') showAdminOptions();
}

function selectGrade(grade) {
    const subjectArea = document.getElementById('subject-area');
    const list = document.getElementById('subjects-list');
    const title = document.getElementById('selected-title');
    
    document.getElementById('grade-selection').classList.add('hidden');
    subjectArea.classList.remove('hidden');
    title.innerText = grade + "ኛ ክፍል";

    let subjects = [];
    if (grade == 9 || grade == 10) {
        subjects = ['Biology', 'Chemistry', 'Physics', 'Maths', 'English', 'Civics'];
    } else {
        subjects = ['Natural Stream', 'Social Stream'];
    }

    list.innerHTML = '';
    subjects.forEach(sub => {
        const btn = document.createElement('button');
        btn.innerText = sub;
        btn.onclick = () => openSubjectMenu(sub, grade);
        list.appendChild(btn);
    });

    if (grade == 12) {
        const examBtn = document.createElement('button');
        examBtn.innerText = "የብሔራዊ ፈተና መለማመጃ 📝";
        examBtn.style.background = "#d97706";
        examBtn.onclick = () => startExam();
        list.appendChild(examBtn);
    }
}

// 3. Exam System (90 Seconds)
let examTimer;
function startExam() {
    let timeLeft = 90;
    const area = document.getElementById('subject-area');
    area.innerHTML = `
        <h3>ብሔራዊ ፈተና መለማመጃ</h3>
        <div id="timer" style="color:red; font-size:24px;">ጊዜ: 90s</div>
        <div id="q-container">
            <p>1. የኢትዮጵያ ረጅሙ ተራራ ማን ይባላል?</p>
            <button onclick="endExam(true)">ራስ ዳሸን</button>
            <button onclick="endExam(false)">ባቱ</button>
        </div>
    `;

    examTimer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = "ጊዜ: " + timeLeft + "s";
        if (timeLeft <= 0) {
            clearInterval(examTimer);
            alert("ጊዜ አልቋል!");
            location.reload();
        }
    }, 1000);
}

function endExam(isCorrect) {
    clearInterval(examTimer);
    alert(isCorrect ? "ትክክል! ውጤት: 1/1" : "ተሳስተዋል! ውጤት: 0/1");
    location.reload();
}

// 4. Admin OCR & Controls
function showAdminOptions() {
    const adminDiv = document.createElement('div');
    adminDiv.innerHTML = `
        <hr>
        <h4>የአስተዳዳሪ ክፍል</h4>
        <button onclick="triggerOCR()">📸 ፎቶ ወደ ጥያቄ ቀይር</button>
        <button onclick="alert('መልዕክት ተልኳል!')">📢 መመሪያ አስተላልፍ</button>
    `;
    document.getElementById('main-dashboard').appendChild(adminDiv);
}

function triggerOCR() {
    alert("የካሜራ ፈቃድ እየተጠየቀ ነው... ፎቶውን ሲያነሱት ቀጥታ ወደ ፅሁፍ ይቀየራል።");
    // እዚህ ጋር ለወደፊት Tesseract.js እንጨምራለን
}

function goBack() { location.reload(); }
