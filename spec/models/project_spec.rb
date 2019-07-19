# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Project, type: :model do
  describe 'attributes' do
    it { expect(subject.attributes).to include('title', 'desc', 'key') }
  end

  describe 'validation' do
    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_presence_of(:desc) }
    it { is_expected.to validate_presence_of(:key) }
  end
end
