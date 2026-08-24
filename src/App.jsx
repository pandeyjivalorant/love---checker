import React, { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import InputView from './components/InputView';
import QuestionView from './components/QuestionView';
import LoadingView from './components/LoadingView';
import ResultView from './components/ResultView';
import Footer from './components/Footer';
import Scene from './components/3d/Scene';
import './App.css';

function App() {
  // ─── Single source of truth ───
  const [view, setView] = useState('home');
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  // ─── Callbacks for child components ───

  const handleNavHome = useCallback(() => {
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleHowItWorks = useCallback(() => {
    setView('home');
    setTimeout(() => {
      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  const handleNavInput = useCallback(() => {
    setView('input');
  }, []);

  const handleInputSubmit = useCallback((n1, n2) => {
    setName1(n1);
    setName2(n2);
    setView('questions');
  }, []);

  const handleQuestionsComplete = useCallback((collectedAnswers) => {
    setAnswers(collectedAnswers);
    setView('loading');
  }, []);

  const handleResult = useCallback((resultData) => {
    setResult(resultData);
    setView('result');
  }, []);

  const handleTryAnother = useCallback(() => {
    // Full reset
    setName1('');
    setName2('');
    setAnswers([]);
    setResult(null);
    setView('input');
  }, []);

  return (
    <div className="app-container">
      {/* 3D Background */}
      <Scene viewState={view} />
      
      {/* UI Layer */}
      <div className="main-content">
        <Navbar onHome={handleNavHome} onHowItWorks={handleHowItWorks} onInput={handleNavInput} />
        
        <div style={{ flex: 1, position: 'relative' }}>
          <AnimatePresence mode="wait">
            {view === 'home' && (
              <HomeView key="home" onStart={handleNavInput} />
            )}
            
            {view === 'input' && (
              <InputView key="input" onSubmit={handleInputSubmit} />
            )}

            {view === 'questions' && (
              <QuestionView
                key="questions"
                name1={name1}
                name2={name2}
                onComplete={handleQuestionsComplete}
              />
            )}
            
            {view === 'loading' && (
              <LoadingView
                key="loading"
                name1={name1}
                name2={name2}
                answers={answers}
                onResult={handleResult}
              />
            )}
            
            {view === 'result' && (
              <ResultView
                key="result"
                name1={name1}
                name2={name2}
                result={result}
                onTryAnother={handleTryAnother}
              />
            )}
          </AnimatePresence>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;
