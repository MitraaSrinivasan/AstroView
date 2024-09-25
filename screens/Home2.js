import React, { Component } from 'react';
import { Text, View, ImageBackground, StyleSheet, SafeAreaView, StatusBar, Platform, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


export default class HomeScreen2 extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                <SafeAreaView style={styles.androidSafeArea}/>

                    <ImageBackground 
                    source={require('../assets/bg.png')}
                    style={styles.bgimg}
                    >

                        <View style={styles.titleBar}>
                            <Text style={styles.titleText}>ASTROVIEW</Text>
                        </View>


                        <TouchableOpacity 
                            style={styles.routeCard}
                            onPress={()=>{
                                this.props.navigation.navigate('Space Crafts')
                            }}>
                            <Text style={styles.routeText}>Space Crafts</Text>
                            <Text style={styles.knowMoreText}>{"Know more -->"}</Text>
                            <Text style={styles.backGroundDigit}>{"4"}</Text>
                            <Image
                                source={require('../assets/space_crafts.png')}
                                style={styles.iconImage}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.routeCard}
                            onPress={()=>{
                                this.props.navigation.navigate('Star Map')
                            }}>
                            <Text style={styles.routeText}>Star Map</Text>
                            <Text style={styles.knowMoreText}>{"Know more -->"}</Text>
                            <Text style={styles.backGroundDigit}>{"5"}</Text>
                            <Image
                                source={require('../assets/star_map.png')}
                                style={styles.iconImage}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.routeCard}
                            onPress={()=>{
                                this.props.navigation.navigate('Daily Pics')
                            }}>
                            <Text style={styles.routeText}>Daily Pics</Text>
                            <Text style={styles.knowMoreText}>{"Know more -->"}</Text>
                            <Text style={styles.backGroundDigit}>{"6"}</Text>
                            <Image
                                source={require('../assets/daily_pictures.png')}
                                style={styles.iconImage}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.nextpage}
                            onPress={()=>{
                                this.props.navigation.navigate('Home')
                            }}>
                            <Image
                                source={require('../assets/prev-icon.png')}
                                style={styles.nexticonImage}
                            />
                        </TouchableOpacity>
                        
                    </ImageBackground>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    bgimg:{
        flex:1,
        resizeMode:'cover',
    },
    androidSafeArea:{
        marginTop:Platform.OS==='android'?StatusBar.currentHeight:0
    },
    nextpage:{
      justifyContent:"center",
      marginBottom:5,
      alignItems:"center",
      top:30,
    },
    nexticonImage:{
      width:20,
      height:20,
      position:'absolute',
      backgroundColor:"white",
      resizeMode:'contain',
    },
    titleText:{
        fontSize:40,
        fontWeight:"bold",
        color:"white",
        textAlign:"center",
        marginTop:20,
    },
    titleBar:{
        flex:0.15,
        justifyContent:"center",
        alignItems:"center",
    },
    routeText:{
        fontSize:35,
        fontWeight:"bold",
        color:"balck",
        marginTop:75,
        paddingLeft:30,
        paddingBottom:20,
    },
    routeCard:{
        flex:0.25,
        marginLeft:50,
        marginRight:50,
        marginTop:50,
        borderRadius:30,
        backgroundColor:"white",
    },
    knowMoreText:{
        paddingLeft:30, 
        color:"red",
        fontSize:20,
    },
    backGroundDigit:{
        position:"absolute",
        color:"rgba(183,183,183,0.5)",
        fontSize:150,
        right:20,
        bottom:-15,
        zIndex:-1,
    },
    iconImage:{
        position:'absolute',
        height:120,
        width:120,
        resizeMode:'contain',
        right:30,
        top:-40,
    }
})