import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Import Style
import styles from './Header.css';

export function Header(props, context) {
  const languageNodes = props.intl.enabledLanguages.map(lang => (
    <li
      key={lang}
      onClick={() => props.switchLanguage(lang)}
      className={lang === props.intl.locale ? styles.selected : ''}
    >
      {lang}
    </li>
  ));

  return (
    <div className={styles.header}>
      <div className={styles['language-switcher']}>
        <ul>
          <li>
            <FormattedMessage id='switchLanguage' />
          </li>
          {languageNodes}
        </ul>
      </div>
      <div className={styles.content}>
        <Typography variant='h3' color='inherit'>
          Ticketing Support System
        </Typography>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        {context.router.isActive('/', true) ? (
          <Button
            variant='contained'
            color='primary'
            href='#'
            onClick={props.toggleAddPost}
          >
            {' '}
            Add Issue
          </Button>
        ) : null}
      </div>
    </div>
  );
}
Header.contextTypes = {
  router: PropTypes.object
};

Header.propTypes = {
  toggleAddPost: PropTypes.func.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired
};

export default Header;
