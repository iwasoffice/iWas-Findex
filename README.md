# 🌍 iWas Findex — The Future of Finance for Emerging Markets

**iWas Findex** is an AI-powered platform that continuously analyzes financial indices in real-time.  
It **discovers new optimized algorithms** on its own and adapts faster than traditional systems — making high-level financial insights **accessible, scalable, and dynamic** for emerging markets.

---

## 📌 Features

- 📡 **Real-Time Data Polling** from public financial APIs
- 🤖 **Self-Evolving AI Agent** that updates its own predictive models
- 📈 **Lightweight, Fast, and Scalable**
- 🧪 Fully **tested** and **modular** codebase
- 📊 Comes with a starter **Jupyter notebook** for experimentation
- 📁 Ready for **collaboration and deployment**

---

## 🏗️ Project Structure

```bash
iWas-Findex/
├── data/                  # Raw data files (ignored in Git)
├── src/                   # Core app code
│   ├── ai_agent.py        # Self-evolving AI logic
│   ├── data_fetcher.py    # Fetches financial data
│   ├── realtime_stream.py # Real-time processing
│   ├── utils.py           # Helper functions
│   └── config.py          # API keys, constants, environment vars
├── tests/                 # Unit tests for all modules
├── notebooks/             # Jupyter prototype notebooks
│   └── prototype.ipynb
├── docs/                  # Documentation (e.g., architecture)
│   └── architecture.md
├── .env.example           # Sample environment config
├── .gitignore             # Ignored files
├── requirements.txt       # Python dependencies
├── run.py                 # Main app runner
├── README.md              # ← You are here
├── CONTRIBUTING.md        # How to contribute
├── CODE_OF_CONDUCT.md     # Open source conduct rules
└── CHANGELOG.md           # Project release history
```

---

## ⚙️ Installation

### Clone the repository:

```bash
git clone https://github.com/your-username/iWas-Findex.git
cd iWas-Findex
```

### Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate   # or `venv\Scripts\activate` on Windows
```

### Install dependencies:

```bash
pip install -r requirements.txt
```

### Configure environment variables:

```bash
cp .env.example .env
# Then open .env and add your API keys
```

---

## 🚀 Usage

### To run the real-time AI agent:

```bash
python run.py
```
  - The app fetches new financial data every second.
  - It dynamically trains an internal model.
  - Predictions are printed to the console.

---

## 🧪 Running Tests

### Run all unit tests using:

```bash
pytest tests/
```

---

## 📓 Notebook Mode

### Try the AI agent manually using:

```bash
# Launch Jupyter (if installed)
jupyter notebook notebooks/prototype.ipynb
```

---

## 📚 Documentation

  - Architecture Overview (`docs/architecture.md`)
  - Prototype Notebook (`notebooks/prototype.ipynb`)
  - API behavior and logic documented inline in code

---

## 🌐 Tech Stack

| Layer         | Tool / Language         |
| ------------- | ----------------------- |
| Language      | Python 3.9+             |
| AI Models     | NumPy, scikit-learn     |
| API           | Alpha Vantage (default) |
| Real-time Ops | `time.sleep`, threading |
| Testing       | Pytest                  |
| Notebook      | Jupyter                 |

---

## 📦 Requirements

Install required packages:

```text
numpy
requests
scikit-learn
python-dotenv
```

Or install them all with:

```bash
pip install -r requirements.txt
```

---

## 🤝 Contributing

We welcome contributors! Please see:

* `CONTRIBUTING.md`
* `CODE_OF_CONDUCT.md`

---

## 📝 License

This project is licensed under the MIT License.

---

## 🧠 Future Plans

* 📈 Add dashboard/visualization layer (e.g., Streamlit)
* 🌍 Multi-API support: regional market data
* 🧠 Evolve models with reinforcement learning
* ☁️ Deploy to cloud for 24/7 operation

---

## ❤️ Acknowledgements

* [Alpha Vantage](https://www.alphavantage.co/) for free market data
* [scikit-learn](https://scikit-learn.org/) for machine learning models
* [GitHub](https://github.com/) for hosting open source

---

## 🙋‍♂️ Need Help?

Open an [issue](https://github.com/your-username/iWas-Findex/issues) or reach out via pull request.

---

🚀 Build the future of financial intelligence with us — iWas Findex.

```
```

---

## 👤 Author

**Olawale Iwarere**  
Founder & Lead Developer  
Email: iwasofficial@outlook.com  
GitHub: [iwasoffice](https://github.com/iwasoffice)

---
