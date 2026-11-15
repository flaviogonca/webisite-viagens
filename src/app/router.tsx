import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'

const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Services = lazy(() => import('@/pages/Services'))
const Destinations = lazy(() => import('@/pages/Destinations'))
const DestinationDetails = lazy(() => import('@/pages/DestinationDetails'))
const VisaAssistance = lazy(() => import('@/pages/VisaAssistance'))
const Contact = lazy(() => import('@/pages/Contact'))
const RequestService = lazy(() => import('@/pages/RequestService'))
const Credits = lazy(() => import('@/pages/Credits'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const Privacy = lazy(() => import('@/pages/Legal').then((m) => ({ default: m.Privacy })))
const Terms = lazy(() => import('@/pages/Legal').then((m) => ({ default: m.Terms })))

const wrap = (el: React.ReactNode) => <Suspense fallback={<div className="min-h-screen bg-marine" aria-busy />}>{el}</Suspense>

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: wrap(<Home />) },
      { path: 'sobre', element: wrap(<About />) },
      { path: 'servicos', element: wrap(<Services />) },
      { path: 'destinos', element: wrap(<Destinations />) },
      { path: 'destinos/:slug', element: wrap(<DestinationDetails />) },
      { path: 'vistos', element: wrap(<VisaAssistance />) },
      { path: 'contactos', element: wrap(<Contact />) },
      { path: 'solicitar-servico', element: wrap(<RequestService />) },
      { path: 'privacidade', element: wrap(<Privacy />) },
      { path: 'termos', element: wrap(<Terms />) },
      { path: 'creditos', element: wrap(<Credits />) },
      { path: '*', element: wrap(<NotFound />) },
    ],
  },
])
