let books = [];
let idCounter = 1;

const getBooks = (req, res) => {
  res.json(books);
};

const getBookById = (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');
  res.json(book);
};

const createBook = (req, res) => {
  const newBook = {
    id: idCounter++,
    ...req.body,
  };
  books.push(newBook);
  res.status(201).json(newBook);
};

const updateBook = (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');

  Object.assign(book, req.body);
  res.json(book);
};

const deleteBook = (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).send('Book not found');

  books.splice(bookIndex, 1);
  res.status(200).send();
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
