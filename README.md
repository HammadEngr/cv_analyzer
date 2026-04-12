# CV Analyser 🧠

An AI powered CV analysis tool that provides detailed feedback on your resume using Claude (Anthropic API). Upload your CV in PDF format and get instant, structured feedback including strengths, weaknesses, suggestions, and missing keywords.

---

## Features

- 📄 PDF upload and preview
- 🤖 AI-powered analysis using Claude Sonnet
- ⚡ Real-time streaming response
- 📊 Structured feedback with score, strengths, weaknesses and suggestions
- 🔒 Privacy friendly — CV is processed and never stored

---

## Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- react-pdf

### Backend

- Node.js
- Express
- Multer (file uploads)
- pdf-parse (text extraction)
- Anthropic SDK

---

## Project Structure

```
cv-analyser/
  ├── frontend/
  │     ├── src/
  │     │     ├── components/
  │     │     │     ├── UploadArea.jsx
  │     │     │     ├── PDFViewer.jsx
  │     │     │     └── AnalysisPanel.jsx
  │     │     └── App.jsx
  │     └── package.json
  │
  └── backend/
        ├── routes/
        │     └── analyse.js
        ├── services/
        │     ├── pdfExtractor.js
        │     └── anthropicService.js
        ├── server.js
        └── package.json
```

---

## Getting Started

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```
ANTHROPIC_API_KEY=your_api_key_here
PORT=5000
```

Start the backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

| Variable            | Description                        |
| ------------------- | ---------------------------------- |
| `ANTHROPIC_API_KEY` | Your Anthropic API key             |
| `PORT`              | Backend server port (default 5000) |

---

## How It Works

1. User uploads a PDF CV
2. Frontend previews the PDF using react-pdf
3. PDF is sent to Node.js backend
4. Backend extracts text using pdf-parse
5. Extracted text is sent to Claude API with an analysis prompt
6. Claude streams back structured feedback
7. Frontend displays results in real time

---

## Deployment

| Service  | Platform                     |
| -------- | ---------------------------- |
| Frontend | Vercel                       |
| Backend  | Hetzner VPS (Docker + Nginx) |

---

## API Endpoints

| Method | Endpoint   | Description                 |
| ------ | ---------- | --------------------------- |
| POST   | `/analyse` | Upload PDF and get analysis |

---

## Cost

| Service           | Cost                 |
| ----------------- | -------------------- |
| Anthropic API     | ~$0.003 per analysis |
| Vercel (frontend) | Free                 |
| Hetzner VPS       | €4/month             |

---

## Future Improvements

- [ ] Job description matching
- [ ] Multiple CV comparison
- [ ] Export analysis as PDF
- [ ] Support for DOCX format
- [ ] German job market specific feedback

---

## Author

**Hammad** — Masters in AI | Fullstack Developer  
[GitHub](https://github.com/HammadEngr)

---

## License

MIT
