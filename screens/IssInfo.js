import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import axios from 'axios';

export default class IssInfoScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            location:{ },
            isRefresh:false,
        }
    }

    componentDidMount(){
        this.getIssLocation();
        try{
            setInterval(async()=>{
                this.getIssLocation()},5000
            )
        }
        catch(error){
            console.log(error)
        }
    }

    getIssLocation = ()=>{
        axios.get('https://api.wheretheiss.at/v1/satellites/25544')
        .then(response => {
            this.setState({
                location:response.data
            })
        })
        .catch(error => {
            Alert.alert(error.message)
        })
    }

    render() {
        if(Object.keys(this.state.location).length===0){
            return(
                <View style={styles.container}>
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            )
        }
        else{
            return (
                <View style={styles.container}>
                    <Text style={styles.infoText}>
                        Latitude : {this.state.location.latitude}
                    </Text>
                    <Text style={styles.infoText}>
                        Longitude : {this.state.location.longitude}
                    </Text>
                    <Text style={styles.infoText}>
                        Velocity (km/hr) : {this.state.location.velocity}
                    </Text>
                    <Text style={styles.infoText}>
                        Altitude (km/hr): {this.state.location.altitude}
                    </Text>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        padding:5,
        marginTop:-10,
        backgroundColor:"white"
    },
    infoText:{
        fontSize:20,
        fontWeight:"bold",
        color:"black",
        textAlign:"center"
    }
})
