class BlogPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user&.admin?
        # Admins can see all blogs
        scope.all
      elsif user
        # Users can see all published blogs plus their own unpublished blogs
        scope.where(published: true).or(scope.where(user_id: user.id))
      else
        # Public users can only see published blogs
        scope.where(published: true)
      end
    end
  end
  
  # Anyone can see a published blog
  # Authors can see their unpublished blogs
  # Admins can see any blog
  def show?
    record.published? || user&.admin? || record.user_id == user&.id
  end
  
  # Only logged in users can create blogs
  def create?
    !user.nil?
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
end