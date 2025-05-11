class UserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      # Only admins can list users
      user&.admin? ? scope.all : scope.none
    end
  end
  
  # Users can view their own profile, admins can view any profile
  def show?
    user&.admin? || record.id == user&.id
  end
  
  # Users can update their own profile, admins can update any profile
  def update?
    user&.admin? || record.id == user&.id
  end
  
  # Only admins can destroy users
  def destroy?
    user&.admin?
  end
  
  # Only admins can change roles
  def update_role?
    user&.admin?
  end
end