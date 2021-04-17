import PrimeReact from 'primereact/api'
import ReactDOM from 'react-dom'
import Routes from '~/routes'
import React from 'react'

import 'primereact/resources/themes/bootstrap4-dark-purple/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import '~/index.css'

PrimeReact.ripple = true

const ROOT = document.getElementById('root')

ReactDOM.render(<Routes/>, ROOT)