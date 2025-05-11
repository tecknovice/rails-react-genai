class ChildController < ApplicationController
  before_action :authenticate_user!, except: [:unprotected]
  
  def protected
      render json: {message: 'This is a protected route'}
  end  

  def unprotected
    render json: { message: 'This is unprotected route' }
  end

end