import React from 'react';
import { connect } from 'react-redux';
import { sampleThunkCreator } from '../redux/dummyReducer';
import { Link } from 'react-router-dom';

export class Sample extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: true
      }
    //   this.sampleFunction = this.sampleFunction.bind(this);

    }
    async componentDidMount () {
      console.log('calling component did mount');
      await this.props.sampleThunk();
      this.setState({
        loading: false
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
        const samples = this.props.samples || [];
        console.log(this.props);
        console.log(this.state);
      return (
        <div>
            <Link to="/sample">
              Here is a sample link!
            </Link>
        
          {samples.length > 0 ? samples.map(sample => (
            <div key = {sample.id}>
                <p>Name: {sample.username}</p>
            </div>
          )) : <p>There are no samples in the database! </p>}
        </div>
      );
     }
    }
  }
  
  const mapState = (state) => {
    return {
      samples: state.samples
    };
  };
  
  const mapDispatch = (dispatch, { history }) => {
    return {
      sampleThunk: () => dispatch(sampleThunkCreator())
    };
  };
  
  export default connect(mapState, mapDispatch)(Sample);