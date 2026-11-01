import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Post, errMsg, fmtDate, getPost, readMins } from '@/lib/api';
import CBtn from '@/components/CBtn';
import SecureCloud from '@/components/SecureCloud';

export default function PostDetail() {
  const { postId = '' } = useParams();
  const { state } = useLocation();
  const nav = useNavigate();
  const [post, setPost] = useState<Post | null>(state?.post ?? null);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(!state?.post);

  useEffect(() => {
    if (post) return;
    getPost(postId).then((p) => { if (p) setPost(p); else setErr('This post does not exist.'); }).catch((e) => setErr(errMsg(e))).finally(() => setLoading(false));
  }, [postId, post]);

  if (loading) return <section className="phero"><div className="wrap"><p className="mono">Loading…</p></div></section>;
  if (err || !post) return <section className="phero"><div className="wrap"><p className="crumbs mono"><Link to="/journal">← Journal</Link></p><h1 className="h-xl">Post unavailable</h1><p className="sub">{err}</p><CBtn to="/journal">Back to journal</CBtn></div></section>;

  return (
    <>
      <section className="phero post-hero" style={{ backgroundImage: `linear-gradient(180deg,rgba(4,10,24,.55),#040a18 96%),url(${post.imageLink})` }}>
        <div className="wrap phero-in"><div>
          <button className="back mono" onClick={() => nav(-1)}><ArrowLeft size={14} /> Back</button>
          <div className="prow-tags big">{post.categories.map((c) => <em key={c} className="mono">{c}</em>)}</div>
          <motion.h1 className="h-lg post-t" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>{post.title}</motion.h1>
          <p className="mono post-meta">{post.authorName} · {fmtDate(post.timeOfPost)} · {readMins(post.description)} min read</p>
        </div><div className="phero-aside"><SecureCloud /></div></div>
      </section>
      <section className="paper sec"><div className="wrap article">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="article-body">{post.description}</motion.p>
        <div className="btn-row top"><CBtn to="/journal">All articles</CBtn></div>
      </div></section>
    </>
  );
}
