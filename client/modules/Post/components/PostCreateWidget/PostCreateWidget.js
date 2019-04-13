import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";

// Import Style
import styles from "./PostCreateWidget.css";

export class PostCreateWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCategory: null
    };
  }
  addPost = () => {
    const catRef = this.refs.category;
    const titleRef = this.refs.title;
    const contentRef = this.refs.content;
    console.log("trying here");
    if (catRef.value && titleRef.value && contentRef.value) {
      this.props.addPost(catRef.value, titleRef.value, contentRef.value);
      catRef.value = titleRef.value = contentRef.value = "";
    }
  };

  handleNewCategory = e => {
    this.setState({ newCategory: e.target.value });
    console.log("changing state");
    console.log(e.target.value);
    console.log(this.state.newCategory);
  };
  addNewCategory = () => {
    this.props.handleNewCategory(this.state.newCategory);
    console.log("added new category:");
    console.log(this.state.newCategory);
  };
  render() {
    const cls = `${styles.form} ${this.props.showAddPost ? styles.appear : ""}`;
    console.log("in post create widget");
    return (
      <div className={cls}>
        <div className={styles["form-content"]}>
          <h2 className={styles["form-title"]}>
            <FormattedMessage id="createNewPost" />
          </h2>

          <label>
            {" "}
            Issue Category
            {/* <select onChange={this.handleSelectCategory} ref="category" > */}
            <select ref="category">
              {this.props.categoryList
                .filter(category => category.value != "all")
                .map(category => {
                  return (
                    <option value={category.value}> {category.label} </option>
                  );
                })}
            </select>
          </label>

          {/*To add new category: */}
          <form onSubmit={this.addNewCategory}>
            <label>
              Can't find your category?
              <input
                type="text"
                placeholder="Optional"
                value={this.state.newCategory}
                onChange={this.handleNewCategory}
              />
            </label>
            <button type="submit">Add new category</button>
          </form>

          <input
            placeholder={this.props.intl.messages.postTitle}
            className={styles["form-field"]}
            ref="title"
          />
          <textarea
            placeholder={this.props.intl.messages.postContent}
            className={styles["form-field"]}
            ref="content"
          />
          <a
            className={styles["post-submit-button"]}
            href="#"
            onClick={this.addPost}
          >
            <FormattedMessage id="submit" />
          </a>
          {/* <input
            placeholder={this.props.intl.messages.authorName}
            className={styles["form-field"]}
            ref="nameAdmin"
          />
          <input
            placeholder={this.props.intl.messages.postTitle}
            className={styles["form-field"]}
            ref="titleAdmin"
          />
          <textarea
            placeholder={this.props.intl.messages.postContent}
            className={styles["form-field"]}
            ref="contentAdmin"
          />
          <a
            className={styles["post-submit-button"]}
            href="#"
            onClick={this.addUser}
          >
            <FormattedMessage id="createUser" />
          </a> */}
        </div>
      </div>
    );
  }
}

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  showAddPost: PropTypes.bool.isRequired,
  categoryList: PropTypes.array,
  handleNewCategory: PropTypes.func.isRequired,
  intl: intlShape.isRequired
};

export default injectIntl(PostCreateWidget);
