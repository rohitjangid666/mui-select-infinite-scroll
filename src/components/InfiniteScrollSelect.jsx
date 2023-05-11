import { Box, FormControl, InputLabel, Menu, MenuItem, Select, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

function InfiniteScrollSelect() {
  const [pokemonList, setPokemonList] = useState([])
  const [offset, setOffset] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPokemon, setSelectedPokemon] = useState('bulbasaur')

  useEffect(() => {
    const fetchPokemon = async () => {
      setIsLoading(true)

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)

      setIsLoading(false)

      const data = await response.json()

      setPokemonList(prev => [...prev, ...data.results])
    }
    fetchPokemon()
  }, [offset])

  const handleChange = event => {
    setSelectedPokemon(event.target.value)
  }

  const handleScroll = event => {
    const target = event.target
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setOffset(prev => prev + 20)
    }
  }

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <Typography mb={2}>{isLoading ? 'Loading...' : 'Loaded...'}</Typography>
        <FormControl fullWidth>
          <InputLabel id='select-pokemon-id'>Pokemon</InputLabel>

          <Select labelId='select-pokemon-id' id='demo-simple-select' label='Pokemon'>
            <div style={{ height: '300px', overflowY: 'scroll' }} onScroll={handleScroll}>
              {pokemonList?.map((pokemon, idx) => (
                <MenuItem key={idx} sx={{ textTransform: 'capitalize' }} value={pokemon?.name}>
                  {pokemon?.name}
                </MenuItem>
              ))}

              {isLoading && <MenuItem>Loading...</MenuItem>}
            </div>
          </Select>
        </FormControl>
      </Box>
    </>
  )
}

export default InfiniteScrollSelect
