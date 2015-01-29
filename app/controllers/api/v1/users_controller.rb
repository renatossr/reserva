module Api
  module V1
    class UsersController < ApplicationController

      respond_to :json
      layout false
      skip_before_filter :verify_authenticity_token
      
      def create
        @user = User.new(user_params)
        if @user.save
          render :show, status: 201, location: api_v1_user_url(@user.id)
        else
          @errors = @user.errors
          render 'api/v1/422', status: 422
        end
      end

      private

      def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
      end
    end
  end
end
