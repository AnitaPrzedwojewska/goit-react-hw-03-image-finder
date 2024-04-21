import { Component } from 'react';
import css from './app.module.css';
import { INITIAL_STATE } from './constants/initial-image-finder';
import { Searchbar } from './components/searchbar/searchbar';
import { Loader } from './components/loader/loader';
import { fetchImages } from './api/pixabay-api';
import { ImageGallery } from './components/imageGallery/imageGallery';
import { Button } from './components/button/button';
import { Modal } from './components/modal/modal';

export class App extends Component {
  constructor() {
    super();

    this.state = {
      query: INITIAL_STATE.query,
      images: INITIAL_STATE.images,
      page: INITIAL_STATE.page,
      pages: INITIAL_STATE.pages,
      info: INITIAL_STATE.info,
      error: INITIAL_STATE.error,
      more: INITIAL_STATE.more,
      loading: INITIAL_STATE.loading,
      modal: INITIAL_STATE.modal,
      image: INITIAL_STATE.image,
      tags: INITIAL_STATE.tags,
    };
  }

  setNewQuery = () => {
    this.setState({
      query: INITIAL_STATE.query,
      images: INITIAL_STATE.images,
      page: INITIAL_STATE.page,
      pages: INITIAL_STATE.pages,
      info: INITIAL_STATE.info,
      error: INITIAL_STATE.error,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setNewQuery();
    const words = event.target.keywords.value;
    if (words.trim() === "") {
      this.setState({ error: "Please enter what you are looking for!" });
      return;
    }
    const query = words.split(" ").join("+");
    this.setState({
      query: query,
    });
    event.target.reset();
  };

  async loadImages(query, page) {
    try {
      await fetchImages(query, page).then((result) => {
        // console.log("result: ", result);
        const total = result.totalHits;
        const images = result.hits;
        images.map(({ id, webformatURL, tags, largeImageURL }) => {
          id, webformatURL, tags, largeImageURL });
        if (images.length === 0) {
          this.setState({ more: false });
          this.setState({
            error: `Sorry, there are no images matching '${this.state.query}'. Please try again.`,
          });
          return;
        }
        this.setState((prevState) => ({
          images: [...prevState.images, ...images],
          info: `Hurray! We founded ${total} images matching '${this.state.query}'.`,
        }));
        total > this.state.page * 12
          ? this.setState({ more: true })
          : this.setState({ more: false });
      });
    } catch (error) {
      // console.log(error);
      this.setState({
        error: "Sorry, something went wrong, please try again later",
      });
    } finally {
      this.setState({ loading: false });
    }
  }

  handleMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  handleModal = (event) => {
    // event.preventDefault();
    if (!this.state.modal) {
      const large = event.target.getAttribute("data-large");
      const tags = event.target.alt;
      // console.log("large: ", large);
      // console.log("tags: ", tags);
      this.setState({
        modal: true,
        image: large,
        tags: tags,
      });
    } else {
      this.setState({
        modal: false,
        image: INITIAL_STATE.image,
        tags: INITIAL_STATE.tags
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.setState({ loading: true });
      this.loadImages(this.state.query, this.state.page);
    }
  }

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit}></Searchbar>
        {console.log("this.state: ", this.state)}
        {this.state.loading && <Loader />}
        {this.state.error && <p className={css.text}>{this.state.error}</p>}
        {this.state.info && <p className={css.text}>{this.state.info}</p>}
        {!this.state.error && this.state.images.length > 0 && (
          <ImageGallery
            images={this.state.images}
            onClick={this.handleModal}></ImageGallery>
        )}
        {this.state.more && <Button onClick={this.handleMore} />}
        {this.state.modal && (
          <Modal
            image={this.state.image}
            tags={this.state.tags}
            onClick={this.handleModal}
          />
        )}
      </div>
    );
  }
}

export default App
