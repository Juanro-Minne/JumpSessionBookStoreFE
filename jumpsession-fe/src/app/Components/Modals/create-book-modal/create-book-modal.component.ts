import { Component, EventEmitter, Output } from '@angular/core';
import { Book } from 'src/app/Models/book';
import { BooksService } from 'src/app/Services/books.service';

@Component({
  selector: 'app-create-book-modal',
  templateUrl: './create-book-modal.component.html',
  styleUrls: ['./create-book-modal.component.css']
})
export class CreateBookModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() bookCreated = new EventEmitter<Book>();

  book: Omit<Book, 'id'> = {
    book_name: '',
    isbn_number: '',
    author: ''
  };

  constructor(public bookService: BooksService) { }

  saveBook() {
    this.bookService.createBook(this.book).subscribe(
      (addedBook: Book) => {
        console.log('Book added successfully:', addedBook);
        this.bookCreated.emit(addedBook); 
        this.closeModal();
      },
      error => {
        console.error('Error adding book:', error);
      }
    );
  }

  closeModal() {
    this.close.emit();
  }
}
