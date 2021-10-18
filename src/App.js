import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      objReturn: '',
      dogName: '',
      dogArray: [],
    }
    this.fetchDoguinho = this.fetchDoguinho.bind(this);
    this.addName = this.addName.bind(this);
    this.dogNameState = this.dogNameState.bind(this);
  }

  componentDidMount() {
    this.fetchDoguinho();
  }

  shouldComponentUpdate(_nextProps, nextState) {
    if (nextState.objReturn.message.includes('terrier')) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    const { objReturn, dogArray } = this.state;
    localStorage.setItem('urlDog', objReturn.message);
    localStorage.setItem('dogNames', dogArray);
    // alert(objReturn.message.split('/')[4])
  }

  addName() {
  const { dogArray, dogName } = this.state;
  dogArray.push(dogName);
  this.setState({});
  }

  dogNameState({ target }) {
    this.setState({ dogName: target.value })
  }

  fetchDoguinho() {
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(data => this.setState({ objReturn: data, loading: false, }))
  }
  render() {
    const { loading, objReturn } = this.state;
  return (
    <div className="App">
      { loading ? <h4>Loading...</h4> : 
      <div>
      <img src={ objReturn.message } alt="dog" />
      <input type="text" maxLength="50" onChange={ this.dogNameState }/>
      Name your Dog!
      <button onClick={ this.addName } >
      Save your Dog Name!
      </button>
      <button onClick={ this.fetchDoguinho }>Another Dog</button> 
      </div>}
    </div>
  );
}
}

export default App;
