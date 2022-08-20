import React from "react";
import { View, Text } from "react-native";
import shallow from "zustand/shallow"
import { usePokemonsStore } from "../../stores/pokemon-store"

export const About = () => {
    const {  selectedPokemon } = usePokemonsStore(
        state => ({
            selectedPokemon: state.selectedPokemon
        }), shallow
    )

    return(
        <View className="h-full py-7" style={{ flex: 1 }}>
            <View className="flex-0 h-2/3 py-5 px-7 ">
                <View className="flex-1 flex-row">
                    <Text className="flex-1 text-lg font-medium text-gray-500">Species</Text>
                    <Text className="flex-1 text-lg w-2/3 capitalize">{selectedPokemon.species.name}</Text>
                </View>
                <View className="flex-1 flex-row">
                    <Text className="flex-1 text-lg font-medium text-gray-500">Height</Text>
                    <Text className="flex-1 text-lg w-2/3 capitalize">{selectedPokemon.height /10} mts</Text>
                </View>
                <View className="flex-1 flex-row">
                    <Text className="flex-1 text-lg font-medium text-gray-500">Weight</Text>
                    <Text className="flex-1 text-lg w-2/3 capitalize">{selectedPokemon.weight / 10} kg</Text>
                </View>
                <View className="flex-1 flex-row">
                    <Text className="flex-1 text-lg font-medium text-gray-500">Abilities</Text>
                    <Text className="flex-1 text-lg w-2/3 capitalize">{selectedPokemon.abilities.map(({ability})=> ability.name + ', ')}</Text>
                </View>
            </View>
        </View>
    );
}