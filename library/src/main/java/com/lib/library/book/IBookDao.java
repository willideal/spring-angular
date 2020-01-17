package com.lib.library.book;

/**
 * Created by wilfrid on 17/01/2020.
 */
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IBookDao extends JpaRepository<Book, Integer> {

    //recherche un livre par son ISBN en ignorant la casse
    public Book findByIsbnIgnoreCase(String isbn);

    //Rechercher une liste de de litre ayant pour titre title
    public List<Book> findByTitleLikeIgnoreCase(String title);

    //recherche les livres par ccatégorie
    @Query("SELECT b "
            + "FROM Book b "
            + "INNER JOIN b.category cat "
            + "WHERE cat.code = :code"
    )
    public List<Book> findByCategory(@Param("code") String codeCategory);
}
