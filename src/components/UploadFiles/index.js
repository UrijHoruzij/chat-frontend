import React, { useState, useEffect } from "react";
import { Upload } from "antd";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const UploadFiles = ({ attachments, removeAttachment }) => {
  const [state, setState] = useState({
    previewVisible: false,
    previewImage: "",
    fileList: attachments,
  });

  useEffect(() => {
    setState({
      ...state,
      fileList: attachments,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attachments]);

  // eslint-disable-next-line no-unused-vars
  const handleCancel = () => setState({ ...state, previewVisible: false });

  // eslint-disable-next-line no-unused-vars
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setState({
      ...state,
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  const handleChange = ({ fileList }) =>
    setState({
      ...state,
      fileList,
    });

  return (
    <div>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={state.fileList}
        // onPreview={handlePreview}
        onChange={handleChange}
        onRemove={(file) => removeAttachment(file)}
      />
      {/* <Modal
        visible={state.previewVisible}
        onCancel={handleCancel}
        btnClose={true}
      >
        <img alt="example" style={{ width: "100%" }} src={state.previewImage} />
      </Modal> */}
    </div>
  );
};

UploadFiles.defaultProps = {
  attachments: [],
};

export default UploadFiles;
