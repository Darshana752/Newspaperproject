package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
  private Long writerId; // ← must match Writer.java field name
  private String name;
  private String email;
  private String role;
  private String message;
}