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
import { withSafeAreaInsets } from "react-native-safe-area-context";

export default class UpdateScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            reports:[],
            blogs:[],
        };
    }

    componentDidMount() {
        this.getArticle()
    }

    getArticle = () => {
        axios
            .get("https://api.spaceflightnewsapi.net/v4/articles/")
            .then(response => {
                this.setState({ articles: response.data })
                this.getReports()
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }
    getReports = () => {
        axios
            .get("https://api.spaceflightnewsapi.net/v4/reports/")
            .then(response => {
                this.setState({ reports: response.data })
                this.getBlogs()
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }
    getBlogs = () => {
        axios
            .get("https://api.spaceflightnewsapi.net/v4/blogs/")
            .then(response => {
                this.setState({ blogs: response.data })
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }

    addFlags = (array, value) => {
        for(var i=0; i<array.length; i++){
            array[i].type = value
            console.log(array[i])
        }
        return array
    }


    renderItem=({item})=>{
        let width = 50
        let url
        if(item.type == 'Reports'){
            url = require('../assets/iss_icon.png')
        }
        else{
            url = require('../assets/blog_icon.png')
        }
        if(item.type == 'Articles'){
            return(
                <View style={{flex:0.5}}>
                    <TouchableOpacity
                    style={styles.listContainer}
                    onPress={()=>{Linking.openURL(item.url).catch(err => console.err)}}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <View style={styles.iconContainer}>
                            <Image 
                            source={{uri: item.imageUrl}}
                            style={{width:300, height:170}}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            )
        } else{
            return(
                <View style={{flex:0.5}}>
                    <TouchableOpacity
                    style={styles.listContainer}
                    onPress={()=>{Linking.openURL(item.url).catch(err => console.err)}}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <View style={styles.iconContainer}>
                            <Image 
                            source={{uri:item.imageUrl}}
                            style={{width:300, height:170}}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            )            
        }       
    }
    
    keyExtractor = (item,index) => index.toString()

    render() {
        let articles = this.addFlags(this.state.articles,'Articles')
        let reports = this.addFlags(this.state.reports,'Reports')
        let blogs = this.addFlags(this.state.blogs,'Blogs')
        let event = articles.concat(reports).concat(blogs)
        event = event.sort(function (a,b){
            return new Date(b.published_date)-new Date(a.published_date)
        })
        if(event.length == 0){
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
                        <Text style={styles.titleText}>UPDATES</Text>
                    </View>
                    <ScrollView>
                        <FlatList
                        keyExtractor={this.keyExtractor}
                        data={event}
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
    listContainer: {
        backgroundColor:"rgba(250, 250, 250, 0.5)",
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 20,
        padding: 20,
        marginTop:70,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        marginTop:25,
    },
});