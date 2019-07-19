# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'attributes' do
    it { expect(subject.attributes).to include('full_name') }
  end

  describe 'validation' do
    it { is_expected.to validate_presence_of(:full_name) }
  end

end
