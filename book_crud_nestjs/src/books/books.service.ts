import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from '../entity/book.entity';
import { CreateBookDto } from './dto';

@Injectable()
export class BooksService {
  private books: Book[] = [];

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book {
    const book = this.books.find(book => book.id === id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  create(book: CreateBookDto): Book {
    const newBook: Book = book as Book;
    this.books.push(newBook);
    return newBook;
  }

  update(id: number, updatedBook: Partial<Book>): Book {
    const bookIndex = this.books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException('Book not found');
    }
    const updated = { ...this.books[bookIndex], ...updatedBook };
    this.books[bookIndex] = updated;
    return updated;
  }

  remove(id: number): void {
    const bookIndex = this.books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException('Book not found');
    }
    this.books.splice(bookIndex, 1);
  }
}
