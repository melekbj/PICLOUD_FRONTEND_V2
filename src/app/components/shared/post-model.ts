import {VoteType} from "./vote-button/vote-type";

export class PostModel {
  postId: number;
  postName: string;
  url: string;
  description: string;
  voteCount: number;
  userName: string;
  categoryName: string;
  image: string;
  commentCount?: number;
  createdDate: Date;
  duration: string;
  upVote: boolean;
  downVote: boolean;
  voteType: VoteType;
  categoryId: number;
}
