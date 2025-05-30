# app/controllers/public/blogs_controller.rb
class Public::BlogsController < ApplicationController
  
  def index
    @blogs = Blog.where(published: true)
    # Transform blogs to include user information without passwords
    blogs_with_users = @blogs.map do |blog|
      blog_json = blog.as_json
      blog_json["user"] = blog.user.as_json(except: [:password, :encrypted_password, :reset_password_token])
      blog_json
    end
    render json: blogs_with_users
  end
  
  def show
    @blog = Blog.find_by(id: params[:id], published: true)
    if @blog
      # Include user information without password
      blog_with_user = @blog.as_json
      blog_with_user["user"] = @blog.user.as_json(except: [:password, :encrypted_password, :reset_password_token])
      render json: blog_with_user
    else
      render json: { error: "Blog not found" }, status: :not_found
    end
  end
end