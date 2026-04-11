package com.example.backend.repository;

import com.example.backend.model.ReaderComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReaderCommentRepository extends JpaRepository<ReaderComment, Long> {
  List<ReaderComment> findByNews_NewsIdOrderByCommentedAtDesc(Long newsId);

  void deleteByNewsNewsId(Long newsId);
}
