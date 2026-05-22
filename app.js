
let selectedWorkers = [];
let artikelCount = 0;

document.getElementById('datum').value =
new Date().toISOString().split('T')[0];

function login(){

const user = document.getElementById('user').value;

if(user.length < 2){
document.getElementById('loginStatus').innerHTML =
'<div class="warning-box">Ungültiger Login</div>';
return;
}

document.getElementById('loginStatus').innerHTML =
'<div class="success-box warning-box">Login erfolgreich</div>';
}

function toggleWorker(btn){

btn.classList.toggle('active');

const name = btn.innerText;

if(selectedWorkers.includes(name)){
selectedWorkers = selectedWorkers.filter(x=>x!==name);
}else{
selectedWorkers.push(name);
}

renderWorkers();
}

function renderWorkers(){

const box = document.getElementById('selectedWorkers');

box.innerHTML = selectedWorkers.map(w=>
`<div class="selected-worker">${w}</div>`
).join('');
}

function addArtikel(){

artikelCount++;

const div = document.createElement('div');

div.className = 'artikel-box';

div.innerHTML = `

<div class="grid-2">
<input type="text" placeholder="Artikelnummer">
<input type="text" placeholder="Artikelname">
</div>

<div class="grid-2">
<input type="number" class="dauer" placeholder="Arbeitszeit (Minuten)">
<input type="number" placeholder="Gutteile">
</div>

<div class="grid-2">
<input type="number" placeholder="Ausschuss">
<input type="number" placeholder="Störung (Minuten)">
</div>

`;

document.getElementById('artikelContainer').appendChild(div);

updateCOM();
}

document.addEventListener('input', updateCOM);

function updateCOM(){

const anlage = document.getElementById('anlage').value;

const tracker = document.getElementById('comTracker');

if(anlage !== 'COM'){
tracker.style.display = 'none';
return;
}

let total = 0;

document.querySelectorAll('.dauer').forEach(inp=>{
total += parseInt(inp.value) || 0;
});

tracker.style.display = 'block';

if(total === 480){

tracker.className = 'warning-box success-box';

tracker.innerHTML =
'Gesamtzeit korrekt: 480 Minuten';

}else{

tracker.className = 'warning-box';

tracker.innerHTML =
'Aktuelle Gesamtzeit: ' + total + ' / 480 Minuten';

}
}

function sendReport(){

if(selectedWorkers.length === 0){
alert('Bitte Mitarbeiter auswählen');
return;
}

alert('Bericht erfolgreich gesendet');
}

new Chart(document.getElementById('productionChart'),{
type:'bar',
data:{
labels:['PUR1','PUR2','PUR3','IM1'],
datasets:[{
label:'Produktion',
data:[1200,980,870,650]
}]
}
});

new Chart(document.getElementById('errorChart'),{
type:'doughnut',
data:{
labels:['Ausschuss','Gutteile'],
datasets:[{
data:[8,92]
}]
}
});

if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('service-worker.js');
}
