package com.example.backend.service;

import com.example.backend.model.*;
import com.example.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsService {

  private final NewsRepository newsRepo;
  private final LocalNewsRepository localNewsRepo;
  private final ForeignNewsRepository foreignNewsRepo;
  private final SportsNewsRepository sportsNewsRepo;
  private final EditorRepository editorRepo;
  private final WriterRepository writerRepo;

  public News createNews(News news, Long editorId, Long writerId,
      String category, String country, String sport) {

    Editor editor = editorRepo.findById(editorId)
        .orElseThrow(() -> new RuntimeException("Editor not found with id: " + editorId));

    Writer writer = writerRepo.findById(writerId)
        .orElseThrow(() -> new RuntimeException("Writer not found with id: " + writerId));

    news.setEditor(editor);
    news.setWriter(writer);
    news.setDate(LocalDate.now());
    news.setTime(LocalTime.now());

    News saved = newsRepo.save(news);

    switch (news.getNewsType()) {
      case LOCAL -> {
        LocalNews ln = new LocalNews();
        ln.setCategory(category);
        ln.setNews(saved);
        localNewsRepo.save(ln);
      }
      case FOREIGN -> {
        ForeignNews fn = new ForeignNews();
        fn.setCountry(country);
        fn.setNews(saved);
        foreignNewsRepo.save(fn);
      }
      case SPORTS -> {
        SportsNews sn = new SportsNews();
        sn.setSport(sport);
        sn.setNews(saved);
        sportsNewsRepo.save(sn);
      }
    }

    return saved;
  }

  public List<News> getAllNews() {
    return newsRepo.findAll();
  }

  public News getNewsById(Long id) {
    return newsRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("News not found with id: " + id));
  }

  public List<News> getNewsByType(String type) {
    return newsRepo.findByNewsType(News.NewsType.valueOf(type.toUpperCase()));
  }

  public void deleteNews(Long id) {
    newsRepo.deleteById(id);
  }
}