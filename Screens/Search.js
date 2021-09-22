import React from 'react';
import {Text,View} from 'react-native'
import { Component } from 'react';

export default class Screen extends React.Component{
    render(){
        return(
            <View style = {{
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:'skyblue'
            }}>
            <Text style={{
                color:'black',
                fontSize:30
            }}>Search Screen!!</Text>
            </View>
        )
    }
}