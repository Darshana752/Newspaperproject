package com.example.backend.repository;

import com.example.backend.model.LocalNews;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocalNewsRepository extends JpaRepository<LocalNews, Long> {
  Optional<LocalNews> findByNews_NewsId(Long newsId);
}
