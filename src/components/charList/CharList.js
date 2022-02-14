import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner'

class CharList extends Component {

    state = {
        characters: []
    }

    componentDidMount() {
        this.updateCharacters();
    }

    marvelService = new MarvelService();

    updateCharacters = () => {
        this.marvelService.getAllCharacters()
            .then(characters => this.setState({ characters, loading: false }));
    }


    render() {
        const { characters, loading, error } = this.state;

        const listCharacters = characters.map(character => {
            const imageStyle = character.thunbnail.indexOf("image_not_available.jpg") > -1 ?
                { objectFit: "fill" } : null;

            return (
                <li className="char__item" key={character.id}>
                    <img src={character.thunbnail} alt={character.name}
                        style={imageStyle} />
                    <div className="char__name">character.name</div>
                </li>
            );
        });

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {listCharacters}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;