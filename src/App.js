import React, { Component, Fragment } from 'react'

import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import moment from 'moment'

import { Jumbotron } from 'react-bootstrap'

import Username from './Username'
import List from './List'

import { getAllByMAL } from './lib/anilist'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      calendarData: [],
      anime: []
    }
    this.setAnime = this.setAnime.bind(this)
  }

  async setAnime (anime) {
    this.setState({ anime })
    // grab a list of anime
    let anilist = await getAllByMAL(anime.map(({id}) => id))
    if (anilist) {
      const calendarData = anilist.map((anime) => {
        const ani = anime.data.Media
        // go over each node
        return ani.airingSchedule.nodes.map(({ airingAt, episode }) => {
          const date = new Date(airingAt * 1000)
          // what the calendar expects
          return {
            title: `${ani.title.romaji} ${episode}`,
            start: date,
            // add the duration to get end time
            end: moment(date).add(ani.duration, 'm').toDate()
          }
        })
      })
      this.setState({ calendarData: [].concat(...calendarData) })
    }
  }

  render () {
    const {calendarData, anime} = this.state
    return (
      <Fragment>
        <Jumbotron>
          <div className='container'>
            <h1>AniCal</h1>
            <p>By: <a href='https://thedestruc7i0n.ca' target='_blank' rel='noopener noreferrer'>TheDestruc7i0n</a></p>
          </div>
        </Jumbotron>
        <div className='container-fluid' style={{ overflow: 'auto' }}>
          <div className='col-sm-2'>
            <Username setAnime={(anime) => this.setAnime(anime)} />
            <List anime={anime} />
          </div>
          <div className='col-sm-10' style={{ height: '70vh' }}>
            <BigCalendar
              popup
              events={calendarData}
              views={['month', 'week', 'day']}
              defaultDate={new Date()}
            />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default App
