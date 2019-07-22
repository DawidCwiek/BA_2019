require 'rails_helper'

RSpec.describe 'projects/index', type: :view do
  let!(:project) { create(:project) }
  before do
    @projects = Project.all
    render template: 'projects/index'
  end

  subject { JSON.parse(rendered) }

  describe 'data' do
    it { expect(subject["data"].first.keys).to include('title', 'desc', 'key') }
    it { expect(subject["data"].first['title']).to eq(project.title) }
    it { expect(subject["data"].first['desc']).to eq(project.desc) }
    it { expect(subject["data"].first['key']).to eq(project.key) }
  end
end
