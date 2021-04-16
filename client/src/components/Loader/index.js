import React from 'react';
import './loader.scss'

const Loader = (props) => {
    return (
        <>
            {
                props.loaderType === 'page' ?
                    <div className="lds-default">
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
                    <div className="lds-ellipsis">
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
