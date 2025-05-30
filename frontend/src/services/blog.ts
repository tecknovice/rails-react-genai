import request from "@/lib/request";

import type { Blog, CreateBlogInput, UpdateBlogInput } from "@/types/blog";

export const getPublicBlogs = async () => {
  const response = await request<Blog[]>("GET", "/public/blogs");
  return response;
};

export const getPublicBlogById = async (id: number) => {
  const response = await request<Blog[]>("GET", `/public/blogs/${id}`);
  return response;
};

export const getBlogs = async () => {
  const response = await request<Blog[]>("GET", "/blogs");
  return response;
};

export const getBlogById = async (id: number) => {
  const response = await request<Blog>(`GET`, `/blogs/${id}`);
  return response;
};

export const createBlog = async (data: CreateBlogInput) => {
  const response = await request<Blog>("POST", "/blogs", data);
  return response;
};
export const updateBlog = async (id: number, data: UpdateBlogInput) => {
  const response = await request<Blog>("PUT", `/blogs/${id}`, data);
  return response;
};
export const deleteBlog = async (id: number) => {
  const response = await request<Blog>("DELETE", `/blogs/${id}`);
  return response;
};
export const publishBlog = async (id: number) => {
  const response = await request<Blog>("PATCH", `/blogs/${id}/publish`);
  return response;
};
export const unpublishBlog = async (id: number) => {
  const response = await request<Blog>("PATCH", `/blogs/${id}/unpublish`);
  return response;
};
