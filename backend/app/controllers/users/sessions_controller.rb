class Users::SessionsController < Devise::SessionsController
  respond_to :json

  def auth_failed
    puts "AUTH FAILED METHOD CALLED"
    render json: {
      message: 'Authentication failed',
      error: 'Invalid email or password'
    }, status: :unauthorized  # This returns 401 status code
  end

  private

  def respond_with(resource, _opts = {})
    # Get the JWT token from the Authorization header that devise-jwt adds
    token = request.env['warden-jwt_auth.token']

    render json: { 
      message: 'Logged in.', 
      user: resource.as_json(except: [:encrypted_password]), 
      token: token 
    }, status: :ok
  end

  def respond_to_on_destroy
    render json: { message: 'Logged out.' }, status: :ok
  end
  
  # Add this method to handle failed authentication
  def auth_options
    { scope: resource_name, recall: "#{controller_path}#auth_failed" }
  end
  
  
end
