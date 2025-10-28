import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || ""; 
// In dev: leave empty string -> uses Vite proxy (/api/*)
// In prod: set VITE_API_BASE to your backend URL on Render

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(null);

  async function handleGenerate() {
    try {
      const res = await fetch(`${API_BASE}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error(err);
      setResponse({ error: String(err) });
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Generator App</h1>

      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
        style={{ padding: 8, width: 250, marginRight: 10 }}
      />

      <button onClick={handleGenerate}>Generate</button>

      <div style={{ marginTop: "2rem" }}>
        <h3>Response:</h3>
        <pre>{response ? JSON.stringify(response, null, 2) : "None yet"}</pre>
      </div>
    </div>
  );
}

  );
}

