import React from 'react'
import { useDispatch } from 'react-redux'
import { useTable, useFilters } from 'react-table'
import { addEligibleStudent, addSelectedStudent, rejectStudent } from '../../redux/Actions/DriveAction'

const Table = ({ columns, data,id,cat,role }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useFilters
  )
  console.log(data);
  const dispatch=useDispatch();
  const handleAcceptStudent=(stuId)=>{
    console.log(stuId);
    if(cat=='InterestedStu'){

      dispatch(addEligibleStudent({id,stuId}))
    }
    else if(cat=='EligibleStu'){
      dispatch(addSelectedStudent({id,stuId}))
    }
    // else if(cat=='EligibleStu'){
    //   dispatch(addSelectedStudent({id,stuId}))
    // }
  }
  const handleRejectStudent=(id)=>{
    dispatch(rejectStudent(id))
  }
  return (
    <>
    <div className=' flex  items-center justify-center flex-col gap-4 mt-4 text-white'>
      <div className="flex  mb-4 gap-9">
        {headerGroups.map((headerGroup) =>
          headerGroup.headers.map((column) =>
            column.Filter ? (
              <div key={column.id} className="mr-4 mb-2 flex gap-4">
                <label htmlFor={column.id} className="font-semibold">
                  {column.render('Header')}:{' '}
                </label>
                <p className='text-black'>
                {column.render('Filter')}
                </p>

              </div>
            ) : null
          )
        )}
        
      </div>
      <div className="overflow-x-auto w-[80%]">
        <table {...getTableProps()} className="w-full table-auto border-collapse border">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                key={'header-group-' + index}
                className="bg-gray-600"
              >
                {headerGroup.headers.map((column) => (
                  <>
                  <th
                    {...column.getHeaderProps()}
                    key={column.id}
                    className="px-4 py-2 text-left"
                  >
                    {column.render('Header')}
                  </th>
                 

                  </>
                ))}
                {role==='TPO_Admin' && <> <th>
                    Accept
                  </th>
                  <th>
                    Reject
                  </th>
                  </>}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              console.log(row)
              return (
                <tr {...row.getRowProps()} key={'row-' + index}>
                  {row.cells.map((cell, cellIndex) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        key={'cell-' + cellIndex}
                        className=" px-4 py-2"
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
           {role==='TPO_Admin' && <> <td className='text-center'>
            <button className=' text-center' onClick={()=>handleAcceptStudent(row.original.id)}>

              Accept
            </button>
            </td>
            <td>
            <button className=' text-center' onClick={()=>handleRejectStudent(row.original.id)}>

              Reject
            </button>
            </td></>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default Table