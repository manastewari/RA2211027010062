import { Router } from 'express';
import { getTopUsers, getPosts } from './controllers';

const router = Router();

router.get('/users', getTopUsers);
router.get('/posts', getPosts);

export { router };