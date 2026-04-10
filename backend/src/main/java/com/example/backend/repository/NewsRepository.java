package com.example.backend.repository;

import com.example.backend.model.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
  List<News> findByStatus(News.NewsStatus status); // ← needed for getPendingNews()

  List<News> findByNewsType(News.NewsType type); // ← needed for getNewsByType()
}