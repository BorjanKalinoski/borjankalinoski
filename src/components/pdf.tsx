import {Document, Page} from "react-pdf";
import { pdfjs } from "react-pdf";
import {Props as ReactPDFProps} from "react-pdf/dist/Document";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type Props = Pick<ReactPDFProps, 'onLoadSuccess'> & {
    src: string;
    height: number;
    width?: number;
    className?: string;
};

export function Pdf({height, width, src, className, onLoadSuccess}: Props) {

    return (
            <Document
                file={src}
                className={className}
                onLoadSuccess={onLoadSuccess}
            >
                <Page height={height} width={width} pageNumber={1}/>
            </Document>

    );
}
