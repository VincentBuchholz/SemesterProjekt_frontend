import React from 'react'

import PDFViewer from 'pdf-viewer-reactjs'

const ExamplePDFViewer = (fileName) => {
    console.log(fileName.fileName)
    return (
        <PDFViewer
            document={{
                url: fileName.fileName,
            }}
        />
    )
}

export default ExamplePDFViewer