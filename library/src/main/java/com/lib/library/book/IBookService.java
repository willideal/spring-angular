package com.lib.library.book;

import java.util.List;

/**
 * Created by wilfrid on 17/01/2020.
 */
public interface IBookService {

    public Book saveBook(Book book);

    public Book updateBook(Book book);

    public void deleteBook(Integer bookId);

    public List<Book> findBooksByTitleOrPartTitle(String title);

    public Book findBookByIsbn(String isbn);

    public boolean checkIfIdexists(Integer id);

    public List<Book> getBooksByCategory(String codeCategory);
}
