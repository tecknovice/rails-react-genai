class ApplicationController < ActionController::API
  respond_to :json

  # Method to check if the user is authenticated
  def authenticate_user!
    return if user_signed_in?
    
    render json: { 
      message: 'You need to sign in before continuing',
      error: 'Unauthorized'
    }, status: :unauthorized
  end
  
end
