import create from "zustand";
import apiCall from "../api";
import { Pokemon, RootObject } from "../interfaces";

const pokemonListUrl = "https://pokeapi.co/api/v2/pokemon?limit=100"

interface colorInterface{
    [index: string]: string;
}

const stylesBack: colorInterface = {
	normal: 'rgba(168, 167, 122, 1)',
	fire: 'rgba(238, 129, 48, 1)',
	water: 'rgba(99, 144, 240, 1)',
	electric: 'rgba(247, 208, 44, 1)',
	grass: 'rgba(122, 199, 76, 1)',
	ice: 'rgba(150, 217, 214, 1)',
	fighting: 'rgba(194, 46, 40, 1)',
	poison: 'rgba(163, 62, 161, 1)',
	ground: 'rgba(226, 191, 101, 1)',
	flying: 'rgba(169, 143, 243, 1)',
	psychic: 'rgba(249, 85, 135, 1)',
	bug: 'rgba(166, 185, 26, 1)',
	rock: 'rgba(182, 161, 54, 1)',
	ghost: 'rgba(115, 87, 151, 1)',
	dragon: 'rgba(111, 53, 252, 1)',
	dark: 'rgba(112, 87, 70, 1)',
	steel: 'rgba(183, 183, 206, 1)',
	fairy: 'rgba(214, 133, 173, 1)',
};

const stylesType: colorInterface = {
	normal: '#C5C4A6',
	fire: '#F3AB75',
	water: '#97B5F5',
	electric: '#F9DF72',
	grass: '#A6D987',
	ice: '#B9E5E3',
	fighting: '#D6736F',
	poison: '#C17EC0',
	ground: '#EBD498',
	flying: '#C5B4F7',
	psychic: '#FB8DAF',
	bug: '#C3D066',
	rock: '#CEC079',
	ghost: '#A18FB9',
	dragon: '#9F78FD',
	dark: '#9F8F83',
	steel: '#CFCFDE',
	fairy: '#E3ADC8',
};

interface Context {
    pokemonList: Pokemon[],
    getPokemons: Function,
    isLoading: boolean,
    errorMessage: string, 
    hasError: boolean,
    colorBack: colorInterface,
    colorType: colorInterface,
	selectedPokemon: Pokemon,
	showDetail: boolean,
	showLoader: Function
}

export const usePokemonsStore = create<Context>((set, get) => ({
    pokemonList: [],
    getPokemons: async () => {
        try {
            set({isLoading: true, hasError: false, errorMessage: ""});
            const res:RootObject = await apiCall({url: pokemonListUrl});
            const pokamions = res.results.map(async (pokemon) =>{
                const poke = await apiCall({url: pokemon.url})
                return poke;
            });

            Promise.all(pokamions).then(results => {
                set({pokemonList: results, isLoading: false})
            });
        } catch (error) {
            set({ hasError: true, errorMessage: "Algo ha pasado" });
            set({isLoading: false}); 
        }finally{
        }
    },
    isLoading: false,
    errorMessage: '',
    hasError: false,
    colorBack: stylesBack,
    colorType: stylesType,
	selectedPokemon: {} as Pokemon,
	showDetail: false, 
	showLoader: () => {
		set({isLoading: true});
		setTimeout(() => {
			set({isLoading:false, showDetail:true})
		}, 0);
	}
}));