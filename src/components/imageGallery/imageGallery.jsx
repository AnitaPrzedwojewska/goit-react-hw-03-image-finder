import css from './imageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, onClick }) => {
  console.log('ImageGallery images: ', images);
  return (
    <>
      <ul className={css.ImageGallery}>
        {images.map((image) => {
          // console.log('image: ', image);
          return (
            <li key={image.id} className='ImageGalleryItem'>
              <img
                src={image.webformatURL}
                alt={image.tags}
                data-large={image.largeImageURL}
                onClick={onClick}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired
};