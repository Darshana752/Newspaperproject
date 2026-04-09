package com.example.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Reader;

public interface ReaderRepository extends JpaRepository<Reader, Long> {
  Optional<Reader> findByEmail(String email);
}