require 'rails_helper'

RSpec.describe Projects::ColumnsController, type: :controller do
  login_user

  describe '#create' do
    let(:project) { create(:project) }
    let(:valid_attributes) { { column: attributes_for(:column, project_id: project.id), project_id: project.id } }
    let(:invalid_attributes) { { column: attributes_for(:column,project_id: project.id, name: nil), project_id: project.id } }

    context 'valid attributes' do
      subject { post :create, params: valid_attributes, format: :json }

      it { expect(response).to be_successful }
      it { expect { subject }.to change(Column, :count).by(1) }
    end

    context 'invalid attributes' do
      subject { post :create, params: invalid_attributes, format: :json}
      it { expect(subject.status).to eq(422) }
      it { expect { subject }.not_to change(Column, :count) }
    end
  end

  describe '#update' do
    let(:project) { create(:project) }
    let(:column) { create(:column, project_id: project.id) }

    let(:valid_attributes) { { id: column.id, column: attributes_for(:column, project_id: project.id), project_id: project.id } }
    let(:invalid_attributes) { { id: column.id, column: attributes_for(:column,project_id: project.id, name: nil), project_id: project.id } }

    context 'valid attributes' do
      before { put :update, params: valid_attributes, format: :json }

      it { expect(response).to be_successful }

      it 'updates column' do
        expect(column.reload.name).to eq(valid_attributes[:column][:name])
      end
    end

    context 'invalid attributes' do
      subject { post :create, params: invalid_attributes, format: :json}
      it { expect(subject.status).to eq(422) }
      it { expect { subject }.not_to change(column, :name) }
    end
  end
end
