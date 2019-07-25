require 'rails_helper'

RSpec.describe AdministratorsController, type: :controller do
    login_admin

    describe '#activate_user' do
        let(:user) { create(:user) }
        subject { patch :activate_user, params: { id: user.id }, format: :json }

        describe 'successful change' do
            before {subject}
            it { expect(response).to be_successful }
            it { expect(User.last.active).to eq(true) }
        end
    end

    describe '#add_admin' do
        let(:user) { create(:user) }
        subject { patch :add_admin, params: { id: user.id }, format: :json }

        describe 'successful add admin' do
            before {subject}
            it { expect(response).to be_successful }
            it { expect(User.last.admin).to eq(true) }
        end
    end

        describe '#remove_admin' do
            let(:user) { create(:user, admin: true) }
            subject { patch :remove_admin, params: { id: user.id }, format: :json }

            describe 'successful remove admin' do
                before {subject}
                it { expect(response).to be_successful }
                it { expect(User.last.admin).to eq(false) }
            end
    end
end
