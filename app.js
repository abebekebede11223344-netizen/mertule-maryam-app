// 1. ኦፍላይን መሆኑን ማረጋገጥና የቆዩ መረጃዎችን መጫን
document.addEventListener('DOMContentLoaded', () => {
    // ስፕላሽ ስክሪን
    setTimeout(() => {
        document.getElementById('splash-screen').classList.add('hidden');
        
        // አንዴ ገብቶ ከሆነ ዳታ ሳይጠይቅ ቀጥታ ዳሽቦርድ መውሰድ
        const isLogged = localStorage.getItem('isLogged');
        if (isLogged === 'true') {
            showDashboard();
        } else {
            document.getElementById('registration-page').classList.remove('hidden');
        }
    }, 2000);
});

// 2. ምዝገባ (በስልኩ ውስጥ እንዲቀመጥ)
function handleRegister() {
    const role = document.getElementById('role').value;
    const code = document.getElementById('access-code').value;
    const phone = document.getElementById('phone').value;

    if (!phone.startsWith('09') && !phone.startsWith('07')) {
        alert("የኢትዮ ቴሌኮም ቁጥር ብቻ ይጠቀሙ!"); return;
    }
    
    // ኮድ ማረጋገጫ
    if (role === 'teacher' && code !== '1221') { alert("የመምህር ኮድ ስህተት!"); return; }
    if (role === 'admin' && code !== '2127') { alert("የአስተዳደር ኮድ ስህተት!"); return; }

    // መረጃውን ስልኩ ውስጥ ለዘላቂነት መቅበር
    localStorage.setItem('isLogged', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('userPhone', phone);
    
    showDashboard();
}

function showDashboard() {
    document.getElementById('registration-page').classList.add('hidden');
    document.getElementById('main-dashboard').classList.remove('hidden');
    
    // ኦፍላይን መሆኑን ለተማሪው ማሳወቅ
    if (!navigator.onLine) {
        console.log("አሁን ኦፍላይን ነዎት፤ የወረዱ ፋይሎችን ብቻ ማየት ይችላሉ።");
    }
}

// 3. የክፍል ምርጫ ሎጂክ (ከበፊቱ የቀጠለ)
function selectGrade(grade) {
    document.getElementById('grade-selection').classList.add('hidden');
    const area = document.getElementById('subject-area');
    area.classList.remove('hidden');
    document.getElementById('selected-title').innerText = grade + "ኛ ክፍል";
    
    // ማሳሰቢያ፡ እዚህ ጋር በኦፍላይን እንዲታዩ የሚፈለጉ PDF/Videos ሊቀመጡ ይችላሉ
}

function goBack() {
    location.reload(); // ወደ ኋላ ሲመለስ ዋናው ገጽ እንዲመጣ
}
