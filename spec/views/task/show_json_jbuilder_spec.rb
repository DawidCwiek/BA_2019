require 'rails_helper'

RSpec.describe 'task/show', type: :view do
  let!(:task) { create(:task) }
  before do
    @task = Task.find(task.id)
    render template: 'task/show', id: task.id
  end

  subject { JSON.parse(rendered) }

  describe 'data' do
    it { expect(subject.keys).to include('title', 'desc', 'isEpik') }
    it { expect(subject['title']).to eq(task.title) }
    it { expect(subject['desc']).to eq(task.desc) }
  end
end
