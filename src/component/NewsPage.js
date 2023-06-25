import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './News.css'

const NewsPage = () => {
    const [newsItem, setNewsItem] = useState(null);
    const { id: newsId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNewsItem = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/news/${newsId}`);
                setNewsItem(response.data);
            } catch (error) {
                console.error('Could not fetch news item:', error);
            }
        };

        fetchNewsItem();

        
    }, [newsId]);

    if (!newsItem) {
        return <div>Loading news...</div>;
    }
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className='Items-Style'>
            <h2>{newsItem.title}</h2>
            <p>{newsItem.content}</p>
            <button onClick={() => handleGoBack()}>Back</button>
        </div>
        
    );
};

export default NewsPage;
