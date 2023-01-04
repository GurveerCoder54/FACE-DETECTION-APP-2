import './App.css';
import 'tachyons';
import { Component } from 'react';
import ImageSearch from './components/ImageSearch.js';
import Signin from './Signin.js';
import ImgBoxList from './components/ImgBoxList.js';
import Register from './Register.js';
import Navigation from './components/Navigation/Navigation.js';



let arr =[]

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchfield: '',
      box: [],
      route: '',
      user: {
        id: '',
        name: localStorage.getItem('name'),
        email: '',
        password: '',
        entries: '',
        joined: '',
        signedin: localStorage.getItem('signedin'),
      }

    }
  }

  calculateFaceLocation = (data) => {

    const image = document.getElementById("inputimage")
    const width = image.width;
    const height = image.height;

  for(let i=0;i<Object.keys(data.outputs[0].data.regions).length;i++){
     const clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box;
     

   
    let obj2= {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col* width),
      bottomRow: height - (clarifaiFace.bottom_row* height)

    }
   arr.push(obj2)
  }
  return arr;
}

displayFaceBox=(box)=>{
  this.setState({box:box})

}

  onInputChange = (event) => {
    this.setState({ searchfield: event.target.value })
 

    
  }
  
  loadUser = (data) => {
    this.setState({
      user:
      {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
        signedin: data.signedin
      }
    })
  }
  onSubmit = () => {
    
    
     fetch('http://localhost:3001/imageurl', {
      method:'post',
      headers:{'Content-Type' : 'application/json'},
      body:JSON.stringify({
        input:this.state.searchfield
      })
     })
      .then(response => response.json())
      

      .then(result => {


      this.displayFaceBox(this.calculateFaceLocation(result))


    }     

    )

}

onButtonSubmit = (route) => {
  this.setState({ route: route });
  localStorage.setItem("state",route)
}

clearState=()=>{
  this.setState({searchfield:""});
  this.setState({box:[]})
}


  render() {

    return (
      <div className="App"  >
        {localStorage.getItem('state') === "home"  ? <div>

          <Navigation route={this.onButtonSubmit} clear ={this.clearState} />
          <ImageSearch searchChange={this.onInputChange} buttonClick={this.onSubmit} name={localStorage.getItem('name')} entries={this.state.user.entries} />
        <ImgBoxList source={this.state.searchfield} box={this.state.box}/>
        </div>
          : (
            localStorage.getItem('state') === "signin"
              ? <div>

                <Signin ButtonSubmit={this.onButtonSubmit} buttonSubmit={this.onButtonSubmit} loadUser={this.loadUser} /></div> :
              <div>

                <Register button={this.onButtonSubmit} loadUser={this.loadUser} />

              </div>
          
          )
        }
      </div>

    )

  };
}

export default App;
