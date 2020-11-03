import React, {useState, useEffect} from "react";
import {useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import {Container, Grid, Card, CardMedia, CardContent} from '@material-ui/core';

import './showList.css';
  
export default function ShowList (props) {
    const {showId} = useParams();
    const showURL = 'http://api.tvmaze.com/shows/'+showId;
    const epURL = 'http://api.tvmaze.com/shows/'+showId+'/episodes';
    
    let [show, setShow] = useState({});
    let [episodes, setEpisodes] = useState([]);
    
    useEffect(async () => {
        const response = await fetch(showURL);
        const data = await response.json();
        setShow(data);
    }, []);
    
    useEffect(async () => {
        const response = await fetch(epURL);
        const data = await response.json();
        setEpisodes(data);
    },[]);

    const getSummary = (summary) => {
        return {__html: summary}
    }
    
    const getEpisodes = () => episodes.map(val => (
        <Grid container xs={12} spacing={2}>
            <Grid item xs={12}>
                <Card className="episode-class">
                    <Grid item xs={2}>
                        <CardMedia image={val.image?.medium} className="episode-img"></CardMedia>
                    </Grid>
                    <Grid item xs={10}>
                        <CardContent >
                            <div className="episode-title">{val.name}</div>
                            <div className="episode-runtime">{val.runtime} minutes</div>
                            <div className="episode-summary" dangerouslySetInnerHTML={getSummary(val.summary)}></div>
                        </CardContent>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    ))

    return (<Container className="list-container">
        <Grid container spacing={1} xs={12}>
            <CardMedia image={show?.image?.original} className="show-title-image"></CardMedia>
            <h1>{show?.name}</h1>
            <Grid item xs={9} className="title-spacer"></Grid>
            <Grid item xs={9} dangerouslySetInnerHTML={getSummary(show?.summary)} className="title-summary">
            </Grid>
        </Grid>
        <h2 class="episode-header">Episodes:</h2>
        {getEpisodes()}
    </Container>);

    
}