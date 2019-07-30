module ControllerMacros

  def login_user
    before(:each) do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      user = FactoryBot.create(:user, active: true)
      sign_in user
    end
  end

  def login_admin
    before(:each) do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      user = FactoryBot.create(:user, super_admin: true, active: true)
      sign_in user
    end
  end

  def login_archived
    before(:each) do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      user = FactoryBot.create(:user, active: false, archived: true, admin: nil, super_admin: nil)
      sign_in user
    end
  end
end
