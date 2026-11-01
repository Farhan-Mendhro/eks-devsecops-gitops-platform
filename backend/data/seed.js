// Usage: npm run seed  (inserts sample posts when the posts collection is empty)
import mongoose from 'mongoose';
import { readFileSync } from 'node:fs';
import { MONGODB_URI } from '../config/utils.js';
import Post from '../models/post.js';

const raw = JSON.parse(readFileSync(new URL('./sample_posts.json', import.meta.url)));
const docs = raw.map((p) => ({ ...p, _id: p._id.$oid, timeOfPost: new Date(p.timeOfPost.$date) }));

await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
if ((await Post.countDocuments()) === 0) {
  await Post.insertMany(docs);
  console.log(`Seeded ${docs.length} posts.`);
} else {
  console.log('Posts already exist, nothing to seed.');
}
await mongoose.disconnect();
