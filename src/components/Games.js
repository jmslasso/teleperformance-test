import React, { useRef } from 'react'
import TextField from '@mui/material/TextField'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Grid, Card } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import '../App.scss';

const Games = () => {

    const initialState = [
        {
            box_art_url: 'x',
            id:'1',
            name:'',
        },
    ]


    const [datos, setDatos] = React.useState(initialState)
    const searchRef=useRef()

    const handleSearch = React.useCallback(async() => {
        const search = searchRef.current.value
        if(search == "")
            obtainData()
        const client_id = 'x9rng2z4iesirvfhv0e2qnjceuizwx';
        const client_secret = '3bt5x9262c21kkh84rfkqvjy4i6t6o';
        const oAuth = await fetch('https://id.twitch.tv/oauth2/token?client_id='+client_id+'&client_secret='+client_secret+'&grant_type=client_credentials',{method:'POST'})
        const auth =  await oAuth.json()
        const token = auth.access_token
        const data = await fetch('https://api.twitch.tv/helix/search/categories?query='+search, {method:'GET',headers:{'Authorization': 'Bearer '+token,'Client-Id': client_id}})
        const gamelist = await data.json()
        setDatos(gamelist)
        console.log(datos)

    })


    React.useEffect(() => {
        //console.log('useEffect')
        obtainData()
    }, [])


    const obtainData = async () => {
        const client_id = 'x9rng2z4iesirvfhv0e2qnjceuizwx';
        const client_secret = '3bt5x9262c21kkh84rfkqvjy4i6t6o';
        const oAuth = await fetch('https://id.twitch.tv/oauth2/token?client_id='+client_id+'&client_secret='+client_secret+'&grant_type=client_credentials',{method:'POST'})
        const auth =  await oAuth.json()
        const token = auth.access_token
        const data = await fetch('https://api.twitch.tv/helix/games/top?first=100', {method:'GET',headers:{'Authorization': 'Bearer '+token,'Client-Id': client_id}})
        const gamelist = await data.json()
        console.log(gamelist)
        gamelist.data.map(game => {
            let imageUrl = game.box_art_url.replace("{width}x{height}", "180x180");
            game.box_art_url = imageUrl;
            return game;
        })
        console.log(gamelist)
        setDatos(gamelist)
        //console.log(datos)
        
    }

    return (
        <div className="results">
            <div className="header">
                <h1>Games</h1>
                <div className="search-field">
                    <TextField 
                        variant='outlined'
                        type="search" 
                        placeholder="Search for games..." 
                        inputRef={searchRef} 
                        onKeyUp={handleSearch} 
                        inputProps={{ style: { fontFamily: "Monument Extended", color:"white", '&:hover': {background: "white"} }}}
                    />
                </div>
            </div>
             { datos && datos.data && datos.data.length !== 0 ?
            datos.data.map(item => 
                <img className="games"
                    src={item.box_art_url.replace("52x72",'250x250')}  
                    alt = "Game"
                />
            )
            :
            <div></div>} 
        </div>

    )
}

export default Games
