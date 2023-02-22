import React from 'react'
import Header from './components/Header'

function Loading() {
  return (
    <main>
      <Header />
      <div className="px-36 mt-10 flex flex-wrap justify-center">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse bg-slate-200 w-64 h-72 rounded overflow-hidden border m-3 cursor-pointer">
            
          </div>
        ))}


      </div>
    </main>
  )
}

export default Loading