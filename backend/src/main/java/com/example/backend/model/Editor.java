package com.example.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "editor")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Editor {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long editorId;

  private String name;
  private String nic;

  @Column(unique = true)
  private String email;

  private String password;

}
