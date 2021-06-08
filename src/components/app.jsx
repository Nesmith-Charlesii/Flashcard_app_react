import React, {Component} from 'react';
import axios from 'axios';
import NavBar from './NavBar/navBar';
import CollectionForm from './CollectionForm/collectionForm';
import FlashcardForm from './FlashcardForm/flashcardForm';
import FlashcardDisplay from './FlashcardDisplay/flashcardDisplay';
import 'bootstrap/dist/css/bootstrap.css';
import './app.css';

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            collections: [],
            collection_id: 1,
            flashcards: [],
            displayInput: '',
            renderType: "home"
        }
    }

    componentDidMount() {
        this.getAllCollections()
        this.getCollectionFlashcards(1)
    }

    getAllCollections = async() => {
        try {
            let {data} = await axios.get(`http://127.0.0.1:8000/flashcard_app/api/collections/`)
            console.log(data)
            this.setState({collections:data})
        }
        catch(error) {
            alert(`Whoops! ${error}. Looks like we're having some technical difficulties.Try again later!`)
        }
    }

    getCollectionFlashcards = async(collection_id) => {
        console.log('getting flashcards')
        try {
            let {data} = await axios.get(`http://127.0.0.1:8000/flashcard_app/api/collection/${collection_id}/flashcards/`)
            this.setState({flashcards: data})
            console.log(this.state.flashcards)
        }
        catch(error) {
            alert(`Whoops! ${error}. Looks like we're having some technical difficulties.Try again later!`)
        }
    }

    postCollection = async(title) => {
        console.log(title)
        try {
            let {data} = await axios.post('http://127.0.0.1:8000/flashcard_app/api/collections/', title)
            console.log('title', data)
            this.setState({collections: [...this.state.collections, data]})
            console.log(this.state.collections);
        }
        catch(error) {
            alert(`Whoops! ${error}. Looks like we're having some technical difficulties.Try again later!`)
        }
    }

    postFlashcard = async(flashcard) => {
        console.log('post flashcard execute', flashcard)
        try {
            let {data} = await axios.post('http://127.0.0.1:8000/flashcard_app/api/collection/1/flashcards/', flashcard)
            console.log('flashcard', data)
            this.setState({flashcards: [...this.state.flashcards, data]})
            console.log(this.state.flashcards);
        }
        catch(error) {
            alert(`Whoops! ${error}. Looks like we're having some technical difficulties.Try again later!`)
        }
    }

    handleDisplayChange = (event) => {
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    renderAction = (renderType) => {
        if(renderType === "collection form") {
            this.setState({renderType: "collection form"})
        } else if(renderType === "flashcard form") {
            this.setState({renderType: "flashcard form"})
        }
        // console.log('changing render type to collection form')
        // this.setState({renderType: "collection form"})
    }

    render() {
        if(this.state.renderType === "home"){
            return(
                <div className="container-fluid">
                    <div className="nav-wrapper">
                        <NavBar collections={this.state.collections} getFlashcards={(collection_id) => this.getCollectionFlashcards(collection_id)} createCollection={() => this.renderAction("collection form")}  createFlashcard={() => this.renderAction("flashcard form")} flashcards={this.state.flashcards} />
                    </div>
                    <div className="flashcard-display-wrapper">
                        <FlashcardDisplay flashcards={this.state.flashcards} />
                    </div>
                </div>
            )
        } else if(this.state.renderType === "collection form") {
            return(
                <div className="container-fluid" id="collectionForm">
                    <div className="nav-wrapper">
                        <NavBar collections={this.state.collections} createCollection={() => this.renderAction("collection form")} createFlashcard={() => this.renderAction("flashcard form")}/>
                    </div>
                    <div className="collection-form-wrapper">
                        <CollectionForm postCollection={(title) => this.postCollection(title)} />
                    </div>
                </div>
            )
        } else if(this.state.renderType === "flashcard form") {
            return(
                <div className="container-fluid" id="flashcardForm">
                    <div className="nav-wrapper">
                        <NavBar collections={this.state.collections} createCollection={() => this.renderAction("collection form")} createFlashcard={() => this.renderAction("flashcard form")}/>
                    </div>
                    <div className="flashcard-form-wrapper">
                        <FlashcardForm postFlashcard={(flashcard) => this.postFlashcard(flashcard)} collections={this.state.collections}/>
                        <div className="card-front">
                            <input type="text" name="card-front" value={this.state.displayInput} onChange={event => this.handleDisplayChange(event)}></input>
                        </div>
                        <div className="card-back">
                            <input type="text" name="card-back" value={this.state.displayInput} onChange={event => this.handleDisplayChange(event)}></input>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default App;