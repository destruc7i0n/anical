import React, { Component } from 'react'

import { Button, FormControl, Panel } from 'react-bootstrap'

class Username extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      name: localStorage.getItem('username') || ''
    }
    this.getAnime = this.getAnime.bind(this)
  }

  async getAnime () {
    const { name } = this.state
    const { setAnime } = this.props
    this.setState({ loading: true })
    // grab data
    const mal = await fetch(`https://kuristina.herokuapp.com/anime/${name}.json`)
    const json = await mal.json()
    // invalid name
    if (!json.myanimelist) {
      alert('Invalid username.')
      this.setState({ loading: false })
    } else {
      if (Number(json.myanimelist.myinfo.user_watching) > 0) {
        // still watching and still releasing
        const anime = json.myanimelist.anime
          .filter((anime) => anime.series_status === '1' && anime.my_status === '1')
          .map(({ series_animedb_id: id, series_title: title }) => ({id: Number(id), title}))
        // final stuff
        console.log(`Found ${anime.length} anime.`)
        this.setState({ loading: false })
        localStorage.setItem('username', name)
        setAnime(anime)
      } else {
        alert('This user isn\'t watching any anime.')
        this.setState({ loading: false })
      }
    }
  }

  render () {
    const { name, loading } = this.state
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title>MyAnimeList Username</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <FormControl
            type='text'
            value={name}
            placeholder='Username'
            disabled={loading}
            onChange={({target: { value }}) => this.setState({ name: value })}
          />
          <Button block style={{ marginTop: '10px' }} disabled={loading} onClick={this.getAnime}>Search</Button>
        </Panel.Body>
      </Panel>
    )
  }
}

export default Username
