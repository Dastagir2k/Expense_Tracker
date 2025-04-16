import React, { Suspense } from 'react'
import SideNav from './_components/SideNav'
import Dashboardheader from './_components/Dashboardheader'


function DashboardLayout({children}) {
  return (
    <Suspense fallback={`<p>Loading...</p>`}>
      <div>
        <div className='fixed md:w-64 hidden md:block'>
          <SideNav/>
        </div>
        <div className="md:ml-64">
      
          {children}
        </div>
      </div>
    </Suspense>
  )
}

export default DashboardLayout