require "test_helper"

class PopulationTest < ActiveSupport::TestCase
  test "build population tree" do
    p1 = Population.create(id: 'p1')
    p2 = Population.create(id: 'p2')
    p11 = Population.create(id: 'p11', parent: p1)
    p12 = Population.create(id: 'p12', parent: p1)
    p21 = Population.create(id: 'p21', parent: p2)
    p111 = Population.create(id: 'p111', parent: p11)
  end
end
