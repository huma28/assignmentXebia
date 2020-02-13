import React from 'react';
import s from './loader.scss';
/**
 * show overlay with loader
 * @param {*} props 
 */

function Loader(props) {
    return(
        <div className="overlay">
          <div class="loader" style={{width: props.width, height: props.height}}></div>
        </div>
    );
}

export default Loader;
