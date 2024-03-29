import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useTranslation } from "react-i18next";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function ModalComponent({
    open,
    setOpen,
    title,
    setTitle,
    addData
}) {
    const handleClose = () => setOpen(false);
    const { t } = useTranslation();

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <input
                        placeholder={t("doc_add_placeholder")} 
                        className="add-input"
                        onChange={(event) => setTitle(event.target.value)}
                        value={title}
                    />
                    <div className="button-container">
                        <button
                            className="add-docs"
                            onClick={addData}
                        >   
                            {t("add_btn")}
                        </button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}