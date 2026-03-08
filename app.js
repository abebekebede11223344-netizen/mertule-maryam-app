setTimeout(() => {
    document.getElementById('splash-screen').classList.add('hidden');
    if(localStorage.getItem('isLogged')) {
        showDashboard();
    } else {
        document.getElementById('registration-page').classList.remove('hidden');
    }
}, 4000); // ለ4 ሰከንድ ስፕላሽ ስክሪኑ ይታያል

function toggleCodeInput() {
    const role = document.getElementById('role').value;
    document.getElementById('code-section').classList.toggle('hidden', role === 'student');
}

function handleRegister() {
    const role = document.getElementById('role').value;
    const code = document.getElementById('access-code').value;
    const name = document.getElementById('fname').value;

    if(role === 'teacher' && code !== '121619') { alert("የመምህር ኮድ ስህተት ነው!"); return; }
    if(role === 'admin' && code !== '12161921') { alert("የአስተዳደር ኮድ ስህተት ነው!"); return; }

    localStorage.setItem('isLogged', 'true');
    localStorage.setItem('role', role);
    localStorage.setItem('name', name);
    showDashboard();
}

function showDashboard() {
    document.getElementById('registration-page').classList.add('hidden');
    document.getElementById('main-dashboard').classList.remove('hidden');
    const role = localStorage.getItem('role');
    document.getElementById('user-welcome').innerText = "ሰላም " + localStorage.getItem('name');
    
    if(role === 'admin' || role === 'teacher') {
        document.getElementById('admin-upload-section').classList.remove('hidden');
    }
}

let currentGrade = 0;
function showSubjects(grade) {
    currentGrade = grade;
    document.getElementById('grade-selection').classList.add('hidden');
    document.getElementById('subject-section').classList.remove('hidden');
    document.getElementById('grade-title').innerText = grade + "ኛ ክፍል";

    if(grade >= 11) {
        document.getElementById('stream-selection').classList.remove('hidden');
        document.getElementById('subject-list').innerHTML = '';
    } else {
        document.getElementById('stream-selection').classList.add('hidden');
        renderSubjects(['Maths', 'English', 'Biology', 'Chemistry', 'Physics', 'History', 'Geography', 'Civics', 'Amharic', 'Economics']);
    }
}

function setStream(stream) {
    let subjects = stream === 'Natural' ? ['Maths', 'English', 'Physics', 'Chemistry', 'Biology'] : ['Maths', 'English', 'History', 'Geography', 'Economics'];
    renderSubjects(subjects);
}

function renderSubjects(subs) {
    const list = document.getElementById('subject-list');
    list.innerHTML = '';
    subs.forEach(s => {
        const btn = document.createElement('button');
        btn.innerText = s;
        btn.onclick = () => openContentMenu(s);
        list.appendChild(btn);
    });
}

function openContentMenu(subject) {
    document.getElementById('subject-section').classList.add('hidden');
    document.getElementById('content-menu').classList.remove('hidden');
    document.getElementById('subject-title').innerText = subject;
}

function openFeature(type) {
    alert(type + " ክፍል ለጊዜው ክፍት ነው። ፋይሎችን እዚህ ማግኘት ይችላሉ።");
}

function backToGrades() { location.reload(); }
function backToSubjects() {
    document.getElementById('content-menu').classList.add('hidden');
    document.getElementById('subject-section').classList.remove('hidden');
}
