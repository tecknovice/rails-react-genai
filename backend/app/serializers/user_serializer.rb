class UserSerializer
  def initialize(user)
    @user = user
  end

  def as_json
    {
      id: @user.id,
      email: @user.email,
      name: @user.name,
      bio: @user.bio,
      avatar: @user.avatar,
      role: @user.role,
      created_at: @user.created_at,
      updated_at: @user.updated_at
    }
  end
end