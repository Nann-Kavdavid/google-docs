import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { collection, doc, updateDoc } from "firebase/firestore";
import { database } from "../firebaseConfig";

export default function EditDocs() {

    let params = useParams();

    const [docsDesc, setDocsDesc] = useState("");
    const getQuillData = (value) => {
        setDocsDesc(value);
    }

    const collectionRef = collection(database, 'docsData');
    const getData = () => {
        
    };
    useEffect(() => {
        const updateDocsData = setTimeout(() => {
            const document = doc(collectionRef, params.id);
            updateDoc(document, {
                docsDesc: docsDesc
            })
            .then(() => {
                alert("Saved");
            })
            .catch(() => {
                alert("Cannot Save")
            });
        }, 5000)
        return () => clearTimeout(updateDocsData);
    }, [docsDesc]);
    return (
        <div>
            <h1>EditDocs</h1>
            <ReactQuill 
                value={docsDesc}
                onChange={getQuillData}
            />            
        </div>
    );
}