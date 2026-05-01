import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function MyProfileScreen({ navigation }) {
    const [name, setName] = useState('User Name');
    const [image, setImage] = useState(null);

    useFocusEffect(
        useCallback(() => {
            async function loadUser() {
                const data = await AsyncStorage.getItem('userData');
                const savedImage = await AsyncStorage.getItem('profileImage');

                if (data) {
                    const parsed = JSON.parse(data);
                    setName(parsed.name || 'User Name');
                } else {
                    setName('User Name');
                }

                if (savedImage) {
                    setImage(savedImage);
                } else {
                    setImage(null);
                }
            }

            loadUser();
        }, [])
    );

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.placeholder} />

            <View style={styles.container}>
                <View style={styles.avatarSection}>
                    <View style={styles.avatarOuter}>
                        {image ? (
                            <Image source={{ uri: image }} style={styles.avatar} />
                        ) : (
                            <Ionicons name="person" size={50} color="#999" />
                        )}
                    </View>
                </View>

                <Text style={styles.name}>{name}</Text>

                <View style={styles.menuList}>
                    <TouchableOpacity
                        style={styles.menuCard}
                        onPress={() => navigation.navigate('MyAccount')}
                    >
                        <View style={styles.menuIconCircle}>
                            <Ionicons name="person" size={14} color="#7d71ff" />
                        </View>
                        <View>
                            <Text style={styles.menuText}>My Account</Text>
                            <Text style={styles.menuSubText}>Edit profile information</Text>
                        </View>
                    </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.menuCard}
                            onPress={() => navigation.navigate('CurrencySetting')}
                            >
                            <View style={styles.menuIconCircle}>
                                <Ionicons name="cash-outline" size={14} color="#7d71ff" />
                            </View>

                            <View>
                                <Text style={styles.menuText}>Currency Setting</Text>
                                <Text style={styles.menuSubText}>Change expense currency symbol</Text>
                            </View>
                            </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.menuCard}
                        onPress={() => navigation.navigate('HelpCenter')}
                    >
                        <View style={styles.menuIconCircle}>
                            <Ionicons name="help-circle" size={14} color="#7d71ff" />
                        </View>
                        <View>
                            <Text style={styles.menuText}>Help Center</Text>
                            <Text style={styles.menuSubText}>Get help and support</Text>
                        </View>
                    </TouchableOpacity>




                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 18,
        backgroundColor: '#ffffff',
    },
    avatarSection: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    avatarOuter: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#7d71ff',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e8edf5',
    },
    avatar: {
        width: 106,
        height: 106,
        borderRadius: 53,
    },
    placeholder: {
        width: 42,
        height: 42,
    },
    name: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '700',
        color: '#556b89',
        marginBottom: 28,
    },
    menuList: {
        gap: 16,
    },
    menuCard: {
        minHeight: 76,
        borderRadius: 18,
        backgroundColor: '#e8edf5',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
    },
    menuIconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#edf1f8',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    menuText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#556b89',
    },
    menuSubText: {
        fontSize: 12,
        color: '#8c99ad',
        marginTop: 3,
    },
});