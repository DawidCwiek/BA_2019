require 'rails_helper'

RSpec.describe TaskController, type: :controller do
  render_views

  context 'USER' do
    login_user

    describe '#index' do
      subject { get :index, format: :json }

      describe 'successful response' do
        before { subject }
        it { expect(response).to be_successful }
        it { expect(response).to render_template('index') }
      end
    end

    describe '#show' do
      let!(:task) { create(:task) }
      before { get :show, params: { id: task.id }, format: :json }

      describe 'successful response' do
        it { expect(response).to be_successful }
        it { expect(response).to render_template('show') }
      end

      context 'task' do
        it 'returns one project by given id' do
          expect(assigns(:task)).to eq(task)
        end
      end
    end

    describe '#create' do
      let!(:project) { create(:project, user_ids: controller.current_user.id) }
      let!(:valid_attributes) { { task: attributes_for(:task, project_id: project.id) } }
      let!(:invalid_attributes) { { task: attributes_for(:task, title: nil, project_id: project.id) } }

      context 'valid attributes' do
        subject { post :create, params: valid_attributes, format: :json }
        it { expect(subject).to render_template('show') }
        it { expect { subject }.to change(Task, :count).by(1) }
      end

      context 'invalid attributes' do
        subject { post :create, params: invalid_attributes, format: :json}

        it { expect(subject.status).to eq(422) }
        it { expect { subject }.not_to change(Task, :count) }
      end
    end

    describe 'update' do
      let(:project) { create(:project, user_ids: controller.current_user.id) }
      let(:task) { create(:task, project_id: project.id) }
      let(:valid_attributes) { { id: task.id, task: attributes_for(:task, project_id: project.id) } }
      let(:invalid_attributes) { { id: task.id, task: attributes_for(:task, project_id: project.id, title: nil) } }

      context 'valid attributes' do
        subject { put :update, params: valid_attributes, format: :json }

        it { expect(subject.status).to render_template('show') }


        it 'updates task' do
          subject
          expect(task.reload.title).to eq(valid_attributes[:task][:title])
          expect(task.reload.desc).to eq(valid_attributes[:task][:desc])
        end
      end

      context 'invalid attributes' do
        subject { put :update, params: invalid_attributes, format: :json }

        it { expect(subject.status).to eq(422) }
        it { expect { subject }.not_to change(task, :title) }
      end
    end
  end

  context 'Admin' do
    login_admin

    describe '#create' do
      let!(:project) { create(:project) }
      let!(:valid_attributes) { { task: attributes_for(:task, project_id: project.id) } }
      let!(:invalid_attributes) { { task: attributes_for(:task, title: nil, project_id: project.id) } }

      context 'valid attributes' do
        subject { post :create, params: valid_attributes, format: :json }
        it { expect(subject).to render_template('show') }
        it { expect { subject }.to change(Task, :count).by(1) }
      end

      context 'invalid attributes' do
        subject { post :create, params: invalid_attributes, format: :json}

        it { expect(subject.status).to eq(422) }
        it { expect { subject }.not_to change(Task, :count) }
      end
    end

    describe 'update' do
      let(:project) { create(:project) }
      let(:task) { create(:task, project_id: project.id) }
      let(:valid_attributes) { { id: task.id, task: attributes_for(:task, project_id: project.id) } }
      let(:invalid_attributes) { { id: task.id, task: attributes_for(:task, project_id: project.id, title: nil) } }

      context 'valid attributes' do
        subject { put :update, params: valid_attributes, format: :json }

        it { expect(subject.status).to render_template('show') }


        it 'updates task' do
          subject
          expect(task.reload.title).to eq(valid_attributes[:task][:title])
          expect(task.reload.desc).to eq(valid_attributes[:task][:desc])
        end
      end

      context 'invalid attributes' do
        subject { put :update, params: invalid_attributes, format: :json }

        it { expect(subject.status).to eq(422) }
        it { expect { subject }.not_to change(task, :title) }
      end
    end
  end
end
