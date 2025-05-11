class User < ApplicationRecord
  devise :database_authenticatable,
         :registerable,
         :jwt_authenticatable,
         jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null

  has_many :blogs, dependent: :destroy

  # Custom validations
  validates :email, presence: true, uniqueness: true, 
            format: { with: URI::MailTo::EMAIL_REGEXP, 
                     message: "must be a valid email address" }
  validates :password, length: { minimum: 8 }
end
