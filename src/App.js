import React, { useState, useEffect } from 'react'
import './App.css'
import placeholderImg from './placeholder.png'
import { ReactComponent as ChevronLeft } from './chevron-left.svg'
import { ReactComponent as ChevronRight } from './chevron-right.svg'

function App() {
  const [searchResult, setSearchResult] = useState()
  const [number, setNumber] = useState({})
  const [variable, setVariable] = useState('')
  const [newSearch, setNewSearch] = useState()

  useEffect(() => {
    setNewSearch(false)
    const search = async () => {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=a461e386&s=${variable}&page=${number.page}`,
      )

      const data = await response.json()

      setSearchResult(data)
    }

    search()
  }, [number.page, newSearch])

  const handleInput = event => {
    setVariable(event.target.value)
  }

  const handleSearch = event => {
    event.preventDefault()
    setNewSearch(true)
    setNumber({ page: 1 })
  }

  const movePage = n => {
    setNumber({ page: number.page + n })
  }

  return (
    <div className="App">
      <div className="search">
        <input type="text" placeholder="Search..." onChange={handleInput} />
        <button onClick={handleSearch}>Search</button>
      </div>
      {!searchResult || !searchResult.Search ? (
        <p>No results yet</p>
      ) : (
        <div className="search-results">
          <div className="chevron">
            <ChevronLeft
              onClick={number.page > 1 ? () => movePage(-1) : undefined}
            />
          </div>
          <div className="search-results-list">
            {searchResult.Search.map(result => (
              <div key={result.imdbID} className="search-item">
                <img
                  src={result.Poster === 'N/A' ? placeholderImg : result.Poster}
                  alt="poster"
                />
                <div className="search-item-data">
                  <div className="title">{result.Title}</div>
                  <div className="meta">{`${result.Type} | ${result.Year}`}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="chevron">
            <ChevronRight onClick={() => movePage(+1)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
