import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Animated, { Layout, ZoomIn, ZoomOut } from "react-native-reanimated";
import shallow from "zustand/shallow";
import { Pokemon } from "../../interfaces";
import { usePokemonsStore } from "../../stores/pokemon-store";


interface Card{
    item:Pokemon
}

export const PokeCard = (props: Card) => {
    const { colorBack, colorType,  showLoader } = usePokemonsStore(
        state => ({
            colorBack: state.colorBack,
            colorType: state.colorType,
            showLoader: state.showLoader
        }), shallow
    )

    const {item} = props;
    let styles = StyleSheet.create({
        box: {
            alignSelf: 'center',
            border: 0,
            backgroundColor: '#0000',
            height: 90,
            width: 90,
            shadowColor: "black",
            shadowOffset: {
                width: 20,
                height: 20,
            },
            shadowOpacity: 0.5,
            shadowRadius: 10,
            elevation: 10
        },
        pokeball: {
            width: 83, 
            height: 83,
            opacity: 0.35,
        }
    });
    return(
        <Animated.View
            key={`task-${item.id}`}
            entering={ZoomIn}
            exiting={ZoomOut}
            layout={Layout.springify().delay(200)}
            className='flex-1 w-ful mb-3 mx-1 rounded-xl pl-5 pr-2 pt-4'
            style={{ backgroundColor: colorBack[`${item.types[0].type.name}`] || 'white' }}
            onTouchEnd={() => { usePokemonsStore.setState({ selectedPokemon: item }); showLoader() }}
        >
            <Text className="text-white text-lg font-extrabold capitalize ">{item.name}</Text>
            <View className="flex-row flex  justify-center">
                <View className="flex-col pt-2 space-y-2 w-1/2 ">
                    <Text className="px-3  text-xs capitalize self-start  opacity-100 text-white rounded-3xl" style={{ backgroundColor: colorType[`${item.types[0].type.name}`] || 'white' }}>
                        {item.types[0].type.name}
                    </Text>
                    {
                        item.types[1] != undefined ? (
                            <Text className="px-3  text-xs capitalize self-start opacity-100 text-white rounded-3xl" style={{ backgroundColor: colorType[`${item.types[1].type.name}`] || 'white' }}>
                                {item.types[1].type.name}
                            </Text>
                        ) : <></>
                    }

                </View>
                <Animated.View entering={ZoomIn.delay(300)} className="flex-1 w-full rounded-full border-0 flex items-center justify-center" style={styles.box}>
                    <Image
                        className="z-50"
                        source={{
                            uri: item.sprites.other?.["official-artwork"].front_default,
                        }}
                        style={{ width: 85, height: 80 }}
                    />
                    <Image
                        className="absolute z-10 bottom-1 right-0"
                        source={{
                            uri: 'https://i.imgur.com/nb39YNA.png',
                        }}
                        style={styles.pokeball}
                    />
                </Animated.View>
            </View>
        </Animated.View>
    );

}