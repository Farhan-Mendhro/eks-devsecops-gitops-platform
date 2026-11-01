import axios from 'axios';
import rawDemo from '@/data/sample_posts.json';

export type Post = {
  _id: string;
  authorName: string;
  title: string;
  imageLink: string;
  timeOfPost: string;
  description: string;
  categories: string[];
  isFeaturedPost?: boolean;
};

// The frontend must be usable before MongoDB or the backend is deployed.
// Vite does not load .env.sample automatically; only .env, .env.local, etc.
export const API = (import.meta.env.VITE_API_PATH || '').trim().replace(/\/+$/, '');
export const CATEGORIES = ['DevOps', 'Cloud', 'Kubernetes', 'Security', 'Automation', 'Observability', 'Platform'];

// Built-in sample data makes every public page browsable without an API/database.
const DEMO: Post[] = (rawDemo as any[]).map((p, i) => ({
  ...p,
  _id: `demo-${i + 1}`,
  timeOfPost: typeof p.timeOfPost === 'object' && p.timeOfPost?.$date
    ? p.timeOfPost.$date
    : p.timeOfPost,
}));

export const isDemoId = (id: string) => id.startsWith('demo-');
export type Feed = { data: Post[]; demo: boolean };

function normalizePostList(value: unknown): Post[] | null {
  if (Array.isArray(value)) return value as Post[];

  // Also accept common wrapped API responses, but never treat HTML/text as posts.
  if (value && typeof value === 'object') {
    const wrapped = value as { posts?: unknown; data?: unknown };
    if (Array.isArray(wrapped.posts)) return wrapped.posts as Post[];
    if (Array.isArray(wrapped.data)) return wrapped.data as Post[];
  }

  return null;
}

async function withFallback(
  call: () => Promise<unknown>,
  demo: () => Post[],
): Promise<Feed> {
  // No API URL means local preview mode. No backend/database is required to see the UI.
  if (!API) return { data: demo(), demo: true };

  try {
    const posts = normalizePostList(await call());
    if (!posts) throw new Error('The API response was not a list of posts.');
    return { data: posts, demo: false };
  } catch {
    return { data: demo(), demo: true };
  }
}

export const getLatest = () => withFallback(
  async () => (await axios.get(`${API}/api/posts/latest`)).data,
  () => [...DEMO].sort((a, b) => +new Date(b.timeOfPost) - +new Date(a.timeOfPost)),
);

export const getFeatured = () => withFallback(
  async () => (await axios.get(`${API}/api/posts/featured`)).data,
  () => DEMO.filter((p) => p.isFeaturedPost),
);

export const getByCategory = (c: string) => withFallback(
  async () => (await axios.get(`${API}/api/posts/categories/${encodeURIComponent(c)}`)).data,
  () => DEMO.filter((p) => p.categories.includes(c)),
);

export async function getPost(id: string): Promise<Post | null> {
  if (isDemoId(id)) return DEMO.find((p) => p._id === id) ?? null;
  if (!API) return null;

  const response = await axios.get(`${API}/api/posts/${id}`);
  const result = response.data?.post ?? response.data?.data ?? response.data;
  return result && typeof result === 'object' && !Array.isArray(result)
    ? result as Post
    : null;
}

export const errMsg = (e: any): string => e?.response?.data?.message || (e?.code === 'ERR_NETWORK' ? `Cannot reach the API at ${API || '(not configured)'}. Showing preview data instead.` : e?.message || 'Something went wrong');

export const fmtDate = (iso: string) => new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
export const readMins = (t: string) => Math.max(2, Math.round(t.split(/\s+/).length / 200));
