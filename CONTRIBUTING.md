# 🤝 Contributing to iWas Findex

Thank you for your interest in contributing to **iWas Findex** — an AI-driven platform revolutionizing financial intelligence for emerging markets. We welcome developers, data scientists, researchers, and enthusiasts from all backgrounds.

---

## 📦 Project Setup

Follow these steps to set up the project locally:

1. **Fork** this repository to your GitHub account.

2. **Clone** your fork:
   ```bash
   git clone https://github.com/iwasoffice/iWas-Findex.git
   cd iWas-Findex
   ```

3. **Create and activate a virtual environment**:

   ```bash
   python -m venv venv
   source venv/bin/activate        # On Windows: venv\Scripts\activate
   ```

4. **Install dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

5. **Copy and configure environment variables**:

   ```bash
   cp .env.example .env
   # Then open .env and add your API keys (e.g., Alpha Vantage)
   ```

---

## 🚀 How to Contribute

1. **Create a new branch** (based on the type of work you're doing):

   ```bash
   git checkout -b feature/your-feature-name
   ```

   Example: `feature/streaming-engine`, `fix/api-retry`, `docs/improve-readme`

2. **Make your changes**:

   * Write clean, well-commented code.
   * Use descriptive variable and function names.
   * Follow the [PEP8](https://peps.python.org/pep-0008/) Python style guide.

3. **Write or update tests** as needed in the `tests/` directory.

4. **Commit your changes**:

   ```bash
   git add .
   git commit -m "Add: short summary of what you did"
   ```

   Example: `"Fix: handle API timeout and retry logic"`

5. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** to the `main` branch of the main repository:

   * Provide a clear title and description of your changes.
   * Reference any related issues or discussions.

---

## 🧪 Running Tests

Please ensure all tests pass before submitting your PR:

```bash
pytest tests/
```

If you're adding a new feature, include appropriate unit tests in the `tests/` folder.

---

## ✍️ Coding Guidelines

* Follow [PEP8](https://peps.python.org/pep-0008/) style conventions.
* Include docstrings for all functions, classes, and modules.
* Keep code modular and easy to understand.
* Prefer clarity over cleverness.
* Comment complex logic where necessary.

---

## 📚 Documentation

If your contribution affects architecture, design, or functionality:

* Update or create relevant documentation in `docs/` or `README.md`
* Provide example usage in the notebook (`notebooks/prototype.ipynb`) if relevant.

---

## 🌍 Community Standards

Please adhere to our community guidelines:

* Be respectful and inclusive.
* Keep discussions constructive.
* Avoid offensive language or discriminatory behavior.

See: [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md)

---

## 💬 Need Help?

If you’re unsure where to start or need clarification:

* Open an [Issue](https://github.com/iwasoffice/iWas-Findex/issues)
* Start a discussion via Pull Request
* Tag maintainers in comments with `@iwasoffice`

---

## ❤️ Thank You

Your contributions make **iWas Findex** stronger. Whether it's fixing bugs, improving docs, or adding new features, we appreciate your help in building the future of finance.

Together, we're making financial intelligence accessible and powerful.

—
*Olawale A. Iwarere Jr.*

---
Let me know if you want the GitHub username auto-filled or need `CODE_OF_CONDUCT.md` generated too.

