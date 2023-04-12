const { nanoid } = require('nanoid');
const books = require('./books');

const addbookHandler = (request, h) => {
    const { name,year,author,summary,publisher,pageCount,readPage,reading } = request.payload;
   
    if(!name){
      const response = h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
  }
  if(readPage>pageCount){
      const response = h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
  }
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;
   
    const newbook = {
    id,name,year,author,summary,publisher,pageCount,readPage,reading,finished,insertedAt,updatedAt
    };
   
    books.push(newbook);
   
    const isSuccess = books.filter((book) => book.id === id).length > 0;
   
    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      });
      response.code(201);
      return response;
    }
    
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
  };

  const getAllbooksHandler = (request, h) => {
    const { name, reading, finished } = request.query;
    let filterbooks = books;  
    if (name) {
      filterbooks = books.filter(
        (book) => book.name.toLowerCase().includes(name.toLowerCase()),
      );
  
      const response = h.response({
          status: 'success',
          data: {
            books: filterbooks.map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
          },
        });
      response.code(200);
      return response;
    }
    if (reading) {
      if (reading === '0') {
        filterbooks = books.filter((book) => book.reading === false);
        const response = h.response({
            status: 'success',
            data: {
              books: filterbooks.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
              })),
            },
          });
        response.code(200);
        return response;
      }
  
      if (reading === '1') {
        filterbooks = filterbooks.filter((book) => book.reading === true);
        const response = h.response({
            status: 'success',
            data: {
              books: filterbooks.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
              })),
            },
          });
        response.code(200);
        return response;
      }
    }

    if (finished) {
      if (finished === '0') {
        filterbooks = books.filter((book) => book.finished === false);
        const response = h.response({
            status: 'success',
            data: {
              books: filterbooks.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
              })),
            },
          });
        response.code(200);
        return response;
      }
      if (finished === '1') {
        filterbooks = books.filter((book) => book.finished === true);
        const response = h.response({
            status: 'success',
            data: {
              books: filterbooks.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
              })),
            },
          });
        response.code(200);
        return response;
      }
    }

    const response = h.response({
        status: 'success',
        data: {
          books: filterbooks.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      });
    response.code(200);
    return response;
  };
//   const getAllbooksHandler = (request, h) => {
//     const { name,reading,finished } = request.query;
//     let booksfilter = books
//     if (name) {
//       filterbooks = books.filter(
//         (book) => book.name.toLowerCase().includes(name.toLowerCase()),
//       );
    
//       const response = h.response({
//         "status": "success",
//         "data": {
//           "books": [
//               {
//                   "id": "Qbax5Oy7L8WKf74l",
//                   "name": "Buku A",
//                   "publisher": "Dicoding Indonesia"
//               },
//               {
//                   "id": "1L7ZtDUFeGs7VlEt",
//                   "name": "Buku B",
//                   "publisher": "Dicoding Indonesia"
//               },
//               {
//                   "id": "K8DZbfI-t3LrY7lD",
//                   "name": "Buku C",
//                   "publisher": "Dicoding Indonesia"
//               }
//           ]
//       }
        
//     })
//       response.code(200);
//       return response;
//     }
//     if(books.name===name){
//         const namebooks = books.filter((book) => book.name === name) 
//         .map((books) => ({

//           id: books.id,

//           name: books.name,

//           publisher: books.publisher

//         }));
//         const response = h.response({
//           "status": "success",
//           "data": {
//               "books": namebooks
//           }
//       })
//         response.code(200);
//         return response;
// }
//     if(reading==1){
//         const readingbooks = books.filter((book) => book.reading === true) 
//         .map((books) => ({

//           id: books.id,

//           name: books.name,

//           publisher: books.publisher

//         }));
//         const response = h.response({
//           "status": "success",
//           "data": {
//               "books": readingbooks
//           }
//       })
//         response.code(200);
//         return response;
// }
//     if(finished==1){
//             const finishedbooks = books.filter((book) => book.finished === true)
//             .map((books) => ({

//               id: books.id,
  
//               name: books.name,
  
//               publisher: books.publisher
  
//             }));
//             const response = h.response({
//               "status": "success",
//               "data": {
//                   "books": finishedbooks
//               }
//           })
//           response.code(200);
//           return response;        
//     }
//     const response = h.response({
//       "status": "success",
//       "data": {
//         "books": []
//     }
//   })
//         response.code(200);
//         return response;
//     };

  const getbookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const book = books.filter((n) => n.id === bookId)[0];
    
   if (book !== undefined) {
    
      return {
        status: "success",
        data: {
          book,
        //   id: book.id,
        //   name: book.name,
        //   year: book.year,
        //   author: book.author,
        //   summary: book.summary,
        //   publisher: book.publisher,
        //   pageCount: book.pageCount,
        //   readPage: book.readPage,
        //   finished: book.finished,
        //   reading: book.reading,
        //  insertedAt: book.insertedAt,
        //  updatedAt: book.updatedAt
        }
    };
    }
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  };

  const editbookByIdHandler = (request, h) => {
    const { bookId } = request.params;
   
    const { name,year,author,summary,publisher,pageCount,readPage,reading} = request.payload;
    const updatedAt = new Date().toISOString();
   
    const index = books.findIndex((book) => book.id === bookId);

    if(!name){
      const response = h.response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
  }
  if(readPage>pageCount){
      const response = h.response({
          status: 'fail',
          message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
  }
    if (index !== -1) {
      books[index] = {
        ...books[index],
        name,year,author,summary,publisher,pageCount,readPage,reading,updatedAt
      };
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  };

  const deletebookByIdHandler = (request, h) => {
    const { bookId } = request.params;
   
    const index = books.findIndex((book) => book.id === bookId);
   
    if (index !== -1) {
      books.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      });
      response.code(200);
      return response;
    }
   
   const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  };
  
  module.exports = { addbookHandler, getAllbooksHandler, getbookByIdHandler, editbookByIdHandler, deletebookByIdHandler };