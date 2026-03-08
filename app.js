// Auto-Update ሎጂክ
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(reg => {
        reg.onupdatefound = () => {
            const installingWorker = reg.installing;
            installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    window.location.reload(); 
                }
            };
        };
    });
}

// Splash Screen
setTimeout(() => {
    document.getElementById('splash-screen').classList.add('hidden');
    if(localStorage.getItem('isLogged')) showDashboard();
    else document.getElementById('registration-page').classList.remove('hidden');
}, 4000);

function toggleCodeInput() {
    const role = document.getElementById('role').value;
    document.getElementById('code-section').classList.toggle('hidden', role === 'student');
}

function handleRegister() {
    const role = document.getElementById('role').value;
    const code = document.getElementById('access-code').value;
    const name = document.getElementById('fname').value;

    if(role === 'teacher' && code !== '121619') { alert("የመምህር ኮድ ስህተት!"); return; }
    if(role === 'admin' && code !== '12161921') { alert("የአስተዳደር ኮድ ስህተት!"); return; }

    localStorage.setItem('isLogged', 'true');
    localStorage.setItem('role', role);
    localStorage.setItem('name', name);
    showDashboard();
}

function showDashboard() {
    document.getElementById('registration-page').classList.add('hidden');
    document.getElementById('main-dashboard').classList.remove('hidden');
    document.getElementById('welcome-msg').innerText = "ሰላም " + localStorage.getItem('name');
    
    if(localStorage.getItem('role') !== 'student') {
        document.getElementById('admin-tools').classList.remove('hidden');
    }
}

function showSubjects(grade) {
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
        btn.innerText = s + " (PDF/Video)";
        btn.onclick = () => alert(s + " ክፍል ተመርጧል።");
        list.appendChild(btn);
    });
}

function logOut() {
    localStorage.clear();
    location.reload();
}

function backToGrades() {
    document.getElementById('subject-section').classList.add('hidden');
    document.getElementById('grade-selection').classList.remove('hidden');
}
