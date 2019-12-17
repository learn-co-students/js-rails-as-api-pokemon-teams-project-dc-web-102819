class PokemonsController < ApplicationController
    
    def index
        
        pokemons = Pokemon.all
    
    end
    def create
        pokemon = Pokemon.create(pokemon_params)
        pokemon.nickname = Faker::Name.first_name
        pokemon.species = Faker::Games::Pokemon.name
        pokemon.save

        render json: pokemon
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.delete
    end

    private

    def pokemon_params
        params.require(:pokemon).permit(:trainer_id)
    end


end
