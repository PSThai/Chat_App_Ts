import { FriendEnum } from "../../enum/friend.enum";
import { User } from '../../interface/User';

export interface UserHasFriend extends User {
  state: FriendEnum;
  isSender: boolean;
}
