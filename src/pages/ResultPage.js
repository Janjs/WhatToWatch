import React from "react";

import classnames from "classnames";
import {
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  Badge,
  Button,
  UncontrolledAlert
} from "reactstrap";

import Loader from 'react-loader-spinner'

class ResultPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiKeyMovieDB: '7815b3a383683d17a246181565e3861d',
      selectedMovies: this.props.selectedMovies,
      resultMovies: [],
      isLoaded: false,
      iconTabs: 1,
      textTabs: 4,
      index: 0,
      genres: [],
      showNoMore:false
    }
  }
  componentWillMount() {
    this.getMovies();
  }

  getMovies = () => {
    this.setState({
      page: Math.floor(Math.random() * 50) + 1
    });

    var promises = [];
    for(var i=0; i<5; i++) {
      promises = [...promises, this.getMovie(this.state.selectedMovies[i].id)]
    }

    var getGenres = new Promise((resolve, reject) => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=" + this.state.apiKeyMovieDB+"&language=en-US")
    .then(res => res.json())
      .then(
        (result) => {
          console.log("genres: "+JSON.stringify(result.genres))
          this.setState({
            genres: result.genres
          }, resolve());
        },
        (error) => {
          this.setState({
            error
          }, reject());
        }
      )
    })

    Promise.all(promises).then(values => { 
      getGenres.then(() => {
        this.setState({ isLoaded: true })
      })
    });
  }

  getGenreName(genre_id) {
    var genreMovie = this.state.genres.find((genre) => genre.id === genre_id)
    return genreMovie.name
  }

  getMovie(id) {
    new Promise((resolve, reject) => {
      fetch("https://api.themoviedb.org/3/movie/" + id + "/recommendations?api_key=" + this.state.apiKeyMovieDB+"&language=en-US")
      .then(res => res.json())
      .then(
        (result) => {
          if(result.results[this.state.index]!==undefined){
          this.setState({
            resultMovies: [result.results[this.state.index], ...this.state.resultMovies]
          }, resolve());
          }
        },
        (error) => {
          this.setState({
            error
          }, reject);
        }
      )
    }); 
  }

  toggleTabs = (e, stateName, index) => {
    e.preventDefault();
    this.setState({
      [stateName]: index
    });
  };

  onLoadMore() {
    if(this.state.index<=3){
      this.setState({index: this.state.index+1});
      this.getMovies();
    } else {
      this.setState({showNoMore: true});
    }

  }

  render() {
    console.log(this.state.resultMovies)
    if (this.state.isLoaded) {
      return (
        <div className="section section-tabs">
           {this.state.showNoMore &&
                    <UncontrolledAlert className="alert-with-icon" color="warning">
                      <span data-notify="icon" className="tim-icons icon-bulb-63" />
                      <span>
                        <b>I've got no more movies for you :( - </b>
                        you can try again though!
                        </span>
                    </UncontrolledAlert>
                  }
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="12" xl="12">
                <Card>
                  <CardHeader>
                    <Nav className="nav-tabs-info" role="tablist" tabs>
                      {this.state.resultMovies.map((movie, i) =>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.iconTabs === 1
                            })}
                            onClick={e => this.toggleTabs(e, "iconTabs", i+1)}
                            href={"#"+movie.title}
                          >
                            <i className="tim-icons icon-video-66" />
                             {movie.title}
                          </NavLink>
                        </NavItem>
                      )}
                      <Button color="success" type="button" onClick={() => this.onLoadMore()}>
                        More
                      </Button>
                </Nav>
              </CardHeader>
                <CardBody>
                  <TabContent
                    className="tab-space"
                    activeTab={"link" + this.state.iconTabs}
                  >
                    {this.state.resultMovies.map((movie, i) =>
                      <TabPane tabId={"link"+(i+1)}>
                      <Row>
                      <Col lg="4" sm="12" className="justify-content-between align-items-center" style={{marginLeft: "1em", marginRight: "1em"}}>
                        <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt="" />
                      </Col>
                      <Col lg="7" sm="12">
                        <h3>{movie.title}</h3>
                        <p style={{paddingBottom: '1em'}}>
                          {movie.overview}
                        </p>
                        <h6>
                          {"Original Title: "}<Badge color="light">{movie.original_title}</Badge>
                        </h6>
                        <h6>
                          {"Genres: "}
                          {movie.genre_ids.map(genre_id => 
                            <Badge color="success">{this.getGenreName(genre_id)}</Badge>
                          )}
                        </h6>
                        <h6>
                          {"Release Date: "}<Badge color="info">{movie.release_date}</Badge>
                        </h6>
                        <h6>
                          {"Rating: "}<Badge color="neutral">{movie.vote_average+"/10"}</Badge>
                        </h6>
                      </Col>
                      </Row>
                    </TabPane>
                    )}
                  </TabContent>
                </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div >
    );
    } else {
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
    }
  }
}

export default ResultPage;
