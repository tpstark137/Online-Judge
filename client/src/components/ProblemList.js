import React from 'react'
import Questions from './Questions.js'
import './style.css'

function ProblemList() {

  return (
    <div className='container'>
      <h2 className='text-white mt-2'>Problems List</h2>
      <hr />
      <table className="table table-striped table-dar">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Status</th>
          </tr>

        </thead>
        <tbody>
          {Questions.map((item) =>
            <tr>
              <td>{item.sequence}</td>
              <td><a className='title' type='button' href='/editor'>{item.title}</a></td>
              <td style={{ color: item.difficulty === 'Easy' ? 'green' : item.difficulty === 'Medium' ? '#FFC72C' : 'red' }}>{item.difficulty}</td>
              <td style={{ color: item.status === 'Solved' ? 'green' : item.status === 'Attempted' ? '#FFC72C' : '#818589' }}>{item.status}</td>

            </tr>


          )}



        </tbody>

      </table>



    </div>
  )
}
export default ProblemList