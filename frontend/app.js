const POLL_MS = 10_000;

const state = {
  timer: null,
  historyBySymbol: new Map(),
};

const rowsEl = document.getElementById("rows");
const statusEl = document.getElementById("status");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

const fmtNum = (val, digits = 2) => {
  const num = Number(val);
  return Number.isFinite(num) ? num.toFixed(digits) : "—";
};

const nowText = () => new Date().toLocaleTimeString();

const predictNext = (history) => {
  if (history.length < 2) return null;

  const n = history.length;
  const xMean = (n - 1) / 2;
  const yMean = history.reduce((sum, y) => sum + y, 0) / n;

  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i += 1) {
    const xDiff = i - xMean;
    num += xDiff * (history[i] - yMean);
    den += xDiff ** 2;
  }

  if (den === 0) return history[n - 1];
  const slope = num / den;
  const intercept = yMean - slope * xMean;
  return slope * n + intercept;
};

const updateRow = ({ symbol, price, change, changePct, predicted }) => {
  const rowId = `row-${symbol}`;
  let tr = document.getElementById(rowId);

  if (!tr) {
    tr = document.createElement("tr");
    tr.id = rowId;
    tr.innerHTML = `
      <td data-col="symbol"></td>
      <td data-col="price"></td>
      <td data-col="change"></td>
      <td data-col="changePct"></td>
      <td data-col="predicted"></td>
      <td data-col="updated"></td>
    `;
    rowsEl.appendChild(tr);
  }

  const changeClass = Number(change) >= 0 ? "positive" : "negative";

  tr.querySelector('[data-col="symbol"]').textContent = symbol;
  tr.querySelector('[data-col="price"]').textContent = fmtNum(price);

  const changeEl = tr.querySelector('[data-col="change"]');
  changeEl.textContent = fmtNum(change);
  changeEl.className = changeClass;

  const changePctEl = tr.querySelector('[data-col="changePct"]');
  changePctEl.textContent = changePct || "—";
  changePctEl.className = changeClass;

  tr.querySelector('[data-col="predicted"]').textContent = predicted === null ? "—" : fmtNum(predicted);
  tr.querySelector('[data-col="updated"]').textContent = nowText();
};

const fetchQuote = async (apiKey, symbol) => {
  const url = new URL("https://www.alphavantage.co/query");
  url.searchParams.set("function", "GLOBAL_QUOTE");
  url.searchParams.set("symbol", symbol);
  url.searchParams.set("apikey", apiKey);

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const payload = await response.json();
  const quote = payload["Global Quote"];
  if (!quote || !quote["05. price"]) {
    throw new Error(payload.Note || payload.Information || "No quote data returned");
  }

  const price = Number(quote["05. price"]);
  const history = state.historyBySymbol.get(symbol) || [];
  history.push(price);
  state.historyBySymbol.set(symbol, history.slice(-100));

  return {
    symbol,
    price,
    change: quote["09. change"],
    changePct: quote["10. change percent"],
    predicted: predictNext(history),
  };
};

const poll = async () => {
  const apiKey = document.getElementById("apiKey").value.trim();
  const symbols = document
    .getElementById("symbols")
    .value.split(",")
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean);

  if (!apiKey || symbols.length === 0) {
    statusEl.textContent = "Provide API key and at least one symbol.";
    return;
  }

  statusEl.textContent = `Fetching ${symbols.length} symbol(s)...`;

  await Promise.all(
    symbols.map(async (symbol) => {
      try {
        const result = await fetchQuote(apiKey, symbol);
        updateRow(result);
      } catch (err) {
        updateRow({
          symbol,
          price: NaN,
          change: NaN,
          changePct: "—",
          predicted: null,
        });
        statusEl.textContent = `Some requests failed. Last error (${symbol}): ${err.message}`;
      }
    }),
  );

  if (!statusEl.textContent.startsWith("Some requests failed")) {
    statusEl.textContent = `Updated at ${nowText()}`;
  }
};

const start = async () => {
  if (state.timer) return;
  startBtn.disabled = true;
  stopBtn.disabled = false;
  await poll();
  state.timer = setInterval(poll, POLL_MS);
};

const stop = () => {
  if (state.timer) {
    clearInterval(state.timer);
    state.timer = null;
  }
  startBtn.disabled = false;
  stopBtn.disabled = true;
  statusEl.textContent = "Stopped";
};

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
