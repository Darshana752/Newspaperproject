package com.example.backend.repository;

import com.example.backend.model.ForeignNews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ForeignNewsRepository extends JpaRepository<ForeignNews, Long> {
  Optional<ForeignNews> findByNews_NewsId(Long newsId);

  void deleteByNewsNewsId(Long newsId);
}