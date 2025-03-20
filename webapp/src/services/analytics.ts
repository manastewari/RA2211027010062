import { getCacheData } from './cache';
import { Post } from './api';

interface UserWithPostCount {
  id: string;
  name: string;
  postCount: number;
}

export async function getUsersWithPostCounts(): Promise<UserWithPostCount[]> {
  const cache = getCacheData();
  
  return Object.entries(cache.users)
    .map(([id, name]) => ({
      id,
      name,
      postCount: cache.userPosts.get(id)?.length || 0
    }))
    .sort((a, b) => b.postCount - a.postCount);
}

export async function getPopularPosts(): Promise<Post[]> {
  const cache = getCacheData();
  const posts: Post[] = [];
  let maxComments = 0;

  // Collect all posts and find max comment count
  cache.userPosts.forEach(userPosts => {
    userPosts.forEach(post => {
      const commentCount = cache.postComments.get(post.id) || 0;
      if (commentCount >= maxComments) {
        if (commentCount > maxComments) {
          posts.length = 0;
          maxComments = commentCount;
        }
        posts.push({ ...post, commentCount });
      }
    });
  });

  return posts;
}

export async function getLatestPosts(): Promise<Post[]> {
  const cache = getCacheData();
  const allPosts: Post[] = [];

  // Collect all posts with timestamps
  cache.userPosts.forEach(userPosts => {
    userPosts.forEach(post => {
      allPosts.push({
        ...post,
        timestamp: Date.now() - Math.random() * 1000000, // Simulated timestamp
        commentCount: cache.postComments.get(post.id) || 0
      });
    });
  });

  // Sort by timestamp and return latest 5
  return allPosts
    .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
    .slice(0, 5);
}