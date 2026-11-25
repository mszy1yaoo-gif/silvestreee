import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Persistent Data Storage setup
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'rung_mong_db.json');

interface CommentRecord {
  id: string;
  characterId: string;
  nickname: string;
  comment: string;
  timestamp: number;
  iconIndex: number;
}

interface RungMongStore {
  likes: Record<string, number>;
  comments: Record<string, CommentRecord[]>;
}

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Load or initialize store with 0 likes and empty comments
let store: RungMongStore = {
  likes: {},
  comments: {},
};

function loadStore(): void {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      store = {
        likes: parsed.likes && typeof parsed.likes === 'object' ? parsed.likes : {},
        comments: parsed.comments && typeof parsed.comments === 'object' ? parsed.comments : {},
      };
    } else {
      saveStore();
    }
  } catch (err) {
    console.error('Failed to load store, initializing empty store:', err);
    saveStore();
  }
}

function saveStore(): void {
  try {
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(store, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('Failed to save store to disk:', err);
  }
}

loadStore();

// Sanitize user input (prevent XSS / HTML injection)
function sanitizeText(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .trim();
}

// Server-Sent Events (SSE) Client Broadcaster
const sseClients = new Set<express.Response>();

function broadcastSSE(payload: Record<string, unknown>): void {
  const message = `event: rung_mong_update\ndata: ${JSON.stringify(payload)}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(message);
    } catch {
      sseClients.delete(client);
    }
  }
}

// Periodic heartbeat to keep SSE connections alive through reverse proxies
setInterval(() => {
  for (const client of sseClients) {
    try {
      client.write(': ping\n\n');
    } catch {
      sseClients.delete(client);
    }
  }
}, 25000);

// ============================================================================
// API ROUTES — RỪNG MỘNG ONLY
// ============================================================================

// 1. Fetch entire Rừng Mộng shared likes and comments
app.get('/api/rung-mong/data', (_req, res) => {
  res.json({
    likes: store.likes,
    comments: store.comments,
    timestamp: Date.now(),
  });
});

// 2. Real-Time SSE Stream
app.get('/api/rung-mong/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  sseClients.add(res);
  res.write(': connected to rung mong stream\n\n');

  req.on('close', () => {
    sseClients.delete(res);
  });
});

// 3. Atomic like / unlike endpoint
app.post('/api/rung-mong/like', (req, res) => {
  const { characterId, action } = req.body;

  if (!characterId || typeof characterId !== 'string') {
    return res.status(400).json({ error: 'characterId is required' });
  }

  const cleanId = characterId.trim().toLowerCase();
  const currentCount = store.likes[cleanId] || 0;
  const isUnlike = action === 'unlike';
  const newCount = Math.max(0, currentCount + (isUnlike ? -1 : 1));

  store.likes[cleanId] = newCount;
  saveStore();

  const updatePayload = {
    type: 'like_update',
    characterId: cleanId,
    likeCount: newCount,
  };

  broadcastSSE(updatePayload);

  return res.json({
    success: true,
    characterId: cleanId,
    likeCount: newCount,
  });
});

// 4. Submit a comment endpoint
app.post('/api/rung-mong/comment', (req, res) => {
  const { characterId, nickname, text, iconIndex } = req.body;

  if (!characterId || typeof characterId !== 'string') {
    return res.status(400).json({ error: 'characterId is required' });
  }

  const cleanId = characterId.trim().toLowerCase();
  const cleanNickname = sanitizeText(nickname);
  const cleanText = sanitizeText(text);

  if (!cleanNickname) {
    return res.status(400).json({ error: 'bbi đừng quên đặt cho mình một cái tên nha ♡' });
  }

  if (!cleanText) {
    return res.status(400).json({ error: 'hãy nói gì đó về em bé này nhé ♡' });
  }

  if (cleanNickname.length > 50) {
    return res.status(400).json({ error: 'tên tối đa 50 ký tự nhé ♡' });
  }

  if (cleanText.length > 500) {
    return res.status(400).json({ error: 'lời nhắn tối đa 500 ký tự nhé ♡' });
  }

  const newComment: CommentRecord = {
    id: `rm_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    characterId: cleanId,
    nickname: cleanNickname,
    comment: cleanText,
    timestamp: Date.now(),
    iconIndex: typeof iconIndex === 'number' && iconIndex >= 0 && iconIndex < 8 ? iconIndex : Math.floor(Math.random() * 8),
  };

  if (!store.comments[cleanId]) {
    store.comments[cleanId] = [];
  }

  store.comments[cleanId].push(newComment);
  saveStore();

  const updatePayload = {
    type: 'new_comment',
    characterId: cleanId,
    comment: newComment,
    commentCount: store.comments[cleanId].length,
  };

  broadcastSSE(updatePayload);

  return res.json({
    success: true,
    comment: newComment,
  });
});

// ============================================================================
// MOUNT VITE OR STATIC FRONTEND
// ============================================================================
async function startServer(): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) {
        return next();
      }
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
