let time = [];
let signals = {};
let currentSignal = null;

fetch("data/ACDC_timeseries.json")
  .then(r => r.json())
  .then(json => {

    time = json.time;
    signals = json.signals;

    const sel = document.getElementById("signal-select");

    Object.keys(signals).forEach(s => {
      const opt = document.createElement("option");
      opt.value = s;
      opt.textContent = s;
      sel.appendChild(opt);
    });

    currentSignal = sel.value;
    initSlider();
    render(0);
  });


function initSlider() {
  const slider = document.getElementById("time-slider");
  slider.max = time.length - 1;
  slider.value = 0;
  slider.oninput = e => render(parseInt(e.target.value));
}

document.getElementById("signal-select").onchange = e => {
  currentSignal = e.target.value;
  render(document.getElementById("time-slider").value);
};

function render(i) {
  const val = signals[currentSignal][i];

  document.getElementById("time-value").innerText = `t = ${time[i].toExponential(3)}`;

  document.getElementById("signal-card").innerHTML = `
    <h2>${currentSignal}</h2>
    <div class="value">${val.toExponential(3)}</div>
  `;
}
