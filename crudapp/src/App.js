import React from "react"
import { useState } from "react";
import BookCard from "./components/Book";
import { toast } from "react-toastify";
import EditModal from "./components/EditModal";

function App() {
  const[bookName, setBookName]= useState("");
  const[books, setBooks] = useState([]);
  const[showConfirme, setShowConfirme] = useState(false);
  const[deleteId, setDeleteId] = useState(null);
  const[showEditModal, setShowEditModal] = useState(false);
  const[editItem, setEditItem] = useState(null);

  

  const handleSubmit =(e) => {
    e.preventDefault();

    if(!bookName) {

      toast.warn("Lütfen kitap ismi giriniz",{autoClose:2000})
      return;
    }
    
    const newBook= {
      id: new Date().getTime(),
      title: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    }
   
    setBooks([...books, newBook])
   setBookName("")
  
   toast.success("Kitap eklendi",{autoClose: 200})
 
  }

  const handleModal = (id) => {
    setDeleteId(id)
    setShowConfirme(!showConfirme)

  }
  

  const handleDelete = (deletedId) => {
  const filtered = books.filter((book) => book.id !== deletedId)
  setBooks(filtered)
  toast.error("kitap silindi",{autoClose: 500})
  }
  const handleRead = (book) => {
   
    const updateBook = {...book, isRead: !book.isRead}

    const cloneBooks = [...books]

   const index = cloneBooks.findIndex((item) => item.id === book.id)

  

   cloneBooks.splice(index, 1, updateBook)

  //  console.log(cloneBooks)

    setBooks(cloneBooks)
    
  
  }
// console.log(books)
const handleEditBook= () =>{
//  console.log(editItem)
const index = books.findIndex((book) => book.id === editItem.id )

const cloneBooks = [...books]

cloneBooks.splice(index, 1, editItem)

// state güncelleme
setBooks(cloneBooks)
}
 
 
  return (
    <div>
    <div className="bg-dark text-light px-5 py-2 fs-5">kitap kurdu</div>
    <div className="container border">
    
  <form onSubmit={handleSubmit} className="d-flex gap-3 mt-4">
        <input onChange={(e) => setBookName(e.target.value)}
        value={bookName}
         className="form-control shadow"
          type="text" />
        <button  className="btn btn-warning shadow">Ekle</button>
  </form>

  <div className="d-flex flex-column gap-3 py-5" >
  {

    //eğer inptta değer yoksa henüz kitap bulunamadı yazdır
    books.length === 0 && <h4>Henüz Kitap Bulunamadi</h4>
    
   
    
  }
  {
    books.map((book, i) => (
      <BookCard key={i} 
      book={book} 
      handleModal={handleModal}
       handleRead={handleRead}
       setShowEditModal={setShowEditModal}
       setEditItem = {setEditItem}
       
       /> ))
  }
  </div>
    
    </div>
    {showConfirme && 
      <div className="confirme-modal">
      <div className="modal-inner shadow">
      <h5 className="lead fs-3">Silmek İstiyor musunuz ?</h5>
      <button className="btn btn-warning" onClick={() => setShowConfirme(false)}>vazgeç</button>
      <button className="btn btn-primary" onClick={() => {
        handleDelete(deleteId)
        setShowConfirme(false)
      }}>Onayla</button>
      </div>
     </div>}

     {showEditModal && <EditModal setShowEditModal={setShowEditModal} setEditItem={setEditItem} editItem={editItem} handleEditBook={handleEditBook}/>
     }
    </div>
  )
   
  
}

export default App;
