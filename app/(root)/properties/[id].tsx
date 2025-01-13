import icons from '@/constants/icons';
import images from '@/constants/images';
import { router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Dimensions } from 'react-native';
import { config, databases } from '@/lib/appwrite';
import { useAppwrite } from '@/lib/useAppwrite';
import { facilities } from '@/constants/data';

const Property = () => {
    const { id } = useLocalSearchParams<{ id?: string }>();
    const windowHeight = Dimensions.get('window').height;

    const getPropertyById = async ({ id }: { id: string }) => {
      try {
        const result = await databases.getDocument(
          config.databaseId!,
          config.propertiesCollectionId!,
          id,
        );
        return result;
      } catch (error) {
        console.error(error);
        return null;
      }
    }

    const { data: property } = useAppwrite({
      fn: getPropertyById,
      params: {
        id: id!,
      },
    });

    console.log(property?.type)

  return (
    <SafeAreaView>
      {/* Header */}
        <View className="relative w-full" style={{ height: windowHeight / 2 }}>
          {/* <Image source={}
            className="size-full"
            resizeMode="cover"
          /> */}
          <Image source={images.whiteGradient} className="absolute top-0 w-full z-40" />

          <View className="z-50 absolute inset-x-7" style={{ top: Platform.OS === 'ios' ? 70 : 20,}}>
            <View className="flex flex-row items-center w-full justify-between">
              <TouchableOpacity onPress={() => router.back()} className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>

              <View className="flex flex-row items-center gap-3">
                <Image source={icons.heart} className="size-7" tintColor={"#191D31"} />
                <Image source={icons.send} className="size-7" />
              </View>
            </View>
          </View>
        </View>

      {/* Dwelling details */}
        <View className="flex flex-col px-5">
          <Text className="text-2xl font-rubik-bold text-black-300">{property?.name}</Text>
          <View className="flex flex-row items-center mt-5 gap-4">
            <Text className="text-sm font-rubik-bold text-primary-300">{property?.type}</Text>
           <View className="flex flex-row items-center justify-between">
            <Image source={icons.star} className="size-5 mr-2" />
            <Text className="font-rubik-medium text-black-200">
              {`${property?.rating} (${property?.reviews.length} reviews)`}
            </Text>
           </View>
          </View>

          <View className="flex flex-row items-center mt-5 gap-4">
            <View className="flex flex-row items-center gap-2">
              <View className="bg-black-100/10 p-3 rounded-full">
              <Image source={icons.bed} className="size-5"/>
              </View>
              <Text className="font-rubik-medium">{property?.bedrooms} Beds</Text>
            </View>
            <View className="flex flex-row items-center gap-2">
              <View className="bg-black-100/10 p-3 rounded-full">
              <Image source={icons.bath} className="size-5"/>
              </View>
              <Text className="font-rubik-medium">{property?.bathrooms} Bath</Text>
            </View>
            <View className="flex flex-row items-center gap-2">
              <View className="bg-black-100/10 p-3 rounded-full">
              <Image source={icons.area} className="size-5"/>
              </View>
              <Text className="font-rubik-medium">{property?.area} sqft</Text>
            </View>
          </View>
        </View>

      {/* Agent Info Area */}
        <View className="flex flex-row px-5 mt-5 items-center justify-between gap-4">
          <View className="flex flex-row items-center gap-4">
            <View className="flex flex-col gap-2 items-center">
              <Text className="font-rubik-bold text-base text-black-300">Agent</Text>
              <Image source={images.avatar} className="size-14" />
            </View>
            <View className="flex flex-col pt-4">
              <Text className="font-rubik-bold text-black-300">Natasya Wilodra</Text>
              <Text className="text-sm font-rubik-medium text-black-200">Owner</Text>
            </View>
          </View>
          <View className="flex flex-row gap-4 items-center">
            <Image source={icons.chat} className="size-6" />
            <Image source={icons.phone} className="size-6" />
          </View>
        </View>

      {/* Description */}
      <View className="px-5 mt-5">
        <Text className="text-lg font-rubik-bold text-black-300">Overview</Text>
        <Text className="text-base font-rubik text-black-200">Here is where the awesome description of this cool place to live will go.</Text>
      </View>

      {/* Facilities */}

      <View className="px-5 mt-5">
        <Text className="text-lg font-rubik-bold text-black-300">Facilities</Text>

        {property?.facilities.length > 0 && (
          <View className="flex flex-row flex-wrap items-start justify-start mt-2 gap-5">
            {property?.facilities.map((item: string, index: number) => {
              const facility = facilities.find((facility) => facility.title === item);

              return (
                <View key={index} className="flex flex-1 flex-col items-center min-w-16 max-w-20">
                  <View className="size-14 bg-primary-100 rounded-full flex items-center justify-center">
                    <Image source={facility ? facility.icon : icons.info}
                    className="size-6" />
                  </View>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    className="text-black-300 text-sm text-center font-rubik mt-1.5">{item}</Text>

                </View>
              )
            })}
            </View>
        )}
      </View>





    </SafeAreaView>
  )
}

export default Property
