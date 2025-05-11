# app/controllers/users/registrations_controller.rb
class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    register_success && return if resource.persisted?

    register_failed(resource)
  end

  def register_success
    render json: { message: 'Signed up successfully.' }
  end

  def register_failed(resource)
    errors = resource.errors.full_messages
    render json: { 
      message: "Registration failed", 
      errors: errors 
    }, status: :unprocessable_entity
  end

  # 👇 Override Devise default behavior
  def sign_up(resource_name, resource)
    # Do nothing here to avoid session usage
  end
end
