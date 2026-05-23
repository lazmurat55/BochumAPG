const stoerungen = [];

const currentDate = new Date();

document.getElementById("currentDate").innerText =
  currentDate.toLocaleDateString("de-DE");


function addStoerung() {

  const typ = document.getElementById("stoerungTyp").value;

  const minuten = document.getElementById("stoerungMinuten").value;

  if (!minuten) {
    alert("Minuten eingeben");
    return;
  }

  const stoerung = {
    typ,
    minuten
  };

  stoerungen.push(stoerung);

  renderStoerungen();

  document.getElementById("stoerungMinuten").value = "";
}


function renderStoerungen() {

  const list = document.getElementById("stoerungList");

  list.innerHTML = "";

  stoerungen.forEach((s, index) => {

    list.innerHTML += `
      <div class="stoerung-item">
        ${index + 1}. ${s.typ} - ${s.minuten} Min
      </div>
    `;
  });
}


function saveData() {

  const data = {
    datum: currentDate.toLocaleDateString("de-DE"),

    mitarbeiter:
      document.getElementById("mitarbeiter").value,

    schicht:
      document.getElementById("schicht").value,

    anlage:
      document.getElementById("anlage").value,

    formtraeger:
      document.getElementById("formtraeger").value,

    compound:
      document.getElementById("compound").value,

    werkzeug:
      document.getElementById("werkzeug").value,

    artikelnummer:
      document.getElementById("artikelnummer").value,

    gutteile:
      document.getElementById("gutteile").value,

    ausschuss:
      document.getElementById("ausschuss").value,

    werkzeugwechsel:
      document.getElementById("werkzeugwechsel").value,

    stoerungen
  };


  localStorage.setItem(
    "schichtBData",
    JSON.stringify(data)
  );

  console.log(data);

  alert("Daten gespeichert");
}


function resetForm() {

  location.reload();
}


if ("serviceWorker" in navigator) {

  navigator.serviceWorker.register("service-worker.js");
}
