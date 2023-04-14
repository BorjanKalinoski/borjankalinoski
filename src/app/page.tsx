"use client"
import {useWindowSize} from "~/hooks/use-window-size";
import {Pdf} from "~/components/pdf";
import {useState} from "react";
import {LoadingSpinner} from "~/components/loading-spinner";


function App() {
    const [isLoadingPdf, setIsLoadingPdf] = useState(true);

    const {
        width,
        height
    } = useWindowSize();

    const cvWidth = width && width > 1024 ? undefined : width;
    const cvHeight = height || 500;


    return (
        <div className="w-[100%] h-[100vh] flex justify-center items-center bg-slate-50">
            <Pdf
                width={cvWidth} height={cvHeight}
                src="/borjan-kalinoski-cv.pdf"
                className="shadow-2xl"
                onLoadSuccess={() => {
                    setIsLoadingPdf(false);
                }}
            />

            {isLoadingPdf && <LoadingSpinner/>}
        </div>
    );
}

export default App;
