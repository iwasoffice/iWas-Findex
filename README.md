# 🌍 iWas Findex — The Future of Finance for Emerging Markets

**iWas Findex** is an AI-powered platform that continuously analyzes financial indices in real-time.  
It **discovers optimized algorithms autonomously** and adapts faster than traditional systems — making high-level financial insights **accessible, scalable, and dynamic** for emerging markets.

---

## 📌 Features

- 📡 Real-time polling from public financial APIs
- 🤖 Self-evolving AI agent with live model updates
- 📈 Lightweight, modular, and production-ready
- 🧪 Built-in unit tests and notebook experimentation
- 🔐 .env config support with key security separation
- 🚢 Dockerized for portability and deployment
- 📚 REST API with detailed docs and usage examples
- 💡 Examples and datasets included for hands-on learning

---

## 🏗️ Project Structure

```bash
iWas-Findex/
├── assets/               # Images, banners, etc.
├── data/                 # Local data directory (.gitkeep inside)
├── datasets/             # Dataset management & versioning
├── docs/
│   ├── architecture.md   # System architecture overview
│   └── api/              # 📚 API Documentation
│       ├── overview.md
│       ├── authentication.md
│       ├── endpoints.md
│       ├── errors.md
│       ├── examples.md
│       └── quickstart.md
├── examples/             # Code snippets and example usage
├── notebooks/            # Jupyter notebooks for prototypes
│   └── prototype.ipynb
├── src/                  # Core backend logic
│   ├── ai_agent.py
│   ├── data_fetcher.py
│   ├── realtime_stream.py
│   ├── utils.py
│   └── config.py
├── tests/                # Pytest unit tests
├── .env.example          # Sample environment config
├── .gitignore            # Ignored files
├── .dockerignore         # Ignored files for Docker builds
├── Dockerfile            # Container build spec
├── requirements.txt      # Python dependencies
├── run.py                # Entry point for real-time agent
├── README.md             # ← You're here
├── CHANGELOG.md          # Release history
├── CODE_OF_CONDUCT.md    # Contributor behavior
├── CONTRIBUTING.md       # Contribution guidelines
├── SECURITY.md           # Security policy
└── LICENSE               # MIT License
````

---

## ⚙️ Installation

### Clone the repo:

```bash
git clone https://github.com/iwasoffice/iWas-Findex.git
cd iWas-Findex
```

### Create virtual environment:

```bash
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
```

### Install dependencies:

```bash
pip install -r requirements.txt
```

### Add environment variables:

```bash
cp .env.example .env
# Then add your API keys to .env
```

---

## 🚀 Usage

### Run the AI agent:

```bash
python run.py
```

* Streams financial data every second
* Dynamically updates and trains internal AI models
* Outputs predictions and logs

---

## 🧪 Run Tests

```bash
pytest tests/
```

---

## 📓 Notebook Mode

Launch the prototype notebook:

```bash
jupyter notebook notebooks/prototype.ipynb
```

---

## 📚 API Access

Explore the RESTful API:

* **Docs:** `docs/api/`
* **Quickstart:** [quickstart.md](docs/api/quickstart.md)
* **Auth:** Uses `Authorization: Bearer YOUR_API_KEY`
* **Try it:** See [examples.md](docs/api/examples.md) for curl/Python usage

---

## 🧱 Docker Support

### Build the image:

```bash
docker build -t iwas-findex .
```

### Run it:

```bash
docker run --env-file .env iwas-findex
```

---

## 💻 Datasets and Examples

* Place raw files inside `datasets/`
* See usage examples in the `examples/` folder

---

## 🌐 Tech Stack

| Layer      | Tool / Language     |
| ---------- | ------------------- |
| Language   | Python 3.9+         |
| AI Models  | scikit-learn, NumPy |
| API        | Alpha Vantage       |
| Real-Time  | threading, sched    |
| Docs       | Markdown            |
| Notebook   | Jupyter             |
| Deployment | Docker              |
| Testing    | Pytest              |

---

## 📦 Requirements

Main packages used:

```
numpy
requests
scikit-learn
python-dotenv
```

Install everything with:

```bash
pip install -r requirements.txt
```

---

## 🤝 Contributing

We welcome contributors! See:

* [CONTRIBUTING.md](CONTRIBUTING.md)
* [CODE\_OF\_CONDUCT.md](CODE_OF_CONDUCT.md)

---

## 🛡️ Security

Found a vulnerability? Read [SECURITY.md](SECURITY.md).

---

## 📝 License

This project is licensed under the MIT License.
© 2025 Olawale A. Iwarere Jr.

---

## 🧠 Future Plans

* 📈 Add dashboard layer (e.g., Streamlit)
* 🌍 Multi-API regional support
* 🤖 Integrate reinforcement learning
* ☁️ Host 24/7 on the cloud
* 📡 WebSocket/GraphQL for real-time API access

---

## 🙌 Acknowledgements

* [Alpha Vantage](https://www.alphavantage.co/) for free financial market data
* [scikit-learn](https://scikit-learn.org/) for robust machine learning utilities
* [OpenAI](https://openai.com/) for foundational AI research and developer tools
* [GitHub](https://github.com/) for hosting open source infrastructure

---

## 🙋 Need Help?

Open an [issue](https://github.com/iwasoffice/iWas-Findex/issues) or send a pull request.

---

🚀 Build the future of financial intelligence with us — iWas Findex.

---

## 👤 Author

**Olawale A. Iwarere Jr.**  
Founder & Lead Developer  
📧 [iwasofficial@outlook.com](mailto:iwasofficial@outlook.com)  
🔗 [GitHub: iwasoffice](https://github.com/iwasoffice)  

---

## 🙌 Final Note

Thank you for checking out **iWas Findex**.

💡 *Made with purpose, powered by AI, and open to the world.*  
We’re building the future of financial intelligence, and you’re welcome to be a part of it.

Feel free to ⭐ star the repo, fork, or contribute.  
Every bit helps build a better, data-driven financial future for all.

—
*The iWas Findex Project*
