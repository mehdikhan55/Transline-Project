import React from 'react'
import Hero from './Hero';
import Tranlation from './Translation/Translation';
import TranslationWithGemini from './Translation/TranslationWithGemini';

export default function Home({auth, setAuth}) {

    return (
        <main className="main">
            <div className="app">
                <Hero auth={auth} setAuth={setAuth}/>
                {/* <Tranlation /> */}
                <TranslationWithGemini />
            </div>
        </main>
    );
};

