package com.example.backend.controller;

import com.example.backend.model.ReaderComment;
import com.example.backend.service.ReaderCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ReaderCommentController {

  private final ReaderCommentService commentService;

  // ── ADD COMMENT ────────────────────────────────────────────
  // POST /api/comments/add
  // Body: { "readerId": 1, "newsId": 2, "comment": "Great article!" }
  @PostMapping("/add")
  public ResponseEntity<ReaderComment> addComment(@RequestBody Map<String, Object> body) {
    Long readerId = Long.valueOf(body.get("readerId").toString());
    Long newsId = Long.valueOf(body.get("newsId").toString());
    String comment = body.get("comment").toString();
    return ResponseEntity.ok(commentService.addComment(readerId, newsId, comment));
  }

  // ── GET COMMENTS FOR A NEWS ────────────────────────────────
  // GET /api/comments/news/{newsId}
  @GetMapping("/news/{newsId}")
  public ResponseEntity<List<ReaderComment>> getComments(@PathVariable Long newsId) {
    return ResponseEntity.ok(commentService.getCommentsByNews(newsId));
  }

  // ── DELETE COMMENT ─────────────────────────────────────────
  // DELETE /api/comments/{id}
  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteComment(@PathVariable Long id) {
    commentService.deleteComment(id);
    return ResponseEntity.ok("Comment deleted");
  }
}
