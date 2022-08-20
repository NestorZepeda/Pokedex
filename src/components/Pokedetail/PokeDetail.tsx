import Animated, { ZoomInLeft } from "react-native-reanimated";
import {
    View,
    TouchableOpacity,
    Text,
    useWindowDimensions,
    StyleSheet
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import React, { useState } from "react";
import { Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { usePokemonsStore } from "../../stores/pokemon-store";
import shallow from "zustand/shallow";
import { About } from "./About";
import { Stats } from "./Stats";
import { Moves } from "./Moves";

export const PokeDetail = () => {
    const { colorBack, colorType, selectedPokemon } = usePokemonsStore(
        state => ({
            colorBack: state.colorBack,
            colorType: state.colorType,
            selectedPokemon: state.selectedPokemon
        }), shallow
    )
    const insert = useSafeAreaInsets();
    const layout = useWindowDimensions();


    const FirstRoute = () => (
        <About/>
    );

    const SecondRoute = () => (
        <Stats/>
    );

    const ThirdRoute = () => (
        <Moves/>
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
    });

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: "first", title: "About" },
        { key: "second", title: "Base Stats" },
        { key: "third", title: "Moves" }
    ]);

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "blue" }}
            style={{ backgroundColor: "white" }}
            labelStyle={{ color: "black", fontSize: 12 }}
            pressColor="#FFF"
            pressOpcity={1}
            inactiveColor="gray"
        />
    );

    let styles = StyleSheet.create({
        box: {
            alignSelf: 'center',
            border: 0,
            backgroundColor: colorBack[`${selectedPokemon.types[0].type.name}`],
            height: 198,
            width: 198,
            shadowColor: "black",
            shadowOffset: {
                width: 100,
                height: 100,
            },
            shadowOpacity: 0.5,
            shadowRadius: 30,
            elevation: 20
        },
        pokeball:{ width: 190, height: 190, opacity: 0.35 }
    });

    return (
        <View className="h-full" style={{ paddingTop: insert.top, backgroundColor: colorBack[`${selectedPokemon.types[0].type.name}`] || 'white' }}>
            <TouchableOpacity
                onPress={() => { usePokemonsStore.setState({ showDetail: false }) }}
                className={` pt-3 pl-3 self-start rounded-xl items-center justify-items-center `}
            >
                <MaterialCommunityIcons name="chevron-left" size={30} color={'white'} />
            </TouchableOpacity>

            <Animated.View entering={ZoomInLeft.delay(100)} className="flex-1 p-7 pt-1 h-2/5">
                <View className="flex-row justify-between">
                    <Text className="text-3xl mb-3 font-bold capitalize text-white">{selectedPokemon.name}</Text>
                    <Text className="text-3xl self-end mb-3 font-bold text-white">#{selectedPokemon.id}</Text>
                </View>
                <View className="flex-row space-x-2 ">
                    <Text className="px-3 py-1 capitalize self-start  opacity-100 text-white rounded-3xl" style={{ backgroundColor: colorType[`${selectedPokemon.types[0].type.name}`] || 'white' }}>
                        {selectedPokemon.types[0].type.name}
                    </Text>
                    {
                        selectedPokemon.types[1] != undefined ? (
                            <Text className="px-3 py-1 capitalize self-start opacity-100 text-white rounded-3xl" style={{ backgroundColor: colorType[`${selectedPokemon.types[1].type.name}`] || 'white' }}>
                                {selectedPokemon.types[1].type.name}
                            </Text>
                        ) : <></>
                    }
                </View>

                <View className="flex items-center rounded-full border-0 justify-center" style={styles.box}>
                    <Image
                        className="z-50 "
                        source={{
                            uri: selectedPokemon.sprites.other?.["official-artwork"].front_default,
                        }}
                        style={{
                            width: 200,
                            height: 200,
                        }}
                    />
                    <Image
                        className="absolute z-10 bottom-auto right-auto opacity-50"
                        source={{
                            uri: 'https://i.imgur.com/nb39YNA.png',
                        }}
                        style={styles.pokeball}
                    />
                </View>
            </Animated.View>
            
            <Animated.View
                className="flex-1 h-3/5 bg-white rounded-t-3xl"
                style={{ paddingTop: insert.top }}
            >
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    renderTabBar={renderTabBar}
                />
            </Animated.View>
        </View>
    );
};
