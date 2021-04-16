import React from 'react';
import Hexagon from './Hexagon';
import { connect } from 'react-redux';
import { todaysDataThunkCreator } from '../redux/todaysData';
import { addWordThunkCreator, getWordsThunkCreator } from '../redux/correctWords';
import { Link } from 'react-router-dom';

export class Puzzle extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: true, 
        currentWord: '',
        alert: {
          class: 'white',
          message: '',
          outside: []
    }
      }
      this.shuffleLetters = this.shuffleLetters.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.letterClick = this.letterClick.bind(this);

    }

    handleChange(event) {
      this.setState({
          [event.target.name]: (event.target.value).toUpperCase()
      })
  }

  letterClick(event) {
      const letter = event.target.innerText;
      const currentWord = this.state.currentWord + letter;
      this.setState({
          currentWord: currentWord
      })
  }

  shuffleLetters() {
      const shuffledArray = [...this.state.outside].sort((a, b) => 0.5 - Math.random());
      this.setState({
          outside: shuffledArray
      })
  }

  handleKeyPress(event) {
      if (event.key === 'Enter') {
        let newAlert = {};
          const newWord = this.state.currentWord.toLowerCase();
          //let correct = this.props.correctWords;
          let string = this.props.data.centerLetter + this.props.data.outerLetters.join("");
          let regex = new RegExp(`^[${string}]*$`);
          const correctWords = this.props.words.map(wordObject => wordObject.word);
          if (newWord.length <= 3) {
            newAlert = {
              class: 'black',
              message: 'Too short'
            };
          }
          else if (regex.test(newWord) === false ) {
            newAlert = {
              class: 'black',
              message: 'Bad letters'
            };
          } else if (newWord.includes(this.props.data.centerLetter) === false) {
            newAlert = {
              class: 'black',
              message: 'Missing center letter'
            };
          } else if (this.props.data.answers.indexOf(newWord) === -1) {
              newAlert = {
                  class: 'black',
                  message: 'Not in word list'
                };
          } else if (correctWords.includes(newWord)) {
              newAlert = {
                class: 'black',
                message: 'You already got that word!'
              };
          } else {
              if (this.props.data.pangrams.includes(newWord))
              {
                newAlert = {
                  class: 'yellow',
                  message: 'Panagram!' 
              }
            } else {
                newAlert = {
                  class: 'white',
                  message: '' 
                };
              }
              
              this.props.addWord({word: newWord});
              }
          this.setState({
            alert: newAlert,
            currentWord: ''
        })
          }
      }

    async componentDidMount () {
      await this.props.getData();
      await this.props.getWords();
      this.setState({
        loading: false, 
        outside: this.props.data.outerLetters
      })
    }
  
    render() {
      if (this.state.loading === true) {
        return (
          <div>
            <h1>Pulling today's puzzle data</h1>
          </div>
        )
      } else {
        const data = this.props.data || {};
        const outside = this.state.outside.map(letter => letter.toUpperCase());
        const center = data.centerLetter;
        const correctWords = this.props.words || [];
        console.log(correctWords, 'correct words');
        //console.log(this.state, 'state');
      return (
        <div>
            <div>
            <h1>Today's Puzzle</h1>
            </div>
            <div className="flex">
            <div className="right-container">
              <p>You have found {correctWords.length || 0} words</p>
                <div className = "word-container">
                  {correctWords.length>0 ? correctWords.map(wordObject => {
                    const capitalized = wordObject.word.charAt(0).toUpperCase() + wordObject.word.slice(1);
                    return (
                      <p className='correct' key={wordObject.id}>{capitalized}</p>
                  )}) : "start guessing!"}
                </div>
            </div>
            <div className="left-container">
            <input placeholder="Type Your Word" name="currentWord" type="text" value={this.state.currentWord} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            <h2 id="alert" className={this.state.alert.class}>{this.state.alert.message}</h2>
            <button type="button" onClick={this.shuffleLetters}>Shuffle Letters</button>
            <div className ="game-container" onClick={this.letterClick}>
                <div className="game-wrapper">
                    <Hexagon letter={outside[0]} className={['hex', 'odd'].join(' ')} />
                    <Hexagon letter={outside[1]} className="hex" />
                    <Hexagon letter={outside[2]} className={['hex', 'odd'].join(' ')} />
                </div>
              <div className="game-wrapper">
                <Hexagon letter={outside[3]} className={['hex', 'odd'].join(' ')} />
                <Hexagon letter={center.toUpperCase()} className={['hex', 'center'].join(' ')} />
                <Hexagon letter={outside[4]} className={['hex', 'odd'].join(' ')} />
            </div>
            <div className={['game-wrapper', 'special'].join(' ')}>
                <Hexagon letter={outside[5]} className="hex" />
            </div>
            </div>
            </div>
            </div>
            
</div>
    )
     }
    }
  }
  
  const mapState = (state) => {
    return {
      data: state.data,
      words: state.words
    };
  };
  
  const mapDispatch = (dispatch, { history }) => {
    return {
      getData: () => dispatch(todaysDataThunkCreator()), 
      getWords: () => dispatch(getWordsThunkCreator()),
      addWord: (word) => dispatch(addWordThunkCreator(word))
    };
  };
  
  export default connect(mapState, mapDispatch)(Puzzle);