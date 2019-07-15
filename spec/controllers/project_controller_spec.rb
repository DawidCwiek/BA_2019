require 'rails_helper'

RSpec.describe ProjectController, type: :controller do
  render_views

  describe 'index' do
    subject { get :index, format: :json }

    describe 'index' do
      before { subject }
      it { expect(response).to be_successful }
      it { expect(response).to render_template('index') }
    end

  end
end
