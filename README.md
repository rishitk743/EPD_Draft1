## AI-Powered Smart Resume Builder with ATS Optimization and Job Description Matching

This project is a full-stack web application that:

- **Parses resumes** (PDF/DOCX)
- **Accepts job descriptions** as text
- **Extracts keywords** using spaCy
- **Computes an ATS compatibility score**
- **Identifies matched and missing keywords**
- **Uses an LLM (OpenAI)** to optimize resume content
- **Generates an ATS-friendly DOCX resume** for download

### Project Structure

- **backend/**
  - `main.py`: FastAPI application with all REST endpoints
  - `parser.py`: PDF/DOCX parsing and keyword extraction via spaCy
  - `ats_engine.py`: ATS scoring logic
  - `llm_engine.py`: OpenAI LLM wrapper for resume optimization
  - `resume_generator.py`: DOCX generation using `python-docx`
  - `models.py`: Pydantic request/response models
  - `requirements.txt`: Backend dependencies
- **frontend/**
  - `app.py`: Streamlit UI
- **.env**: Environment variables (e.g., `OPENAI_API_KEY`)

### Prerequisites

- Python **3.11+**
- pip
- An OpenAI API key (or compatible key for the `openai` Python client)

### Setup Instructions

1. **Clone or create the project directory**

   Place the provided files under a folder, for example:

   ```bash
   cd /path/to/EPD
   ```

2. **Create and activate a virtual environment (recommended)**

   ```bash
   python -m venv .venv
   source .venv/Scripts/activate  # Windows PowerShell: .venv\Scripts\Activate.ps1
   ```

3. **Install backend dependencies**

   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Install spaCy English model**

   ```bash
   python -m spacy download en_core_web_sm
   ```

5. **Install Streamlit (if not already installed globally)**

   From the project root or backend environment:

   ```bash
   pip install streamlit
   ```

6. **Configure environment variables**

   Edit the `.env` file in the project root:

   ```text
   OPENAI_API_KEY=your_openai_api_key_here
   ```

   Make sure this key has access to the chat completion models (e.g., `gpt-4o-mini`).

### Running the Backend

From the `backend` directory:

```bash
uvicorn backend.main:app --reload
```

The FastAPI app will be available at `http://localhost:8000`.

- Interactive docs: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/health`

### Running the Frontend

In a separate terminal, from the project root:

```bash
streamlit run frontend/app.py
```

This will start the Streamlit app, typically at `http://localhost:8501`.

### API Endpoints

- **POST `/upload-resume`**
  - Input: `file` (PDF/DOCX)
  - Output:
    - `resume_text`: extracted resume text
    - `keywords`: extracted keywords from the resume

- **POST `/analyze`**
  - Input:
    - `resume_text` (string)
    - `job_description` (string)
  - Output:
    - `ats_score` (0–100, float)
    - `matched_keywords` (list of strings)
    - `missing_keywords` (list of strings)

- **POST `/optimize`**
  - Input:
    - `resume_text` (string)
    - `job_description` (string)
    - `missing_keywords` (list of strings)
  - Output:
    - `optimized_resume` (string)

- **POST `/generate`**
  - Input:
    - `optimized_resume` (string)
  - Output:
    - Downloadable DOCX file (`optimized_resume.docx`)

### Using the App (End-to-End Flow)

1. **Start the backend** with Uvicorn.
2. **Start the frontend** with Streamlit.
3. In the Streamlit UI:
   - Upload a **PDF or DOCX** resume.
   - Paste the **job description**.
   - Click **Analyze**:
     - The backend parses the resume, extracts keywords, and computes the ATS score.
     - The UI displays:
       - ATS score
       - Matched keywords
       - Missing keywords
   - Click **Optimize Resume**:
     - The LLM rewrites your resume content using strong action verbs, quantifying achievements, and weaving in missing keywords naturally.
   - Review the **Optimized Resume** text.
   - Click **Download Optimized DOCX**:
     - The backend generates an ATS-friendly DOCX file which you can download.

### Error Handling and Limitations

- **Unsupported files**: Only PDF and DOCX are accepted.
- **Empty inputs**: Empty resumes or job descriptions return validation errors.
- **LLM failures**: Network/API issues are surfaced as readable error messages.
- **ATS scoring**: If no JD keywords are detected, the score is `0.0` and matched/missing lists are empty.

### Security & Ethics

- The backend does **not** persist resumes or job descriptions to any database.
- The LLM is instructed **not** to fabricate experience.
- Be mindful of bias and always review AI-generated content before use.
- Run this locally and control where `.env` and your API keys are stored.

### Future Enhancements (Ideas)

- Resume scoring history and analytics
- Industry-specific resume templates
- Deeper skill gap analysis
- Interview question suggestions based on JD
- LinkedIn profile optimization helpers

