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
    FlatList,
    Dimensions
} from "react-native";
import axios from "axios";

export default class MeteorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meteors: {},
        };
    }

    componentDidMount() {
        this.getMeteors()
    }

    getMeteors = () => {
        axios
            .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=nAkq24DJ2dHxzqXyzfdreTvczCVOnwJuFLFq4bDZ")
            .then(response => {
                this.setState({ meteors: response.data.near_earth_objects })
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }


    renderItem=({item})=>{
        let meteor = item
        let bg_img,speed,size
        if(meteor.threat_score<=30){
            bg_img = require('../assets/meteor_bg1.png')
            speed = require('../assets/meteor_speed3.gif')
            size = 100
        }
        else if(meteor.threat_score<=75){
            bg_img = require('../assets/meteor_bg2.png')
            speed = require('../assets/meteor_speed3.gif')
            size = 150
        }
        else{
            bg_img = require('../assets/meteor_bg3.png')
            speed = require('../assets/meteor_speed3.gif')
            size = 200
        }
        return(
            <View>
                <ImageBackground
                source={bg_img}
                style={styles.backgroundImage}>
                    <View style={styles.gifContainer}>
                        <Image 
                        source={speed}
                        style={{width:size, height:size, alignSelf:"center"}}
                        />
                        <View style={styles.meteorDataContainer}>
                            <Text style={[styles.cardTitle,{marginTop:10}]}>{item.name}</Text>
                            <Text style={[styles.cardText,{marginTop:20}]}>Closest to the Earth- {item.close_approach_data[0].close_approach_date_full}</Text>
                            <Text style={[styles.cardText,{marginTop:5}]}>Minimum diameter- {item.estimated_diameter.kilometers.estimated_diameter_min}</Text>
                            <Text style={[styles.cardText,{marginTop:5}]}>Maximum diameter- {item.estimated_diameter.kilometers.estimated_diameter_max}</Text>
                            <Text style={[styles.cardText,{marginTop:5}]}>Velocity- {item.close_approach_data[0].relative_velocity.kilometers_per_hour}</Text>
                            <Text style={[styles.cardText,{marginTop:5}]}>Missing Earth- {item.close_approach_data[0].miss_distance.kilometers}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
    
    keyExtractor = (item,index) => index.toString()

    render() {
        if (Object.keys(this.state.meteors).length === 0) {
            return (
                <View
                    style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            )
        } else {
            let meteors_array = Object.keys(this.state.meteors).map(meteor_date=>{
                return this.state.meteors[meteor_date]
            })
            let meteor = [].concat.apply([],meteors_array)
            meteor.forEach( function (element){
                let diamater = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max)/2
                let threatScore = (diamater/element.close_approach_data[0].miss_distance.kilometers)*1000000000
                element.threat_score = threatScore
            });
            meteor.sort(function(a,b){
                return b.threat_score-a.threat_score
            })
            meteor = meteor.slice(0,5)
            return (
                <View style={styles.container}>
                    <SafeAreaView style={styles.droidSafeArea} />
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={meteor}
                            renderItem={this.renderItem}
                            horizontal={true}
                        />
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
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    cardTitle: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold",
        color: "white"
    },
    cardText: {
        color: "white"
    },
    gifContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    meteorDataContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop:150,
        backgroundColor:"#070C29",
        borderRadius:20,
        padding:10,
        margin:20,
    }
});