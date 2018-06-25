import React from 'react';
import PropTypes from 'prop-types';

import { withStyles, withStylesPropTypes } from 'react-with-styles';

import { DEFAULT_HANDLE_WIDTH_UNITS, BACKGROUND_HEIGHT_UNITS } from './constants/SliderConstants';
import handlePropTypes, { handleDefaultProps } from './propTypes/HandlePropTypes';

export const propTypes = {
  ...withStylesPropTypes,
  ...handlePropTypes,
  'aria-valuetext': PropTypes.string,
  'aria-label': PropTypes.string,
  getLabel: PropTypes.func,
};

const defaultProps = {
  ...handleDefaultProps,
  'aria-valuetext': undefined,
  'aria-label': undefined,
  getLabel: undefined,
};

function DefaultHandle({
  css, styles, orientation, disabled, ...passProps
}) {
  const {
    handleRef, theme, getLabel, ...rest
  } = passProps; // eslint-disable-line no-unused-vars
  return (
    <button
      ref={handleRef}
      {...css(
        styles.DefaultHandle_handle,
        orientation === 'vertical' ? styles.DefaultHandle_handle__vertical : styles.DefaultHandle_handle__horizontal,
        disabled && styles.DefaultHandle_handle__disabled,
      )}
      {...rest}
    />
  );
}
DefaultHandle.propTypes = {
  ...propTypes,
};

DefaultHandle.defaultProps = defaultProps;

export default withStyles(({ color, unit }) => ({
  DefaultHandle_handle: {
      width: DEFAULT_HANDLE_WIDTH_UNITS * unit,
      height: DEFAULT_HANDLE_WIDTH_UNITS * unit,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: color.grey,
      backgroundColor: color.white,
      borderRadius: '20%',
      outline: 'none',
      zIndex: 2,
      boxShadow: `0 ${unit / 4}px ${unit / 4}px ${color.textDisabled}`,
      ':focus': {
        boxShadow: `${color.focus} 0 0 2px 2px`,
      },

      ':after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        backgroundColor: '#dadfe8',
      },

      ':before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        backgroundColor: '#dadfe8',
      }
    },

  DefaultHandle_handle__horizontal: {
    marginLeft: -12,
    top: -5,
    ':before': {
      top: 7,
      height: 10,
      width: 1,
      left: 10,
    },

    ':after': {
      top: 7,
      height: 10,
      width: 1,
      left: 13,
    },

    background: {
      borderRadius: 15,
    }
  },

  DefaultHandle_handle__vertical: {
    marginTop: -(DEFAULT_HANDLE_WIDTH_UNITS / 2) * unit,
    left: ((BACKGROUND_HEIGHT_UNITS / 2) - (DEFAULT_HANDLE_WIDTH_UNITS / 2)) * unit,
    progress: {
      left: 2,
      width: 13,
    },
    handle: {
      left: -5,
      marginTop: -12,

      ':before': {
        top: 10,
      },

      ':after': {
        top: 13,
        left: 8,
        height: 1,
        width: 10,
      }
    }
  },

  DefaultHandle_handle__disabled: {
    borderColor: color.buttons.defaultDisabledColor,
  },
}))(DefaultHandle);
