require "rails_helper"

RSpec.describe Project, :type => :model do

  describe 'attributes' do
    it { expect(subject.attributes).to include('title', 'desc', 'key', 'user_id') }
  end

  describe 'validation' do
    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_presence_of(:desc) }
    it { is_expected.to validate_presence_of(:key) }
    it { is_expected.to validate_presence_of(:user_id) }
  end

end
