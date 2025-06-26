import React from "react";

const Newsitems = (props) => {
	let { title, description, imgUrl, newsUrl, author, date, source } = props;
	return (
		<div className="my-3 mx-3">
			<div className="card" style={{ height: "460px" }}>
				<div style={{ display: "flex", position: "absolute", right: 0 }}>
					<span className=" badge rounded-pill bg-danger">{source}</span>
				</div>
				<img src={imgUrl} className="card-img-top" style={{ height: "220px" }} alt="..." />
				<div className="card-body">
					<h5 className="card-title">{title}...</h5>
					<p className="card-text">{description}...</p>
					<p className="card-text text-time">
						<small className="text-danger ">
							By {!author ? "Unknown" : author} on {new Date(date).toLocaleString()}
						</small>
					</p>
					<a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark btn-read-more">
						Read More
					</a>
				</div>
			</div>
		</div>
	);
};

export default Newsitems;
