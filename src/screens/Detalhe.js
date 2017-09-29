import React, { Component } from 'react';
import { View, Image, ScrollView, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';


import { Root,
  Container,
  Content,
  Spinner,
  Toast,
  Header,
  Item,
  Input,
  List,
  ListItem,
  Thumbnail,
  Body,
  Icon,
  Button,
  Text,
  Footer,
 Left, H1, Title,Subtitle,Right} from 'native-base';

import axios from 'axios';
import { Dialog } from 'react-native-simple-dialogs';

const s = StyleSheet.create({

  overlay: {
    flex:1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)' ,
    
  }
});

export class Detalhe extends Component {

    constructor ( props ) {
        super( props )
        this.id = this.props.navigation.state.params
        this.url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='+this.props.navigation.state.params+'&key=AIzaSyCFIJiKLpA96X5Xo4Ifq2j3UJXRzijrIKk'
      }
      state = {
        load: false,
        erro: null,
        conteudo: null,
        dialogVisible: true 
      }

    //   static navigationOptions = ({navigation}) => {
    //     return {
    //       title: navigation.state.params.name,
    //     }
    //   }

    componentDidMount() {
      this.BuscarLocal()
    }


    BuscarLocal = () => {
      let erro = false
      let conteudo = null
    
      let dialogVisible = false
      this.setState({
          load: true
      })
      
      axios.get(this.url)
          .then((response) => {

            
              if (response.data.result != undefined) {
               
                  conteudo = response.data.result
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
                  conteudo: conteudo,
                  dialogVisible: dialogVisible 
              })
          });

  }

    static navigationOptions = {
        title: 'Detalhes',
      };


      render(){
        return(
            
            <Content>
              {this.renderContent()} 
            </Content>   

        )
      }

      renderContent = () => {
        if (this.state.load) {

            return (
                <Spinner color='#006099' />
            )
        }

        if(this.state.conteudo){
          let img = 'https://cdn.pixabay.com/photo/2014/04/03/00/42/house-309156_960_720.png';
          if(this.state.conteudo.photos){
               img = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='+this.state.conteudo.photos[0].photo_reference+'&key=AIzaSyCFIJiKLpA96X5Xo4Ifq2j3UJXRzijrIKk'
            }
        
          return(
            <View>
              <Image
                style={{width:'100%', height:250}} 
                source={{uri: img}}
              > 
              <View style={s.overlay}>
                <View style={{flex:0.6}}>

                </View>
                <View style={{flex:0.4}}>
                    <Title>{this.state.conteudo.name}</Title>
                    <Text style={{color:'#ffffff', textAlign:'center'}} >{this.state.conteudo.formatted_address}</Text>
                </View>
              </View>
                
              </Image>
              <View style={{padding:20}}>

                <Text style={{color:'#333333', textAlign:'center', fontSize:20}} >
                {this.state.conteudo.formatted_phone_number}
                </Text>
                  
                  
              </View>
              <View style={{padding:20}}>
                <Image 
                style={{width:'100%', height:200}} 
                source={{uri: 'https://maps.googleapis.com/maps/api/staticmap?markers='+this.state.conteudo.geometry.location.lat+', '+this.state.conteudo.geometry.location.lng+'&zoom=16&size=400x400&key=AIzaSyBbopwYuuVAdW_pj0t7ZL711_m3IgKxrb8'}}
                >

                </Image>
              </View>
            </View> 
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