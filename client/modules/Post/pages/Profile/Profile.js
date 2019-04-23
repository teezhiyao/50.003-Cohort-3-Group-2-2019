import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import styles from "./Profile.css";
import profile from './profile.png';
import ReactBasicTable from 'react-basic-table';

import {
    fetchAllowedPosts
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
        var columns = [
            "",
            ""
        ];
        var rows = [
            [
            <span className={styles["text"]}>Username</span>,
            <span className={styles["text"]}>{this.props.users.username}</span>,
            ],
            [
            <span className={styles["text"]}>Full Name</span>,
            <span className={styles["text"]}>{this.props.users.name}</span>,
            ],
            [
            <span className={styles["text"]}>Age</span>,
            <span className={styles["text"]}>{this.props.users.age}</span>,
            ],
            [
            <span className={styles["text"]}>User Type</span>,
            <span className={styles["text"]}>{this.props.users.userType}</span>,
            ],
            [
            <span className={styles["text"]}>   </span>,
            <span className={styles["text"]}>   </span>,
            ]
        ];
        return(
            <div className={styles["boxx"]}>
                <p className={styles["box"]}>
                <div class="w3-card-4">
                    <p className={styles["header"]} >
                        Profile 
                    </p>
                    <img className={styles["profile_image"]} src={profile} ></img>
                {/* <p className={styles["text"]}> {this.props.users.name} </p>
                <p className={styles["text"]}>Username : {this.props.users.username} </p> */}
                {/* <ReactBasicTable rows={rows} columns={columns} /> */}
                {/* className={styles["table"]} */}
                <table class="w3-table" className={styles["table"]}>
                    
                    <tr >
                    <td >Username:</td>
                    <td>{this.props.users.username}</td>
                    </tr>
                    <tr >
                    <td>Full Name:</td>
                    <td>{this.props.users.name}</td>
                    </tr>
                    <tr>
                    <td>Age:</td>
                    <td>{this.props.users.age}</td>
                    </tr>
                    <tr>
                    <td>User Type:</td>
                    <td>{this.props.users.userType}</td>
                    </tr>
                    <tr>
                    <td>   </td>
                    <td>   </td>
                    </tr>
                </table>
                
                </div>
                </p>
                
                
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
  