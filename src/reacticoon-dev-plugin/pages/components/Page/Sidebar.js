import React from 'react'

import { Link } from 'reacticoon/routing'

const Sidebar = () => (
  <div>
    <div>
      <Link to={Link.getRoute('REACTICOON_PLUGINS')}>
        Plugins
      </Link>
    </div>
  </div>
)

export default Sidebar