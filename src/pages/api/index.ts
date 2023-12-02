import {
  createNewUser,
  deleteUser,
  getSingleUser,
  getUsers,
  updateUser,
} from '@/pages/web5/userSchema';
import {
  createNewFollower,
  deleteFollower,
  getFollowers,
  getSingleFollower,
} from '@/pages/web5/yarnySchema/followers';
import { getUserMessages, sendMessage } from '@/pages/web5/yarnySchema/message';
import {
  createNewYarn,
  deleteYarn,
  getAllYarnComments,
  getSingleYarn,
  getYarns,
  searchYarn,
  toggleLikeYarn,
  updateYarn,
} from '@/pages/web5/yarnySchema/yarn';
// web5 user CRUD apis
export {
  createNewFollower,
  createNewUser,
  createNewYarn,
  deleteFollower,
  deleteUser,
  deleteYarn,
  getAllYarnComments,
  getFollowers,
  getSingleFollower,
  getSingleUser,
  getSingleYarn,
  getUserMessages,
  getUsers,
  getYarns,
  searchYarn,
  sendMessage,
  toggleLikeYarn,
  updateUser,
  updateYarn,
};
