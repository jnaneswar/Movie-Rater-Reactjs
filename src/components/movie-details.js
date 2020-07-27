import React,{Component} from 'react';
var FontAwesome = require('react-fontawesome');

class MovieDetails extends Component{

    state ={
        highlighted: -1
    }
    highlightRate = high => evt =>{
        this.setState({highlighted:high});
    }
    rateClicked = stars => evt =>{

        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/rate_movie/`,{
            method : 'POST',
            headers: {
                'Authorization' : `token ${this.props.token}`,
                'Content-Type'  : 'application/json'
            },
            body: JSON.stringify({stars:stars+1})
            }).then(resp=> resp.json())
            //.then(res=> this.setState({movies:res}))
            .then(res=> this.getDetails())
            .catch(error=>console.log(error))
    }
    getDetails = () =>{
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/`,{
            method : 'GET',
            headers: {
                'Authorization' : `token ${this.props.token}`,
                'Content-Type'  : 'application/json'
            }
            }).then(resp=> resp.json())
            //.then(res=> this.setState({movies:res}))
            .then(res=> this.props.updateMovie(res))
            .catch(error=>console.log(error))

    }


    render(){
        //const mov = this.props.movie;
        return (
            <React.Fragment>
                {this.props.movie ? (
                    <div>
                        <h3>{this.props.movie.title}</h3>
                        <FontAwesome name="star" className={this.props.movie.average_rating > 0 ? 'orange':''}/>
                        <FontAwesome name="star" className={this.props.movie.average_rating > 1 ? 'orange':''}/>
                        <FontAwesome name="star" className={this.props.movie.average_rating > 2 ? 'orange':''}/>
                        <FontAwesome name="star" className={this.props.movie.average_rating > 3 ? 'orange':''}/>
                        <FontAwesome name="star" className={this.props.movie.average_rating > 4 ? 'orange':''}/>
                        ({this.props.movie.number_of_ratings})
                        <p>{this.props.movie.description}</p>

                        <div className="rate-container">
                                <h2>Rate it !!!</h2>
                                    { [...Array(5)].map((e, i)=>{
                                        return <FontAwesome key={i} name="star" className={this.state.highlighted > i - 1 ? 'purple':''}
                                            onMouseEnter={this.highlightRate(i)} onMouseLeave={this.highlightRate(-1)} onClick={this.rateClicked(i)}/>
                                    })}
                        </div>
                    </div>
                ):null}
            </React.Fragment>
        )
    }

}

export default MovieDetails;
