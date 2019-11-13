import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import {
  check_session,
  get_reviews_by_user_id,
  create_review,
} from '../../client';
import {
  
} from '../../store/actions/users.actions';


class UserReviewsFragment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 1,
      title: '',
      summary: '',
      isIdDifferent: null,
      reviews: [],
      all_reviews_loaded: false,
      min_review_id: null,
    };
  }

  componentDidMount() {
    check_session()
      .then((response) => {
        console.log(response, this);
        const isIdDifferent = response.user && response.user.id !== parseInt(this.props.match.params.id, 10);
        const yourPage = response.user && response.user.id === parseInt(this.props.match.params.id, 10);
        this.setState({ isIdDifferent, yourPage });
        this.load_reviews();
      })
  }

  load_reviews = () => {
    if (this.props.user.id) {
      get_reviews_by_user_id(this.props.user.id, this.state.min_review_id).then((response) => {
        console.log(response);
        const min_review_id = response.reviews.length > 0
          ? response.reviews[response.reviews.length - 1].id
          : this.state.min_review_id;
        console.log('min_review_id', min_review_id);
        this.setState({
          min_review_id,
          reviews: [ ...this.state.reviews, ...response.reviews ],
          all_reviews_loaded: !!(response.reviews.length < 5),
        });
      });
    }
  }

  submitForm = () => {
    const { rating, title, summary } = this.state;
    create_review({ rating, title, summary }, this.props.user.id)
      .then((response) => {
        console.log(response);
        if (response.error) {
          window.alert(response.message);
          return;
        }
        this.setState({
          reviews: [ response.review, ...this.state.reviews ]
        });
      });
  }

  render() {
    return (
      <div>
        {
          this.state.isIdDifferent && (
            <form className="text-white">
              <div className="form-group">
                <label>Rating</label>
                <input 
                  type="number" 
                  className="form-control" 
                  min="1"
                  max="5"
                  placeholder="Enter rating" 
                  value={this.state.rating}
                  onChange={(e) => { this.setState({ rating: e.target.value }); }}
                />
              </div>

              <div className="form-group">
                <label>Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Enter title" 
                  value={this.state.title}
                  onChange={(e) => { this.setState({ title: e.target.value }); }}
                />
              </div>

              <div className="form-group">
                <label>Summary</label>
                <textarea 
                  className="form-control" 
                  placeholder="Enter summary" 
                  value={this.state.summary}
                  onChange={(e) => { this.setState({ summary: e.target.value }); }}
                ></textarea>
              </div>

              <button type="button" className="btn btn-primary" onClick={this.submitForm}>Submit</button>

              <hr />
            </form>
          )
        }

        <div className="reviews-container container-cluid">
          {
            this.state.reviews.map((review, index) => (
              <div className="row" key={index}>
                <div className="col-md-12">
                  <div className="review-box">
                    <img src={review.writer.icon_link} className="review-user-icon" alt={review.writer.username} />
                    <p><em><Link to={`/users/${review.writer_id}`}>@{review.writer.username}</Link></em></p>
                    <p>Rating: {review.rating}</p>
                    <h3>{review.title}</h3>
                    <p>{review.summary}</p>
                    <p>Created: {review.createdAt}</p>
                  </div>
                </div>
              </div>
            ))
          }
          {
            this.state.all_reviews_loaded === false && (
              <button type="button" className="btn btn-primary" onClick={this.load_reviews}>Load More</button>
            )
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    store
  };
}

export default connect(
  mapStateToProps,
)(UserReviewsFragment);
