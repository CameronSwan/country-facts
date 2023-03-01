import { Link } from 'react-router-dom';

const Card = (props) => {
    return (
        <div className="col-md-4">
            <div className="card mb-4 box-shadow">
            <img 
                className="card-img-top" 
                data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" 
                alt="Thumbnail [100%x225]" 
                style={{height: 225, width: '100%', display: 'block'}}
                src={props.country.flag} 
                data-holder-rendered="true" />
            <div className="card-body">
                <ul className="list-group mb-3">
                <li className="list-group-item">Population: {props.country.demographics.population}</li>
                <li className="list-group-item">Area: {props.country.demographics.area}km^2</li>
                </ul>
                <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                    <Link to={`/edit/${props.country._id}`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                    <button onClick={() => props.onDelete(props.country._id)} className="btn btn-sm btn-outline-danger">Delete</button>
                </div>
                <small className="text-muted">{props.country.name}</small>
                </div>
            </div>  
            </div>
        </div>
    )
}

export default Card;