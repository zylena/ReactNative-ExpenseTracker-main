import { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { fetchFoodPicFromAPIHub } from "../../utils/http";

export default function BannerSlider() {
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    async function loadImage() {
        setIsLoading(true);
        const url = await fetchFoodPicFromAPIHub();

        if (url) {
            setImage(url);
        }

        setIsLoading(false);
    }

    useEffect(() => {
        loadImage();

        const interval = setInterval(() => {
            loadImage();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={{ height: 80, justifyContent: "center" }}>
            {isLoading ? (
                <ActivityIndicator />
            ) : image ? (
                <Image
                    source={{ uri: image }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="stretch"
                />
            ) : (
                <View>
                    <Text>Failed to load image</Text>
                </View>
            )}</View>
    );
}