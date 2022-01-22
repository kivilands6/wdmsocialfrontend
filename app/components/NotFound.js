import React from "react"
import Page from './Page'
import {Link} from 'react-router-dom'

function NotFound() {
  return (
    <Page title="Not Found">
        <div className="text-center">
          <h2>Page or Post was not found!</h2>
          <p className="lead text-muted">You can always visite the <Link to="/">Homepage</Link> to get a fresh start</p>
        </div>
    </Page>
  )
}

export default NotFound