import { Routes, Route } from 'react-router'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Work } from './pages/Work'
import { CaseStudy } from './pages/CaseStudy'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
      </Route>
    </Routes>
  )
}
