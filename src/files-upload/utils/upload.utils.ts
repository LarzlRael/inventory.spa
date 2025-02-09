export const fileFilter = (res, file, callback) => {
  /* TPODO recive the types of files as argument */
  if (!file.originalname.match(/\.(jpg|jpeg|png|webp|pdf)$/)) {
    return callback(
      new Error('Only image and image or pdf files are allowed!'),
      false,
    );
  }
  callback(null, true);
};
