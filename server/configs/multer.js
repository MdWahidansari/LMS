import multer from "multer";
const storage=multer.diskStorage({})
const upload=multer({storage})

export default upload



























// import multer from "multer";

// const storage = multer.diskStorage({});

// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype && file.mimetype.startsWith("image/")) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only image files are allowed"), false);
//     }
//   },
// });

// export default upload;

