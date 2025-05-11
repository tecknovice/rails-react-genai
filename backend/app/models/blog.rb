class Blog < ApplicationRecord
  belongs_to :user
  
  # Validations
  validates :title, presence: true
  validates :content, presence: true
  
  # Scope for published blogs (useful for queries)
  scope :published, -> { where(published: true) }
  
  # Helper method to check if blog is published
  def published?
    published == true
  end
end
