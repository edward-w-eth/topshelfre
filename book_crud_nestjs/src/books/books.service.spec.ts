import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { NotFoundException } from '@nestjs/common';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a book', () => {
    const book = service.create({ id: 1, title: 'Book 1', author: 'Author 1', published_date: '2022-01-01', price: 9.99 });
    expect(book).toEqual({ id: 1, title: 'Book 1', author: 'Author 1', published_date: '2022-01-01', price: 9.99 });
  });

  it('should find all books', () => {
    service.create({ id: 1, title: 'Book 1', author: 'Author 1', published_date: '2022-01-01', price: 9.99 });
    const books = service.findAll();
    expect(books.length).toBe(1);
  });

  it('should find one book by id', () => {
    const createdBook = service.create({ id: 1, title: 'Book 1', author: 'Author 1', published_date: '2022-01-01', price: 9.99 });
    const book = service.findOne(createdBook.id);
    expect(book).toEqual(createdBook);
  });

  it('should throw error when book not found', () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
  });

  it('should update a book', () => {
    const createdBook = service.create({ id: 1, title: 'Book 1', author: 'Author 1', published_date: '2022-01-01', price: 9.99 });
    const updatedBook = service.update(createdBook.id, {title: 'Updated Book 1', author: 'Updated Author 1', published_date: '2022-01-02', price: 19.99});
    expect(updatedBook.title).toBe('Updated Book 1');
  });

  it('should remove a book', () => {
    const createdBook = service.create({ id: 1, title: 'Book 1', author: 'Author 1', published_date: '2022-01-01', price: 9.99 });
    service.remove(createdBook.id);
    expect(() => service.findOne(createdBook.id)).toThrow(NotFoundException);
  });
});