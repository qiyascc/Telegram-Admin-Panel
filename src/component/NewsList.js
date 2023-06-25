import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NewsList = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/news');
                const latestNews = response.data.slice(-3).reverse();
                setNews(latestNews);
            } catch (error) {
                console.error('Could not fetch news:', error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="news-list">
            {news.map((item, index) => (
                <div key={index} className="news-summary">
                    <h2>
                        <Link to={`/news/${item.id}`}>
                            {item.title}
                        </Link>
                    </h2>
                    <p>{item.summary}</p>
                </div>
            ))}
        </div>
    );
};

export default NewsList;
