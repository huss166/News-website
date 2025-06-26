import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Newsitems from "./Newsitems";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
	console.log("Using API Key:", props.apiKey);

	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [totalResults, setTotalResults] = useState(0);
	const capitalFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	const updateNews = async () => {

		props.setProgress(30);
		const url = `https://newsapi.org/v2/top-headlines?&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
		setLoading(true);
		let data = await fetch(url);
		let parseData = await data.json();
		console.log("API response:", parseData);
		setArticles(parseData.articles);
		setTotalResults(parseData.totalResults);
		setLoading(false);
		props.setProgress(100);
	};

	useEffect(() => {
		document.title = `${capitalFirstLetter(props.category)} - News App`;
		updateNews();
		// eslint-disable-next-line
	}, []);

	const fetchMoreData = async () => {
		const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
		setPage(page + 1);
		let data = await fetch(url);
		let parseData = await data.json();
		setArticles(articles.concat(parseData.articles));
		setTotalResults(parseData.totalResults);
	};

	return (
		<>
			<h1 className="text-center example-big">News App - Top {capitalFirstLetter(props.category)} Headlines</h1>

			{loading && <Loading />}
			<InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length !== totalResults} loader={<Loading />}>
				<div className="container">
					<div className="row">
						{articles.map((element, index) => {
							return (
								<div className="col-md-4" key={index}>
									<Newsitems title={element.title ? element.title.slice(0, 60) : ""} description={element.description ? element.description.slice(0, 120) : ""} imgUrl={element.urlToImage ? element.urlToImage : "https://images.hindustantimes.com/img/2023/01/29/1600x900/breaking_news_latest_1674951344905_1674951345196_1674951345196.jpeg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
								</div>
							);
						})}
					</div>
				</div>
			</InfiniteScroll>
		</>
	);
};

export default News;

News.defaultProps = {
	country: "in",
	pageSize: 16,
	category: "general",
};

News.propTypes = {
	country: PropTypes.string,
	pageSize: PropTypes.number,
	category: PropTypes.string,
};
