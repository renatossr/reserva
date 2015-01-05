module Api
  module V1
    class PositionsController < ApplicationController
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
        @position = Establishment.new(position_params)
        if @position.save
          render json: @position, status: 201, location: api_v1_position_url(@position.id)
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
        params.require(:position).permit(:name, :establishment)
      end
    end
  end
end
