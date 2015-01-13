module Api
  module V1
    class AppointmentsController < ApplicationController

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
        if params[:position_id] && params[:day]
          if params[:day]
            @appointments = Appointment.of_positions(params[:position_id]).only_of_day(DateTime.parse(params[:day]))
          else
            @appointments = Appointment.of_positions(params[:position_id])
          end
        else
          @appointments = Appointment.all
        end
      end

      def show
        @appointment = Appointment.find(params[:id])
      end

      def new
      end

      def create
        @appointment = Appointment.new(appointment_params)
        if @appointment.save
          render :show, status: 201, location: api_v1_appointment_url(@appointment.id)
        else
          @errors = @appointment.errors
          render 'api/v1/422', status: 422
        end
      end

      def destroy
        @appointment = Position.find(params[:id])
        @appointment.destroy
        render nothing: true, status: 204
      end
      #------------------------------- Private ------------------------------
      private
      
      def appointment_params
        params.require(:appointment).permit(:position, :position_id, :start_time, :end_time, :kind)
      end
    end
  end
end
