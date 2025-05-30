class BlogPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user&.admin?
        # Admins can see all blogs
        scope.all
      elsif user
        # Users can see their own blogs
        scope.where(user_id: user.id)
      else
        # Public users can only see published blogs
        scope.where(published: true)
      end
    end
  end

  def index?
    true
  end

  # Authors can see their own blogs
  # Admins can see any blog
  def show?
    user&.admin? || record.user_id == user&.id
  end
  
  # Only logged in users can create blogs
  def create?
    user.present?
  end
  
  # Only authors or admins can update
  def update?
    user&.admin? || record.user_id == user&.id
  end
  
  # Only authors or admins can destroy
  def destroy?
    user&.admin? || record.user_id == user&.id
  end
  
  # Special action to handle publishing a blog
  def publish?
    update?
  end

  def unpublish?
    update?
  end
end