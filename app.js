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

    if(!phone.startsWith('09') && !phone.startsWith('07')) { alert("የቴሌ ስልክ ብቻ ይጠቀሙ!"); return; }
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
    const role = localStorage.getItem('role');
    if(role !== 'student') document.getElementById('admin-tools').classList.remove('hidden');
    
    const savedNotice = localStorage.getItem('globalNotice');
    if(savedNotice) {
        document.getElementById('announcement-area').classList.remove('hidden');
        document.getElementById('announcement-area').innerText = "ማሳሰቢያ፡ " + savedNotice;
    }
}

function showSubjects(grade) {
    document.getElementById('grade-view').classList.add('hidden');
    document.getElementById('content-view').classList.remove('hidden');
    document.getElementById('title-text').innerText = grade + "ኛ ክፍል";
    
    let list = document.getElementById('list-area');
    list.innerHTML = '';
    
    let subjects = grade <= 10 ? ['Maths', 'English', 'Biology', 'Chemistry', 'Physics', 'History', 'Geography', 'Civics', 'Amharic', 'Economics'] : ['Natural Stream', 'Social Stream'];
    
    subjects.forEach(s => {
        let btn = document.createElement('button');
        btn.innerText = s;
        btn.onclick = () => showMediaOptions(s);
        list.appendChild(btn);
    });
}

function showMediaOptions(subject) {
    document.getElementById('list-area').innerHTML = `
        <h5>${subject} - ይዘቶች</h5>
        <button onclick="alert('PDF በመከፈት ላይ...')">📄 PDF</button>
        <button onclick="alert('ቪዲዮ በመጫን ላይ...')">🎬 Video</button>
        <button onclick="alert('ምስል በመከፈት ላይ...')">🖼️ Image</button>
        <button onclick="alert('ጽሁፍ...')">✍️ Text</button>
        <button onclick="alert('ቻት...')">💬 Chat</button>
    `;
}

function sendNotice() {
    const msg = document.getElementById('notice-msg').value;
    localStorage.setItem('globalNotice', msg);
    alert("ማስታወቂያ ተላልፏል!");
    location.reload();
}

function logOut() { localStorage.clear(); location.reload(); }
function goBack() { location.reload(); }
