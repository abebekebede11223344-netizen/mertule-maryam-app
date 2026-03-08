setTimeout(() => {
    document.getElementById('splash-screen').classList.add('hidden');
    if(localStorage.getItem('userIn')) showDashboard();
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

    if(role === 'teacher' && code !== '121619') { alert("ስህተት!"); return; }
    if(role === 'admin' && code !== '12161921') { alert("ስህተት!"); return; }

    localStorage.setItem('userIn', 'true');
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

function logOut() {
    localStorage.clear();
    location.reload();
}
