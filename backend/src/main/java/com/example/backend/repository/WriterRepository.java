package com.example.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Writer;

public interface WriterRepository extends JpaRepository<Writer, Long> {
  Optional<Writer> findByEmail(String email);
}