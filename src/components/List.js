import React from 'react'

import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap'

export default ({ anime }) => (
  <Panel>
    <Panel.Heading>
      <Panel.Title>Watching Anime</Panel.Title>
    </Panel.Heading>
    <ListGroup>
      {anime.length > 0
        ? anime.map(({title}, index) => (<ListGroupItem key={index}>{title}</ListGroupItem>))
        : <ListGroupItem>None</ListGroupItem>}
    </ListGroup>
  </Panel>
)
