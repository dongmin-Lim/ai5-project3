import { Router } from 'express';
import { myPageController } from '../controllers/myPage.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';

const myPageRouter = Router();

myPageRouter.get(
  '/mycommunities',
  loginRequired,
  myPageController.getMyCommunities,
);
// myPageRouter.get('/mycommunities/liked', myPageController.getlikedCommunities);
myPageRouter.get(
  '/communitiestoposts',
  loginRequired,
  myPageController.getCommunityPosts,
);

export { myPageRouter };
