import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class NewsComponent extends Component {
  static defaultProps = {
    country:"us",
    pageSize:15,
    category:"general"
}
static propTypes={
country:PropTypes.string,
pageSize:PropTypes.number,
category:PropTypes.string
}


  render() {
    let {title,description,imageUrl,NewsUrl,author,date,source}=this.props;
    return (
        <div className="card">
           <span className="position-absolute top-0 left-90  translate-middle badge rounded-pill bg-danger" style={{left:"70%",zIndex:"1"}}>{source}</span>
        <img src={!imageUrl?"https://thehill.com/wp-content/uploads/sites/2/2024/03/Mass-shooting-2-1.jpg?w=1280":imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toDateString()}</small></p>
          <a href={NewsUrl} target="_blank" className="btn btn-dark btn-sm">Read More</a>
        </div>
       
      </div>
    )
  }
}

export default NewsComponent
