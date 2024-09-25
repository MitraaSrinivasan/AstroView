import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    ImageBackground,
    Alert,
    Image,
    ScrollView,
    TouchableOpacity,
    Linking
} from "react-native";
import axios from "axios";

export default class DailyPicScreens extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apod: {},
        };
    }

    componentDidMount() {
        this.getPictures()
    }

    getPictures = () => {
        axios
            .get("https://api.nasa.gov/planetary/apod?api_key=aQlHZPoPaPbOlq3AT6tkHG6qk9eiNIGBb7RaiDPz")
            .then(response => {
                this.setState({ apod: response.data })
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }


    render() {
        if (Object.keys(this.state.apod).length === 0) {
            return (
                <View
                    style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                    <SafeAreaView style={styles.droidSafeArea} />
                    <ImageBackground
                    source={require('../assets/bg.png')}
                    style={styles.backgroundImage}>
                        <View style={styles.titleBar}>
                        <Text style={styles.titleText}>DAILY PICTURES</Text>
                        </View>
                        <View>
                            <Text style={styles.dateText}>{this.state.apod.date}</Text>
                            <TouchableOpacity
                                style={{borderColor:"black"}}
                                onPress={() => Linking.openURL(this.state.apod.url).catch(err => console.error("Couldn't Load Page", err))}
                            >
                            <Image 
                                source={{uri:this.state.apod.hdurl}}
                                style={{height:200, width:200, alignSelf:"center", marginTop:10}}
                            />
                            </TouchableOpacity>
                            <Text style={styles.cardTitle}>{this.state.apod.title.toUpperCase()}</Text>
                            <Text style={styles.cardText}>{this.state.apod.explanation}</Text>
                            <Text style={styles.copyRightText}>Copy Right- {this.state.apod.copyright}</Text>
                        </View>
                    </ImageBackground>
                    </ScrollView>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    titleBar: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center",
        marginTop:20,
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
        textAlign:"center"
    },
    cardTitle: {
        fontSize: 25,
        marginBottom: 10,
        fontWeight: "bold",
        color: "#FA00FB",
        textAlign:"center",
        marginTop:10,
    },
    cardText: {
        color: "white",
        margin:10,
        fontSize:20,
    },
    dateText:{
        textAlign:"right",
        color:"white",
        fontWeight:"bold",
        fontSize:20,
        marginTop:20,
        marginRight:5,
    },
    copyRightText:{
        textAlign:"right",
        color:"white",
        fontWeight:"bold",
        fontSize:20,
        marginRight:5,
    },
    scrollView:{
        marginHorizontal:1,
    }
});