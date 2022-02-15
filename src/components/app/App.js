import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import { Component } from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

class App extends Component {

    state = {
        charId: null
    }

    onCharIdUpdated = (id) => {
        this.setState({
            charId: id
        });
    }

    render() {
        const { charId } = this.state;

        return (
            <div className="app">
                <AppHeader />
                <main>
                    <RandomChar />
                    <div className="char__content">
                        <CharList onCharSelected={this.onCharIdUpdated} />
                        <ErrorBoundary>
                            <CharInfo id={charId} />
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
            </div>
        )
    }
}

export default App;