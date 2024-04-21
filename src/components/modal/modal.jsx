import css from "./modal.module.css";
import PropTypes from 'prop-types';

export const Modal = ({ image, tags, onClick }) => {
  console.log('Modal image: ', image);
  console.log('Modal tags: ', tags);
  return (
    <div className={css.Overlay} onClick={onClick}>
      <div className={css.Modal}>
        <img src={image} alt={tags} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};