import React, { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { Select, MenuItem } from "@mui/material";

export default function Docs({
    database
}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [title, setTitle] = useState("");

    const collectionRef = collection(database, "docsData");
    const addData = () => {
        addDoc(collectionRef, {
            title: title
        })
        .then(() => {
            alert("Data Added");
            handleClose();
        })
        .catch(() => {
            alert("Cannot add data");
        })
    }

    const [docsData, setDocsData] = useState([]);
    const getData = () => {
        onSnapshot(collectionRef, (data) => {
            setDocsData(data.docs.map((doc) => {
                return {...doc.data(), id: doc.id}
            }));
        });
    }

    const isMounted = useRef();

    useEffect(() => {
        if(isMounted.current) {
            return 
        }

        isMounted.current = true;
        getData();
    }, []);

    let navigate = useNavigate();
    const getID = (id) => {
        navigate(`/editDocs/${id}`);
    }

    const languagues = [
        {
            code: 'ja',
            name: '日本語',        
          },
          {
            code: 'en',
            name: 'English',
          },
    ];
    const { t } = useTranslation();
    const [lang, setLang] = useState("en");
    const handleChange = (e) => {
        setLang(e.target.value);
       
    }

    useEffect(() => {
        i18next.changeLanguage(lang);
    }, [lang])


    return (
        <div className="docs-main">
            <h1>{t("app_title")}</h1>

            <button 
                className="add-docs"
                onClick={handleOpen}
            >
                {t("doc_add_btn")}
            </button>
            <Select
                className="change-lang"
                value={lang}
                onChange={handleChange}
            >
                {languagues.map(item => {
                    return (
                        <MenuItem value={item.code}>{item.name}</MenuItem>
                    )
                })}
            </Select>
            <div className="grid-main">
                {docsData.map((doc) => {
                    return (
                        <div className="grid-child" key={doc.id} onClick={() => getID(doc.id)}>
                            <p>{doc.title}</p>
                        </div>
                    )
                })}
            </div>

            <Modal 
                open={open}
                setOpen={setOpen}
                title={title}
                setTitle={setTitle}
                addData={addData}
            />
        </div>
    );
}