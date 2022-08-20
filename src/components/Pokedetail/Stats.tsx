import React from "react"
import { View, Text } from "react-native"
import * as Progress from "react-native-progress";
import shallow from "zustand/shallow"
import { usePokemonsStore } from "../../stores/pokemon-store"

export const Stats = () => {
    const { selectedPokemon } = usePokemonsStore(
        state => ({
            selectedPokemon: state.selectedPokemon
        }), shallow
    )

    const colorBar = (v: number) => {
        return v >= 0.5 ? 'green' : 'red'
    }

    return(
        <View className="h-full pt-3 pb-7" style={{ flex: 1 }}>
            <View className="flex-1 pt-7">
                <View className="flex-1 px-7">
                    <View className="flex-row">
                        <Text className="flex-1 w-1/6 flex text-gray-400 font-medium">
                            HP
                        </Text>
                        <Text className="flex-1 w-1/6 font-medium">{selectedPokemon.stats[0].base_stat}</Text>
                        <Progress.Bar
                            className=" h-2 self-center"
                            progress={selectedPokemon.stats[0].base_stat/100}
                            color= {colorBar(selectedPokemon.stats[0].base_stat/100)}
                            width={200}
                        />
                    </View>
                </View>
                <View className="flex-1 px-7">
                    <View className="flex-row">
                        <Text className="flex-1 w-1/6 flex text-gray-400 font-medium">
                            Attack
                        </Text>
                        <Text className="flex-1 w-1/6 font-medium">{selectedPokemon.stats[1].base_stat}</Text>
                        <Progress.Bar
                            className=" h-2  self-center "
                            progress={selectedPokemon.stats[1].base_stat/100}
                            color= {colorBar(selectedPokemon.stats[1].base_stat/100)}
                            width={200}
                        />
                    </View>
                </View>
                <View className="flex-1 px-7">
                    <View className="flex-row">
                        <Text className="flex-1 w-1/6 flex text-gray-400 font-medium">
                            Defense
                        </Text>
                        <Text className="flex-1 w-1/6 font-medium">{selectedPokemon.stats[2].base_stat}</Text>
                        <Progress.Bar
                            className=" h-2  self-center "
                            progress={selectedPokemon.stats[2].base_stat/100}
                            color= {colorBar(selectedPokemon.stats[2].base_stat/100)}
                            width={200}
                        />
                    </View>
                </View>
                <View className="flex-1 px-7">
                    <View className="flex-row">
                        <Text className="flex-1 w-1/6 flex text-gray-400 font-medium">
                            Sp. Atk
                        </Text>
                        <Text className="flex-1 w-1/6 font-medium">{selectedPokemon.stats[3].base_stat}</Text>
                        <Progress.Bar
                            className=" h-2  self-center "
                            progress={selectedPokemon.stats[3].base_stat/100}
                            color= {colorBar(selectedPokemon.stats[3].base_stat/100)}
                            width={200}
                        />
                    </View>
                </View>
                <View className="flex-1 px-7">
                    <View className="flex-row">
                        <Text className="flex-1 w-1/6 flex text-gray-400 font-medium">
                            Sp. Def
                        </Text>
                        <Text className="flex-1 w-1/6 font-medium">{selectedPokemon.stats[4].base_stat}</Text>
                        <Progress.Bar
                            className=" h-2  self-center "
                            progress={selectedPokemon.stats[4].base_stat/100}
                            color= {colorBar(selectedPokemon.stats[4].base_stat/100)}
                            width={200}
                        />
                    </View>
                </View>
                <View className="flex-1 px-7">
                    <View className="flex-row">
                        <Text className="flex-1 w-1/6 flex text-gray-400 font-medium">
                            Speed
                        </Text>
                        <Text className="flex-1 w-1/6 font-medium">{selectedPokemon.stats[5].base_stat}</Text>
                        <Progress.Bar
                            className=" h-2  self-center "
                            color= {colorBar(selectedPokemon.stats[5].base_stat/100)}
                            progress={selectedPokemon.stats[5].base_stat/100}
                            width={200}
                        />
                    </View>
                </View>
                <View className="flex-1 px-7">
                    <View className="flex-row">
                        <Text className="flex-0 w-1/6 flex text-gray-400 font-medium">
                            Total
                        </Text>
                        <Text className="flex-0 w-1/6 font-medium">{selectedPokemon.stats.map((stat) => stat.base_stat).reduce((prev, curr) => prev + curr, 0)}</Text>
                        
                    </View>
                </View>
            </View>
        </View>
    );
}