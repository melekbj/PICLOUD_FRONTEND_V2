export class CreatePostPayload {
  postName: string;
  categoryId?: number;
  url?: string;
  description: string;
  image?: File;
}
