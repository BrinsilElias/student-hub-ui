import React, { useState } from 'react';
import Avatar from './Avatar';
import { BlueTags, VioletTags } from './Tags';
import utilStyle from "../utils.module.css"

function generateUserName(name) {
    try {
        if (name) {
          if (name.includes(' ')) {
            return `@${name.split(' ')[0].toLowerCase()}`;
          } else {
            return `@${name.toLowerCase()}`;
          }
        }
        return '';
    } catch (error) {
        console.error('An error occurred while generating the username:', error);
        return '';
    }
}

function Table(props) {
//   const [data, setData] = useState([])

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of items to display per page

  // Calculate pagination values
  const totalPages = Math.ceil(props.student_data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Handle pagination
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className={utilStyle.table}>
        <div className={utilStyle.table_header + ' ' + utilStyle.row + ' ' + utilStyle.row_header}>
            <div className={utilStyle.col}>Admission No</div>
            <div className={utilStyle.col}>Name</div>
            <div className={utilStyle.col}>Date of Birth</div>
            <div className={utilStyle.col}>Class</div>
            <div className={utilStyle.col}>Division</div>
            <div className={utilStyle.col}>Gender</div>
        </div>
        <div className={utilStyle.table_body}>
            {props.student_data.length === 0 ? (
            <div className={utilStyle.table_empty_body}>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem' , width: '352px'}}>
                <div className={utilStyle.empty_image}></div>
                <p className={utilStyle.bodytextlgdark} style={{textAlign: 'center'}}>No Details Found</p>
                <p className={utilStyle.bodytextsmlight} style={{textAlign: 'center'}}>Add some details to the database by filling out the form. Once you've filled out the form, click the "Add" button.</p>
              </div>
            </div>
            ) : (props.student_data.slice(startIndex, endIndex).map((row) => 
                <div className={utilStyle.row + ' ' + utilStyle.row_body} key={row.id}>
                    <div className={utilStyle.col}>
                        <p className={utilStyle.bodytextsmlight}>{row.admission_no}</p>
                    </div>
                    <div className={utilStyle.col + ' ' + utilStyle.col2}>
                        <Avatar name={row.name} />
                        <div>
                            <p className={utilStyle.bodytextsmdark}>{row.name}</p>
                            <p className={utilStyle.bodytextsmlight}>{generateUserName(row.name)}</p>
                        </div>
                    </div>
                    <div className={utilStyle.col}>
                        <p className={utilStyle.bodytextsmlight}>{row.date_of_birth}</p>
                    </div>
                    <div className={utilStyle.col}>
                        <p className={utilStyle.bodytextsmlight}>{row.student_class}</p>
                    </div>
                    <div className={utilStyle.col}>
                        <p className={utilStyle.bodytextsmlight}>{row.division}</p>
                    </div>
                    <div className={utilStyle.col}>
                        {row.gender === "MALE" ? <BlueTags /> : <VioletTags />}
                    </div>
                </div>
            ))}
        </div>
        <div className={utilStyle.pagination}>
            <button 
                    className={utilStyle.btn + ' ' + utilStyle.btn_previous} 
                    data-icon="back-arrow"
                    onClick={goToPreviousPage} 
                    disabled={currentPage === 1}
            >
                Previous
            </button>
            <p className={utilStyle.bodytextsmlight}>
              {totalPages > 0 ? `Page ${currentPage} of ${totalPages}` : ''}
            </p>
            <button 
                    className={utilStyle.btn + ' ' + utilStyle.btn_next} 
                    data-icon="front-arrow"
                    onClick={goToNextPage} 
                    disabled={currentPage === totalPages || totalPages === 0}
            >
                Next
            </button>
        </div>
    </div>
  )
}

export default Table