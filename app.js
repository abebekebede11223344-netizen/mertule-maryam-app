setTimeout(() => {
    document.getElementById('splash-screen').classList.add('hidden');
    if(localStorage.getItem('isLogged')) showDashboard();
    else document.getElementById('registration-page').classList.remove('hidden');
}, 4000);

function toggleCode() {
    const role = document.getElementById('role').value;
    document.getElementById('code').classList.toggle('hidden', role === 'student');
}

function handleLogin() {
    const role = document.getElementById('role').value;
    const code = document.getElementById('code').value;
    const phone = document.getElementById('phone').value;
    if(!phone.startsWith('09') && !phone.startsWith('07')) { alert("የቴሌ ስልክ ብቻ!"); return; }
    if(role === 'teacher' && code !== '121619') { alert("ስህተት!"); return; }
    if(role === 'admin' && code !== '12161921') { alert("ስህተት!"); return; }
    localStorage.setItem('isLogged', 'true');
    localStorage.setItem('role', role);
    localStorage.setItem('name', document.getElementById('fname').value);
    showDashboard();
}

function showDashboard() {
    document.getElementById('registration-page').classList.add('hidden');
    document.getElementById('main-dashboard').classList.remove('hidden');
    if(localStorage.getItem('role') === 'admin') document.getElementById('admin-only').classList.remove('hidden');
    const n = localStorage.getItem('globalNotice');
    if(n) { document.getElementById('announcement-area').classList.remove('hidden'); document.getElementById('announcement-area').innerText = "ማሳሰቢያ: " + n; }
}

function showSubjects(grade) {
    document.getElementById('grade-view').classList.add('hidden');
    document.getElementById('content-view').classList.remove('hidden');
    document.getElementById('title-text').innerText = grade + "ኛ ክፍል";
    let list = document.getElementById('list-area');
    list.innerHTML = '';
    let subs = grade <= 10 ? ['Maths', 'English', 'Biology', 'Chemistry', 'Physics', 'History', 'Geography', 'Civics', 'Amharic', 'Economics'] : ['Natural Stream', 'Social Stream'];
    subs.forEach(s => {
        let btn = document.createElement('button');
        btn.innerText = s; btn.style.background = "white"; btn.style.color = "#333"; btn.style.textAlign = "left";
        btn.onclick = () => showMediaOptions(s);
        list.appendChild(btn);
    });
}

function showMediaOptions(subject) {
    document.getElementById('list-area').innerHTML = `
        <div class="media-list">
            <div class="media-item" onclick="alert('PDF')"><span class="media-icon">📄</span> All PDF Files</div>
            <div class="media-item" onclick="alert('Video')"><span class="media-icon">🎬</span> All Video Lessons</div>
            <div class="media-item" onclick="alert('Image')"><span class="media-icon">🖼️</span> Images/Diagrams</div>
            <div class="media-item" onclick="alert('Text')"><span class="media-icon">✍️</span> Short Notes</div>
            <div class="media-item" onclick="alert('Chat')"><span class="media-icon">💬</span> Discussion Chat</div>
        </div>
    `;
    if(localStorage.getItem('role') !== 'student') document.getElementById('teacher-tools').classList.remove('hidden');
}

function goBack() {
    const list = document.getElementById('list-area');
    if(list.innerHTML.includes('media-item')) {
        showSubjects(parseInt(document.getElementById('title-text').innerText));
        document.getElementById('teacher-tools').classList.add('hidden');
    } else {
        document.getElementById('content-view').classList.add('hidden');
        document.getElementById('grade-view').classList.remove('hidden');
    }
}

function sendNotice() {
    const m = document.getElementById('notice-msg').value;
    if(m) { localStorage.setItem('globalNotice', m); alert("ተልኳል!"); location.reload(); }
}

function logOut() { localStorage.clear(); location.reload(); }
