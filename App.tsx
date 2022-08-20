import { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TailwindProvider } from 'tailwindcss-react-native';
import { Loader } from './src/components/Loader';
import { usePokemonsStore } from './src/stores/pokemon-store';
import shallow from 'zustand/shallow'
import { PokeDetail } from './src/components/Pokedetail/';
import { Pokedex } from './src/components/Pokedex/';
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated';

export default function App() {
	const { getPokemons, isLoading, showDetail } = usePokemonsStore(
		state => ({
			getPokemons: state.getPokemons,
			isLoading: state.isLoading,
			showDetail: state.showDetail
		}), shallow
	)
	useEffect(() => {
		getPokemons();
	}, []);

	if (isLoading) {
		return (
			<TailwindProvider>
				<SafeAreaProvider>
					<Loader />
				</SafeAreaProvider>
			</TailwindProvider>
		)
	}
	return (
		<TailwindProvider>
			<SafeAreaProvider className='bg-white'>
				<View className='flex-1 h-full border'>
					{
						!showDetail ?
						<Pokedex /> :
						<Animated.View
							entering={SlideInRight}
							exiting={SlideOutRight}
						>
							<PokeDetail />
						</Animated.View>
					}
				</View>
			</SafeAreaProvider>
		</TailwindProvider>
	);
}