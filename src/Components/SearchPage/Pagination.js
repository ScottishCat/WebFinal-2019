import React from 'react';

const Pagination = ({perPage, totalPages, paginate}) => {
    const pageLists = []
    for (let i = 1; i <= Math.ceil(totalPages / perPage); i++){
        pageLists.push(i);
    }
    return (
        <nav>
            <ul>
                {pageLists.map(num=>(
                    <li>
                        <a onClick={() => paginate(num)} href={`/search&${num}`}>
                            {num}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination;