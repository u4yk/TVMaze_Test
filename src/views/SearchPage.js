import React, {useState} from "react";
import {Link} from "react-router-dom";
import {AppBar, TextField, Button, Container, Card, CardMedia, CardContent} from '@material-ui/core';
import './SearchPage.css';

export default function SearchPage () {
    let [stringInput, setStringInput] = useState('');
    let [searchResults, setSearchResults] = useState([]);  
    const showSearch = 'http://api.tvmaze.com/search/shows?q=';

    const startSearch = async () => {
        if (stringInput.length > 3) {
            const response = await fetch(showSearch+stringInput);
            const data = await response.json();
            setSearchResults(data);
        }
    };

    const keypress = e => {
        if (e.which === 13) {
            startSearch();
        }
    }

    const change = e => {
        setStringInput(e.target.value);
    }

    const showSearchResults = () => {
        return searchResults.length > 0 ? searchResults.map(val => (
            <Link to={`/show/${val.show.id}`} key={val.show.id}>
                <Card className="show-card">
                    <CardMedia image={val.show?.image?.medium || ''} className="show-thumb"></CardMedia>
                    <CardContent>{val.show.name}</CardContent>
                </Card>
            </Link>
        )) : <div></div>;
    }
    return (
        <div>
            <AppBar position="relative">
                <TextField onChange={change} onKeyPress={keypress}></TextField>
                <Button onClick={startSearch}>Search</Button>
            </AppBar>
            <Container className="show-container">{showSearchResults()}</Container>
        </div>
    );
}