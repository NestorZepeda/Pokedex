import React from "react";
import { View, Text } from "react-native";
import Animated from "react-native-reanimated";
import shallow from "zustand/shallow"
import { usePokemonsStore } from "../../stores/pokemon-store"

export const Moves = () => {
    const { colorBack, selectedPokemon } = usePokemonsStore(
        state => ({
            colorBack: state.colorBack,
            selectedPokemon: state.selectedPokemon
        }), shallow
    )

    return(
        <View className="h-full" style={{ flex: 1 }}>
            {
                <Animated.FlatList
                contentContainerStyle={{ paddingVertical: 15, justifyContent: 'space-around', paddingHorizontal: 15 }}
                className=''
                numColumns={2}
                data={selectedPokemon.moves}
                keyExtractor={(item) => item.move.name}
                renderItem={({ item, index }) => {
                    return (
                        <Text className="px-3 m-2 py-1 font-medium text-lg capitalize self-start opacity-100 text-white rounded" style={{ backgroundColor: colorBack[`${selectedPokemon.types[0].type.name}`] || 'white' }}>
                                {item.move.name}
                        </Text>
                    );
                }}
            ></Animated.FlatList>
            }
        </View>
    );
}