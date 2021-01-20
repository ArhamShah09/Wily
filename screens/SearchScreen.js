import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import db from '../config';

export default class SearchScreen extends React.Component {
    constructor() {
        super();
        this.state={
            allTransactions : [],
            search : '',
            lastVisibleTransaction : null
        }
    }

    /*componentDidMount= async() => {
        const query = await db.collection("transactions").get()
        query.docs.map((doc)=>{
            this.setState({
                allTransactions : [...this.state.allTransactions,doc.data()]
            });
        });
    }*/

    searchTransactions = async(text) => {
        var enteredText = text.split("");
        if(enteredText[0].toUpperCase() === 'B') {
            const transaction = await db.collection("transactions").where("bookId","==",text).get();
            transaction.docs.map((doc) => {
                this.setState({
                    allTransactions : [...this.state.allTransactions,doc.data()],
                    lastVisibleTransaction : doc
                });
            });
        }
        if(enteredText[0].toUpperCase() === 'S') {
            const transaction = await db.collection("transactions").where("studentId","==",text).get();
            transaction.docs.map((doc) => {
                this.setState({
                    allTransactions : [...this.state.allTransactions,doc.data()],
                    lastVisibleTransaction : doc
                });
            });
        }
    }

    fetchMoreTransactions = async() => {
        var text = this.state.search
        var enteredText = text.split("");
        if(enteredText[0].toUpperCase() === 'B') {
            const transaction = await db.collection("transactions").where("bookId","==",text).startAfter(this.state.lastVisibleTransaction).limit(10).get();
            transaction.docs.map((doc) => {
                this.setState({
                    allTransactions : [...this.state.allTransactions,doc.data()],
                    lastVisibleTransaction : doc
                });
            });
        }
        if(enteredText[0].toUpperCase() === 'S') {
            const transaction = await db.collection("transactions").where("studentId","==",text).startAfter(this.state.lastVisibleTransaction).limit(10).get();
            transaction.docs.map((doc) => {
                this.setState({
                    allTransactions : [...this.state.allTransactions,doc.data()],
                    lastVisibleTransaction : doc
                });
            });
        }
    }

    render() {
        return(
            <View style={ styles.container }>

                <View style={ styles.searchBar }>
                    <TextInput
                        style={ styles.bar }
                        placeholder = "Enter book Id or student Id"
                        onChangeText = {(text) => {
                            this.setState({
                                search : text
                            });
                    }}/>

                    <TouchableOpacity 
                        style={ styles.searchButton}
                        onPress = {() =>{this.searchTransactions(this.state.search)}}>
                        <Text>Search</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    //It holds all data which is needed to be displayed
                    data = {this.state.allTransactions}
                    //It displays one by one
                    renderItem = {({item}) =>(
                        <View style = {{ borderBottomWidth : 2 }}>
                            <Text>{"Book Id : " + item.bookId}</Text>
                            <Text>{"Student Id : " + item.studentId}</Text>
                            <Text>{"Transaction Type : " + item.transactionType}</Text>
                            <Text>{"Date : " + item.date.toDate()}</Text>
                        </View>
                    )}
                    //Gives a unique Id
                    keyExtractor = {(item,index) => index.toString()}
                    //To fetch more data when it is coming to an end
                    onEndReached = {this.fetchMoreTransactions}
                    //To decide when you want to fetch more data
                    onEndReachedThreshold = {0.7}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex : 1,
        marginTop : 20
    },
    searchBar:{
        flexDirection : 'row',
        height : 40,
        width : 'auto',
        borderWidth : 0.5,
        alignItems : 'center',
        backgroundColor : 'grey',
    },
    bar:{
        borderWidth : 2,
        height : 30,
        width : 300,
        paddingLeft : 10
    },
    searchButton:{
        borderWidth : 1,
        height : 30,
        width : 70,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : 'blue'
    }
});