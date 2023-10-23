import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from '../Modal.module.scss';

export default function CookieChoice({ label, checked, onClick }) {
  return (
    <>
        <tr className={`card ${style.cookies__choice__table__row}`}>
            <td>
            {label}
            </td>
            <td>
                <i
                    className={`icon-${checked ? 'confirmation' : 'error'}`}
                    onClick={onClick}
                    role="presentation"
                    />
            </td>
        </tr>
    </>
  );
}

CookieChoice.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

