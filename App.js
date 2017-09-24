import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Button, AsyncStorage } from 'react-native';

class App extends React.Component {

  constructor(props) {
    super(props);

    /* Dados inciais */
    this.state = {
      bottomBallValue : 1,
      topBallValue    : 1,
      lastBallClicked: 'Aguardando click'
    }

    /* Verifica se já existem dados no AsyncStorage */
    AsyncStorage.getItem('@MyStore:params', (err, result) => {
      if(result !== null){
        this.setState(JSON.parse(result))
      }
    });

  }

  _saveData = (data) => { 
    /* Salva os dados no state e no AsyncStorage */
    this.setState(newState)
    AsyncStorage.setItem('@MyStore:params', JSON.stringify(data));
  }

  _ballClicked = (btn) => {
    /* Click do botão */
    switch (btn) {
      case "Verde":
        newState = {
          bottomBallValue: this.state.bottomBallValue-1,
          topBallValue    : this.state.topBallValue+1,
          lastBallClicked: btn
        }
        break;
      case "Azul":
        newState = {
          bottomBallValue: this.state.bottomBallValue+1,
          topBallValue    : this.state.topBallValue-1,
          lastBallClicked: btn
        }
        break;
      default:
        newState = this.state;
        alert("Ação inválida");
    }
    this._saveData(newState)
  }

  render() {

    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.topBall} onPress={ () => { this._ballClicked("Verde") } }> 
          <Text style={styles.topBallText}>{ this.state.topBallValue }</Text>
        </TouchableHighlight>
        <Text>{ this.state.lastBallClicked }</Text>
        <TouchableHighlight style={styles.bottomBall} onPress={ () => { this._ballClicked("Azul") } }> 
          <Text style={styles.bottomBallText}>{ this.state.bottomBallValue }</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default App

const styles = StyleSheet.create({
  topBallText: {
    backgroundColor: 'transparent',
    color: '#fff'
  },
  topBall: {
    borderRadius:120,
    width: 120,
    height: 120,
    backgroundColor: 'rgb(19,195,18)',
    marginBottom:40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBall: {
    borderRadius:120,
    width: 120,
    height: 120,
    backgroundColor: 'rgb(15,16,194)',
    marginTop:40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBallText: {
    backgroundColor: 'transparent',
    color: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
