import { Request, Response } from 'express';
import { getUsersWithPostCounts, getPopularPosts, getLatestPosts } from './services/analytics';

export async function getTopUsers(_req: Request, res: Response) {
  try {
    const topUsers = await getUsersWithPostCounts();
    res.json({ users: topUsers.slice(0, 5) });
  } catch (error) {
    console.error('Error fetching top users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getPosts(req: Request, res: Response) {
  try {
    const type = req.query.type as string;
    
    if (!type || !['popular', 'latest'].includes(type)) {
      return res.status(400).json({ error: 'Invalid type parameter. Use "popular" or "latest".' });
    }

    const posts = type === 'popular' 
      ? await getPopularPosts()
      : await getLatestPosts();

    res.json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}