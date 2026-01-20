import React from "react";

function NewsItem(props) {
  let { title, description, imgurl, newsurl, author, date, source } = props;
  return (
    <div>
      <div className="card my-3 mx-2">
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          style={{ zIndex: 1, left: "90%" }}
        >
          {source.name}
          <span className="visually-hidden">unread messages</span>
        </span>
        <img
          src={imgurl}
          style={{ height: "240px" }}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title} </h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-body-secondary">
              By {author ? author : "author"} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={newsurl}
            rel="noreferrer"
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
