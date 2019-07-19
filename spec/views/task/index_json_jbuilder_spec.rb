require 'rails_helper'

RSpec.describe 'task/index', type: :view do
  let!(:task) { create(:task) }
  before do
    @tasks = Task.all
    render template: 'task/index'
  end

  subject { JSON.parse(rendered) }

  describe 'data' do
    it { expect(subject["data"].first.keys).to include('title', 'desc') }
    it { expect(subject["data"].first['title']).to eq(task.title) }
    it { expect(subject["data"].first['desc']).to eq(task.desc) }
  end
end
