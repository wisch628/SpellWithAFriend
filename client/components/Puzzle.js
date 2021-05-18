import React from 'react';
import Hexagon from './Hexagon';
import { connect } from 'react-redux';
import { todaysDataThunkCreator } from '../redux/todaysData';
import { addWordThunkCreator, getWordsThunkCreator } from '../redux/correctWords';
import { getGameUsersThunkCreator } from '../redux/gameUsers';
import { getUserThunkCreator } from '../redux/userReducer';
import { getGameThunkCreator } from '../redux/game';
import { Link } from 'react-router-dom';
import InvitePopUp from './InvitePopUp';
import ChatBox from './ChatBox';
import Loading from './Loading'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

class Puzzle extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: true, 
        currentWord: '',
        seen: false,
        chat: false,
        team: false,
        score: 0,
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
      this.togglePopUp = this.togglePopUp.bind(this);
      this.initialScore = this.initialScore.bind(this);

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

  async handleKeyPress(event) {
      if (event.key === 'Enter') {
          const newWord = this.state.currentWord.toLowerCase();
          //let correct = this.props.correctWords;
          let string = this.props.data.centerLetter + this.props.data.outerLetters.join("");
          let regex = new RegExp(`^[${string}]*$`);
          const correctWords = this.props.words.map(wordObject => wordObject.word);
          if (newWord.length <= 3) {
            toast.error('Too Short!')
          }
          else if (regex.test(newWord) === false ) {
            toast.error('Bad Letters!')
          } else if (newWord.includes(this.props.data.centerLetter) === false) {
            toast.error('Missing center letter!')
          } else if (this.props.data.answers.indexOf(newWord) === -1) {
            toast.error('Not in word list!!')
          } else if (correctWords.includes(newWord)) {
            toast.error('You already got that word!')
          } else {
              if (this.props.data.pangrams.includes(newWord))
              {toast.warning('Panagram!')
            }
              
              await this.props.addWord(newWord, this.props.match.params.gameId, this.props.match.params.userId, this.props.data);
              }
          this.setState({
            currentWord: ''
        })
          }
      }

    async componentDidMount () {
      await this.props.getData();
      await this.props.getGame(this.props.match.params.gameId);
      await this.props.getWords(this.props.match.params.gameId);
      await this.props.getGameUsers(this.props.match.params.gameId);
      const thisUser = this.props.gameUsers.filter(user => user.id === Number(this.props.match.params.userId))[0];
      await this.props.getUser(thisUser.email);
      this.setState({
        loading: false, 
        outside: this.props.data.outerLetters,
        score: 0
      })
    }
    // componentDidUpdate(prevProps) {
    //   if (prevProps.words.length !== this.props.words.length && this.props.words) {
    //     this.initialScore();
    //   }
    // }
  
    togglePopUp(input){
      this.setState({
        [input]: !this.state[input]
      })
    }

    initialScore() {
      const words = this.props.words || [];
      console.log(words);
      function callBack(accumulator, currentValue) {
        if (currentValue.length === 4) {
          accumualtor+= 1;
        } else {
          accumulator+=currentValue.length;
          if (this.props && this.props.data.pangrams.includes(currentValue)) {
            accumulator += 7;
          }
        }
      }
      let newScore = words.reduce(callBack, 0);
      this.setState({
        score: newScore
      }) 
    }

    render() {
      if (this.state.loading === true) {
        return (
          <Loading message="Loading your puzzle"/>
        )
      } else {
        const data = this.props.data || {};
        const outside = this.state.outside.map(letter => letter.toUpperCase());
        const center = data.centerLetter;
        const correctWords = this.props.words || [];
        var style = { backgroundColor: 'white' };

        return (
        <div style={style}>

          {this.state.seen ? <InvitePopUp togglePopUp={() => this.togglePopUp('seen')} game={this.props.game}/> : null}
          <nav className="top">
            <h3>{this.props.data.displayWeekday} {this.props.data.displayDate}</h3>
            <h3>Player: {this.props.user.firstName}</h3>
            <h3>Color: <span className={this.props.gameUsers.filter(user => user.id === this.props.user.id)[0].games[0]['user-game-as'].color}>{this.props.gameUsers.filter(user => user.id === this.props.user.id)[0].games[0]['user-game-as'].color}</span></h3>
            <button onClick={() => this.togglePopUp('seen')}>Invite Friends</button>
            <Link to={`/allgames/${this.props.user.id}`}><button>Load other games</button> </Link>
            {/* <button onClick={()}>View your stats</button> */}
            <button onClick={() => this.togglePopUp('team')}>Your Team</button>
          </nav>
          <nav className="bottom">
            <button onClick={() => this.togglePopUp('chat')}>Chat Box</button>
          </nav>
          {this.state.team ? 
          (
          <div togglePopUp={() => this.togglePopUp('team')}>
              <div className={['word-container', 'team'].join(' ')} >
                  {this.props.gameUsers.length>1 ? 
                    this.props.gameUsers.filter(user => user.id !== this.props.user.id).map(user => {
                    const color = user.games[0]['user-game-as'].color;
                    return (
                      <p className={['correct', color].join(' ')} key={user.id}>{user.firstName}</p>
                  )}) : (
                    <div>
                      <p>Your team is empty!</p>
                      <button onClick={() => this.togglePopUp('seen')}>Invite Friends</button>
                    </div>)}
                </div>
              </div>
          ) : (null)}
            <div className="flex">
            <div className="right-container">
              <p>Your team has found {correctWords.length || 0} words</p>
                <div className = "word-container">
                  {correctWords.length>0 ? correctWords.map(wordObject => {
                    const capitalized = wordObject.word.charAt(0).toUpperCase() + wordObject.word.slice(1);
                    const user = this.props.gameUsers.filter(user => user.id === wordObject.userId)[0];
                    const color = user.games[0]['user-game-as'].color;
                    return (
                      <p className={['correct', color].join(' ')} key={wordObject.id}>{capitalized}</p>
                  )}) : "Start Guessing!"}
                </div>
            </div>
            <div className="left-container">
            <input placeholder="Type Your Word" name="currentWord" id="wordField" type="text" value={this.state.currentWord} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
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
            {this.state.chat ? <ChatBox game={this.props.game} togglePopUp={() => this.togglePopUp('chat')} user={this.props.user}/> : null}
            
            </div>
            
</div>
    )
     }
    }
  }
  
  const mapState = (state) => {
    return {
      data: state.data,
      words: state.words,
      gameUsers: state.gameUsers,
      user: state.user,
      game: state.game
    };
  };
  
  const mapDispatch = (dispatch) => {
    return {
      getData: () => dispatch(todaysDataThunkCreator()), 
      getWords: (id) => dispatch(getWordsThunkCreator(id)),
      addWord: (wordObject, gameId, userId, data) => dispatch(addWordThunkCreator(wordObject, gameId, userId, data)),
      getGameUsers: (gameId) => dispatch(getGameUsersThunkCreator(gameId)),
      getUser: (email) => dispatch(getUserThunkCreator(email)),
      getGame: (gameId) => dispatch(getGameThunkCreator(gameId))
    };
  };
  
  export default connect(mapState, mapDispatch)(Puzzle);