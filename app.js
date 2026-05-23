const scriptURL = "YOUR_GOOGLE_SCRIPT_URL";
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
