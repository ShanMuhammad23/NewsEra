import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NewsComponent from './NewsComponent';
import Spinner from './Spinner';

const News = ({ country, category, pageSize }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayGeneralNews, setDisplayGeneralNews] = useState(true);
  const [generalNews, setGeneralNews] = useState([]);

  // Fetch general category news when component mounts
  useEffect(() => {
    const fetchGeneralNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=51c45809121d460daeecb7d276170953&pageSize=${pageSize}`;
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch general news data');
        }

        setGeneralNews(data.articles);
      } catch (error) {
        console.error('Error fetching general news data:', error);
        setError('Failed to fetch general news data');
      }

      setLoading(false);
    };

    fetchGeneralNews();
  }, [country, category, pageSize]);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=51c45809121d460daeecb7d276170953&pageSize=${pageSize}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch news data');
      }

      setSearchResults(data.articles);
      setDisplayGeneralNews(false); // Hide general news when search results are displayed
    } catch (error) {
      console.error('Error fetching news data:', error);
      setError('Failed to fetch news data');
    }

    setLoading(false);
  };

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetchNews();
  };

  return (
    <div className="container my-3">
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search News..."
            value={query}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>
      {loading && <Spinner />}
      {error && <div className="text-danger">{error}</div>}
      {displayGeneralNews && (
        <div>
          <h3>General Category News</h3>
          <div className="row my-3">
            {!loading &&
              generalNews.map((element, index) => (
                <div className="col-md-4" key={index}>
                  <NewsComponent
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    NewsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
      {!displayGeneralNews && (
        <div>
          <h3>News From {query}</h3>
          <div className="row my-3">
            {!loading &&
              searchResults.map((element, index) => (
                <div className="col-md-4" key={index}>
                  <NewsComponent
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    NewsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

News.propTypes = {
  country: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default News;
