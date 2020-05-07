import React, {useState, useEffect } from 'react';
import { Col, Row, Container } from 'react-bootstrap'

// Componentes
import Card from '../components/Card/Card';
import CardData from '../components/CardData/CardData'
import Paginator from '../components/Paginator/Paginator';
import Loader from '../components/Loader/Loader'
import Language from '../components/Language/Language';

// Utils
import {get} from '../utils/request';

// Images
import Logo from'../assets/logo.png';

// Styles 
import './style.scss';


const Home = () =>  {

  // Initial State
  const [ pokemonList, setPokemonList ]             = useState([]);
  const [ loader, showLoader ]                      = useState(true);
  const [ cardDetail, showCardDetail ]              = useState(false);
  const [ cardDetailData, setCardDetailData ]       = useState({});
  const [ previousPage, changePreviousPage ]        = useState('');
  const [ nextPage, changeNextPage ]                = useState('');
  const [ getUrl, changeInitialGet ]                = useState('https://pokeapi.co/api/v2/pokemon?limit=5');
  const [ language, changeLanguage ]                = useState('es');
  const [ pokemonSelected, changePokemonSelected ]  = useState({});

  /**
   * Native hook from react that executes when component is mounted and each time 'getUrl' and 'language' changes
   */
  useEffect(() => {
   
    // Function that gets pokemon list
    const getPokemonsList = async () => {

      try {

        // Shows Loader
        showLoader(true);

        // Gets list of pokemons
        let response = await get(getUrl);
  
        // Validates response
        if( response.hasOwnProperty("status") && response.status === 200) {
          
          // Destructuring response
          let { results = [], next, previous } = response; 
          
          // Changes state
          changePreviousPage(previous);
          changeNextPage(next);

          // Gets each pokemon data
          getEachPokemonData(results);
        
        } else {
          // Hides loader
          showLoader(false);
        }

      } catch(error){
        console.log(error)
      }

    }

    // Function that gets each pokemon data
    const getEachPokemonData = async (pokemonList) => {

      try {

        // Executes request for each pokemon
        let pokemon = await Promise.all(pokemonList.map(async (pokemonItem) => {
                  
            let response  = await get(pokemonItem.url)

            // Validates response
            if( response.hasOwnProperty('status') && response.status === 200) {
  
              // Create specific object por pokemon
              return {
                id: response.id,
                name: response.name,
                abilities: response.abilities,
                img: response.sprites.front_default,
                weight: response.weight,
                height: response.height
              }
                
            } else {

              // Returns empty object
              return {}
            }
    
      }))
    
      // Changes state
      setPokemonList(pokemon)
      showLoader(false)
        
      }catch(error){
        console.log(error)
      }

    }

    getPokemonsList();

  }, [getUrl, language])

  /**
   * Native hook from react that executes when component is mounted and every time pokemonSelected changes
   */
  useEffect( () => {

    const getAbilities = async () => {

      try {

        // Validates if there is a pokemon selected with its abilities
        if( Array.isArray(pokemonSelected.abilities)){
          
          // Gets all the abilities data
          let abilities = await Promise.all(pokemonSelected.abilities.map(async (abilityItem) => {

            // Request
            let response = await get(abilityItem.ability.url)

            // Validates response
            if( response.hasOwnProperty("status") && response.status === 200) {

              // Returns ability objects with specific data
              return {
                names: response.names, 
                description: response.flavor_text_entries
              }
            
            } else {
            
              // Returns empty object
              return {}
            
            }

          }))  
          
          // Creates specific object for pokemon abilitie
          let pokemonAbilitie = {
            name: pokemonSelected.name,
            abilities: abilities,
            img: pokemonSelected.img
          }
           
          // Changes state
          setCardDetailData(pokemonAbilitie)
            
          }

      }catch(error){
        console.log(error)
      }

  }

  getAbilities()

},[pokemonSelected])


  /**
   * Function indicates pokemon selected and shows cardData
   */
  const onClickPokemon = async (id) => {

    try {

      // Filters from list which has been selected
      let pokemonSelected = pokemonList.find((pokemon) => pokemon.id === id)            

      // Changes pokemon selected
      changePokemonSelected(pokemonSelected)

      // ShowCardData
      showCardDetail(true)
    
    } catch(error){
      console.log(error)
    }

  }

  return (

    <div id="pokeapi">

      {/** Header */}
      <header>
          <div className="container-logo">
            <img src={Logo} alt="logo" />
          </div>
      </header>

      {/** Main Content */}
      <Container>
        <Row className="justify-content-center">
          <Col lg={9}>
          
          {
            loader 
            ? <Loader/>
            : <div>

              {/** Select Language */}
              <Row className="d-flex justify-content-between align-items-center">
                <Col sm={4}>

                  <Language
                    onClickCountry={(value) => changeLanguage(value)} 
                  />
                
                </Col>
              </Row>

              {/** List of pokemons */}
              <Row className="justify-content-md-center">
                <Col md={12}>
                
                {
                  pokemonList.map((pokemon, key) => {
                    return <Card 
                              onClickPokemon={(id) => onClickPokemon(id)} 
                              key={key}
                              {...pokemon} 
                            />
                  })
                }
                
                </Col>
              </Row>
                  
              {/** Paginator */}
              <Row className="d-flex justify-content-end align-items-center">
                <Col sm={6} className="text-right">
                      
                      <Paginator
                        onClickNext={() => changeInitialGet(nextPage)}
                        onClickPrevious={() => changeInitialGet(previousPage)}
                        next={nextPage}
                        previous={previousPage}
                      />
               
                </Col>
              </Row>

              {/** CardData */}
              <CardData
                language={language}
                cardDetailData={cardDetailData}
                showCardDetail={cardDetail}
                handleClose={() => showCardDetail(false)}
              />
            </div>
          }
          </Col>
        </Row>
      </Container>

    </div>
  
  );
}

export default Home