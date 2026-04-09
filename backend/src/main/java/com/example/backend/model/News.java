package com.example.backend.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "news")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class News {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long newsId;

  private String topic;
  private String description;
  private LocalDate date;
  private LocalTime time;

  @Enumerated(EnumType.STRING)
  private NewsType newsType;

  @ManyToOne
  @JoinColumn(name = "editor_id")
  private Editor editor;

  @ManyToOne
  @JoinColumn(name = "writer_id")
  private Writer writer;

  public enum NewsType {
    LOCAL, FOREIGN, SPORTS
  }

}
