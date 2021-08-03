import React from 'react';
import './component-styles.css';

export default function HeadlineBlock({title, author, date, url}) {
    return (
        <div className="headline-block">
            <a className="newslink" href={url} target="_blank" rel="noreferrer noopener"><h4>{title}</h4></a>
            <small><strong>{author}</strong></small>
            <small>{new Date(date).toLocaleDateString()}</small>
        </div>
    )
}
