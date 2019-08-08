import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({input, onInputChange, onButtonClick}) => {
  return (
    <div>
      <p className='f3'>
        {'This Magic will detect your face and your pictures. Give it a try'}
      </p>
      <div className="center">
        <div className='form center pa4 br3 shadow-5'>
          <input type="text" className='f4 pa2 w-70 center' value = {input} onChange={onInputChange} />
          <button className="w-30 f4 grow link ph3 pv2 dib white bg-light-purple"
            onClick={onButtonClick}>Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm

