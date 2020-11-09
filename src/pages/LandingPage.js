import React from "react";
import ResultPage from "./ResultPage.js";

import {
  Row,
  Col,
  Button,
  UncontrolledAlert,
} from "reactstrap";
import Footer from "components/Footer/Footer.js";
import Loader from 'react-loader-spinner'


import logo from '../assets/img/icon.png';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiKeyMovieDB: '7815b3a383683d17a246181565e3861d',
      isLoaded: false,
      movies: [],
      selectedMovies: [],
      page: Math.floor(Math.random() * 50) + 1,
      showRecommended: false,
      showNotificationError: false
    }
  }
  componentWillMount() {
    this.getMovies();
  }

  getMovies = () => {
    this.setState({
      page: Math.floor(Math.random() * 50) + 1
    });

    fetch("https://api.themoviedb.org/3/movie/popular?api_key=" + this.state.apiKeyMovieDB + "&page=" + this.state.page)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            movies: result.results.slice(0, -2)
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  componentDidMount() {
    document.body.classList.toggle("landing-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("landing-page");
  }

  onClickMovie = (movie) => {
    var newMovies = this.state.movies;
    var newSelectedMovies = this.state.selectedMovies;

    const index = newMovies.indexOf(movie);
    if (index > -1 && this.state.selectedMovies.length !== 5) {
      if (newMovies[index].highlighted === true) {
        newMovies[index].highlighted = false;
        this.setState({ movies: newMovies })

        const indexSelected = newSelectedMovies.indexOf(movie);
        newSelectedMovies.splice(indexSelected, 1);
        this.setState({ selectedMovies: newSelectedMovies })
      } else {
        newMovies[index].highlighted = true;
        this.setState({ movies: newMovies })
        this.setState({ selectedMovies: [movie, ...this.state.selectedMovies] })
      }
    }
  }

  onClickRemove(movie) {
    var newSelectedMovies = this.state.selectedMovies;
    var newMovies = this.state.movies;

    const index = newMovies.indexOf(movie);
    const indexSelected = newSelectedMovies.indexOf(movie);
    if (indexSelected > -1) {
      newSelectedMovies.splice(indexSelected, 1);
      newMovies[index].highlighted = false;
      this.setState({ movies: newMovies })
      this.setState({ selectedMovies: newSelectedMovies })
    }
  }

  onClickFindOut = () => {
    if (this.state.selectedMovies.length < 5) {
      this.setState({ showNotificationError: true })
    } else {
      this.setState({ showRecommended: true })
    }
  }

  goBack = () => {
    this.setState({
      showRecommended: false,
      selectedMovies: [],
      page: Math.floor(Math.random() * 50) + 1,
      showNotificationError: false
    })
  }

  render() {
    if (!this.state.isLoaded) {
      return (
      <Row>
        <Col lg="12" sm="12" className="justify-content-between align-items-center">
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </Col>
      </Row>)
    } else if (!this.state.showRecommended) {
      return (
        <>

          <div className="wrapper">
            <div styles={{ overflowY: 'scroll' }}>
              <Row>
                <Col>
                  <h1 className="text-white text-center" style={{ paddingTop: "40px" }}>
                    <img src={logo} alt="icon" width="50" height="auto"/> Select 5 of your prefered movies from this list
                    <Button color="info" type="button" style={{ marginLeft: "2em", marginBottom: "0.5em" }} onClick={() => this.getMovies()}>
                      Reset List
                     {"  "}
                      <i className="tim-icons icon-refresh-01" />
                    </Button>
                  </h1>
                </Col>
              </Row>
              <Row style={{ padding: "2em" }}>
                <Col lg="9" sm="9" >
                  <Row>
                    {this.state.movies.map(item => {
                      var classItem = item.highlighted ? "image-highlighted-card" : "image-card";
                      return (
                        <Col lg="2" sm="6" style={{ paddingBottom: "2em" }}>
                          <div className={classItem} onClick={() => this.onClickMovie(item)}>
                            <img src={"https://image.tmdb.org/t/p/w500" + item.poster_path} alt="" />
                          </div>
                        </Col>
                      )
                    })}
                  </Row>
                </Col>
                <Col lg="3" sm="3" className="justify-content-between align-items-center">
                  {this.state.selectedMovies.length === 5 &&
                    <UncontrolledAlert className="alert-with-icon" color="warning">
                      <span data-notify="icon" className="tim-icons icon-bulb-63" />
                      <span>
                        <b>No more movies! -</b>
                          Click on Find Out
                        </span>
                    </UncontrolledAlert>
                  }

                  {this.state.showNotificationError &&
                    <UncontrolledAlert className="alert-with-icon" color="warning">
                      <span data-notify="icon" className="tim-icons icon-bulb-63" />
                      <span>
                        <b>Pick 'em! -</b>
                          Choose 5 movies you like
                        </span>
                    </UncontrolledAlert>
                  }
                  {this.state.selectedMovies.length !== 0 &&
                    <h2 className="text-white text-center">
                      Selected movies
                    </h2>
                  }

                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "5em" }}>


                    <Row>

                      {this.state.selectedMovies.map(movie => {
                        if (this.state.selectedMovies.length === 1) {
                          return (
                            <Col lg="12" sm="12" className="justify-content-between align-items-center">
                              <Button color="primary" type="button" onClick={() => this.onClickRemove(movie)} style={{ maxWidth: '100%', textOverflow: 'ellipsis' }}>
                                {movie.original_title} {" "}
                                <i className="tim-icons icon-simple-remove" />
                              </Button>
                            </Col>
                          )
                        } else {
                          return (
                            <Col lg="6" sm="12" className="justify-content-between align-items-center">
                              <Button color="primary" type="button" onClick={() => this.onClickRemove(movie)} style={{ maxWidth: '100%', textOverflow: 'ellipsis' }}>
                                {movie.original_title} {" "}
                                <i className="tim-icons icon-simple-remove" />
                              </Button>
                            </Col>
                          )
                        }
                      }
                      )}
                    </Row>
                  </div>
                  <h2 className="text-white text-center">
                    What To Watch
                  </h2>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Button color="success" type="button" onClick={() => this.onClickFindOut()}>
                      Find Out
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
            <Footer />
          </div>
        </>
      );
    } else {
      return (
        <>

          <div className="wrapper">
            <div styles={{ overflowY: 'scroll' }}>
              <Row>
                <Col>
                  <h1 className="text-white text-center" style={{ paddingTop: "40px" }}>
                  <img src={logo} alt="icon" width="50" height="auto"/> Here is what you should watch.
                    <Button color="warning" type="button" style={{ marginLeft: "2em", marginBottom: "0.5em" }} onClick={() => this.goBack()}>
                      Try again
                     {"  "}
                      <i className="tim-icons icon-minimal-left" />
                    </Button>
                  </h1>
                </Col>
              </Row>
              <Row style={{ padding: "2em" }}>
                <Col lg="12" sm="12" className="justify-content-between align-items-center">
                  <ResultPage selectedMovies={this.state.selectedMovies} />
                </Col>
              </Row>
            </div>
            <Footer />
          </div>
        </>
      );
    }
  }

}

export default LandingPage;
