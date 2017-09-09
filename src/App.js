{/*
    trabalho React Native 
    Allan da Silva
    Pós Alfa 2017
*/}
import React, { Component } from 'react';
import { AppRegistry, Geolocation } from 'react-native';
import { Root, Container, Content, Spinner, Toast, Header, Item, Input, List, ListItem, Thumbnail, Body, Icon, Button, Text } from 'native-base';

import axios from 'axios';
import { Dialog } from 'react-native-simple-dialogs';

const KEY_GOOGLE = "CHAVE DO GOOGLE AQUI";




export default class App extends Component {
    state = {
        buscar: null,
        erro: false,
        lista: null,
        load: false,
        latitude: null,
        longitude: null,
        dialogVisible: false
    }

    componentDidMount() {
        const config = { enableHighAccuracy: false };
        navigator.geolocation.getCurrentPosition(this.locationSuccess, this.locationError, config);
    }

    // Callback disparado quando a localização é obtida.
    locationSuccess = (position) => {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        })
        this.BuscarMapa()
    }

    // Callback disparado se ocorrer algum erro ao obter a localização.
    locationError = (error) => {
        console.warn(error);
    }
    render() {
        return (
            <Root>
                <Container>
                    <Header searchBar rounded style={{ backgroundColor: '#006099' }}>
                        <Item>
                            <Icon color='#333333' name="map" />
                            <Input placeholder="Buscar"
                                returnKeyLabel='search'
                                returnKeyType='search'
                                onSubmitEditing={this.BuscarMapa}
                                value={this.state.buscar}
                                onChangeText={(buscar) => this.setState({ buscar })}
                            />
                            <Button transparent dark  onPress={this.BuscarMapa}>
                            <Icon  name="ios-search" />
                            </Button>
                        </Item>

                    </Header>
                    <Content>
                        {this.renderContent()}
                    </Content>
                </Container>
            </Root>
        );
    }

    pressList = () => {
        alert("deu Bom")
    }

    BuscarMapa = () => {
        let erro = false
        let list = null
        let url = null
        let dialogVisible = false
        this.setState({
            load: true
        })
        if (this.state.buscar != null && this.state.buscar.length > 0) {
            url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + this.state.buscar + '&location=' + this.state.latitude + ',' + this.state.longitude + '&rankby=distance&key=' + KEY_GOOGLE
        } else {
            url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + this.state.latitude + ',' + this.state.longitude + '&rankby=distance&key=' + KEY_GOOGLE

        }
        axios.get(url)
            .then((response) => {
                if (response.data.results != undefined) {
                    list = response.data.results
                } else {
                    erro = "Nenhum local encontrado!"
                    dialogVisible = true
                }


            })
            .catch((error) => {
                erro = "Vetifique sua internet!"
                dialogVisible = true
            })
            .finally(() => {
                this.setState({
                    load: false,
                    erro: erro,
                    lista: list,
                    dialogVisible: dialogVisible 
                })
            });

    }

    renderItem = (item) => {
        if (item.formatted_address != undefined) {

            if (item.photos != undefined) {
                return (

                    <ListItem onPress={this.pressList}>


                        <Thumbnail square size={100} source={{ uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=110&photoreference=' + item.photos[0].photo_reference + '&key=AIzaSyBxDHP0AU_34ssm7FeXcVxNrmiH1gaDPbY' }} />
                        <Body>
                            <Text>{item.name}</Text>
                            <Text note> {item.formatted_address}</Text>
                        </Body>
                    </ListItem>
                )
            }

            return (

                <ListItem onPress={this.pressList}>


                    <Body>
                        <Text>{item.name}</Text>
                        <Text note> {item.formatted_address}</Text>
                    </Body>
                </ListItem>
            )
        } else {
            if (item.photos != undefined) {
                return (

                    <ListItem onPress={this.pressList}>


                        <Thumbnail square size={100} source={{ uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=110&photoreference=' + item.photos[0].photo_reference + '&key=AIzaSyBxDHP0AU_34ssm7FeXcVxNrmiH1gaDPbY' }} />
                        <Body>
                            <Text>{item.name}</Text>
                            <Text note> {item.vicinity}</Text>
                        </Body>
                    </ListItem>
                )
            }

            return (

                <ListItem onPress={this.pressList}>


                    <Body>
                        <Text>{item.name}</Text>
                        <Text note> {item.vicinity}</Text>
                    </Body>
                </ListItem>
            )
        }
    }
    renderContent = () => {
        if (this.state.load) {

            return (
                <Spinner color='#006099' />
            )
        }

        if (this.state.lista) {

            return (

                <List dataArray={this.state.lista}
                    renderRow={this.renderItem}
                />
            )
        }
        if (this.state.erro) {
            
            return(

                
                <Dialog 
            visible={this.state.dialogVisible} 
            title="Custom Dialog"
            onTouchOutside={() => this.setState({dialogVisible: false})} >
            <Text>
            {this.state.erro}
                </Text>
            </Dialog>
            )

        }
    }


}

AppRegistry.registerComponent('TrabalhoReact', () => App);