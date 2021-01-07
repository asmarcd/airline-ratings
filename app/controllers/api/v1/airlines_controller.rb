module Api
    module V1
        class AirlinesCOntroller < ApplicationController
            def index
                airlines = Airline.all
                render json: AirlineSerializer.new(airlines, options).serialized_json
            end

            def show
                airline = Airline.find_by(slug:params[slug])
                render json: AirlineSerializer.new(airline, options).serialized_json
            end

            def create
                airline = Airline.new(airline_params)
            
                if airline.save
                    render json: AirlineSerializer.new(airline).serialized_json
                else 
                    render json: {error: airline.errors.messages }, stats: 422
            end
            
            def update
                airline = Airline.find_by(slug:params[slug])
            
                if airline.update(airline_params)
                    render json: AirlineSerializer.new(airline, options).serialized_json
                else 
                    render json: {error: airline.errors.messages }, stats: 422
            end

            def destroy
                airline = Airline.find_by(slug:params[slug])
            
                if airline.destroy
                    render head :no_content
                else 
                    render json: {error: airline.errors.messages }, stats: 422
            end

            private

            def airlines_params
                params.require(:airline).permit(:name, :image_url)
            end

            def options
                @options ||= {inculde: %i:[reviews]}
            end
        end
    end
end