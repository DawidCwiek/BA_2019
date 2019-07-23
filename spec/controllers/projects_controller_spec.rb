require 'rails_helper'

RSpec.describe ProjectsController, type: :controller do
  render_views
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
    let!(:project) { create(:project) }
    before { get :show, params: { id: project.id }, format: :json }

    describe 'successful response' do
      it { expect(response).to be_successful }
      it { expect(response).to render_template('show') }
    end

    context 'project' do
      it 'returns one project by given id' do
        expect(assigns(:projects)).to eq(project)
      end
    end
  end

  describe '#create' do
    let(:valid_attributes) { { project: attributes_for(:project) } }
    let(:invalid_attributes) { { project: attributes_for(:project, title: nil) } }

    context 'valid attributes' do
      subject { post :create, params: valid_attributes, format: :json }

      it { expect(subject).to render_template('show') }
      it { expect { subject }.to change(Project, :count).by(1) }
    end

    context 'invalid attributes' do
      subject { post :create, params: invalid_attributes, format: :json}

      it { expect(subject.status).to eq(422) }
      it { expect { subject }.not_to change(Project, :count) }
    end
  end

  describe '#update' do
    let(:project) { create(:project) }
    let(:valid_attributes) { { id: project.id, project: attributes_for(:project) } }
    let(:invalid_attributes) { { id: project.id, project: attributes_for(:project, title: nil) } }

    context 'valid attributes' do
      subject { put :update, params: valid_attributes, format: :json }

      it { expect(subject.status).to render_template('show') }


      it 'updates project' do
        subject
        expect(project.reload.title).to eq(valid_attributes[:project][:title])
        expect(project.reload.desc).to eq(valid_attributes[:project][:desc])
        expect(project.reload.key).to eq(valid_attributes[:project][:key])
      end
    end

    context 'invalid attributes' do
      subject { put :update, params: invalid_attributes, format: :json }

      it { expect(subject.status).to eq(422) }
      it { expect { subject }.not_to change(project, :title) }
    end
  end

  describe '#destroy' do
    let(:project) { create(:project) }
    subject { delete :destroy, params: { id: project.id }, format: :json }


    it 'deletes project' do
      project
      expect { subject }.to change(Project, :count).by(-1)
    end
  end

  describe '#archive' do
    let(:project) { create(:project) }
    before { get :archive, params: { id: project.id } }
    it { expect(project.reload.archived).to eq(true) }
  
  end
end
