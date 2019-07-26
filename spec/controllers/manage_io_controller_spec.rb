require 'rails_helper'

RSpec.describe ManageIoController, type: :controller do

  describe '#index' do
    login_user
    subject { get :index }

    describe 'successful response' do
      before { subject }
      it { expect(response).to be_successful }
      it { expect(response).to render_template('index') }
    end
  end

  # describe '#project' do
  #   let!(:project) { create(:project) }
  #   subject { get :project, params: {id: project.id} }
  #
  #   describe 'user should not be project' do
  #     login_user
  #     before { subject }
  #     it { expect(response).to be_successful }
  #     it { expect(response).to render_template('manage_io/index') }
  #   end
  # end
  #
  # describe '#task' do
  #   let!(:task) { create(:task) }
  #   subject { get :task, params: {id: task.id} }
  #
  #   describe 'user should not be project' do
  #     login_user
  #     before { subject }
  #     it { expect(response).to be_successful }
  #     it { expect(response).to render_template('manage_io/index') }
  #   end
  # end
end
