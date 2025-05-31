class BlogsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_blog, only: [:show, :update, :destroy, :publish, :unpublish]

  # Regular CRUD actions
  
  # GET /blogs
  def index
    @blogs = policy_scope(Blog)
    authorize @blogs
    render json: @blogs
  end

  # GET /blogs/:id
  def show
    authorize @blog
    render json:  @blog
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

  def unpublish
    authorize @blog, :unpublish?
    if @blog.update(published: false)
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
    params.require(:blog).permit(:title, :content, :published, :prompt)
  end
end
