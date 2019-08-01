require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  login_user
  describe '#archive' do
    let(:user) { create(:user) }
    before { get :archive_user, params: { id: user.id } }
    it { expect(user.reload.archived).to eq(true) }
    it { expect(user.reload.admin).to eq(nil) }
    it { expect(user.reload.active).to eq(true) }
  end
end
