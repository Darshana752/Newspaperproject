package com.example.backend.dto;

import lombok.Data;

@Data
public class RegisterRequest {
  private String name;
  private String email;
  private String password;
  private String role; // READER, WRITER, EDITOR
  private String nic; // required for WRITER and EDITOR
}
