import { useState } from "react"

const EditModal = ({setShowEditModal, setEditItem, editItem, handleEditBook}) => {
    const[newBookName, setNewBookName] = useState("")


     console.log(newBookName)
    return <div className="confirme-modal">
    <div className="modal-inner">

    <h5 className="lead fs-1">Kitap ismini Düzenle</h5>
    
    <input
    value={editItem.title}
     className="border shadow form-control" 
     type="text" 
     onChange={(e) => 
        setEditItem({...editItem, title: e.target.value, date: new Date().toLocaleString()})} />

    <div className="d-flex justify-content-between">
    <button className="btn btn-warning shadow" onClick={()=> setShowEditModal(false)}>Vazgeç</button>
    <button className="btn btn-success shadow" onClick={() => {handleEditBook();}}>Kaydet</button>

    
    </div>
    
    </div>
    </div>
}

export default EditModal;