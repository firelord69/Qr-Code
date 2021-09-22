import React from 'react';
import {Text,View,TouchableOpacity,StyleSheet,TextInput,Image, TouchableOpacityComponent} from 'react-native'
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as firebase from 'firebase'
import db from '../config'
import { Component } from 'react';

export default class Transaction extends React.Component{

    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal',
            scannedBookid:'',
            scannedStudentid:'',
            transactionMessage:''
        }
    }

    getCameraPermission=async(id)=>{
        const{status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions:status === "granted",
            scanned:false,
            buttonState:id
    })
    }

    handleTransaction = async()=>{
        var transactionMessage
        db.collection("Books").doc(this.state.scannedBookid).get().then((doc)=>{
            console.log(doc.data())
            var book = doc.data()
            if(book.bookAvai){
                this.initBookIssue()
                transactionMessage = "bookIssued"
            }
            else{
                this.initBookReturn()
                transactionMessage = "bookReturned"
            }
        })
        this.setState({
            transactionMessage:transactionMessage
        })
    }

    initBookIssue = async()=>{
        
    }

    handleBarcodeScanned=async({type,data})=>{
        const {buttonState}=this.state
        if(buttonState==="BookId"){
            this.setState({
                scanned:true,
                scannedBookid:data,
                buttonState:'normal',

            })
        }else if(buttonState==="StudentId"){
            this.setState({
                scanned:true,
                scannedBookid:data,
                buttonState:'normal',

            })
        }
    }


    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions
        const scanned = this.state.scanned
        const buttonState = this.state.buttonState

        if(buttonState!=='normal' && hasCameraPermissions){
            return(
                <BarCodeScanner 
                style={StyleSheet.absoluteFillObject} 
                onBarCodeScanned={scanned?undefined:this.handleBarcodeScanned} />
            )
        }else if(buttonState === 'normal'){
            return(
                <View style = {styles.contanier}>
                    <View>
                        <Image source={require("../assets/booklogo.jpg")} style={{width:200,height:200}} />
                        <Text style={{
                            textAlign:'center',
                            fontSize:30
                        }}>Wili</Text>
                    </View>
                    <View>
                        <TextInput value={this.state.scannedBookid} style={styles.textinput} placeholder = "Book Id" />
                        <TouchableOpacity onPress={()=>{this.getCameraPermission("BookId")}} style = {styles.scanbutton}>
                            <Text style = {styles.buttontext}>
                                Scan
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                    <TextInput value={this.state.scannedStudentid} style={styles.textinput} placeholder = "Student Id" />
                        <TouchableOpacity onPress={()=>{this.getCameraPermission("StudentId")}} style = {styles.scanbutton}>
                            <Text style = {styles.buttontext}>
                                Scan
                            </Text>
                        </TouchableOpacity>

                 
                    </View>
                </View>
            )
        }

      
    }
}

const styles = StyleSheet.create({
    contanier:{justifyContent:'center',
    alignItems:'center',
    flex:1,
    }
,
    text1:{
        color:'black',
        fontSize:30
    }
,
    button:{
        fontSize:20
    }
,
    textinput:{
        width: 200,
        height:40,
        borderWidth:1.5,
        borderRightWidth:0,
        fontSize:20
    }
,
    scanbutton:{
        backgroundColor:"grey",
        width:50,
        borderWidth:1.5,
        borderLeftWidth:0
    }
,
    buttontext:{
        fontSize:15,
        textAlign:'center',
        marginTop:10   
    }    
})