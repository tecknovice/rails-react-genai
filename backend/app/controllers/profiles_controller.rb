class ProfilesController < ApplicationController
  before_action :authenticate_user!

  # GET /profile
  def show
    authorize current_user, policy_class: ProfilePolicy
    render json: current_user, serializer: UserSerializer
  end

  # PATCH/PUT /profile
  def update
    authorize current_user, policy_class: ProfilePolicy

    if current_user.update(profile_params)
      render json: UserSerializer.new(current_user).as_json, status: :ok 
    else
      render json: current_user.errors, status: :unprocessable_entity
    end
  end

  private
  # Only allow a list of trusted parameters through.
  def profile_params
    params.require(:profile).permit(:name, :email, :bio, :avatar, :password)
  end
end