package com.example.backend.service;

import com.example.backend.model.News;
import com.example.backend.model.Reader;
import com.example.backend.model.ReaderComment;
import com.example.backend.repository.NewsRepository;
import com.example.backend.repository.ReaderCommentRepository;
import com.example.backend.repository.ReaderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReaderCommentService {

  private final ReaderCommentRepository commentRepo;
  private final ReaderRepository readerRepo;
  private final NewsRepository newsRepo;

  // ── ADD COMMENT ────────────────────────────────────────────
  public ReaderComment addComment(Long readerId, Long newsId, String commentText) {
    Reader reader = readerRepo.findById(readerId)
        .orElseThrow(() -> new RuntimeException("Reader not found: " + readerId));

    News news = newsRepo.findById(newsId)
        .orElseThrow(() -> new RuntimeException("News not found: " + newsId));

    ReaderComment comment = new ReaderComment();
    comment.setReader(reader);
    comment.setNews(news);
    comment.setComment(commentText);
    comment.setCommentedAt(LocalDateTime.now());

    return commentRepo.save(comment);
  }

  // ── GET COMMENTS BY NEWS ───────────────────────────────────
  public List<ReaderComment> getCommentsByNews(Long newsId) {
    return commentRepo.findByNews_NewsIdOrderByCommentedAtDesc(newsId);
  }

  // ── DELETE COMMENT ─────────────────────────────────────────
  public void deleteComment(Long commentId) {
    commentRepo.deleteById(commentId);
  }
}
