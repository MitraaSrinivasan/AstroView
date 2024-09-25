import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Platform, StatusBar, SafeAreaView, ImageBackground} from 'react-native';
import { WebView } from 'react-native-webview';


export default class StarMapScreen extends Component {
    constructor() {
        super()
        this.state = {
            longitude: '',
            latitude: ''
        }
    }
    render() {
        const path = 'https://virtualsky.lco.global/embed/index.html?longitude=${this.state.longitude}&latitude=${this.state.latitude}&constellations=true&constellationlabels=true&showstarlabels=true&gridlines_az=true&live=true&projection=stereo&showdate=false&showposition=false'
        return (
            <View style={{ flex: 1, backgroundColor: "#1a0023" }}>
                <SafeAreaView style={styles.droidSafeArea} />
                <ImageBackground 
                style={styles.backgroundImage}
                source={require('../assets/bg.png')}>
                <View style={styles.container}>
                    <Text style={styles.titleText}>STAR MAP</Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Enter your longitude"
                        placeholderTextColor="white"
                        onChangeText={(text) => {
                            this.setState({
                                longitude: text
                            })
                        }}
                        value={this.state.longitude}
                    />
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Enter your latitude"
                        placeholderTextColor="white"
                        onChangeText={(text) => {
                            this.setState({
                                latitude: text
                            })
                        }}
                        value={this.state.latitude}
                    />
                </View>
                
                <WebView
                    scalesPageToFit={true}
                    source={{ uri: path }}
                    style={{ marginTop: 10, marginBottom: 20}}
                />
                </ImageBackground>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        alignItems: 'center'
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    titleText: {
        fontSize: 35,
        fontWeight: "bold",
        color: "white",
        justifyContent: "center",
        alignContent: "center",
    },
    inputStyle: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
        textAlign: 'center',
        color: 'white',
        width: 200
    },
    mapContainer: {
        flex: 0.6
    },
    map: {
        width: "100%",
        height: "100%",
        marginTop:10,
    }
   
    
})