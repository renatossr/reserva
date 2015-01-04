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
        
      end
    end
  end
end
