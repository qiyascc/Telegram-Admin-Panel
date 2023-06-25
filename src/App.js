import React from 'react';
import './App.css';
import NewsList from './component/NewsList';
import NewsPage from './component/NewsPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Router>
                <header className="App-header">
                    <h1>News Website</h1>
                </header>
                <h2 className='Last-News-Header'>Last 3 news</h2>
                <main>
                    <Routes>
                        <Route path="/" element={<NewsList />} />
                        <Route path="/news/:id" element={<NewsPage />} />
                    </Routes>
                </main>
            </Router>
        </div>
    );
}

export default App;
