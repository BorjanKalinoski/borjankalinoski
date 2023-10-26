// CLIENT SIDE
//
// 'use client';
//
// import React, { useState } from 'react';
// import { useUploadThing } from '~/app/utils/uploadthing';
// import { FileUploadRoute } from '~/app/constants/file-upload-route';
// import { useDropzone } from 'react-dropzone';
// import { Button } from '~/app/components/button';
//
// function App() {
//   const [file, setFile] = useState<File>();
//
//   const {
//     isUploading: isUploadingBlog,
//     startUpload,
//   } = useUploadThing(FileUploadRoute.blog);
//
//   const {
//     getRootProps,
//     getInputProps,
//     isDragActive,
//   } = useDropzone({
//     disabled: isUploadingBlog,
//     accept: {
//       'text/markdown': ['.md'],
//     },
//     maxFiles: 1,
//     onDrop: (acceptedFiles) => setFile(acceptedFiles[0]),
//   });
//
//   const onUploadBlog = async () => {
//     if (!file) {
//       return;
//     }
//
//     await startUpload([file]);
//
//     setFile(undefined);
//   };
//
//   const isUploadBlogButtonDisabled = !file || isUploadingBlog;
//
//   return (
//     <div className="w-[100%] h-[100vh] flex justify-center items-center bg-slate-50 flex-col">
//       <div
//         className="w-[500px] border-2 p-2"
//       >
//         <div
//           {...getRootProps()}
//         >
//           <input
//             {...getInputProps()}
//           />
//           {
//               isDragActive
//                 ? <p>Drop the files here ...</p>
//                 : <p>Drag n drop some files here, or click to select files</p>
//             }
//         </div>
//
//         {
//               file && (
//               <div className="flex justify-between w-[100%]">
//                 <div>
//                   {file.name}
//                 </div>
//                 <Button className="h-[100%] p-0" variant="ghost" onClick={() => setFile(undefined)}>
//                   Clear
//                 </Button>
//               </div>
//               )
//           }
//       </div>
//
//       <Button
//         disabled={isUploadBlogButtonDisabled}
//         variant="ghost"
//         onClick={onUploadBlog}
//       >
//         {isUploadingBlog ? 'Uploading...' : 'Upload'}
//       </Button>
//     </div>
//   );
// }
// export default App;

// SERVER SIDE

import { db } from './db';
import { dbPass, dbUser } from './db/config';
import { Blog } from './types/blog';

async function App() {
  await db.signin({
    user: dbUser,
    pass: dbPass,
  });

  const blogs: Blog[] = await db.select('blog');

  return (
    <div>
      {
        blogs.map((blog) => (
          <div>{blog.title}</div>
        ))
       }
    </div>
  );
}

export default App;
