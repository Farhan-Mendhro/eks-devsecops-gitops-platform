import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Post, fmtDate, readMins } from '@/lib/api';

export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// List-style journal row (not a card): number, title, tags, date, hover cover.
export default function PostRow({ post, index }: { post: Post; index: number }) {
  return (
    <Link to={`/details-page/${slug(post.title)}/${post._id}`} state={{ post }} className="prow">
      <span className="mono prow-n">{String(index + 1).padStart(2, '0')}</span>
      <span className="prow-main"><b>{post.title}</b><span className="prow-tags">{post.categories.map((c) => <em key={c} className="mono">{c}</em>)}</span></span>
      <span className="mono prow-meta">{post.authorName}<br />{fmtDate(post.timeOfPost)} · {readMins(post.description)} min</span>
      <img src={post.imageLink} alt="" className="prow-img" loading="lazy" />
      <ArrowUpRight className="prow-arrow" size={22} />
    </Link>
  );
}
