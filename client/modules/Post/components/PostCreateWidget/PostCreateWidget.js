import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './PostCreateWidget.css';

export class PostCreateWidget extends Component {
  addPost = () => {
    const nameRef = this.refs.name;
    const titleRef = this.refs.title;
    const contentRef = this.refs.content;
    console.log('trying here');
    if (nameRef.value && titleRef.value && contentRef.value) {
      this.props.addPost(nameRef.value, titleRef.value, contentRef.value); // send to database
      nameRef.value = titleRef.value = contentRef.value = ''; // reset to empty fields
    }
  };

  addUser = () => {
    const nameRef = this.refs.nameAdmin;
    const titleRef = this.refs.titleAdmin;
    const contentRef = this.refs.contentAdmin;
    if (nameRef.value && titleRef.value && contentRef.value) {
      this.props.addUser(nameRef.value, titleRef.value, contentRef.value);
      nameRef.value = titleRef.value = contentRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${this.props.showAddPost ? styles.appear : ''}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}>
            <FormattedMessage id='createNewPost' />
          </h2>
          <input
            placeholder={this.props.intl.messages.authorName}
            className={styles['form-field']}
            ref='name'
          />
          <input
            placeholder={this.props.intl.messages.postTitle}
            className={styles['form-field']}
            ref='title'
          />
          <textarea
            placeholder={this.props.intl.messages.postContent}
            className={styles['form-field']}
            ref='content'
          />
          <a
            className={styles['post-submit-button']}
            href='#'
            onClick={this.addPost}
          >
            <FormattedMessage id='submit' />
          </a>
          <input
            placeholder={this.props.intl.messages.authorName}
            className={styles['form-field']}
            ref='nameAdmin'
          />
          <input
            placeholder={this.props.intl.messages.postTitle}
            className={styles['form-field']}
            ref='titleAdmin'
          />
          <textarea
            placeholder={this.props.intl.messages.postContent}
            className={styles['form-field']}
            ref='contentAdmin'
          />
          <a
            className={styles['post-submit-button']}
            href='#'
            onClick={this.addUser}
          >
            <FormattedMessage id='createUser' />
          </a>
        </div>
      </div>
    );
  }
}

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
  showAddPost: PropTypes.bool.isRequired,
  addUser: PropTypes.func.isRequired,
  intl: intlShape.isRequired
};

export default injectIntl(PostCreateWidget);