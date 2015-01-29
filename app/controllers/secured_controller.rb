require 'auth_token'
class SecuredController < ActionController::Base
  before_action :set_current_user, :authenticate_request

  class InvalidTokenError < StandardError; end
  class NotAuthenticatedError < StandardError; end
  class AuthenticationTimeoutError < StandardError; end

  rescue_from InvalidTokenError do
    render json: { error: 'Not Authorized' }, status: :unauthorized
  end
  rescue_from NotAuthenticatedError do
    render json: { error: 'Not Authorized' }, status: :unauthorized
  end
  rescue_from AuthenticationTimeoutError do
    render json: { error: 'Auth token is expired' }, status: 419 # unofficial timeout status code
  end

  private

  def set_current_user
    if decoded_auth_token
      @current_user ||= User.find(decoded_auth_token[:user_id])
    end
  end

  def authenticate_request
    if auth_token_expired?
      fail AuthenticationTimeoutError
    elsif !current_user
      fail NotAuthenticatedError
    end
  end

  def decoded_auth_token
    @decoded_auth_token ||= AuthToken.decode(http_auth_header_content)
  end

  def auth_token_expired?
    decoded_auth_token && decoded_auth_token.expired?
  end

  def http_auth_header_content
    return @http_auth_header_content if defined? @http_auth_header_content
    
    authorization = request.headers['Authorization']
    raise InvalidTokenError if authorization.nil?
    @http_auth_header_content = authorization.split(' ').last
  end
end
