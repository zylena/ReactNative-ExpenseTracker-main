import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function MyProfileScreen ({ navigation }) {
    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.placeholder} />
            <View style={styles.container}>
                <View style={styles.avatarSection}>
                    <TouchableOpacity style={styles.sideIconButton}>
                        <Ionicons name="camera" size={18} color="#c7cfdd" />
                    </TouchableOpacity>

                    <View style={styles.avatarOuter} />

                    <View style={styles.placeholder} />
                </View>

                <Text style={styles.name}>User Name</Text>

                <View style={styles.placeholder} />
                <View style={styles.menuList}>
                    <TouchableOpacity style={styles.menuCard}>
                        <View style={styles.menuIconCircle}>
                            <Ionicons name="person" size={14} color="#7d71ff" />
                        </View>
                        <Text style={styles.menuText}>My Account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuCard}
                        onPress={() => navigation.navigate('HelpCenter')}
                    >
                        <View style={styles.menuIconCircle}>
                            <Ionicons name="help-circle" size={14} color="#7d71ff" />
                        </View>
                        <Text style={styles.menuText}>Help Center</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 18,
    },
    backButton: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    titleRow: {
        marginBottom: 24,
    },
    avatarSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 22,
    },

    cameraButton: {
        position: 'absolute',
        left: 0,
        top: '50%',
        marginTop: -21,
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#e8edf5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sideIconButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#e8edf5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarOuter: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#6f6cff',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dbe2ec',
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
        fontWeight: '600',
        color: '#556b89',
        marginBottom: 28,
    },
    menuList: {
        gap: 16,
    },
    menuCard: {
        height: 72,
        borderRadius: 18,
        backgroundColor: '#e1e6f1',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
    },
    menuIconCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#edf1f8',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    menuText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#6d7f99',
    },
});