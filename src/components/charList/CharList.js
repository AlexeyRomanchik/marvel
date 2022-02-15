import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {

    state = {
        characters: [],
        loading: true,
        error: false,
        itemsLoading: false,
        offset: 210,
        charactersEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharacters();
    }

    updateCharacters = (offset) => {
        this.onItemsLoading();

        this.marvelService.getAllCharacters(offset)
            .then(this.onCharactersLoaded)
            .catch(this.onError);
    }

    onItemsLoading = () => this.setState({ itemsLoading: true });

    onCharactersLoaded = (newCharacters) => {
        const ended = newCharacters.length < 9 ? true : false;

        this.setState(({ characters, offset }) => ({
            characters: [...characters, ...newCharacters],
            loading: false,
            itemsLoading: false,
            offset: offset + 9,
            charactersEnded: ended
        }))
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
        const { characters, loading, error, itemsLoading, offset, charactersEnded } = this.state,
            charactersList = this.renderCharacters(characters);

        const errorMessage = error ? <ErrorMessage /> : null,
            spinner = loading ? <Spinner /> : null,
            content = !(loading || error) ? charactersList : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long"
                    disabled={itemsLoading}
                    style={{ display: charactersEnded ? "none" : "block" }}
                    onClick={() => this.updateCharacters(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div >
        )
    }
}

export default CharList;