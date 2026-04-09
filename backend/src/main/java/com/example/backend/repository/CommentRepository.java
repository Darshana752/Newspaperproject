package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.ReaderComment;

public interface CommentRepository extends JpaRepository<ReaderComment, Long> {
  List<ReaderComment> findByNews_NewsId(Long newsId);
}
