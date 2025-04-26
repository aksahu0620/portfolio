import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  children,
  className = '',
  hoverable = false,
}) => {
  return (
    <div
      className={`bg-white dark:bg-[#112240] rounded-lg shadow-md overflow-hidden ${
        hoverable
          ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-2'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hoverable: PropTypes.bool,
};

export default Card;