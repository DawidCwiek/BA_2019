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

  describe '#move_column!' do
    let!(:project) { create(:project) }
    let!(:column1) { create(:column, project_id: project.id) }
    let!(:column2) { create(:column, project_id: project.id) }
    let!(:column3) { create(:column, project_id: project.id) }
    let!(:column4) { create(:column, project_id: project.id) }

    it { expect(Project.last.columns_order).to eq([column1.id, column2.id, column3.id, column4.id]) }

    it 'run 1' do
      Project.last.move_column!(column3.id, 1)
      expect(Project.last.columns_order).to eq([column1.id, column3.id, column2.id, column4.id])
    end

    it 'run 2' do
      Project.last.move_column!(column1.id, 3)
      expect(Project.last.columns_order).to eq([column2.id, column3.id, column1.id, column4.id])
    end

    it 'run 3' do
      Project.last.move_column!(column4.id, 1)
      expect(Project.last.columns_order).to eq([column1.id, column4.id, column2.id, column3.id])
    end

  end

end
