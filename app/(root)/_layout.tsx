import { useGlobalContext } from "@/lib/global-provider";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, SafeAreaView } from "react-native";

export default function AppLayout() {
    const { loading, isLoggedIn } = useGlobalContext();

    // if loading show the indicator
    if(loading) {
        return (
            <SafeAreaView className="bg-white h-full flex justify-center items-center">
                <ActivityIndicator className="text-primary-300" size="large" />
            </SafeAreaView>
        )
    }

    // if not logged in show sign in screen
    if(!isLoggedIn) return <Redirect href="/sign-in" />

    // if logged in show current screen
    return (
        <Slot />
    )
}

