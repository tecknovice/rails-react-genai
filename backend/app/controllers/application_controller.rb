class ApplicationController < ActionController::API

  def authenticate_user!
    return if user_signed_in?
    render json: { error: "You need to sign in before continuing." }, status: :unauthorized  
  end
  
  include Pundit::Authorization
  
  # Handle Pundit authorization errors
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  
  private
  
  def user_not_authorized
    render json: { error: "You are not authorized to perform this action" }, status: :forbidden
  end

end
