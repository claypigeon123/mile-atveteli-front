import React from 'react';
import { RingLoader } from 'react-spinners';
import { css } from '@emotion/core';

const override = css`
  display: block;
  margin: 0 auto;
`;

export const Loading = (props) => {
    return (
        <div className="justify-content-center text-center mt-5">
            <RingLoader color="#00ff00" css={override} size={80} />
            <div className="mt-3 font-weight-bold h4 milegreen">
                {props.message}
            </div>
        </div>
    )
}