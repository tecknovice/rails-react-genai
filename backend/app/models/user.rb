class User < ApplicationRecord
  devise :database_authenticatable,
         :registerable,
         :jwt_authenticatable,
         jwt_revocation_strategy: JwtDenylist

  # Role definition
  enum :role, { user: 'user', admin: 'admin' }
  
  # Set default role for new users
  after_initialize :set_default_role, if: :new_record?
  
  # User associations
  has_many :blogs, dependent: :destroy

  # Custom validations
  validates :email, presence: true, uniqueness: true, 
            format: { with: URI::MailTo::EMAIL_REGEXP, 
                     message: "must be a valid email address" }
  validates :password, length: { minimum: 8 }

  private
  
  def set_default_role
    self.role ||= :user
  end
end
