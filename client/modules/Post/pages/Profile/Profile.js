import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import {
    addPostRequest,
    addPostUserRequest,
    fetchAllowedPosts,
    deletePostRequest,
    addReplyRequest
  } from "../../PostActions";
  import { getUser } from "../../UserReducer";

class Profile extends Component {
    
  
    componentDidMount() {
      // this function is called the moment this component is rendered.
      this.props.dispatch(fetchAllowedPosts(this.props.users.sessionToken));
      console.log("componentDidMount");
      console.log(this.props.users);
    }
    render() {
        return(
            <div>
                <h1>Profile: {this.props.users.username}</h1>
                
            </div>
        )
    }

}

function mapStateToProps(state) {
console.log(state);
return {
    users: getUser(state)
};
}
Profile.propTypes = {
users: PropTypes.shape({
    name: PropTypes.string,
    userType: PropTypes.string,
    sessionToken: PropTypes.string.isRequired,
    objectId: PropTypes.string.isRequired
}),
dispatch: PropTypes.func.isRequired
};

Profile.contextTypes = {
router: PropTypes.object
};

export default connect(mapStateToProps)(Profile);
  