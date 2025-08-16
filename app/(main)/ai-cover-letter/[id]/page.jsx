import React from 'react'

const EditCoverLetterPage =async ({params}) => {

    const {id}= await params
  return (
    <div>EditCoverLetterPage of {id}</div>
  )
}

export default EditCoverLetterPage