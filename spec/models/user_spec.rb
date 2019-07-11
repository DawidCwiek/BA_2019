require "rails_helper"

RSpec.describe User, :type => :model do

  describe 'attributes' do
    it { expect(subject.attributes).to include('name', 'surname') }
  end

  describe 'validation' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:surname) }
  end

  describe '#fullname' do
    let(:user) { create(:user) }

    it 'return user fullname' do
     expect(user.fullname).to eq("#{user.name} #{user.surname}")
    end
  end

end
