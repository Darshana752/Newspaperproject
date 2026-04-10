package com.example.backend.dto;

import lombok.Data;

@Data
public class NewsRequestDTO {
  private String topic;
  private String description;
  private String newsType;
  private Long writerId;
  private String category;
  private String country;
  private String sport;
  private String status;
}
