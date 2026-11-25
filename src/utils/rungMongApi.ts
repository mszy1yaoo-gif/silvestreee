import { CharacterComment } from '../components/territory/naomi/NaomiCharacterComments';

export interface RungMongDataResponse {
  likes: Record<string, number>;
  comments: Record<string, CharacterComment[]>;
  timestamp: number;
}

export interface LikeApiResponse {
  success: boolean;
  characterId: string;
  likeCount: number;
}

export interface CommentApiResponse {
  success: boolean;
  comment: CharacterComment;
}

export type RungMongUpdateEvent =
  | { type: 'like_update'; characterId: string; likeCount: number }
  | { type: 'new_comment'; characterId: string; comment: CharacterComment; commentCount: number };

/**
 * Fetch initial shared likes and comments from the persistent backend.
 */
export async function fetchRungMongData(): Promise<RungMongDataResponse> {
  const res = await fetch('/api/rung-mong/data', {
    headers: {
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch Rừng Mộng data: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Submit an atomic like or unlike action to the shared backend.
 */
export async function toggleLikeApi(
  characterId: string,
  action: 'like' | 'unlike'
): Promise<LikeApiResponse> {
  const res = await fetch('/api/rung-mong/like', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ characterId, action }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `Failed to update like: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Submit a comment to the shared persistent backend.
 */
export async function submitCommentApi(
  characterId: string,
  nickname: string,
  text: string,
  iconIndex?: number
): Promise<CommentApiResponse> {
  const res = await fetch('/api/rung-mong/comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      characterId,
      nickname,
      text,
      iconIndex,
    }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `Failed to submit comment: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Subscribes to real-time Server-Sent Events (SSE) broadcasted by the shared backend.
 * Falls back to periodic polling if EventSource is unavailable.
 */
export function subscribeRungMongUpdates(
  onUpdate: (event: RungMongUpdateEvent) => void
): () => void {
  if (typeof window === 'undefined' || !window.EventSource) {
    return () => {};
  }

  let eventSource: EventSource | null = null;
  let isClosed = false;

  function connect() {
    if (isClosed) return;

    eventSource = new EventSource('/api/rung-mong/stream');

    eventSource.addEventListener('rung_mong_update', (e: MessageEvent) => {
      try {
        const parsed = JSON.parse(e.data) as RungMongUpdateEvent;
        if (parsed && parsed.type) {
          onUpdate(parsed);
        }
      } catch (err) {
        console.error('Failed to parse SSE event:', err);
      }
    });

    eventSource.onerror = () => {
      if (eventSource) {
        eventSource.close();
        eventSource = null;
      }
      // Reconnect after delay if not explicitly closed
      if (!isClosed) {
        window.setTimeout(connect, 4000);
      }
    };
  }

  connect();

  return () => {
    isClosed = true;
    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }
  };
}
