import { BrowserRouter } from 'react-router-dom'
import { GlobalStyles } from './design-system'
import { AppRouter } from './app/AppRouter'

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <AppRouter />
    </BrowserRouter>
  )
}
