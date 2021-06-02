import React from 'react';
import AllTiles from './AllTiles';
import { connect } from 'react-redux';
import { todaysDataThunkCreator } from '../redux/todaysData';
import { addWordThunkCreator, getWordsThunkCreator } from '../redux/correctWords';
import { getGameUsersThunkCreator } from '../redux/gameUsers';
import { getUserThunkCreator } from '../redux/userReducer';
import { getGameThunkCreator } from '../redux/game';
import InvitePopUp from './InvitePopUp';
import ChatBox from './ChatBox';
import Loading from './Loading'
import GameTopNav from './GameTopNav';

class Puzzle extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: true, 
        currentWord: '',
        seen: false,
        chat: false,
        team: false,
        score: 0
      }
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

  async handleKeyPress(event) {
      if (event.key === 'Enter') {
          const newWord = this.state.currentWord.toLowerCase();
          await this.props.addWord(newWord, this.props.match.params.gameId, this.props.user.id, this.props.data);
          this.setState({
            currentWord: ''
        })
        // if (this.props.toast.message !== "") {
        //   toast[this.props.toast.type](this.props.toast.message);
        // }
          }
      }

    componentDidMount () {
      this.props.getData();
      this.props.getGame(this.props.match.params.gameId, this.props.user.id);
      this.props.getWords(this.props.match.params.gameId);
      this.props.getGameUsers(this.props.match.params.gameId);
    }

    componentDidUpdate(prevProps) {
      if (prevProps.data !== this.props.data ) {
        if (this.props.data) {
          this.setState({
            loading: false,
            score: 0
          })}
      }
    }
  
    togglePopUp(input){
      this.setState({
        [input]: !this.state[input]
      })
    }

    initialScore() {
      const words = this.props.words || [];
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
          <Loading />
        )
      } else {
        const correctWords = this.props.words || [];
        var style = { backgroundColor: 'white' }; 
        return (
        <div style={style}>
          {this.state.seen ? <InvitePopUp togglePopUp={() => this.togglePopUp('seen')} game={this.props.game}/> : null}
          <GameTopNav togglePopUp={this.togglePopUp} />
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
            <AllTiles letterClick={this.letterClick} />
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
      user: state.auth,
      game: state.game
    };
  };
  
  const mapDispatch = (dispatch, {history}) => {
    return {
      getData: () => dispatch(todaysDataThunkCreator(history)), 
      getWords: (id) => dispatch(getWordsThunkCreator(id)),
      addWord: (wordObject, gameId, userId, data) => dispatch(addWordThunkCreator(wordObject, gameId, userId, data)),
      getGameUsers: (gameId) => dispatch(getGameUsersThunkCreator(gameId)),
      getUser: (email) => dispatch(getUserThunkCreator(email)),
      getGame: (gameId, userId) => dispatch(getGameThunkCreator(gameId, userId, history))
    };
  };
  
  export default connect(mapState, mapDispatch)(Puzzle);