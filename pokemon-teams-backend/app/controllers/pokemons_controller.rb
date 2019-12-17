class PokemonsController < ApplicationController

    before_action :get_pokemon, only: :destroy

    def create
        name = Faker::Name.first_name
        poke_species = Faker::Games::Pokemon.name
        
        new_pokemon = Pokemon.create(
            trainer_id: params[:trainer_id],
            nickname: name,
            species: poke_species
        )
        render json: new_pokemon.to_json(include: :trainer)
    end

    def index
        pokemon = Pokemon.all
        render json: pokemon.to_json(include: :trainer)
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        render json: pokemon.to_json(include: :trainer)
    end

    private

    # def get_pokemon
    #     pokemon = Pokemon.find(params[:id])
    # end

end
