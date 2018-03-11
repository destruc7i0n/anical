import React, { Component, Fragment } from 'react'

import { Button, Modal } from 'react-bootstrap'

class Information extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  render () {
    const { open } = this.state
    return (
      <Fragment>
        <Button onClick={() => this.setState({ open: true })}>Help</Button>
        <Modal show={open} onHide={() => this.setState({ open: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This will help you know when the next episode of all the anime you're currently watching (that is still releasing) has their next episode.
            It's useful to help plan your week.
            <hr />
            Simply enter your{' '}
            <a href='https://myanimelist.net' target='_blank' rel='noopener noreferrer'>MyAnimeList</a>
            {' '}username username into the box and click "Search".
            <hr />
            This tool is powered by{' '}
            <a href='https://anilist.co' target='_blank' rel='noopener noreferrer'>AniList</a>
            {' '}and{' '}
            <a href='https://github.com/TimboKZ/kuristina' target='_blank' rel='noopener noreferrer'>Kuristina</a>.
            <br />
            Unless you have a large watching list of anime that are still releasing (over ~90), you shouldn't really have any problems. If you have more, you may hit some rate limits.
          </Modal.Body>
        </Modal>
      </Fragment>
    )
  }
}

export default Information
