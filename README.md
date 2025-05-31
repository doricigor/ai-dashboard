# 🧠 AI Dashboard

This is a simple AI-powered report generation app built with React and TypeScript.

It allows users to:

- Create and edit reports using a rich text editor
- Use AI to generate drafts or summarize content
- Track when AI was used to assist writing

## 🚀 Installation

Install ai-dashboard with npm

Clone the repo:

```bash
  git clone https://github.com/doricigor/ai-dashboard.git
  cd ai-dashboard
```

Install dependencies:

```bash
  npm install
```

Open the existing .env file and add your OpenAI API key:

```bash
  VITE_OPENAI_API_KEY=your_openai_key_here
```

Run the development server:

```bash
  npm run dev
```

## 🔧 Usage/Examples

- Click "New Report" to start writing.
- Enter a title and use the editor to write content.
- (Optional) Use the AI prompt field to generate a draft.
- Save your report to store it locally.
- You can also preview reports in read-only mode.
- Drag-and-drop is enabled to reorder reports.

## ✨ Features

- AI-powered draft generation using OpenAI
- AI-powered content summarization
- Rich text editing with formatting
- Activity tracking (created, edited, AI used)
- Role-based actions (e.g., only admins can create reports)
- LocalStorage - based persistence

## 🐞 Known Issues

- AI integration depends on a valid OpenAI key and available quota.
- No backend – data is stored in browser's LocalStorage.
