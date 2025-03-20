import fetch from 'node-fetch';

const API_BASE_URL = 'http://20.244.56.144/test';

export interface User {
  id: string;
  name: string;
}

export interface Post {
  id: number;
  userid: number;
  content: string;
  commentCount?: number;
  timestamp?: number;
}

export interface Comment {
  id: number;
  postid: number;
  content: string;
}

export async function fetchUsers(): Promise<Record<string, string>> {
  const response = await fetch(`${API_BASE_URL}/users`);
  const data = await response.json();
  return data.users;
}

export async function fetchUserPosts(userId: string): Promise<Post[]> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/posts`);
  const data = await response.json();
  return data.posts;
}

export async function fetchPostComments(postId: number): Promise<Comment[]> {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
  const data = await response.json();
  return data.comments;
}