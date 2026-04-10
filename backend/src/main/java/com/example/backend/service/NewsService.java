package com.example.backend.service;

import com.example.backend.model.*;
import com.example.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NewsService {

  private final NewsRepository newsRepo;
  private final LocalNewsRepository localNewsRepo;
  private final ForeignNewsRepository foreignNewsRepo;
  private final SportsNewsRepository sportsNewsRepo;
  private final EditorRepository editorRepo;
  private final WriterRepository writerRepo;

  private final String UPLOAD_DIR = "uploads/";

  // ── CREATE NEWS ────────────────────────────────────────────
  public News createNews(
      String topic,
      String description,
      String newsType,
      Long writerId,
      String category,
      String country,
      String sport,
      MultipartFile file) throws IOException {

    // Find writer
    Writer writer = writerRepo.findById(writerId)
        .orElseThrow(() -> new RuntimeException("Writer not found: " + writerId));

    // Build news object
    News news = new News();
    news.setTopic(topic);
    news.setDescription(description);
    news.setNewsType(News.NewsType.valueOf(newsType.toUpperCase()));
    news.setDate(LocalDate.now());
    news.setTime(LocalTime.now());
    news.setWriter(writer);
    news.setStatus(News.NewsStatus.PENDING);

    // Handle file upload
    if (file != null && !file.isEmpty()) {
      String originalName = file.getOriginalFilename();
      String uniqueName = UUID.randomUUID() + "_" + originalName;
      Path uploadPath = Paths.get(UPLOAD_DIR);

      // Create uploads folder if not exists
      if (!Files.exists(uploadPath)) {
        Files.createDirectories(uploadPath);
      }

      Path savedPath = uploadPath.resolve(uniqueName);
      Files.copy(file.getInputStream(), savedPath,
          StandardCopyOption.REPLACE_EXISTING);

      news.setFileName(originalName);
      news.setFileType(file.getContentType());
      news.setFilePath(savedPath.toString());
    }

    // Save main news
    News saved = newsRepo.save(news);

    // Save subtype
    switch (saved.getNewsType()) {

      case LOCAL -> {
        LocalNews localNews = new LocalNews();
        localNews.setCategory(category);
        localNews.setNews(saved);
        localNewsRepo.save(localNews);
      }

      case FOREIGN -> {
        ForeignNews foreignNews = new ForeignNews();
        foreignNews.setCountry(country);
        foreignNews.setNews(saved);
        foreignNewsRepo.save(foreignNews);
      }

      case SPORTS -> {
        SportsNews sportsNews = new SportsNews();
        sportsNews.setSport(sport);
        sportsNews.setNews(saved);
        sportsNewsRepo.save(sportsNews);
      }
    }

    return saved;
  }

  // ── GET ALL NEWS ───────────────────────────────────────────
  public List<News> getAllNews() {
    return newsRepo.findAll();
  }

  // ── GET PENDING NEWS ───────────────────────────────────────
  public List<News> getPendingNews() {
    return newsRepo.findByStatus(News.NewsStatus.PENDING);
  }

  // ── GET NEWS BY ID ─────────────────────────────────────────
  public News getNewsById(Long id) {
    return newsRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("News not found: " + id));
  }

  // ── GET NEWS BY TYPE ───────────────────────────────────────
  public List<News> getNewsByType(String type) {
    return newsRepo.findByNewsType(
        News.NewsType.valueOf(type.toUpperCase()));
  }

  // ── UPDATE NEWS ────────────────────────────────────────────
  public News updateNews(
      Long newsId,
      String topic,
      String description,
      String category,
      String country,
      String sport,
      String status) {

    // Find news
    News news = newsRepo.findById(newsId)
        .orElseThrow(() -> new RuntimeException("News not found: " + newsId));

    // Update main fields if provided
    if (topic != null && !topic.isEmpty()) {
      news.setTopic(topic);
    }
    if (description != null && !description.isEmpty()) {
      news.setDescription(description);
    }
    if (status != null && !status.isEmpty()) {
      news.setStatus(News.NewsStatus.valueOf(status.toUpperCase()));
    }

    // Save updated news
    News saved = newsRepo.save(news);

    // Update subtype fields
    switch (saved.getNewsType()) {

      case LOCAL -> {
        Optional<LocalNews> localOpt = localNewsRepo.findByNews_NewsId(newsId);
        localOpt.ifPresent(localNews -> {
          if (category != null && !category.isEmpty()) {
            localNews.setCategory(category);
          }
          localNewsRepo.save(localNews);
        });
      }

      case FOREIGN -> {
        Optional<ForeignNews> foreignOpt = foreignNewsRepo.findByNews_NewsId(newsId);
        foreignOpt.ifPresent(foreignNews -> {
          if (country != null && !country.isEmpty()) {
            foreignNews.setCountry(country);
          }
          foreignNewsRepo.save(foreignNews);
        });
      }

      case SPORTS -> {
        Optional<SportsNews> sportsOpt = sportsNewsRepo.findByNews_NewsId(newsId);
        sportsOpt.ifPresent(sportsNews -> {
          if (sport != null && !sport.isEmpty()) {
            sportsNews.setSport(sport);
          }
          sportsNewsRepo.save(sportsNews);
        });
      }
    }

    return saved;
  }

  // ── DELETE NEWS ────────────────────────────────────────────
  public void deleteNews(Long id) {
    newsRepo.deleteById(id);
  }
}