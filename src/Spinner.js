import React, { Component } from 'react'
import Loading from "./Spinner.gif"

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center spinner '>
        <img src={Loading} alt="" />
      </div>
    )
  }
}

export default Spinner
