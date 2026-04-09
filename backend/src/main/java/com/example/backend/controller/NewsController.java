package com.example.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.News;
import com.example.backend.service.NewsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class NewsController {
  private final NewsService newsService;

  @PostMapping("/create")
  public ResponseEntity<News> create(
      @RequestBody News news,
      @RequestParam Long editorId,
      @RequestParam Long writerId,
      @RequestParam(required = false) String category,
      @RequestParam(required = false) String country,
      @RequestParam(required = false) String sport) {

    return ResponseEntity.ok(
        newsService.createNews(news, editorId, writerId, category, country, sport));
  }

  @GetMapping("/all")
  public ResponseEntity<List<News>> getAll() {
    return ResponseEntity.ok(newsService.getAllNews());
  }

  @GetMapping("/type/{type}")
  public ResponseEntity<List<News>> getByType(@PathVariable String type) {
    return ResponseEntity.ok(newsService.getNewsByType(type));
  }
}
