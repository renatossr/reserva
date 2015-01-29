module Api
  module V1
    class AuthenticationController < ApplicationController

      respond_to :json
      layout false
      skip_before_filter :verify_authenticity_token
      skip_before_action :authenticate_request
      
      def authenticate
        user = login(params[:email], params[:password])
        if user
          render json: { auth_token: user.generate_auth_token, user: { id: user.id, name: user.profile.name, role: user.role }}
        else
          @errors = { message: 'Email or Password does not match' }
          render 'api/v1/422', status: 422
        end
      end

      def destroy
        logout
        render nothing: true, status: 204
      end   
    end
  end
end
