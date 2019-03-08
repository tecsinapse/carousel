import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Fab from '@material-ui/core/Fab';
import classNames from 'classnames';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { grey } from '@material-ui/core/colors';
import Carousel from './Carousel';

const useStyle = makeStyles({
  content: {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
  },
  arrow: {
    width: 48,
    height: 48,
    zIndex: 1,
    top: '50%',
    position: 'absolute',
  },
  arrowLeft: {
    left: 10,
  },
  arrowRight: {
    right: 10,
  },
  arrowIcon: {
    color: grey[700],
  },
  carouselWrapper: {
    overflow: 'hidden',
    borderRadius: 14,
    transform: 'scale(1.0)',
    background: 'transparent',
    height: '100%',
    width: '100%',
  },
  slide: {
    width: '100%',
    height: '100%',
  },
  carousel: {
    height: '100%',
    width: '100%',
  },
  carouselDiv: {
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
});

export const AutoRotatingCarousel = ({ autoplay, children, interval }) => {
  const classes = useStyle();
  const hasMultipleChildren = children.length != null;
  const [slideIndex, setSlideIndex] = useState(0);

  const carousel = (
    <Carousel
      autoplay={autoplay && hasMultipleChildren}
      className={classes.carousel}
      index={slideIndex}
      interval={interval}
      onChangeIndex={newIndex => setSlideIndex(newIndex)}
      slideClassName={classes.slide}
    >
      {React.Children.map(children, c => React.cloneElement(c))}
    </Carousel>
  );

  return (
    <div className={classes.content}>
      {hasMultipleChildren && (
        <div className={classNames(classes.arrow, classes.arrowLeft)}>
          <Fab onClick={() => setSlideIndex(prevIndex => prevIndex - 1)}>
            <ArrowBackIcon className={classes.arrowIcon} />
          </Fab>
        </div>
      )}

      <div className={classes.carouselDiv}>
        <Paper elevation={0} className={classes.carouselWrapper}>
          {carousel}
        </Paper>
      </div>

      {hasMultipleChildren && (
        <div className={classNames(classes.arrow, classes.arrowRight)}>
          <Fab onClick={() => setSlideIndex(prevIndex => prevIndex + 1)}>
            <ArrowForwardIcon className={classes.arrowIcon} />
          </Fab>
        </div>
      )}
    </div>
  );
};

AutoRotatingCarousel.defaultProps = {
  autoplay: false,
  interval: 5000,
};

AutoRotatingCarousel.propTypes = {
  /** If `false`, the auto play behavior is disabled. */
  autoplay: PropTypes.bool,
  /** Delay between auto play transitions (in ms). */
  interval: PropTypes.number,
};

export default AutoRotatingCarousel;
