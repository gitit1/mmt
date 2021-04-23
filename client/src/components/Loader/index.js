import React from 'react';
import './loader.scss'

const Loader = ({className, type}) => {
    return (
        <>
            {
                type === 'page' ?
                    <div className={`lds-default ${className}`}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    :
                    <div className={`lds-ellipsis ${className}`}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
            }
        </>
    )
};

export default Loader
