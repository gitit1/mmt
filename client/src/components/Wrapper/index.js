import React from 'react';
import Navigator from './components/Navigator.js';;

const Wrapper = (props) => {
    return (
        <>
            <header>
                <Navigator />
            </header>
            <main>
                {props.children}
            </main>
        </>
    )
};

export default Wrapper
