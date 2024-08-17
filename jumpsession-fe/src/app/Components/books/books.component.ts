import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/Models/book';
import { BooksService } from 'src/app/Services/books.service';
import { NavService } from 'src/app/Shared-Services/nav.service';
import { CreateBookModalComponent } from '../Modals/create-book-modal/create-book-modal.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})


export class BooksComponent {

  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchTerm: string = '';
  errorMessage: string = '';
  selectedBook: Book | null = null;
  isAddBookModalVisible: boolean = false;

  
  // isBookModalVisible: boolean = false;
  // isCreateUserModalVisible: boolean = false;

  constructor(private bookService: BooksService, private router: Router, private navService: NavService) { }

  ngOnInit() {
    this.loadBooks();
    this.navService.showNav = true;
  }
  
  
  loadBooks(): void {
      this.bookService.getBooks().subscribe({
      next: (res) => {
        this.books = res;
        this.filteredBooks = this.books;
      },
      error: (err) => {
        console.log('Failed to fetch books: ',err)
      }
    })
  }

  filterBooks() {
    const term = this.searchTerm.toLowerCase();
    this.filteredBooks = this.books.filter(book =>
      book.book_name.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term)
    );
  }

  onRowClick(book: Book): void {
    console.log('Row clicked:', book);
  }

  // ToDo: open modal
  openAddBookModal() {
    this.isAddBookModalVisible = true;
    
  }

  closeModal(): void {
    this.isAddBookModalVisible = false;
  }

  onBookAdded(newBook: Book): void {
    this.loadBooks();
    this.closeModal();
  }

  
}