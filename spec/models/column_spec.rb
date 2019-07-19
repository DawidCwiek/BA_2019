require 'rails_helper'

RSpec.describe Column, type: :model do
  describe 'attributes' do
    it { expect(subject.attributes).to include('project_id') }
  end

end
