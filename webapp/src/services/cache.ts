import { fetchUsers, fetchUserPosts, fetchPostComments, Post } from './api';

interface CacheData {
  users: Record<string, string>;
  userPosts: Map<string, Post[]>;
  postComments: Map<number, number>; // postId -> comment count
  lastUpdate: number;
}

const cache: CacheData = {
  users: {},
  userPosts: new Map(),
  postComments: new Map(),
  lastUpdate: 0,
};

const CACHE_UPDATE_INTERVAL = 60000; // 1 minute

export async function initializeCache() {
  await updateCache();
  setInterval(updateCache, CACHE_UPDATE_INTERVAL);
}

async function updateCache() {
  try {
    // Update users
    const users = await fetchUsers();
    cache.users = users;

    // Update posts and comments for each user
    for (const userId of Object.keys(users)) {
      const posts = await fetchUserPosts(userId);
      cache.userPosts.set(userId, posts);

      // Update comment counts
      for (const post of posts) {
        const comments = await fetchPostComments(post.id);
        cache.postComments.set(post.id, comments.length);
      }
    }

    cache.lastUpdate = Date.now();
  } catch (error) {
    console.error('Error updating cache:', error);
  }
}

export function getCacheData(): CacheData {
  return cache;
}