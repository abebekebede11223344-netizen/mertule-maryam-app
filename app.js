setTimeout(() => {
    document.getElementById('splash-screen').classList.add('hidden');
    document.getElementById('registration-page').classList.remove('hidden');
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

    document.getElementById('registration-page').classList.add('hidden');
    document.getElementById('main-dashboard').classList.remove('hidden');
}

function showGrade(grade) {
    alert(grade + "ኛ ክፍል ተመርጧል!");
    // እዚህ ጋር የትምህርት አይነቶች ዝርዝር ይቀጥላል...
}
