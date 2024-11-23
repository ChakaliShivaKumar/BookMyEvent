import Footer from './pages/Footer'
import Header from './pages/Header'
import {Outlet} from "react-router-dom"

export default function Layout(params) {
  return (
    <div className='flex flex-col min-h-screen'> 
      <Header searchQuery={params.searchQuery} setSearchQuery={params.setSearchQuery}/>
      <Outlet />
      <Footer />
    </div>
  )
}
