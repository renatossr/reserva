module Api
  module V1
    class PositionsController < ApplicationController

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

      def index
        if params[:establishment_id]
          @establishment = Establishment.find(params[:establishment_id])
          @positions = @establishment.positions.all
        else
          @positions = Position.all
        end
      end

      def show
        @position = Position.find(params[:id])
      end

      def new
      end

      def create
        @position = Position.new(position_params)
        if @position.save
          render :show, status: 201, location: api_v1_position_url(@position.id)
        else
          @errors = @position.errors
          render 'api/v1/422', status: 422
        end
      end

      def destroy
        @position = Position.find(params[:id])
        @position.destroy
        render nothing: true, status: 204
      end
      #------------------------------- Private ------------------------------
      private
      
      def position_params
        params.require(:position).permit(:name, :establishment, :establishment_id)
      end
    end
  end
end
