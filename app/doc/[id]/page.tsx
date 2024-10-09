import Document from '@/components/Document';
import React from 'react'

function Documentpage({params: {id}}: {
    params: {
        id: string;
    }
}) {
  return (
    <div
    className='flex flex-col flex-1 min-h-screen'>
        <Document id={id}/>
    </div>
  )
}

export default Documentpage