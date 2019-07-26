require 'rails_helper'

RSpec.describe UsersListController, type: :controller do
  login_user
  render_views

  describe '#index' do
    subject { get :index, format: :json }

    describe 'successful response' do
      before { subject }
      it { expect(response).to be_successful }
      it { expect(response).to render_template('index') }
    end
  end

end
