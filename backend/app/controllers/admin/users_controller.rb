module Admin
  class UsersController < ApplicationController
    before_action :authenticate_user!
    before_action :set_user, only: [:show, :update, :destroy]
    
    def index
      @users = policy_scope(User)
      render json: @users
    end
    
    def show
      authorize @user
      render json: @user
    end
    
    def update
      authorize @user
      
      # Check for role changes specifically
      if user_params[:role].present?
        authorize @user, :update_role?
      end
      
      if @user.update(user_params)
        render json: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end
    
    def destroy
      authorize @user
      @user.destroy
      head :no_content
    end
    
    private
    
    def set_user
      @user = User.find(params[:id])
    end
    
    def user_params
      params.require(:user).permit(:email, :role)
    end
  end
end