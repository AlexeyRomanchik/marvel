import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {

    state = {
        characters: [],
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateCharacters();
    }

    marvelService = new MarvelService();

    updateCharacters = () => {
        this.marvelService.getAllCharacters()
            .then(this.onCharactersLoaded)
            .catch(this.onError);
    }

    onCharactersLoaded = (characters) => {
        this.setState({ characters, loading: false })
    }

    onError = () => {
        this.setState({
            characters: [],
            loading: false,
            error: true
        });
    }

    renderCharacters(characters) {
        const listCharacters = characters.map(character => {
            const imageStyle = character.thunbnail.indexOf("image_not_available.jpg") > -1 ?
                { objectFit: "fill" } : null;

            return (
                <li className="char__item"
                    key={character.id}
                    onClick={() => this.props.onCharSelected(character.id)}>
                    <img src={character.thunbnail} alt={character.name}
                        style={imageStyle} />
                    <div className="char__name">{character.name}</div>
                </li>
            );
        });

        return (
            <ul className="char__grid">
                {listCharacters}
            </ul>
        );
    }

    render() {
        const { characters, loading, error } = this.state,
            charactersList = this.renderCharacters(characters);

        const errorMessage = error ? <ErrorMessage /> : null,
            spinner = loading ? <Spinner /> : null,
            content = !(loading || error) ? charactersList : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;