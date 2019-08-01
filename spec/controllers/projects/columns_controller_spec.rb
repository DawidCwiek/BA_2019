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
      subject { put :update, params: invalid_attributes, format: :json}
      it { expect(subject.status).to eq(422) }
      it { expect { subject }.not_to change(column, :name) }
    end
  end

  describe '#destroy' do
    let!(:column) { create(:column) }
    subject { delete :destroy, params: { id: column.id, project_id: column.project }, format: :json }

    context 'can destroy' do
      let!(:column2) { create(:column, project_id: column.project.id) }
      it 'project have > 1 columns' do
        expect(Project.last.columns_order).to eq([column.id, column2.id])
        expect { subject }.to change(Column, :count).by(-1)
        expect(Project.last.columns_order).to eq([column2.id])
      end
    end

    context 'can not destroy' do
      it 'project have one column' do
        expect { subject }.to change(Column, :count).by(0)
      end

      describe 'project have > 1 columns, but columns have task' do
        let(:task) {create(:task, project_id: column.project_id, column_id: column.id)}
        it 'no deletes column' do
          task
          expect { subject }.to change(Column, :count).by(0)
        end
      end

    end
  end
end
