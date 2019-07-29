require 'rails_helper'

RSpec.describe WellcomeController, type: :controller do
  describe '#index' do
    login_archived
    # it { expect(response).to redirect_to("/wellcome") }
    # it { expect(response).to render_template :archived }
    it 'redirects to archived' do
      get :index
      expect(response).to render_template("wellcome/archived")
    end
  end
end