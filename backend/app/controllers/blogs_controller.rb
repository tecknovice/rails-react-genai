class BlogsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_blog, only: [:show, :update, :destroy]

  # GET /blogs
  def index
    @blogs = Blog.all
    render json: @blogs
  end

  # GET /blogs/:id
  def show
    render json: @blog
  end

  # POST /blogs
  def create
    @blog = current_user.blogs.build(blog_params)
    if @blog.save
      render json: @blog, status: :created
    else
      render json: @blog.errors, status: :unprocessable_entity
    end
  end

  # PUT /blogs/:id
  def update
    if @blog.user == current_user && @blog.update(blog_params)
      render json: @blog
    else
      render json: @blog.errors, status: :unauthorized
    end
  end

  # DELETE /blogs/:id
  def destroy
    if @blog.user == current_user
      @blog.destroy
      head :no_content
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  private

  def set_blog
    @blog = Blog.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Blog not found" }, status: :not_found
  end

  def blog_params
    params.require(:blog).permit(:title, :content)
  end
end
