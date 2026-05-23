const scriptURL = "YOUR_GOOGLE_SCRIPT_URL";

let currentSchicht = "B";
let selectedStaff = [];
let isSending = false;

const workerData = {
    A: ["Max", "Ali"],
    B: ["Keskin", "Mustafa"],
    C: ["Ahmet", "Mehmet"]
};

window.onload = () => {

    setToday();

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js');
    }

};

function setToday() {

    const today = new Date();

    document.getElementById('datum').value =
        today.toISOString().split('T')[0];
}

function logout() {
    location.reload();
}

async function checkLogin() {

    const u = sanitize(
        document.getElementById('userInp').value
    );

    const p = sanitize(
        document.getElementById('passInp').value
    );

    const err = document.getElementById('loginError');

    if(!u || !p) {
        err.innerText = 'Bitte Felder ausfüllen';
        return;
    }

    try {

        const response = await fetch(
            `${scriptURL}?action=verifyLogin&user=${u}&pass=${p}`
        );

        const result = await response.json();

        if(result.success) {

            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('mainApp').style.display = 'block';

            document.getElementById('currentUserDisplay').innerText =
                `👤 ${u}`;

        } else {
            err.innerText = 'Falscher Login';
        }

    } catch(e) {

        err.innerText = 'Server nicht erreichbar';

    }
}

function sanitize(text) {

    return text
        .replace(/[<>]/g, '')
        .trim();
}

function setSchicht(s) {
    currentSchicht = s;
}

function openWorkerOverlay() {

    const list = document.getElementById('workerList');

    list.innerHTML = workerData[currentSchicht]
        .map(w => `
            <div class="worker-opt"
                 onclick="addStaff('${w}')">
                ${w}
            </div>
        `)
        .join('');

    document.getElementById('workerOverlay').style.display = 'flex';
}

function closeOverlay() {
    document.getElementById('workerOverlay').style.display = 'none';
}

function addStaff(name) {

    if(!selectedStaff.includes(name)) {
        selectedStaff.push(name);
    }

    renderStaff();

    closeOverlay();
}

function addManualWorker() {

    const inp = document.getElementById('manualWorker');

    const clean = sanitize(inp.value);

    if(clean) {
        selectedStaff.push(clean);
    }

    inp.value = '';

    renderStaff();
}

function renderStaff() {

    document.getElementById('workerDisplayContainer').innerHTML =
        selectedStaff.map(w => `
            <div class="selected-worker">
                ${w}
            </div>
        `).join('');

    liveCheck();
}

function onAnlageChange(value) {

    if(value) {
        addArtikel();
    }
}

function addArtikel() {

    const id = crypto.randomUUID();

    const row = document.createElement('div');

    row.className = 'artikel-row';

    row.dataset.id = id;

    row.innerHTML = `

        <input type="text"
               class="art-name"
               placeholder="Artikelname"
               oninput="debouncedCheck()">

        <div class="code-row">

            <input type="number"
                   class="gut"
                   placeholder="Gut"
                   oninput="debouncedCheck()">

            <input type="number"
                   class="aus"
                   placeholder="Ausschuss"
                   oninput="debouncedCheck()">

        </div>

        <div class="status" id="status_${id}"></div>

    `;

    document.getElementById('artikelContainer').appendChild(row);

    liveCheck();
}

let debounceTimer;

function debouncedCheck() {

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
        liveCheck();
    }, 300);
}

function liveCheck() {

    const btn = document.getElementById('mainSendBtn');

    let valid = true;

    if(selectedStaff.length === 0) {
        valid = false;
    }

    document.querySelectorAll('.artikel-row').forEach(row => {

        const art = row.querySelector('.art-name').value;
        const gut = row.querySelector('.gut').value;

        const status = row.querySelector('.status');

        if(!art || !gut) {

            valid = false;

            status.innerHTML = `
                <div class="status-error">
                    Daten fehlen
                </div>
            `;

        } else {

            status.innerHTML = `
                <div class="status-ok">
                    OK
                </div>
            `;
        }

    });

    btn.disabled = !valid;

    btn.innerText = valid
        ? 'Daten senden'
        : 'Formular prüfen';
}

async function processReport() {

    if(isSending) return;

    isSending = true;

    const btn = document.getElementById('mainSendBtn');

    btn.disabled = true;

    btn.innerText =
