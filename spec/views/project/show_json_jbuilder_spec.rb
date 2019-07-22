require 'rails_helper'

RSpec.describe 'projects/show', type: :view do
  let!(:project) { create(:project) }
  before do
    @projects = Project.find(project.id)
    render template: 'projects/show', id: project.id
  end

  subject { JSON.parse(rendered) }

  describe 'data' do
    it { expect(subject["data"].keys).to include('title', 'desc', 'key') }
    it { expect(subject["data"]['title']).to eq(project.title) }
    it { expect(subject["data"]['desc']).to eq(project.desc) }
    it { expect(subject["data"]['key']).to eq(project.key) }
  end
end
