package com.example.backend.controller;

import com.example.backend.model.News;
import com.example.backend.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NewsController {

  private final NewsService newsService;

  // ── CREATE NEWS ────────────────────────────────────────────
  @PostMapping("/create")
  public ResponseEntity<News> createNews(
      @RequestParam("topic") String topic,
      @RequestParam("description") String description,
      @RequestParam("newsType") String newsType,
      @RequestParam("writerId") Long writerId,
      @RequestParam(value = "category", required = false) String category,
      @RequestParam(value = "country", required = false) String country,
      @RequestParam(value = "sport", required = false) String sport,
      @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
    News created = newsService.createNews(
        topic, description, newsType, writerId,
        category, country, sport, file);
    return ResponseEntity.ok(created);
  }

  // ── GET ALL NEWS ───────────────────────────────────────────
  @GetMapping("/all")
  public ResponseEntity<List<News>> getAllNews() {
    return ResponseEntity.ok(newsService.getAllNews());
  }

  // ── GET PENDING NEWS ───────────────────────────────────────
  @GetMapping("/pending")
  public ResponseEntity<List<News>> getPendingNews() {
    return ResponseEntity.ok(newsService.getPendingNews());
  }

  // ── GET NEWS BY ID ─────────────────────────────────────────
  @GetMapping("/{id}")
  public ResponseEntity<News> getNewsById(@PathVariable Long id) {
    return ResponseEntity.ok(newsService.getNewsById(id));
  }

  // ── GET NEWS BY TYPE ───────────────────────────────────────
  @GetMapping("/type/{type}")
  public ResponseEntity<List<News>> getNewsByType(@PathVariable String type) {
    return ResponseEntity.ok(newsService.getNewsByType(type));
  }

  // ── UPDATE NEWS ────────────────────────────────────────────
  @PutMapping("/update/{id}")
  public ResponseEntity<News> updateNews(
      @PathVariable Long id,
      @RequestParam(value = "topic", required = false) String topic,
      @RequestParam(value = "description", required = false) String description,
      @RequestParam(value = "category", required = false) String category,
      @RequestParam(value = "country", required = false) String country,
      @RequestParam(value = "sport", required = false) String sport,
      @RequestParam(value = "status", required = false) String status) {
    return ResponseEntity.ok(
        newsService.updateNews(id, topic, description, category, country, sport, status));
  }

  // ── DELETE NEWS ────────────────────────────────────────────
  @DeleteMapping("/delete/{id}")
  public ResponseEntity<String> deleteNews(@PathVariable Long id) {
    newsService.deleteNews(id);
    return ResponseEntity.ok("News deleted successfully");
  }
}