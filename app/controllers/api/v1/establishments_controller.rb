module Api
  module V1
    class EstablishmentsController < ApplicationController
      
      def index
        @establishments = Establishment.all
        if params[:search]
          @establishments = @establishments.where("name LIKE ?", '%' + params[:search] + '%')
        end
      end

      def show
        @establishment = Establishment.find(params[:id])
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
        @establishment = Establishment.find(params[:id])
        @establishment.destroy
        render nothing: true, status: 204
      end

      private

      def establishment_params
        params.require(:establishment).permit(:name)
      end

    end
  end
end
