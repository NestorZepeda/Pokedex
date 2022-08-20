import { View } from "react-native";
import Animated, {  SlideInLeft, SlideOutLeft } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import shallow from "zustand/shallow";
import { usePokemonsStore } from "../../stores/pokemon-store";
import { PokeCard } from "./PokeCard";

export const Pokedex = () => {
    const { pokemonList } = usePokemonsStore(
        state => ({
            pokemonList: state.pokemonList
        }), shallow
    )
    const insert = useSafeAreaInsets();
    
    return (
        <View className="flex-1 px-1 bg-white" style={{ paddingTop: insert.top }}>
            <Animated.Text
                entering={SlideInLeft.delay(100)}
                exiting={SlideOutLeft}
                className='my-5 text-gray-700 w-min self-start px-2 font-bold text-3xl'
            >
                Pokedex
            </Animated.Text>
            <Animated.FlatList
                contentContainerStyle={{ paddingVertical: 15 }}
                className=''
                numColumns={2}
                data={pokemonList}
                keyExtractor={(item) => item.name}
                renderItem={({ item, index }) => {
                    return (
                        <PokeCard item={item} />
                    );
                }}
            >

            </Animated.FlatList>
        </View>
    );
};
