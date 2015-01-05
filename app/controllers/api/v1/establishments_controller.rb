module Api
  module V1
    class EstablishmentsController < ApplicationController
      
      before_action :find_establishment, only: [:show, :destroy]
      
      def index
        @establishments = Establishment.all
        if params[:search]
          @establishments = @establishments.where("name LIKE ?", '%' + params[:search] + '%')
        end
      end

      def show

      end

      def create
        @establishment = Establishment.new(establishment_params)
        if @establishment.save
          render json: @establishment, status: 201, location: api_v1_establishment_url(@establishment.id)
        else
          @errors = @establishment.errors
          render 'api/v1/422', status: 422
        end
      end

      def destroy
        @establishment.destroy
        render nothing: true, status: 204
      end

      # ---------------------------- Private ---------------------------------
      private

      def establishment_params
        params.require(:establishment).permit(:name)
      end

      def find_establishment
        @establishment = Establishment.find(params[:id])
      end
    end
  end
end
