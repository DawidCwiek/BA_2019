require 'rails_helper'

RSpec.describe WelcomeController, type: :controller do
  describe '#index' do
    login_archived
    it 'redirects to archived' do
      get :index
      expect(response).to render_template("welcome/archived")
    end
  end
end