require "test_helper"

class ConvertControllerTest < ActionDispatch::IntegrationTest
  test "should get inde" do
    get convert_inde_url
    assert_response :success
  end
end
