import React from 'react'
import { db } from './config/firebase'
import { doc } from 'firebase/firestore'
import { useDocument } from 'react-firebase-hooks/firestore'

const ConnectIcon = () => {
  const [value, loading, error] = useDocument(
    doc(db, 'porto', 'iqbalFirdaus'),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  )
  return (
    <div className='flex items-center justify-between my-4 w-full'>
      ConnectIcon
    </div>
  )
}

export default ConnectIcon
