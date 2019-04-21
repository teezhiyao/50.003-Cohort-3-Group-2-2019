import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ChatIcon from "@material-ui/icons/Chat";
import { Link } from "react-router";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { BrowserRouter, Route } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import { getUser } from "../Post/UserReducer";
import Popper from "@material-ui/core/Popper";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";

import Fade from "@material-ui/core/Fade";
// Import Style
// import styles from './App.css';

// Import Components
import Helmet from "react-helmet";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Import Actions
import { toggleAddPost } from "./AppActions";
import { switchLanguage } from "../../modules/Intl/IntlActions";
import { Z_FIXED } from "zlib";

const drawerWidth = 240;
//To do : Tidy up file by using imports instead of throwing everything here
const styles = theme => ({
  root: {
    display: "flex"
  },
  grow: {
    flexGrow: 1,
    paddingRight: theme.spacing.unit * 3
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  iconPadText: {
    padding: "0 0px"
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
    // marginLeft: -drawerWidth
  },
  content2: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    },
    paddingRight: theme.spacing.unit * 2
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

// let DevTools;
// if (process.env.NODE_ENV === 'development') {
//   // eslint-disable-next-line global-require
//   DevTools = require('./components/DevTools').default;
// }

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      anchorCb: null,
      openCb: false,
      open: false,
      anchorEl: null,
      mobileMoreAnchorEl: null
    };
  }
  // state = {
  //   open: false,
  //   anchorEl: null,
  //   mobileMoreAnchorEl: null
  // };

  componentDidMount() {
    this.setState({ isMounted: true }); // eslint-disable-line
  }
  handleClick = event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorCb: currentTarget,
      openCb: !state.openCb
    }));
  };
  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  // handleProfileMenuOpen = event => {
  //   this.setState({ anchorEl: event.currentTarget });
  // };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };
  render() {
    const { classes, theme } = this.props;
    const { open, anchorCb, openCb, anchorEl, mobileMoreAnchorEl } = this.state;
    const id = open ? "simple-popper" : null;
    // const { anchorEl, mobileMoreAnchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    // const renderMenu = (
    //   <Menu
    //     anchorEl={anchorEl}
    //     anchorOrigin={{ vertical: "top", horizontal: "right" }}
    //     transformOrigin={{ vertical: "top", horizontal: "right" }}
    //     open={isMenuOpen}
    //     onClose={this.handleMenuClose}
    //   >
    //     <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
    //     <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
    //   </Menu>
    // );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        {/* <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem> */}
      </Menu>
    );
    return (
      // <div>
      //   {this.state.isMounted &&
      //     !window.devToolsExtension &&
      //     process.env.NODE_ENV === 'development' && <DevTools />}
      <div>
        {this.props.location.pathname !== "/" && (
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position="fixed"
              className={classNames(classes.appBar, {
                [classes.appBarShift]: open
              })}
            >
              <Toolbar disableGutters={!open}>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(
                    classes.menuButton,
                    open && classes.hide
                  )}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" noWrap>
                  Ticketing Support System
                </Typography>

                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                  />
                </div>
                <div className={classes.grow} />
                <Typography variant="h6" color="inherit" noWrap>
                  {this.props.users.name && "Welcome " + this.props.users.name}
                </Typography>
                {/* <div className={classes.sectionDesktop}>
                  <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                      <MailIcon />
                    </Badge>
                  </IconButton>
                  <IconButton color="inherit">
                    <Badge badgeContent={17} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    aria-owns={isMenuOpen ? "material-appbar" : undefined}
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </div> */}
                <div className={classes.sectionMobile}>
                  <IconButton
                    aria-haspopup="true"
                    onClick={this.handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </div>
              </Toolbar>
            </AppBar>
            {/* {renderMenu} */}
            {renderMobileMenu}
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              <div className={classes.drawerHeader}>
                <Link to={`/profile`}>
                  <IconButton
                    aria-owns={isMenuOpen ? "material-appbar" : undefined}
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </Link>
                <IconButton>
                  <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton>
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton onClick={this.handleDrawerClose}>
                  {theme.direction === "ltr" ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              </div>
              <Divider />

              <List>
                <Link to={`/home`}>
                  <ListItem button key="Home">
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Home"
                      className={classes.iconPadText}
                    />
                  </ListItem>
                </Link>

                {/* <Link to={`/profile`}>
                  <ListItem button key="Profile">
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItem>
                </Link> */}
                <Link to={`/grid`}>
                  <ListItem button key="Board">
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                    <ListItemText
                      primary="Board"
                      className={classes.iconPadText}
                    />
                  </ListItem>
                </Link>
              </List>

              <Divider />
              <List>
                {/* {["Pending Issues", "Resolved Issues", "All Issues"].map( */}
                {["Pending Issues", "Resolved Issues"].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>
                      {index === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>

                    {index === 0 ? (
                      <Link to={`/pending`}>
                        <ListItemText primary={text} />
                      </Link>
                    ) : null}
                    {index === 1 ? (
                      <Link to={`/resolved`}>
                        <ListItemText primary={text} />
                      </Link>
                    ) : null}
                  </ListItem>
                ))}
              </List>
              <Divider />

              <List>
                <Link to={`/`}>
                  <ListItem button key="Log Out">
                    <ListItemIcon>
                      <MailIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Log Out"
                      className={classes.iconPadText}
                    />
                  </ListItem>
                </Link>
              </List>

              <Divider />

              {/* <List>
                <Link to={`/SignUpPage`}>
                  <ListItem button key="Signup">
                    <ListItemIcon>
                      <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary="Signup" />
                  </ListItem>
                </Link>
              </List> */}
            </Drawer>
            <main
              className={classNames(classes.content2, {
                [classes.contentShift]: open
              })}
            >
              <Helmet
                title="Issue Reporting"
                titleTemplate="%s - Blog App"
                meta={[
                  { charset: "utf-8" },
                  {
                    "http-equiv": "X-UA-Compatible",
                    content: "IE=edge"
                  },
                  {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1"
                  }
                ]}
              />
              <Header
                switchLanguage={lang =>
                  this.props.dispatch(switchLanguage(lang))
                }
                intl={this.props.intl}
                toggleAddPost={this.toggleAddPostSection}
              />
              <div className={styles.container}>{this.props.children}</div>
              <Footer />
            </main>
            <Fab
              aria-label="ChatBot"
              onClick={this.handleClick}
              className={classes.fab}
            >
              <ChatIcon />
            </Fab>
            <Popper
              id={id}
              open={openCb}
              anchorEl={anchorCb}
              transition
              placement={"bottom-end"}
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <iframe
                    allow="microphone;"
                    width="350"
                    height="430"
                    src="https://console.dialogflow.com/api-client/demo/embedded/0eb7b8ed-3068-4e2b-8b23-f34c012e4ceb"
                  />
                </Fade>
              )}
            </Popper>
          </div>
        )}
        {this.props.location.pathname === "/" && (
          <div className={classes.root}>
            <CssBaseline />
            <main
              className={classNames(classes.content, {
                [classes.contentShift]: open
              })}
            >
              {" "}
              <Helmet
                title="Issue Reporting"
                titleTemplate="%s - Blog App"
                meta={[
                  { charset: "utf-8" },
                  {
                    "http-equiv": "X-UA-Compatible",
                    content: "IE=edge"
                  },
                  {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1"
                  }
                ]}
              />
              <div className={styles.container}>{this.props.children}</div>
            </main>
          </div>
        )}
      </div>

      // </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  users: PropTypes.shape({
    name: PropTypes.string,
    userType: PropTypes.string,
    sessionToken: PropTypes.string.isRequired,
    objectId: PropTypes.string.isRequired
  })
};

// Retrieve data from store as props
function mapStateToProps(store) {
  console.log(store);
  return {
    intl: store.intl,
    users: getUser(store)
  };
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(App)
);

// export default connect(mapStateToProps)(
//   withStyles(styles, { withTheme: true })
// )(App);
