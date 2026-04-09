package com.example.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Editor;

public interface EditorRepository extends JpaRepository<Editor, Long> {
  Optional<Editor> findByEmail(String email);
}
