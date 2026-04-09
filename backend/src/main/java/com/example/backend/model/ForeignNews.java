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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "foreign_news")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ForeignNews {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long foreignId;

  private String country;

  @OneToOne
  @JoinColumn(name = "news_id")
  private News news;

}
