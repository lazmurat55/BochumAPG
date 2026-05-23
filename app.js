:root {
    --bg-main: #0f172a;
    --bg-card: #1e293b;
    --bg-input: #0f172a;
    --border-color: #334155;
    --primary: #3b82f6;
    --success: #10b981;
    --danger: #f43f5e;
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Segoe UI, sans-serif;
}

body {
    background: var(--bg-main);
    color: var(--text-main);
    padding: 20px;
}

.container {
    max-width: 900px;
    margin: auto;
}

.form-card {
    background: var(--bg-card);
    border-radius: 14px;
    padding: 20px;
    margin-bottom: 16px;
    border: 1px solid var(--border-color);
}

input,
select,
button {
    width: 100%;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid var(--border-color);
    background: var(--bg-input);
    color: white;
    margin-top: 8px;
}

button {
    cursor: pointer;
}

.btn-primary {
    background: var(--primary);
    border: none;
}

.worker-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 14px;
}

.selected-worker {
    background: rgba(59,130,246,0.2);
    border: 1px solid var(--primary);
    padding: 8px 12px;
    border-radius: 30px;
}

.artikel-row {
    border: 1px solid var(--border-color);
    border-radius: 14px;
    padding: 18px;
    margin-bottom: 20px;
}

.code-row {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.status-ok {
    background: rgba(16,185,129,0.2);
    color: #10b981;
    padding: 10px;
    border-radius: 10px;
    margin-top: 10px;
}

.status-error {
    background: rgba(244,63,94,0.2);
    color: #f43f5e;
    padding: 10px;
    border-radius: 10px;
    margin-top: 10px;
}

.overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.7);
    display: none;
    justify-content: center;
    align-items: center;
}

.overlay-content {
    background: var(--bg-card);
    width: 90%;
    max-width: 400px;
    padding: 20px;
    border-radius: 14px;
}

.worker-list {
    max-height: 300px;
    overflow: auto;
    margin: 15px 0;
}

.worker-opt {
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 10px;
    margin-bottom: 8px;
    cursor: pointer;
}

.topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

@media(max-width:600px) {

    .code-row {
        flex-direction: column;
    }

}
