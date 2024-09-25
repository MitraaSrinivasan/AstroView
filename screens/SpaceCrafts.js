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
    Dimensions,
    TouchableOpacity,
    Linking, 
    ScrollView
} from "react-native";
import axios from "axios";

export default class SpaceCraftsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aircrafts: [],
        };
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios
            .get("https://ll.thespacedevs.com/2.0.0/config/spacecraft/")
            .then(response => {
                this.setState({ aircrafts: response.data.results })
                console.log(response.data.results)
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }



    renderItem=({item})=>{
        return(
            <TouchableOpacity 
                style={styles.renderitemview}
                onPress={()=>Linking.openURL(item.wiki_link).catch(err => console.error("Couidn't Load Page"))}
                >
                <Image 
                    source={{uri: item.image_url}}
                    style={styles.desimage}
                />
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardsubTitle}>{item.agency.name}</Text>
                <Text style={{fontSize:19, color:"white"}}>DESCRIPTION</Text>
                <Text style={styles.cardText}>{item.agency.description}</Text>
            </TouchableOpacity>
        );        
    }
    
    keyExtractor = (item,index) => index.toString()

    render() {
        if(Object.keys(this.state.aircrafts).length == 0){
            return (
                <View
                    style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            )}
            else{
            return (
                <View style={styles.container}>
                    <SafeAreaView style={styles.droidSafeArea} />
                    
                    <ImageBackground 
                    style={styles.backgroundImage}
                    source={require('../assets/bg.png')}>
                    <View style={styles.titleBar}>
                        <Text style={styles.titleText}>SPACE CRAFTS</Text>
                    </View>
                    <ScrollView>
                        <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.aircrafts}
                        renderItem={this.renderItem}
                        />
                    </ScrollView>
                    </ImageBackground>
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
    titleBar: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center",
        margin:20,
        backgroundColor:"rgba(52, 52, 52, 0.5)"
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
        margin:20,
        padding:10,
    },
    iconContainer: {
        margin:20,
        justifyContent:"center",
        alignItems:"center"
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        textAlign:"center"
    },
    cardText: {
        fontSize: 15,
        color: "black",
        marginLeft:10,
        marginRight:10,
    },
    cardsubTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "red",
        textAlign:"center"
    },
    renderitemview:{
        borderWidth:1,
        justifyContent:"center",
        alignItems:"center",
        marginBottom:10,
        elevation:10,
        margin:20,
        borderRadius:20,
        backgroundColor:"rgba(250, 250, 250, 0.5)",
        padding:10,
        marginTop:30,
    },
    desimage:{
        width:'100%',
        height:200,
        marginTop:15,
        marginBottom:15,
        marginRight:10,
        margin:5,
        borderRadius:20
    },
});