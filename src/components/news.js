import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";

function News(props) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalarticles, setTotalarticles] = useState(0);
  const [loading, setLoading] = useState(true);

  document.title =
    "News Headlines - " +
    props.category.charAt(0).toUpperCase() +
    props.category.slice(1);
  const updatePage = async () => {
    props.setProgress(10);
    const searchQuery = props.searchQuery || "";
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.ApiKey}&page=${page}&pageSize=${props.pagesize}&q=${searchQuery}`;
    let data = await fetch(url);
    props.setProgress(40);
    let parsedData = await data.json();
    props.setProgress(70);

    setArticles(parsedData.articles || []);
    setTotalarticles(parsedData.totalResults);
    props.setProgress(100);
  };

  useEffect(() => {
    updatePage();
    // eslint-disable-next-line
  }, []);

  let pageSize = props.pagesize;
  const fetchMoreData = async () => {
    const searchQuery = props.searchQuery || "";
    let data;
    if (page === Math.floor(totalarticles / props.pagesize)) {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.ApiKey}&page=1&pagesize=${totalarticles}&q=${searchQuery}`;
      data = await fetch(url);
      setLoading(false);
      console.log(page === Math.floor(totalarticles / props.pagesize));
      setPage(page + 1);
      let parsedData = await data.json();
      let last5 = parsedData.articles.slice(-totalarticles%6 +1)
      console.log("parsedData:", parsedData);
      if (!Array.isArray(parsedData.articles)) {
        console.error("parsedData.articles is not an array!");
      } else {
        console.log(
          "articles is an array with length:",
            last5
        );
      }
      let newArticles = parsedData.articles.slice(-totalarticles%6 +1);
      setArticles(
        articles.concat(newArticles)
      );
      console.log(articles.length, totalarticles);
    } else {
      const url = `https://newsapi.org/v2/top-headlines?country=${
        props.country
      }&category=${props.category}&apiKey=${props.ApiKey}&page=${
        page + 1
      }&pageSize=${pageSize}&q=${searchQuery}`;
      data = await fetch(url);
      console.log(page === Math.floor(totalarticles / props.pagesize) + 1);
      setPage(page + 1);
      let parsedData = await data.json();
      let newArticles = parsedData.articles;
      setArticles(articles.concat(newArticles));
      console.log(articles.length, totalarticles);
    }
  };

  return (
    <>
      <h1 className="text-center" style={{ marginTop: 90 }}>
        Top Headlines -{" "}
        {props.category.charAt(0).toUpperCase() + props.category.slice(1)}
      </h1>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={loading}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              if (element.title !== "[REMOVED]") {
                return (
                  <div key={element.url} className="col-md-4">
                    <NewsItem
                      title={
                        element.title
                          ? element.title.slice(0, 60) + "..."
                          : null
                      }
                      description={
                        element.description
                          ? element.description.slice(0, 80) + "..."
                          : null
                      }
                      imgurl={element.urlToImage}
                      newsurl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source}
                    />
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}

News.defaultProps = {
  country: "in",
  pagesize: 9,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
  searchQuery: PropTypes.string,
};

export default News;
