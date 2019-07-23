require 'rails_helper'

RSpec.describe Projects::ColumnsController, type: :controller do
  login_user

  describe '#create' do
    let(:project) { create(:project) }
    let(:valid_attributes) { { column: attributes_for(:column, project_id: project.id), project_id: project.id } }
    let(:invalid_attributes) { { column: attributes_for(:column,project_id: project.id, name: nil) } }

    context 'valid attributes' do
      subject { post :create, params: valid_attributes, format: :json }
      
      it { expect { subject }.to change(Column, :count).by(1) }
    end

    # context 'invalid attributes' do
      # subject { post :create, params: invalid_attributes, format: :json}

      # it { expect(subject.status).to eq(422) }
      # it { expect { subject }.not_to change(Project, :count) }
    # end
  end
end
