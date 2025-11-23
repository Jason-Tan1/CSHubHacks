# CSHubHacks

## Gemini setup
- Add a `server/.env` file with `GEMINI_API_KEY=your_key_here`.
- Start the backend (`cd server && npm run dev`) and frontend (`cd client && npm run dev`) or use `npm run dev` from the project root.
- The client calls the backend at `http://localhost:5000` by default; override with `VITE_API_URL` in `client/.env` if needed.
