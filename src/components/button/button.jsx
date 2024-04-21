import css from "./button.module.css";
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <button className={css.Button} onClick={onClick}>Load more</button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired
}