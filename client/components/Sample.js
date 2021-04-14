import React from 'react';
import { connect } from 'react-redux';
// import { INSERT THUNKS} from '../redux/dummyReducer';
import { Link } from 'react-router-dom';

export class Sample extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        sampleArray: []
      }
    //   this.sampleFunction = this.sampleFunction.bind(this);

    }
    async componentDidMount () {
    //   await this.props.sampleThunk();
      this.setState({
        loading: false,
        sampleArray: [1, 2, 3]
      })
    }
    // async sampleFunction(id) {
    //   await this.props.sampleFunction(id);
    // }
  
    render() {
      if (this.state.loading === true) {
        return (
          <div>
            <h1>Loading...be patient!</h1>
          </div>
        )
      } else {
      return (
        <div>
            <Link to="/sample">
              Here is a sample link!
            </Link>
        
          {this.state.sampleArray.length > 0 ? this.state.sampleArray.map(number => (
            <div key = {number}>
                <p>Number {number}</p>
            </div>
          )) : <p>There are no robots in the database! Add some now! </p>}
        </div>
      );
     }
    }
  }
  
  const mapState = (state) => {
    return {
      robots: state.robots
    };
  };
  
  const mapDispatch = (dispatch, { history }) => {
    return {
      sampleThunk: (sort) => dispatch(sampleThunkCreator(sort))
    };
  };
  
  export default connect(mapState, mapDispatch)(Sample);