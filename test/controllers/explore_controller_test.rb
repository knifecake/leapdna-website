require "test_helper"

class ExploreControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get explore_index_url
    assert_response :success
  end

  test "should get study" do
    get explore_study_url
    assert_response :success
  end

  test "should get population" do
    get explore_population_url
    assert_response :success
  end
end
