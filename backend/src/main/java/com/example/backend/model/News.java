package com.example.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "news")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class News {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long newsId;

  @Column(nullable = false)
  private String topic;

  @Column(nullable = false, columnDefinition = "TEXT")
  private String description;

  private LocalDate date;
  private LocalTime time;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private NewsType newsType;

  // File attachment fields
  private String fileName;
  private String fileType;
  private String filePath;

  // Status field
  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  @Builder.Default
  private NewsStatus status = NewsStatus.PENDING;

  @ManyToOne
  @JoinColumn(name = "editor_id")
  private Editor editor;

  @ManyToOne
  @JoinColumn(name = "writer_id")
  private Writer writer;

  // ── Enums ──────────────────────────────
  public enum NewsType {
    LOCAL, FOREIGN, SPORTS
  }

  public enum NewsStatus {
    PENDING, APPROVED, REJECTED
  }
}