# 天機 • 命理 - AI Bazi Fortune Teller

Professional AI-powered Chinese Bazi (八字) fortune telling application.

## Features

- 🌟 Accurate Bazi calculation using lunar calendar
- 🤖 AI-powered fortune analysis using Google Gemini
- 💬 Interactive chat to ask follow-up questions
- 🎨 Beautiful traditional Chinese aesthetic
- ✨ Immersive thinking animation with ancient text scrolling
- 🔒 Advanced security against prompt injection attacks

## Quick Start

**Prerequisites:** Node.js (v18 or higher), npm

1. Set up your API key:
   - Create a `.env.local` file in the project root
   - Add your Gemini API key: `GEMINI_API_KEY=your_api_key_here`

2. Run the development server:
   ```bash
   make dev
   ```

3. Open your browser to `http://localhost:3000`

## Available Commands

```bash
make dev      # Install dependencies and start development server
make build    # Build for production
make clean    # Remove node_modules and build artifacts
make install  # Install dependencies only
```

## Technology Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **AI:** Google Gemini API
- **Calendar:** lunar-javascript for accurate Bazi calculations
- **Security:** Multi-layer prompt injection protection

## Security Features 🔒

This application implements comprehensive security measures to protect against prompt injection attacks:

### Client-Side Protection
- **Input Validation**: Checks for dangerous patterns before processing
- **Input Sanitization**: Removes common injection patterns (e.g., "ignore instructions", "you are now")
- **Length Limits**: Prevents excessive input (max 500 characters)
- **Pattern Filtering**: Detects and blocks system commands, role-playing attempts, and code injection

### AI-Level Protection
- **System Instructions**: AI is instructed to only discuss Bazi fortune-telling
- **Refusal Training**: AI refuses to reveal system prompts or accept role changes
- **Topic Boundaries**: Strict adherence to fortune-telling domain

### Multi-Layer Defense
```
User Input → Validation → Sanitization → AI Safety Rules → Response
```

See [SECURITY_IMPROVEMENTS.md](./SECURITY_IMPROVEMENTS.md) for detailed documentation.

## User Experience Enhancements ✨

### Thinking Animation
When you ask a follow-up question, instead of a full-screen loader, you'll see:
- An elegant "thinking" message in the chat
- Auto-rotating ancient text references (e.g., "翻阅《滴天髓》...")
- Smooth animations and transitions

This creates a more immersive and engaging experience while maintaining context.

