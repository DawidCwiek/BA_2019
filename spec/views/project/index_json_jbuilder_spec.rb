require 'rails_helper'

RSpec.describe 'project/index', type: :view do
  let!(:project) { create(:project) }
  before do
    @projects = Project.all
    render template: 'project/index'
  end

  subject { JSON.parse(rendered) }

  describe 'data' do
    it { expect(subject.first.keys).to include('title', 'desc', 'key') }
    it { expect(subject.first['title']).to eq(project.title) }
    it { expect(subject.first['desc']).to eq(project.desc) }
    it { expect(subject.first['key']).to eq(project.key) }
  end
end
