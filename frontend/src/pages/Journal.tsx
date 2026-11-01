import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DatabaseZap } from 'lucide-react';
import PageHero from '@/components/PageHero';
import PostRow from '@/components/PostRow';
import Reveal from '@/components/Reveal';
import { CATEGORIES, Post, getByCategory, getFeatured, getLatest } from '@/lib/api';

const Banner = () => <div className="demo"><DatabaseZap size={16} /><span><b>Preview data.</b> The API is not reachable, so you are seeing built-in sample posts. Start the backend to see real data.</span></div>;

export default function Journal() {
  const [tab, setTab] = useState('featured');
  const [posts, setPosts] = useState<Post[]>([]);
  const [latest, setLatest] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    let live = true;
    setLoading(true);
    (tab === 'featured' ? getFeatured() : getByCategory(tab)).then((f) => { if (live) { setPosts(f.data); setDemo((d) => d || f.demo); setLoading(false); } });
    return () => { live = false; };
  }, [tab]);
  useEffect(() => { getLatest().then((f) => { setLatest(f.data); setDemo((d) => d || f.demo); }); }, []);

  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['Journal']]} kicker="[07] Journal" lines={['Notes from', <>the <span className="acc">build.</span></>]} sub="What we learn shipping platforms: pipelines, clusters, security and the habits that keep releases boring.">
      </PageHero>
      <section className="paper sec"><div className="wrap">
        {demo && <Banner />}
        <div className="tabs" role="tablist">{['featured', ...CATEGORIES].map((c) => <button key={c} role="tab" aria-selected={tab === c} className={`tab mono ${tab === c ? 'on' : ''}`} onClick={() => setTab(c)}>{c}</button>)}</div>
        <AnimatePresence mode="wait">
          <motion.div key={tab + loading} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="plist light">
            {loading ? <p className="mono dim-d">Loading…</p> : posts.length === 0 ? <p className="empty">No posts in “{tab}” yet.</p> : posts.map((p, i) => <PostRow key={p._id} post={p} index={i} />)}
          </motion.div>
        </AnimatePresence>
        <Reveal><p className="tag mono top"><i />[ Latest ]</p><h2 className="h-md">Latest articles</h2>
          <div className="plist light">{latest.map((p, i) => <PostRow key={p._id} post={p} index={i} />)}</div></Reveal>
      </div></section>
    </>
  );
}
