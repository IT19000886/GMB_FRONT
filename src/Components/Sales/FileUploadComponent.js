import React from 'react';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'
import { useState } from 'react';
import axios from 'axios';


const FileUploadComponent = () => {
    //const [show, setShow] = useState(false);
    // //File submit
    // const [imageSelected, setImageSelected] = useState({
    //     uploadFile:null
    // });

    // const {uploadFile} = imageSelected;

    // const onSubmit = async () => {
    //     const formdata = new FormData();
    //     formdata.append("file", file);
    //     formdata.append("name", "upload image");

    //     axios.post('http://localhost:3005/images', formdata).then(response => {
    //         console.warn(response);
    //     });
    // };

    // const handleImage = (e) =>{
    //     //  console.log(e.target.files,'$$$$');
    //     //  console.log(e.target.files[0],'####')
    //     setImageSelected({file:e.target.files});
    // };

    //Edit Popup
    // const openShow = () => {
    //     setShow(prev => !prev);
    // };



    // File Upload
    const fileParams = ({ meta }) => {
        return { url: 'https://httpbin.org/post' }
    }

    const onFileChange = ({ meta, file }, status) => { 
        console.log(status, meta, file);
    }

    const onSubmit = (files, allFiles) => {
        allFiles.forEach(f => f.remove());
        
    }

    const getFilesFromEvent = e => {
        return new Promise(resolve => {
            getDroppedOrSelectedFiles(e).then(chosenFiles => {
                resolve(chosenFiles.map(f => f.fileObject))
            })
        })
    }

    const selectFileInput = ({ accept, onFiles, files, getFilesFromEvent }) => {
        const textMsg = files.length > 0 ? 'Upload Again' : 'Select Files'



        return (
            <label className="btn btn-danger mt-4">
                {textMsg}
                <input
                    style={{ display: 'none' }}
                    type="file"
                    accept={accept}
                    multiple
                    onChange={e => {
                        getFilesFromEvent(e).then(chosenFiles => {
                            onFiles(chosenFiles)
                        })
                    }}
                />
            </label>
        )
    }

    return (
        <Dropzone
            onSubmit={onSubmit}
            onChangeStatus={onFileChange}
            InputComponent={selectFileInput}
            getUploadParams={fileParams}
            getFilesFromEvent={getFilesFromEvent}
            accept="image/*,audio/*,video/*"
            maxFiles={5}
            inputContent="Drop A File"
            styles={{
                dropzone: { width: 600, height: 300 },
                dropzoneActive: { borderColor: 'green' },
            }}            
        />
    );
};

export default FileUploadComponent;