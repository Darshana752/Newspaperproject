package com.example.backend.repository;

import com.example.backend.model.SportsNews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SportsNewsRepository extends JpaRepository<SportsNews, Long> {
  Optional<SportsNews> findByNews_NewsId(Long newsId);
}