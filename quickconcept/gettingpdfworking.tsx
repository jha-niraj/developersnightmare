"use client"

import { useState, useEffect } from 'react'
import * as pdfjs from 'pdfjs-dist';
import { Document, Page } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

interface PDFViewerProps {
    fileUrl: string
}

export default function SimplePDFViewer({ fileUrl }: PDFViewerProps) {
    console.log(fileUrl);
    const [numPages, setNumPages] = useState<number | null>(null)
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [error, setError] = useState<string | null>(null);
    const [pitchText, setPitchText] = useState('');
    const [isExtracting, setIsExtracting] = useState(false);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages)
        setError(null)
    }

    function onDocumentLoadError(error: Error) {
        console.error('PDF loading error:', error)
        setError('Failed to load PDF. Please ensure the file is valid and try again.')
    }

    function changePage(offset: number) {
        setPageNumber(prevPageNumber => Math.max(1, Math.min(numPages || 1, prevPageNumber + offset)))
    }

    function previousPage() {
        changePage(-1)
    }

    function nextPage() {
        changePage(1)
    }

    return (
        <div className="pdf-document-container" >
            {
                error ? (
                    <div className="text-red-500 text-center p-4" >
                        {error}
                    </div>
                ) : (
                    <>
                        <Document
                            file={fileUrl}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadError={onDocumentLoadError}
                        >
                            <Page
                                pageNumber={pageNumber}
                                renderTextLayer={true}
                                renderAnnotationLayer={true}
                                scale={1.2}
                            />
                        </Document>

                        {
                            numPages && (
                                <div className="pdf-controls mt-4 flex items-center justify-center gap-4" >
                                    <button
                                        onClick={previousPage}
                                        disabled={pageNumber <= 1
                                        }
                                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    < p className="text-center" >
                                        Page {pageNumber} of {numPages}
                                    </p>
                                    < button
                                        onClick={nextPage}
                                        disabled={pageNumber >= (numPages || 1)
                                        }
                                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                    </>
                )}
        </div>
    )
}