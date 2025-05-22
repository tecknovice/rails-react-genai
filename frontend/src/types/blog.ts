export type Blog = {
  id: number;
  title: string;
  content: string;
  published: boolean;
  user_id: number;
  created_at: string;
  updated_at: string;
  // Optional fields that might be included in responses
  user?: {
    id: number;
    email: string;
    role: string;
  };
};

// You might also want these utility types for creating/updating blogs
export type CreateBlogInput = {
  title: string;
  content: string;
  published?: boolean;
};

export type UpdateBlogInput = Partial<CreateBlogInput>;
