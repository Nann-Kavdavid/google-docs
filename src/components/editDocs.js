import React, { useEffect, useState, useRef} from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";

export default function EditDocs({
    database
}) {

    const isMounted = useRef();
    const collectionRef = collection(database, 'docsData');
    let params = useParams();
    const [documentTitle, setDocumentTitle] = useState("");
    const [docsDesc, setDocsDesc] = useState("");
    const getQuillData = (value) => {
        setDocsDesc(value);
    }
    const { t } = useTranslation();
    useEffect(() => {
        const updateDocsData = setTimeout(() => {
            const document = doc(collectionRef, params.id);
            updateDoc(document, {
                docsDesc: docsDesc
            })
            .then(() => {
                toast.success(t("doc_saved_notification"), {
                    autoClose: 2000
                });
            })
            .catch(() => {
                toast.error(t("doc_saved_notification"), {
                    autoClose: 2000
                });
            });
        }, 1000)
        return () => clearTimeout(updateDocsData);
    }, [docsDesc]);

    const getData = () => {
        const document = doc(collectionRef, params.id);
        onSnapshot(document, (docs) => {
            setDocumentTitle(docs.data().title);
            setDocsDesc(docs.data().docsDesc);
        });
    };
    useEffect(() => {
        if(isMounted.current) {
            return 
        }

        isMounted.current = true;
        getData();
    }, []);
    
    return (
        <div className="editDocs-main">
            <h1>{documentTitle}</h1>
            <div className="editDocs-inner">
                <ReactQuill
                    className="react-quill" 
                    value={docsDesc}
                    onChange={getQuillData}
                />
            </div>  
            <ToastContainer />        
        </div>
    );
}