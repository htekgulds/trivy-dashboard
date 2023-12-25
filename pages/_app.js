import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App ({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <div className='navbar bg-base-300 shadow mb-4'>
          <div className='container mx-auto'>
            <div className='navbar-start'>
              <a className='btn btn-ghost text-xl'>Trivy Dashboard</a>
            </div>
          </div>
        </div>
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  )
}
