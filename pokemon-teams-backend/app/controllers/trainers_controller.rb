class TrainersController < ApplicationController

    def index
        trainers = Trainer.all

        render json: trainers.to_json(include: :pokemons)
    end

    def show
        trainer = Trainer.find(params[:id])

        render json: trainer.to_json(include: :pokemons)
    end
end
