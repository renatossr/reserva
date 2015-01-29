module Api
  module V1
    class ProfilesController < SecuredController

      respond_to :json
      layout false
      skip_before_filter :verify_authenticity_token

      # Deixei isto aqui pq terá que ser feito algo para erros 500 e erros 404, unica coisa que Rails 4 não faz
      # 500 eh erro interno do servidor e 404? 404 == registro não encontrado ---> saquei
      # rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found
      # rescue_from Exception, :with => :internal_server_error
      # def unauthorized
      #  render 'api/v1/401', :status => :unauthorized
      # end

      def show
        @profile = Profile.find(params[:id])
      end

      def me
        if @current_user
          render json: { user: { id: @current_user.id, name: @current_user.profile.name, role: @current_user.role }}
        end
      end

      def new
      end

      def create
        @profile = Profile.new(position_params)
        if @profile.save
          render :show, status: 201, location: api_v1_profile_url(@profile.id)
        else
          @errors = @profile.errors
          render 'api/v1/422', status: 422
        end
      end

      def destroy
        @profile = Profile.find(params[:id])
        @profile.destroy
        render nothing: true, status: 204
      end
      #------------------------------- Private ------------------------------
      private
      
      def profile_params
        params.require(:profile).permit(:name, :email)
      end
    end
  end
end
