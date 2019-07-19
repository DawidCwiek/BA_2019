require 'rails_helper'

RSpec.describe 'project/show', type: :view do
  let!(:project) { create(:project) }
  before do
    @project = Project.find(project.id)
    render template: 'project/show', id: project.id
  end

  subject { JSON.parse(rendered) }

  describe 'data' do
    it { expect(subject["data"].keys).to include('title', 'desc', 'key') }
    it { expect(subject["data"]['title']).to eq(project.title) }
    it { expect(subject["data"]['desc']).to eq(project.desc) }
    it { expect(subject["data"]['key']).to eq(project.key) }
  end
end
