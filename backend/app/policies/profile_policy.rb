class ProfilePolicy < ApplicationPolicy
  def show?
    # Users can view their own profile
    user.present?
  end
  
  def update?
    # Users can only update their own profile
    user.present? && user == record
  end
end