class BlogsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_blog, only: [:show, :update, :destroy, :publish]

  # GET /blogs
  def index
    @blogs = policy_scope(Blog)
    
    # Transform blogs to include user information without passwords
    blogs_with_users = @blogs.map do |blog|
      blog_json = blog.as_json
      blog_json["user"] = blog.user.as_json(except: [:password, :encrypted_password, :reset_password_token])
      blog_json
    end

  render json: blogs_with_users
  end

  # GET /blogs/:id
  def show
    authorize @blog

    # Include user information without password
    blog_with_user = @blog.as_json
    blog_with_user["user"] = @blog.user.as_json(except: [:password, :encrypted_password, :reset_password_token])
    
    render json: blog_with_user
  end

  # POST /blogs
  def create
    @blog = current_user.blogs.build(blog_params)
    authorize @blog
    
    if @blog.save
      render json: @blog, status: :created
    else
      render json: @blog.errors, status: :unprocessable_entity
    end
  end

  # PUT /blogs/:id
  def update
    authorize @blog
    
    if @blog.update(blog_params)
      render json: @blog
    else
      render json: @blog.errors, status: :unprocessable_entity
    end
  end

  # DELETE /blogs/:id
  def destroy
    authorize @blog
    @blog.destroy
    head :no_content
  end
  
  def publish
    authorize @blog, :publish?
    
    if @blog.update(published: true)
      render json: @blog
    else
      render json: @blog.errors, status: :unprocessable_entity
    end
  end

  private
  
  def set_blog
    @blog = Blog.find(params[:id])
  end

  def blog_params
    params.require(:blog).permit(:title, :content, :published)
  end
end
