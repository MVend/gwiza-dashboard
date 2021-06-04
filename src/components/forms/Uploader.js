import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Modal, Spinner } from "react-bootstrap";
import { UploadCloud } from "react-feather";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { upload as uploadMembers } from "../../redux/actions/membersActions";
import { upload as uploadGroup } from "../../redux/actions/groupsActions";

const Uploader = ({
  type,
  uploadMembers,
  uploadGroup,
  members: { btnLoading },
}) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const { group_id } = useParams();

  const handleClose = () => {
    setSelectedFile(null);
    setShow(false);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ".xlsx",
    multiple: false,
    onDrop,
  });

  const onSave = () => {
    if (!selectedFile) return toast.error("No file selected");
    const formData = new FormData();
    if (type === "members") {
      formData.append("members_file", selectedFile);
      return uploadMembers(formData, group_id);
    } if (type === "group") {
      formData.append("group_file", selectedFile);
      return uploadGroup(formData);
    }
  };

  return (
    <>
      <Button className="mr-4" size="sm" variant="primary" onClick={handleShow}>
        {type === "members" ? "+ Upload Members" : "+ Upload file"}
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            Upload
            <span className="text-muted small ml-3">
              {selectedFile && selectedFile.name}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="hover-icon" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive && (
              <div className="d-flex justify-content-center ">
                <div className="">
                  <p>Drop the files here ...</p>
                </div>
              </div>
            )}
            {!isDragActive && (
              <div className="d-flex justify-content-center">
                <div className="">
                  <UploadCloud className="file_upload ml-4" />
                  <p>
                    Drag and drop a file here <br />
                    or click to select a file
                  </p>
                </div>
              </div>
            )}
          </div>{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" onClick={onSave} variant="primary">
            Save
            {btnLoading && <Spinner animation="border" />}
            {!btnLoading && ""}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
const mapState = ({ members }) => ({ members });
export default connect(mapState, { uploadMembers, uploadGroup })(Uploader);
